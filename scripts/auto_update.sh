#!/bin/bash

# Get the changelog
wget http://nodejs.org/changelog.html -O new-log.html

# Assign the two starting files to diff
file1='./changelog.html'
file2='./new-log.html'

# Check if the files are different
if diff $file1 $file2;
then
  echo "$file1 and $file2 are the same file"
else
  # If they are different print a message
  echo "$file1 and $file2 differ"

  # Get the most recent version of node
  url=http://nodejs.org/dist/latest/
  url+="abc"
  wget $url

  # Rename the new changelog to the old one
  mv ./new-log.html changelog.html 
fi