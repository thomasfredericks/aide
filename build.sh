#!/bin/bash
python frenchify.py
python check_links.py
python build_index.py
python build_search.py
python build_sitemap.py