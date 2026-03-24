import re
from pathlib import Path

BASE_DIR = Path(".")

link_pattern = re.compile(r'\((/[^)]+)\)')

def is_ignored(path: Path) -> bool:
    return any(part.startswith("_") for part in path.parts)

def resolve_link(link: str) -> bool:
    clean = link.split("#")[0].split("?")[0]
    path = clean.lstrip('/').rstrip('/')

    path_obj = Path(path)

    # 🚫 Skip links pointing to _ folders
    if is_ignored(path_obj):
        return True

    file_md = BASE_DIR / f"{path}.md"
    readme_md = BASE_DIR / path / "README.md"

    return file_md.exists() or readme_md.exists()

def main():
    broken = []

    for md_file in BASE_DIR.rglob("*.md"):
        # 🚫 Skip files inside _ folders
        if is_ignored(md_file.relative_to(BASE_DIR)):
            continue

        content = md_file.read_text(encoding="utf-8")
        links = link_pattern.findall(content)

        for link in links:
            if not resolve_link(link):
                broken.append((md_file, link))

    if not broken:
        print("✅ All links are valid!")
    else:
        print("❌ Broken links:")
        for file, link in broken:
            print(f"{file}: {link}")

if __name__ == "__main__":
    main()