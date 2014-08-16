var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/test';

router.get('/', function(req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      var map = function() { emit("downloads", this.downloads); }
      var reduce = function(key, values) {
        var i, sum = 0;
        for (i in values) {
          sum += values[i];
        }
        return sum;
      }
      collection.mapReduce(map, reduce, {out : {inline: 1}}, function(err, results) {
        collection.find().sort({"version": -1}).toArray(function(err, rs) {
          var total = results.length > 0 ? results[0].value : "Over 9,000";
          var dl_1 =  rs.length > 0 ? rs[0].downloads : "Over 9,000";
          var dl_2 =  rs.length > 1 ? rs[1].downloads : "Over 9,000";
          var dl_3 =  rs.length > 2 ? rs[2].downloads : "Over 9,000";
          res.render('index', { title: 'node-arm', total: total, download_count_1: dl_1, download_count_2: dl_2, download_count_3: dl_3 });
        });
      });
    });
  });

});

router.get('/node_0.10.28_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.28" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err, rs){
        res.download(__dirname + '/files/node_0.10.28-1_armhf.deb');
      });
    });
  });
});

router.get('/node_0.10.29_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.29" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.10.29-1_armhf.deb');
      });
    });
  });
});

router.get('/node_latest_armhf.deb', function (req, res) {
  mongo.Db.connect(mongoUri, function (err, db) {
    db.collection('downloads', function(err, collection) {
      collection.update({ "version": "0.10.30" }, { $inc: { "downloads": 1 } }, { upsert: true }, function(err,rs) {
        res.download(__dirname + '/files/node_0.10.30-1_armhf.deb', 'node_latest_armhf.deb');
      });
    });
  });
});

module.exports = router;
