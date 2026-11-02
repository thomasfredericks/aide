#!/usr/bin/env python3
"""
Recursively scan a docsify site directory to generate a nested sitemap.json
tree suitable for building breadcrumb menus.

Rules:
- Ignores files in the root directory.
- Ignores folders starting with '_'.
- For each valid folder:
  - If it contains README.md: extract title from the first H1 (# Title),
    set readme=true. Falls back to a prettified folder name if no H1 found.
  - If no README.md: use the prettified folder name as title, set readme=false.
- `path` is RELATIVE: just the folder name (no leading slash, no ancestors).
  Children carry their own name; the full route is reconstructed by joining
  the names along the branch.
- Output is a nested tree: each node holds its own `children` array.
"""

import os
import json
import argparse
from pathlib import Path
from typing import Optional


def prettify(name: str) -> str:
    """Turn 'conception-sonore' / 'conception_sonore' into 'Conception Sonore'."""
    return name.replace('-', ' ').replace('_', ' ').title()


def extract_title_from_readme(readme_path: Path) -> Optional[str]:
    """Extract the first H1 heading (# Title) from a README.md file."""
    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            for line in f:
                stripped = line.strip()
                if stripped.startswith('# '):
                    return stripped[2:].strip()
    except Exception as e:
        print(f"Warning: could not read {readme_path}: {e}")
    return None


def scan_folder(folder: Path) -> dict:
    """Build a sitemap node for a single folder (recursing into children)."""
    readme_path = folder / "README.md"

    if readme_path.exists():
        title = extract_title_from_readme(readme_path) or prettify(folder.name)
        readme = True
    else:
        title = prettify(folder.name)
        readme = False

    children = []
    for item in sorted(folder.iterdir()):
        if item.is_dir() and not item.name.startswith('_') and not item.name.startswith('.'):
            children.append(scan_folder(item))

    return {
        "title": title,
        "path": folder.name,
        "readme": readme,
        "children": children,
    }


def generate_sitemap(root_dir: str) -> list:
    """Scan the root directory and return a list of top-level nodes."""
    root_path = Path(root_dir)
    if not root_path.exists():
        raise FileNotFoundError(f"Directory not found: {root_dir}")

    tree = []
    for item in sorted(root_path.iterdir()):
        if item.is_dir() and not item.name.startswith('_') and not item.name.startswith('.') :
            tree.append(scan_folder(item))
    return tree


def find_trail(tree: list, target: str) -> Optional[list]:
    """
    Return the breadcrumb trail (list of nodes, root -> target) for a target.

    `target` is a relative route such as "creation/audio/conception" or
    "/creation/audio/conception/". Trailing/leading slashes are ignored.
    """
    parts = [p for p in target.split('/') if p]

    def walk(nodes: list, depth: int, trail: list):
        for node in nodes:
            current = trail + [node]
            if depth == len(parts) - 1 and node["path"] == parts[depth]:
                return current
            if depth < len(parts) - 1 and node["path"] == parts[depth]:
                found = walk(node.get("children", []), depth + 1, current)
                if found:
                    return found
        return None

    return walk(tree, 0, []) if parts else None


def main():
    default_root = "docs" if os.path.isdir("docs") else "."

    parser = argparse.ArgumentParser(
        description="Generate a nested sitemap.json for a docsify site"
    )
    parser.add_argument(
        "root_dir", nargs="?", default=default_root,
        help=f"Root directory of the docsify site (default: {default_root})"
    )
    parser.add_argument(
        "-o", "--output", default="sitemap.json",
        help="Output filename (default: sitemap.json)"
    )
    args = parser.parse_args()

    tree = generate_sitemap(args.root_dir)

    with open(args.output, 'w', encoding='utf-8') as f:
        json.dump(tree, f, indent=2, ensure_ascii=False)

    def count(nodes):
        return sum(1 + count(n.get("children", [])) for n in nodes)

    print("Sitemap generated successfully.")
    print(f"Top-level sections: {len(tree)}")
    print(f"Total folders: {count(tree)}")
    print(f"Written to: {args.output}")


if __name__ == "__main__":
    main()
