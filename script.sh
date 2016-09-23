#!/bin/bash

gem install uglifier
ruby build.rb

STR="Hello World!"
echo $STR