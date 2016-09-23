#!/bin/bash

npm install -g uglify-js
npm install -g clean-css

uglifyjs js/main.js
cleancss css/main.css

STR="Hello World!"
echo $STR