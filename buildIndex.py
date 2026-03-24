import os
import re
import unicodedata
from collections import defaultdict

# --- Configuration ---
DOCS_DIR = './'
OUTPUT_DIR = os.path.join(DOCS_DIR, '_index')
OUTPUT_FILE = os.path.join(OUTPUT_DIR, 'README.md')

# Liste des expressions à garder groupées (insensible à la casse)
COMBOS = [
    "Pure Data",
    "Plug Data",
    "TouchDesigner",
    "DaVinci Resolve",
    "VLC Media Player",
    "Arduino IDE",
    "Pecha Kucha",
    "VCV Rack",
    "Raspberry Pi",
    "Open Sound Control"
]

SKIP_WORDS = {
    'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'by',
    'de', 'la', 'le', 'les', 'des', 'un', 'une', 'du', 'au', 'aux', 'par', 
    'pour', 'dans', 'sur', 'avec', 'et', 'ou', 'est', 'sont', 'lequel',
    'ce', 'ces', 'en', 'votre', 'notre', 'quelques', 'par', 'ceux', 'elles', 'À', 'qui', 'uniquement'
}

def normalize_string(s):
    return ''.join(
        c for c in unicodedata.normalize('NFD', s)
        if unicodedata.category(c) != 'Mn'
    ).lower()

def get_h1_and_path(docs_dir):
    data = []
    for root, dirs, files in os.walk(docs_dir):
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
    index = defaultdict(list)
    for title, path in metadata:
        current_title = title
        
        # 1. Protection des Combos : on remplace "Pure Data" par "Pure-Data" temporairement
        # On utilise une liste pour suivre ce qu'on a modifié
        protected_terms = []
        for combo in COMBOS:
            if re.search(re.escape(combo), current_title, re.IGNORECASE):
                # On crée une version jointe (ex: Pure-Data)
                joined_combo = combo.replace(' ', '-')
                # Remplacement insensible à la casse dans le titre de travail
                current_title = re.sub(re.escape(combo), joined_combo, current_title, flags=re.IGNORECASE)
        
        words = current_title.split()
        
        for word in words:
            # 2. Supprimer les préfixes D', L', etc.
            clean_prefix = re.sub(r"^[a-zA-Z]['’]", "", word)
            
            # 3. Nettoyer la ponctuation aux extrémités
            cleaned = clean_prefix.strip('.,;:!?()[]{}""\'’')
            
            check_val = cleaned.lower()
            
            # 4. Filtrage
            if (check_val and 
                check_val not in SKIP_WORDS and 
                not check_val.isdigit() and 
                len(check_val) > 2):
                
                # On restaure l'espace pour l'entrée du dictionnaire si c'était un combo
                # (ex: "Pure-data" redevient "Pure Data")
                display_word = cleaned.replace('-', ' ') if any(c.replace(' ', '-').lower() == check_val for c in COMBOS) else cleaned
                
                # Capitalisation
                entry = display_word[0].upper() + display_word[1:] if len(display_word) > 1 else display_word.upper()
                
                if (title, path) not in index[entry]:
                    index[entry].append((title, path))
    return index

def write_markdown(index):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# Index\n\n")
        sorted_keys = sorted(index.keys(), key=normalize_string)
        
        for keyword in sorted_keys:
            f.write(f"* **{keyword}**\n")
            sorted_links = sorted(index[keyword], key=lambda x: normalize_string(x[0]))
            for title, path in sorted_links:
                f.write(f"  * [{title}](../{path})\n")

if __name__ == "__main__":
    metadata = get_h1_and_path(DOCS_DIR)
    keyword_index = build_keyword_dict(metadata)
    write_markdown(keyword_index)
    print(f"✨ Index mis à jour avec gestion des combos (ex: Pure Data)")