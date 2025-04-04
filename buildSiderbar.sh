#!/bin/bash

output_file="_sidebar.md"
output_content=() # Array to store output lines
# List of top-level folders to ignore
IGNORED_FOLDERS=("node_modules" "libs" "assets" ".git")

# Recursive function to process directories
process_directory() {
    local dir="${1%/}" # Remove trailing slash if present
    local indent="$2"
    local foldername="$(basename "$dir")"

    for ignored in "${IGNORED_FOLDERS[@]}"; do
        if [[ "$foldername" == "$ignored" ]]; then
            echo "Skipping ignored folder: $foldername"
            return 0 # Folder is in the ignore list
        fi
    done

    # Check if README.md exists
    if [[ -f "$dir/README.md" ]]; then
        output_content+=("${indent}- [$foldername](/$dir/)")
    else
        output_content+=("${indent}- *$foldername*")
        #output_content+=("${indent}- [$foldername](/_null.md)")
    fi

    # Loop through markdown files excluding README.md
    for file in "$dir"/*.md; do
        [[ -f "$file" ]] || continue
        if [[ "$(basename "$file")" != "README.md" ]]; then
            filename="$(basename "$file" .md)"
            output_content+=("${indent}  - [$filename](/$dir/$filename.md)")
        fi
    done

    # Recursively process subdirectories
    for subdir in "$dir"/*/; do
        [[ -d "$subdir" ]] || continue
        process_directory "${subdir%/}" "  $indent"
    done
} # <-- Make sure this closing brace exists!

# Start processing from all subdirectories (ignoring root)
for subdir in */; do
    [[ -d "$subdir" ]] || continue
    process_directory "${subdir%/}" ""
done

# Write all collected output to the file at once
printf "%s\n" "${output_content[@]}" > "$output_file"

echo "_sidebar.md generated successfully."
