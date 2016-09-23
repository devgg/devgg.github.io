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

mkdir out
cd out
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git clone git@github.com:devgg/devgg.git out
git checkout -b gh-pages || git checkout --orphan gh-pages

cp -r out/.git tmp
rm -rf out/**/* || exit 0
mkdir out
cp -r tmp out/.git

cd ..
rsync -av --exclude='.git' \
          --exclude='css' \
          --exclude='js' \
          --exclude='build' \
          --exclude='.travis.yml' \
          --exclude='.gitignore' \
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
