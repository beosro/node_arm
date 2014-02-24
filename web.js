var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(process.env.PORT || 9090);
console.log("Listening on port " + (process.env.PORT || "9090"));

function insert_ip(ip, type) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(er, collection) {
      collection.insert({ "ip":ip, "type":type }, {safe: true}, function(er,rs) {});
    });
  });
};

var address;
// Routes
app.get('/node_0.10.24-1_armhf.deb', function (req, res) {
  insert_ip(req.connection.remoteAddress, 0);
  res.download(__dirname + '/files/node_0.10.24-1_armhf.deb');
});
app.get('/node_0.10.25-1_armhf.deb', function (req, res) {
  insert_ip(req.connection.remoteAddress, 1);
  res.download(__dirname + '/files/node_0.10.25-1_armhf.deb');
});
app.get('/node_latest_armhf.deb', function (req, res) {
  insert_ip(req.connection.remoteAddress, 2);
  res.download(__dirname + '/files/node_0.10.26-1_armhf.deb');
});
