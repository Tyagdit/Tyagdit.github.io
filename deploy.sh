#!/bin/bash

# Stop execution at errors
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail
IFC=$'\t\n'

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

# Update themes
git submodule update --remote --merge

# Build the site using config.toml
hugo

git add -A

# Make commit message
msg="Rebuild site - $(date)"
if [ -n "$*" ]; then
	msg=$*
fi

git commit -m "$msg"

git push origin master
