from pathlib import Path

BASE_DIR = Path(".").resolve()

def is_ignored(path: Path) -> bool:
    """Checks if any part of the path starts with '_' or '.'."""
    return any(part.startswith("_") or part.startswith(".") for part in path.parts)

def extract_title(file_path: Path) -> str:
    """Extracts the first H1 (# ) title from a markdown file. 
    Falls back to a formatted filename/folder name if none is found."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith('# '):
                    return line[2:].strip()
    except Exception:
        pass
    
    if file_path.name.lower() == "readme.md":
        return file_path.parent.name.replace('-', ' ').title()
    return file_path.stem.replace('-', ' ').title()

def get_file_link(rel_path: Path) -> str:
    """Converts a relative markdown path into an absolute-style Docsify link."""
    if rel_path.name.lower() == "readme.md":
        if len(rel_path.parts) == 1:
            return "/"
        parent_rel = rel_path.parent.as_posix()
        return f"/{parent_rel}/"
    else:
        # Strip the .md extension and format as absolute path
        no_ext = rel_path.with_suffix('')
        return f"/{no_ext.as_posix()}"

def process_dir(dir_path: Path, depth: int = 0) -> list:
    """Recursively processes directories and files to build a strict folder hierarchy."""
    lines = []
    indent = '  ' * depth
    
    # Check for README.md in the current directory
    readme_path = None
    for p in dir_path.iterdir():
        if p.is_file() and p.name.lower() == "readme.md":
            readme_path = p
            break
            
    # If this is a subdirectory (not BASE_DIR), print its folder entry or README title/link
    if dir_path != BASE_DIR:
        rel_dir = dir_path.relative_to(BASE_DIR)
        if is_ignored(rel_dir):
            return []
            
        if readme_path:
            title = extract_title(readme_path)
            link = get_file_link(readme_path.relative_to(BASE_DIR))
            lines.append(f"{indent}* [{title}]({link})")
        else:
            folder_title = dir_path.name.replace('-', ' ').title()
            lines.append(f"{indent}* {folder_title}")
        
        child_depth = depth + 1
    else:
        child_depth = depth

    # Fetch and sort children (subdirectories first, then files alphabetically)
    try:
        children = sorted(dir_path.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower()))
    except PermissionError:
        return lines

    for child in children:
        rel_path = child.relative_to(BASE_DIR)
        
        # Skip ignored files/folders (starting with _ or .)
        if is_ignored(rel_path):
            continue
            
        # Skip standalone files located directly in the root directory
        if child.is_file() and len(rel_path.parts) == 1:
            continue
            
        # Skip the output index file itself
        if rel_path == Path("_index/README.md"):
            continue

        if child.is_dir():
            # Recursively process subdirectories
            lines.extend(process_dir(child, child_depth))
        elif child.is_file():
            # Skip README.md if it was already used as the folder title entry above
            if child.name.lower() == "readme.md":
                continue
                
            # Process other markdown files
            if child.suffix.lower() == ".md":
                title = extract_title(child)
                link = get_file_link(rel_path)
                child_indent = '  ' * child_depth
                lines.append(f"{child_indent}* [{title}]({link})")

    return lines

def generate_index() -> str:
    """Triggers the recursive directory scan starting from the project root."""
    return '\n'.join(process_dir(BASE_DIR))

def update_index_file():
    """Locates or creates _index/README.md, ensures # Index title and tags exist, then updates content."""
    target_path = BASE_DIR / '_index' / 'README.md'
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    new_index_content = generate_index()
    
    if not target_path.exists():
        initial_content = "# Index\n\n<!-- INDEX START -->\n<!-- INDEX END -->"
        target_path.write_text(initial_content, encoding='utf-8')
        
    content = target_path.read_text(encoding='utf-8')
    
    start_tag = '<!-- INDEX START -->'
    end_tag = '<!-- INDEX END -->'
    
    if start_tag not in content or end_tag not in content:
        content = f"# Index\n\n{start_tag}\n{end_tag}"
    
    if not content.lstrip().startswith("# Index"):
        content = f"# Index\n\n{content}"
        
    start_idx = content.find(start_tag) + len(start_tag)
    end_idx = content.find(end_tag)
    
    new_file_content = content[:start_idx] + '\n' + new_index_content + '\n' + content[end_idx:]
    
    target_path.write_text(new_file_content, encoding='utf-8')
    print("Success: _index/README.md has been successfully updated with absolute links and hierarchy!")

if __name__ == '__main__':
    update_index_file()