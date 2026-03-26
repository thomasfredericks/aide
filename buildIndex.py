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
    "Td": "TouchDesigner",
    "td": "TouchDesigner",
    "VSCode": "Visual Studio Code",
    "VSC": "Visual Studio Code",
    "PD": "Pure Data",
    "Pd": "Pure Data",
    "RPi": "Raspberry Pi",
    "OSC": "Open SOund Control"
}

# Liste des expressions à garder groupées (insensible à la casse)
COMBOS = [
    "Pure Data",
    "Plug Data",
    "TouchDesigner",
    "DaVinci Resolve",
    "VLC Media Player",
    "Visual Studio Code",
    "Pecha Kucha",
    "VCV Rack",
    "Raspberry Pi",
    "Open Sound Control",
    "Virtual MIDI Keyboard"
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
    index = defaultdict(list)
    for title, path in metadata:
        current_title = title

        # --- MODIFICATION 2 : Nettoyage des underscores ---
        # Cette regex supprime les _ s'ils sont au début/fin de titre ou entourés d'espaces
        # mais ne touche pas à l'underscore dans "mot_cle"
        current_title = re.sub(r'(^|(?<=\s))_|_(?=\s|$)', '', current_title)

        # Remplacement des alias
        for alias, full in ALIASES.items():
            current_title = re.sub(rf'\b{re.escape(alias)}\b', full, current_title)
        
        # (Le reste de ta fonction build_keyword_dict demeure inchangé...)
        protected_terms = []
        for combo in COMBOS:
            if re.search(re.escape(combo), current_title, re.IGNORECASE):
                joined_combo = combo.replace(' ', '-')
                current_title = re.sub(re.escape(combo), joined_combo, current_title, flags=re.IGNORECASE)
        
        words = current_title.split()
        for word in words:
            clean_prefix = re.sub(r"^[a-zA-Z]['’]", "", word)
            # Ajout de l'underscore dans les caractères à nettoyer aux extrémités si nécessaire
            cleaned = clean_prefix.strip('*«».,;:!?()[]{}""\'’_') 

            lower = cleaned.lower()
            if (lower not in SKIP_WORDS):
                singular = singularize(lower)
                check_val = singular
                if (check_val and check_val not in SKIP_WORDS and not check_val.isdigit() and len(check_val) > 2):
                    display_word = singular.replace('-', ' ') if any(
                        c.replace(' ', '-').lower() == check_val for c in COMBOS
                    ) else singular
                    entry = display_word[0].upper() + display_word[1:] if len(display_word) > 1 else display_word.upper()
                    if (title, path) not in index[entry]:
                        index[entry].append((title, path))
    return index

def write_markdown(index):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("# Index\n\n")
        sorted_keys = sorted(index.keys(), key=normalize_for_sort)
        
        for keyword in sorted_keys:
            f.write(f"* {keyword}\n")
            sorted_links = sorted(index[keyword], key=lambda x: normalize_for_sort(x[0]))
            for title, path in sorted_links:
                f.write(f"  * [{title}](../{path})\n")

if __name__ == "__main__":
    metadata = get_h1_and_path(DOCS_DIR)
    keyword_index = build_keyword_dict(metadata)
    write_markdown(keyword_index)
    print(f"{OUTPUT_FILE} generated")