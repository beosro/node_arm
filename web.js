var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test';

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app).listen(process.env.PORT || 8080);
console.log("Listening on port " + (process.env.PORT || server.address().port));

// Routes
app.get('/node_0.10.26-1_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.26" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.10.26-1_armhf.deb');
      });
    });
  });
});

app.get('/node_0.10.28-1_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.28" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.10.28-1_armhf.deb');
      });
    });
  });
});

app.get('/node_latest_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.29" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_latest_armhf.deb');
      });
    });
  });
});
