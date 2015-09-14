node_arm (Raspbian Wheezy)
==========================
# GCC v4.8 or Higher is required
Option 1 (install the newer version):
```
sudo apt-get update
sudo apt-get install gcc-4.8 g++-4.8
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.6 20
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.6 20
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50
```

Options 2 (upgrade 2 Jessie):
```
Replace all instances of "wheezy" in /etc/apt/sources.list
sudo apt-get update
sudo apt-get dist-upgrade
```

### Migration from Heroku
Heroku is starting to make free tier apps have mandatory downtime for 6 hours a day so I'm migrating over to redhat openshift.
Here's the current URL for that.
http://nodearm-nathanjohnson320.rhcloud.com/

### Add as debian repository
```
echo "deb http://node-arm.herokuapp.com/ /" | sudo tee --append /etc/apt/sources.list
sudo apt-get update
sudo apt-get install node
node -v
```


### Installing node for ARM (Tested on Raspberry Pi Model B)
```
wget http://node-arm.herokuapp.com/node_latest_armhf.deb
sudo dpkg -i node_latest_armhf.deb
# Check installation
node -v

# Unstable version is available at node_latest_unstable_armhf.deb
```

This will install node.js version 0.12.6
Other versions are available:
- node_latest_unstable_armhf.deb
- node_archive_armhf.deb <- Will install 0.12.6
- node_0.10.36-1_armhf.deb

Just replace "node_latest_armhf.deb" with one of these names.

### License

Copyright (c) 2014, Nathaniel Johnson
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
