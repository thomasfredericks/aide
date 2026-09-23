import os
import re
import json
import unicodedata

# --- Configuration ---
DOCS_DIR = './'
OUTPUT_JSON_FILE = os.path.join(DOCS_DIR, 'search_index.json')
MAX_HEADING_LEVEL = 2  # 1 = juste les # (H1), 2 = H1 et ## (H2), 3 = jusqu'aux H3, etc.

def slugify(text):
    text = text.lower()
    text = ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    return text

def get_headings_and_path(docs_dir):
    data = []
    # Création dynamique de la regex selon le niveau max choisi (ex: #{1,1} ou #{1,2})
    heading_regex = re.compile(rf'^(#{{1,{MAX_HEADING_LEVEL}}})\s+(.*)')

    for root, dirs, files in os.walk(docs_dir):
        if os.path.abspath(root) == os.path.abspath(docs_dir):
            continue 
            
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
                        for line in f:
                            match = heading_regex.match(line)
                            if match:
                                raw_title = match.group(2).strip()
                                clean_title = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', raw_title)
                                clean_title = re.sub(r'[*_`]', '', clean_title)
                                
                                slug = slugify(clean_title)
                                level = len(match.group(1))
                                
                                # URL construction
                                if base_path == "":
                                    url = f"#/{slug}" if level > 1 else "#/"
                                else:
                                    url = f"#/{base_path}/" if level == 1 else f"#/{base_path}/#{slug}"
                                
                                data.append({
                                    "t": clean_title,
                                    "l": clean_title.lower(),
                                    "u": url
                                })
                except Exception:
                    continue
    return data

if __name__ == "__main__":
    search_index = get_headings_and_path(DOCS_DIR)
    
    with open(OUTPUT_JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(search_index, f, ensure_ascii=False, separators=(',', ':'))
        
    print(f"✅ {OUTPUT_JSON_FILE} généré avec succès (Niveau max de titre : {MAX_HEADING_LEVEL}).")