#!/bin/bash

npm install -g clean-css
npm install -g uglify-js

rsync -av --exclude='css/' \
          --exclude='js/' \
          --exclude='.git/' \
          --exclude='.travis.yml' \
          --exclude='.gitignore' \
          --exclude='script.sh' \
          . build/

mkdir build/css/
mkdir build/js/
cleancss css/main.css -o build/css/main.css
uglifyjs js/main.js -o build/js/main.js

ls -LR