var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test';

router.get('/', function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      var map = function() { emit("downloads", this.downloads); };
      var reduce = function(key, values) {
        var i, sum = 0;
        for (i in values) {
          sum += values[i];
        }
        return sum;
      };
      collection.mapReduce(map, reduce, {out : {inline: 1}}, function(err, results) {
        collection.find().sort({"version": -1}).toArray(function(err, rs) {
          var total = results.length > 0 ? results[0].value : "Over 9,000";
          res.render('index', { title: 'node-arm', total: total, versions: rs });
        });
      });
    });
  });

});

router.get('/node_0.10.35_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.35" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err, rs){
        res.download(__dirname + '/files/node_0.10.35-1_armhf.deb');
      });
    });
  });
});

router.get('/node_0.10.36_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.36" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.10.36-1_armhf.deb');
      });
    });
  });
});

router.get('/node_latest_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.12.1" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.12.1-1_armhf.deb', 'node_latest_armhf.deb');
      });
    });
  });
});

router.get('/node_latest_unstable_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.0.1" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.11.16-1_armhf.deb', 'node_latest_unstable_armhf.deb');
      });
    });
  });
});



module.exports = router;
