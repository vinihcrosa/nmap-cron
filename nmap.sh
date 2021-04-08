#!/bin/bash

# Define a timestamp function
timestamp=$( date +%d-%m-%y_%H:%M_%N )

FILE_NAME="nmap_"$timestamp

nmap -oX $FILE_NAME.xml $1

xml-js $FILE_NAME.xml --no-doctype --compact --spaces 4 --out $FILE_NAME.json

rm -rf $FILE_NAME.xml

node testes.js $FILE_NAME.json