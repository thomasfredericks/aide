# Ce code parcourt tous mes documents .md de Docsify pour générer un index de tous les titres H1.

import os
import re
import unicodedata
from collections import defaultdict

# --- Configuration ---
DOCS_DIR = './'
OUTPUT_DIR = os.path.join(DOCS_DIR, '_index')
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'README.md')

# Synonymes / alias (clé = variante, valeur = forme canonique)
ALIASES = {
    "TD": "TouchDesigner",
    "VSCode": "Visual Studio Code",
    "PD": "Pure Data",
    "Pd": "Pure Data",
    "RPi": "Raspberry Pi",
    "OSC": "Open Sound Control",
    "IA" : "Grand modèle de langage",
    "AI" : "Grand modèle de langage",
    "GML" : "Grand modèle de langage",
    "IU" : "Interface utilisateur",
    "GUI" : "Interface utilisateur",
    "BL" : "Bibliothèque logicielle",
    "PL" : "Plugiciel"
}

# Liste des expressions à garder groupées (insensible à la casse)
COMBOS = [
    "Pure Data",
    "TouchDesigner",
    "DaVinci Resolve",
    "VLC Media Player",
    "Visual Studio Code",
    "Pecha Kucha",
    "VCV Rack",
    "Raspberry Pi",
    "Open Sound Control",
    "Virtual MIDI Keyboard",
    "Grand modèle de langage",
    "Interface utilisateur",
    "Bibliothèque logicielle"
]

SKIP_WORDS = {
    'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'by',
    'de', 'la', 'le', 'les', 'des', 'un', 'une', 'du', 'au', 'aux', 'par', 
    'pour', 'dans', 'sur', 'avec', 'et', 'ou', 'est', 'sont', 'lequel',
    'ce', 'ces', 'en', 'votre', 'notre', 'quelques', 'par', 'ceux', 'elles', 'À', 'qui', 'uniquement', 'certain', 'dans', 'sans'
}

def singularize(word):
    w = word
    
    # 1️⃣ Si le mot contient un point, ne rien changer
    if '.' in w:
        return w
    
    # 2️⃣ Cas français simples
    if w.endswith('aux'):
        return w[:-3] + 'al'   # chevaux → cheval
    
    if w.endswith('eaux'):
        return w[:-1]          # bateaux → bateau
    
    # 3️⃣ Pluriel simple
    if w.endswith('s') and len(w) > 3:
        # print(f"{w} -> {w[:-1]}")
        return w[:-1]          # valeurs → valeur
    
    return w

# def normalize_string(s):
#     return ''.join(
#         c for c in unicodedata.normalize('NFD', s)
#         if unicodedata.category(c) != 'Mn'
#     ).lower()

def normalize_for_sort(s):
    """
    Transforme une chaîne pour un tri alphabétique correct.
    - minuscule
    - suppression des accents
    - ligatures œ -> oe, æ -> ae
    """
    s = s.lower()
    
    # ligatures
    s = s.replace('œ', 'oe').replace('æ', 'ae')
    
    # normalisation Unicode NFD + suppression des diacritiques
    s = ''.join(
        c for c in unicodedata.normalize('NFD', s)
        if unicodedata.category(c) != 'Mn'
    )
    
    return s

def get_h1_and_path(docs_dir):
    data = []
    for root, dirs, files in os.walk(docs_dir):
        # --- MODIFICATION 1 : Ignorer le dossier racine ---
        if os.path.abspath(root) == os.path.abspath(docs_dir):
            continue 
            
        dirs[:] = [d for d in dirs if not d.startswith('_')]
        for file in files:
            if file.endswith('.md'):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, docs_dir).replace('\\', '/')
                if rel_path.endswith('README.md'):
                    rel_path = rel_path[:-9]
                
                title = None
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        for line in f:
                            match = re.match(r'^#\s+(.*)', line)
                            if match:
                                title = match.group(1).strip()
                                break
                except Exception:
                    continue
                if title:
                    data.append((title, rel_path))
    return data

def build_keyword_dict(metadata):
    # On initialise avec des listes vides
    index = defaultdict(list)
    
    # 1. Ajouter les redirections d'alias (ex: Pd -> : Voir Pure Data)
    for alias, full_name in ALIASES.items():
        # Formatage de la clé (ex: "pd" -> "Pd")
        entry_alias = alias[0].upper() + alias[1:] if len(alias) > 1 else alias.upper()
        line = f"Voir : {full_name}"
        if line not in index[entry_alias]:
            index[entry_alias].append(line)

    # 2. Parcourir les métadonnées pour les liens réels
    for title, path in metadata:
        current_title = title
        
        # Nettoyage des underscores (italique Markdown)
        current_title = re.sub(r'(^|(?<=\s))_|_(?=\s|$)', '', current_title)

        # Remplacement des alias dans le titre
        for alias, full in ALIASES.items():
            current_title = re.sub(rf'\b{re.escape(alias)}\b', full, current_title)
        
        # Protection des Combos (ex: Pure Data -> Pure-Data)
        for combo in COMBOS:
            if re.search(re.escape(combo), current_title, re.IGNORECASE):
                joined_combo = combo.replace(' ', '-')
                current_title = re.sub(re.escape(combo), joined_combo, current_title, flags=re.IGNORECASE)
        
        words = current_title.split()
        for word in words:
            # Nettoyage préfixe et ponctuation (dont l'underscore)
            clean_prefix = re.sub(r"^[a-zA-Z]['’]", "", word)
            cleaned = clean_prefix.strip('*«».,;:!?()[]{}""\'’_')

            lower = cleaned.lower()
            if lower not in SKIP_WORDS:
                singular = singularize(lower)
                
                if (singular and singular not in SKIP_WORDS and 
                    not singular.isdigit() and len(singular) > 2):
                    
                    # Gestion de l'affichage (remettre les espaces des combos)
                    display_word = singular.replace('-', ' ') if any(
                        c.replace(' ', '-').lower() == singular for c in COMBOS
                    ) else singular
                    
                    entry_key = display_word[0].upper() + display_word[1:] if len(display_word) > 1 else display_word.upper()
                    
                    # Préformatage de la ligne Markdown
                    markdown_link = f"[{title}](../{path})"
                    
                    if markdown_link not in index[entry_key]:
                        index[entry_key].append(markdown_link)
                        
    return index

def write_markdown(index):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# Index\n\n")

        f.write("<!-- toc -->\n")
        
        sorted_keys = sorted(index.keys(), key=normalize_for_sort)
        
        current_letter = None
        
        for keyword in sorted_keys:
            # Extraire la première lettre et la normaliser (sans accent, majuscule)
            first_char = normalize_for_sort(keyword[0]).upper()[0]
            
            # Si la lettre change, on insère un nouveau titre de section
            if first_char != current_letter:
                current_letter = first_char
                f.write(f"\n## {current_letter}\n")
            
            # Écriture du mot-clé
            f.write(f"* {keyword.upper()}\n")
            
            # Tri et écriture des entrées (liens ou redirections)
            sorted_entries = sorted(index[keyword], key=normalize_for_sort)
            for line in sorted_entries:
                f.write(f"  * {line}\n")

if __name__ == "__main__":
    metadata = get_h1_and_path(DOCS_DIR)
    keyword_index = build_keyword_dict(metadata)
    write_markdown(keyword_index)
    print(f"✅ {OUTPUT_FILE} generated")