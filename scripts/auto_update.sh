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
  url=http://nodejs.org/dist/latest/node-
  version=$(node getpage.js)
  url+=$version.tar.gz
  wget $url -O ./node/node.source.tar.gz

  # change into the node directory and untar
  cd ./node
  tar -xvzf node.source.tar.gz
  rm node.source.tar.gz

  # Configure and make the file
  cd ./node-$version
  ./configure
  make

  # Install and make a package
  sudo checkinstall -D -pkgversion ${version#?} -y
  # Move the package do the files directory
  cp node_${version#?}-1_armhf.deb ../../../files
  
  # Remove the compilation directories
  cd ../../../
  sudo rm -rf ./scripts/node/node-$version

  # Commit and push all the files
  git add .
  git commit -m "Updated node version to $version"
  git push origin master
  git push heroku master

  # Rename the new changelog to the old one
  cd ./scripts/
  mv ./new-log.html changelog.html 
fi