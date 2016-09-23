#!/bin/bash

npm install -g clean-css
npm install -g uglify-js

mkdir build
cd build
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git checkout -b gh-pages || git checkout --orphan gh-pages
rm -rf build/**/* || exit 0

cd ..
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

ENCRYPTED_KEY_VAR="encrypted_2f5895d43ae4_key"
ENCRYPTED_IV_VAR="encrypted_2f5895d43ae4_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

cd build
git add -A
SHA=`git rev-parse --verify HEAD`
git commit -m "Deploy to GitHub Pages: ${SHA}"
git remote set-url origin git@github.com:devgg/devgg.git
git push origin gh-pages
