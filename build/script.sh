#!/bin/bash

ENCRYPTED_KEY_VAR="encrypted_2f5895d43ae4_key"
ENCRYPTED_IV_VAR="encrypted_2f5895d43ae4_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in build/deploy_key.enc -out build/deploy_key -d
chmod 600 build/deploy_key
eval `ssh-agent -s`
ssh-add build/deploy_key

npm install -g clean-css
npm install -g uglify-js


git clone git@github.com:devgg/devgg.git out
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"
git checkout -b gh-pages origin/gh-pages
cd ..

cp -r out/.git tmp
rm -rf out
mkdir out
cp -r tmp out/.git


rsync -av --exclude='.git' \
          --exclude='css' \
          --exclude='js' \
          --exclude='build' \
          --exclude='out' \
          --exclude='tmp' \
          --exclude='.travis.yml' \
          --exclude='.gitignore' \
          --exclude='deploy_key.enc' \
          . out/

mkdir out/css
mkdir out/js
cleancss css/main.css -o out/css/main.css
uglifyjs js/main.js -o out/js/main.js

cd out
git add -A
SHA=`git rev-parse --verify HEAD`
git commit -m "Deploy to GitHub Pages: ${SHA}"
git remote set-url origin git@github.com:devgg/devgg.git
git push origin gh-pages
