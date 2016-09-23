#!/usr/bin/env ruby

require 'uglifier'

Uglifier.compile(File.read("js/main.js"))