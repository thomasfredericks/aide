#!/bin/bash
python build_frenchify.py && \
python build_check_links.py && \
python build_index.py && \
python build_search.py && \
python build_sitemap.py