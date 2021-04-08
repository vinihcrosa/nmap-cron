#!/bin/bash

# Define a timestamp function
timestamp=$( date +%d-%m-%y_%H:%M_%N )

FILE_NAME="nmap_"$timestamp

nmap -oX $FILE_NAME.xml $1

xml-js $FILE_NAME.xml --no-doctype --no-decl --no-inst --no-comment --compact --spaces 4 --out $FILE_NAME.json

rm -rf $FILE_NAME.xml

mv $FILE_NAME.json ./src/results

node src/testes.js $FILE_NAME.json