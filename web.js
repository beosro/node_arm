var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(process.env.PORT || 9090);
console.log("Listening on port " + (process.env.PORT || "9090"));

// Routes
app.get('/node_latest_armhf.deb', function (req, res) {
  res.download(__dirname + "/files/node_0.10.20-1_armhf.deb");
});

app.get('/node_0.10.18-1_armhf.deb', function (req, res) {
  res.download(__dirname + "/files/node_0.10.18-1_armhf.deb");
});

app.get('/node_0.10.17-1_armhf.deb', function (req, res) {
  res.download(__dirname + "/files/node_0.10.17-1_armhf.deb");
});

