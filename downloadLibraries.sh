#!/bin/bash

# Directory to store downloaded JS files
LIB_DIR="libs"

# File containing JS library URLs
LIB_FILE="libraries.txt"

# Create directory if not exists
mkdir -p "$LIB_DIR"

# Read each URL from the file and download it
while IFS= read -r url || [[ -n "$url" ]]; do
  url=$(echo "$url" | tr -d '\r')  # Remove Windows-style line breaks

  if [[ ! -z "$url" ]]; then
    filename=$(basename "$url")
    echo "Downloading $url..."
    curl -L -o "$LIB_DIR/$filename" "$url" || echo "Failed to download: $url"
    echo "Saved as $LIB_DIR/$filename"
  fi
done < "$LIB_FILE"


echo "All files downloaded!"
