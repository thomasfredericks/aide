import os
import json

# ============================================================
# CONFIGURATION - Same settings as build_search.py
# ============================================================
DOCS_DIR = './'
EXCLUDED_DIRS = ['_', '.', 'node_modules', '.git']
FILE_EXTENSIONS = ['.md']

# Character substitutions (replace key with value)
SUBSTITUTIONS = {
    "'": "’",          # Straight apostrophe → French curly apostrophe
}

def process_file(filepath):
    """Apply substitutions to a single file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        replacements_count = 0
        
        for old_char, new_char in SUBSTITUTIONS.items():
            count = content.count(old_char)
            if count > 0:
                content = content.replace(old_char, new_char)
                replacements_count += count
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return replacements_count
        
        return 0
    
    except Exception as e:
        print(f"⚠️ Erreur sur {filepath}: {e}")
        return 0

def walk_directory(docs_dir):
    """Scan directory same as build_search.py."""
    total_replacements = 0
    files_processed = 0
    
    # print(f"📁 Dossier cible: {os.path.abspath(docs_dir)}")
    # print(f"📄 Extensions: {', '.join(FILE_EXTENSIONS)}")
    # print(f"🚫 Exclusions: {', '.join(EXCLUDED_DIRS)}")
    # print(f"🔄 Substitutions: {len(SUBSTITUTIONS)} règles")
    # print("-" * 60)
    
    for root, dirs, files in os.walk(docs_dir):
        # Filter excluded directories (same logic as build_search.py)
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
        
        for file in files:
            if any(file.endswith(ext) for ext in FILE_EXTENSIONS):
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, docs_dir)
                
                replacements = process_file(filepath)
                
                if replacements > 0:
                    print(f"✓ {rel_path}: {replacements} remplacement(s)")
                    total_replacements += replacements
                
                files_processed += 1
    
    # print("-" * 60)
    # print(f"✅ Fichiers analysés: {files_processed}")
    print(f"✅ Frenchification : {total_replacements} remplacement(s)")

if __name__ == "__main__":
    # print("=" * 60)
    # print("SCRIPT DE SUBSTITUTION DE CARACTÈRES")
    # print("=" * 60)
    # print()
    
    # # Show what will be replaced
    # print("Règles de substitution:")
    # for old, new in SUBSTITUTIONS.items():
    #     print(f"  '{old}' → '{new}'")
    # print()
    
    walk_directory(DOCS_DIR)
    
    # print()
    # print("✅ Terminé!")