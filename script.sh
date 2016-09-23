#!/bin/bash

npm install -g uglify-js
uglifyjs js/main.js
uglifyjs css/main.css

STR="Hello World!"
echo $STR