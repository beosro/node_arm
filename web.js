var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(process.env.PORT || 9090);
console.log("Listening on port " + (process.env.PORT || "9090"));

// Routes
app.get('/node_0.10.23-1_armhf.deb', function (req, res) {
  res.download(__dirname + '/files/node_0.10.23-1_armhf.deb');
});
app.get('/node_0.10.24-1_armhf.deb', function (req, res) {
  res.download(__dirname + '/files/node_0.10.24-1_armhf.deb');
});
app.get('/node_latest_armhf.deb', function (req, res) {
  res.download(__dirname + '/files/node_0.10.25-1_armhf.deb');
});
