sudo apt-get install ruby1.9.1-dev build-essential sqlite3 libsqlite3-dev libpq-dev git nodejs libxml2-dev libxslt1-dev
sudo mkdir /var/lib/gems
sudo chown -R $USER:$USER /var/lib/gems
sudo chown -R $USER:$USER /usr/local/bin
gem install rails
gem update
