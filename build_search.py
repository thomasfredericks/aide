import os
import re
import json
import unicodedata

DOCS_DIR = './'
OUTPUT_JSON_FILE = os.path.join(DOCS_DIR, 'search_index.json')
ALIASES_FILE = os.path.join(DOCS_DIR, 'aliases.json')
SKIP_WORDS_FILE = os.path.join(DOCS_DIR, 'skip_words.json')
MAX_HEADING_LEVEL = 2

def load_external_configs():
    aliases = {}
    skip_words = set()
    
    if os.path.exists(ALIASES_FILE):
        try:
            with open(ALIASES_FILE, 'r', encoding='utf-8') as f:
                raw_aliases = json.load(f)
                aliases = {unicodedata.normalize('NFD', k.lower()).encode('ascii', 'ignore').decode('utf-8'): 
                           unicodedata.normalize('NFD', v.lower()).encode('ascii', 'ignore').decode('utf-8') 
                           for k, v in raw_aliases.items()}
        except Exception as e:
            print(f"⚠️ Erreur chargement aliases.json : {e}")
            
    if os.path.exists(SKIP_WORDS_FILE):
        try:
            with open(SKIP_WORDS_FILE, 'r', encoding='utf-8') as f:
                words = json.load(f)
                skip_words = {unicodedata.normalize('NFD', w.lower()).encode('ascii', 'ignore').decode('utf-8') for w in words}
        except Exception as e:
            print(f"⚠️ Erreur chargement skip_words.json : {e}")
            
    return aliases, skip_words

ALIASES, SKIP_WORDS = load_external_configs()

def slugify(text):
    text = text.lower()
    text = ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    return text

def normalize_text(text, aliases, skip_words):
    text_lower = text.lower()
    text_clean = ''.join(c for c in unicodedata.normalize('NFD', text_lower) if unicodedata.category(c) != 'Mn')
    
    sorted_aliases = sorted(aliases.keys(), key=len, reverse=True)
    for alias in sorted_aliases:
        if alias in text_clean:
            canonical = aliases[alias]
            text_clean = text_clean.replace(alias, canonical)

    words = text_clean.split()
    processed_words = []
    
    for word in words:
        clean_w = word.strip('.,;:!?()[]{}""\'')
        if clean_w in skip_words:
            continue
        resolved = aliases.get(clean_w, clean_w)
        processed_words.append(resolved)
        
    return ' '.join(processed_words)

def get_headings_and_path(docs_dir, aliases, skip_words):
    data = []
    heading_regex = re.compile(rf'^(#{{1,{MAX_HEADING_LEVEL}}})\s+(.*)')

    for root, dirs, files in os.walk(docs_dir):
        # 1. FILTRE PRIORITAIRE : Supprimer de la liste tous les dossiers commençant par '_'
        dirs[:] = [d for d in dirs if not d.startswith('_')]

        for file in files:
            if file.endswith('.md'):
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, docs_dir).replace('\\', '/')
                
                if rel_path.endswith('README.md'):
                    base_path = rel_path[:-9]
                else:
                    base_path = rel_path[:-3]
                
                try:
                    with open(full_path, 'r', encoding='utf-8') as f:
                        in_code_block = False
                        code_fence_char = None
                        
                        for line in f:
                            stripped_line = line.strip()
                            
                            # Détection ouverture/fermeture bloc de code (3 ou 4 backticks ou tildes)
                            if stripped_line.startswith('```') or stripped_line.startswith('~~~~'):
                                fence = stripped_line[:4] if stripped_line.startswith('~~~~') else stripped_line[:3]
                                if not in_code_block:
                                    in_code_block = True
                                    code_fence_char = fence
                                elif code_fence_char and stripped_line.startswith(code_fence_char):
                                    in_code_block = False
                                    code_fence_char = None
                                continue
                            
                            # Ignorer le contenu des blocs de code
                            if in_code_block:
                                continue
                            
                            # Analyse des titres valides hors blocs de code
                            match = heading_regex.match(line)
                            if match:
                                raw_title = match.group(2).strip()
                                clean_title = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', raw_title)
                                clean_title = re.sub(r'[*_`]', '', clean_title)
                                
                                slug = slugify(clean_title)
                                level = len(match.group(1))
                                
                                if base_path == "":
                                    url = f"#/{slug}" if level > 1 else "#/"
                                else:
                                    url = f"#/{base_path}/" if level == 1 else f"#/{base_path}/#{slug}"
                                
                                searchable_content = normalize_text(clean_title, aliases, skip_words)
                                
                                data.append({
                                    "t": clean_title,
                                    "l": searchable_content,
                                    "u": url
                                })
                except Exception as e:
                    print(f"⚠️ Erreur de lecture sur {full_path}: {e}")
                    continue
    return data

if __name__ == "__main__":
    search_index = get_headings_and_path(DOCS_DIR, ALIASES, SKIP_WORDS)
    
    with open(OUTPUT_JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(search_index, f, ensure_ascii=False, indent=4)
        
    print(f"✅ {OUTPUT_JSON_FILE} régénéré avec succès en ignorant les dossiers en '_' et les blocs de code.")