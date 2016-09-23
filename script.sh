#!/bin/bash

npm install -g uglify-js
uglifyjs js/main.js

STR="Hello World!"
echo $STR