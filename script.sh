#!/bin/bash

npm install -g clean-css
npm install -g uglify-js

rsync -av --exclude='css/' --exclude='js/' . build/

cleancss css/main.css -o build/css/main.css
uglifyjs js/main.js -o build/js/main.js

STR="Hello World!"
echo $STR