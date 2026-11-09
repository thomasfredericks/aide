import re
import os
from pathlib import Path

BASE_DIR = Path(".").resolve()

# Capturer tous les liens (relatifs ou absolus) qui ne sont pas des URLs externes (http)
link_pattern = re.compile(r'\[.*?\]\((?!http|https|mailto|tel)([^)]+)\)')

def is_ignored(path: Path) -> bool:
    return any(part.startswith("_") for part in path.parts)

def resolve_link(current_file: Path, link: str) -> bool:
    # 1. Nettoyer les ancres (#) et les queries (?)
    clean_link = link.split("#")[0].split("?")[0].strip()
    if not clean_link: return True # Lien vers l'ancre interne (#section)

    # 2. Déterminer le chemin absolu sur le disque
    if clean_link.startswith('/'):
        # Lien absolu par rapport à BASE_DIR
        target_path = BASE_DIR / clean_link.lstrip('/')
    else:
        # Lien relatif par rapport au dossier du fichier actuel
        target_path = (current_file.parent / clean_link).resolve()

    # 3. Vérifier si c'est un dossier (Docsify cherche alors README.md) ou un fichier
    # On normalise pour éviter les erreurs de casse ou de slashs
    if target_path.is_dir():
        return (target_path / "README.md").exists()
    
    # Vérifier le fichier direct ou avec l'extension .md ajoutée
    return target_path.exists() or Path(f"{target_path}.md").exists()

def main():
    broken = []

    # On utilise rglob pour scanner récursivement
    for md_file in BASE_DIR.rglob("*.md"):
        rel_md_path = md_file.relative_to(BASE_DIR)
        
        # Ignorer les fichiers dans les dossiers commençant par _
        if is_ignored(rel_md_path):
            continue

        try:
            content = md_file.read_text(encoding="utf-8")
        except Exception as e:
            print(f"⚠️ Erreur de lecture {md_file}: {e}")
            continue

        links = link_pattern.findall(content)

        for link in links:
            if not resolve_link(md_file, link):
                broken.append((rel_md_path, link))

    if not broken:
        print("✅ Tous les liens sont valides !")
    else:
        print(f"❌ {len(broken)} liens cassés trouvés :")
        for file, link in broken:
            print(f"  {file} -> {link}")

if __name__ == "__main__":
    main()