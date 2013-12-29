#!/bin/bash

# Get the changelog
wget http://nodejs.org/changelog.html -O new-log.html

# Assign the two starting files to diff
cd /home/pi/node_arm/scripts
file1='./changelog.html'
file2='./new-log.html'
appfile='web.js'

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

  # Remove the last 11 lines from web.js
  head -n -9 web.js > tmp.js
  mv tmp.js web.js

  # Delete the oldest package
  cd files
  ls | sort | head -1 | xargs git rm

  # Replace existing routes in web.js
  FILES=*
  count=0
  for f in $FILES
  do
    count=$(($count + 1))
    if [[ "$count" -gt 2 ]]
    then
      # Write the specific routes for versions
      echo "app.get('/node_latest_armhf.deb', function (req, res) {" >> ../$appfile

    else
      # Write the route for the newest package
      echo "app.get('/$f', function (req, res) {" >> ../web.js >> ../$appfile
    fi
    echo "  res.download(__dirname + '/files/$f');" >> ../$appfile
    echo "});" >> ../$appfile
  done

  # Commit and push all the files
  cd ../
  git add .
  git commit -m "Updated node version to $version"
#  git push origin master
#  git push heroku master

  # Rename the new changelog to the old one
  cd ./scripts/
  mv ./new-log.html changelog.html 
fi