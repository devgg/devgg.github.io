#!/bin/bash

npm install -g clean-css
npm install -g uglify-js

rsync -av --exclude='css/' \
          --exclude='js/' \
          --exclude='.travis.yml' \
          --exclude='.gitignore' \
          --exclude='script.sh' \
          . build/

mkdir build/css
mkdir build/js
cleancss css/main.css -o build/css/main.css
uglifyjs js/main.js -o build/js/main.js

cd build
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git checkout -b gh-pages
git add .
git commit -m "Deploy to GitHub Pages: ${SHA}"

ls -LR build