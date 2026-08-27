#!/bin/bash
# Use the first argument as the commit message, or "update" by default
MESSAGE="${1:-update}"

git add -A
git commit -m "$MESSAGE"
git push