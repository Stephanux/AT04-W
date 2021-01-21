var express = require('express');
var router = express.Router();
var sensor = require("node-dht-sensor");
const MongoClient = require('mongodb').MongoClient;
let moment = require('moment');

/* GET users listing. */
router.get('/', function (req, res, next) {

    //insertion ici dans la base d données cloud mongoDB
    const uri =  global.config.mongodb.uri;;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const db = client.db("iutrt");
        let now = moment.now();
        db.collection("iot").find().toArray(function (err, result) {
            if (err) {
                throw err;
            }
            //console.log("insertion result : ", result);
            let html = '<!DOCTYPE html><html><head><title>Liste des données capteur DHT11</title></head><body><table border="1" style="border-collapse: collapse;margin-right: auto;margin-left: auto;">';
            html += '<thead><tr><th>_id</th><th>timestamp</th><th>Temperature</th><th>Humidity</th></tr></thead><tbody>';
            for (let i=0;i < result.length;i++) {
                html += '<tr><td>' + result[i]._id+'</td><td>'+ result[i].timestamp +'</td><td>'+ result[i].temp + '</td><td>' + result[i].humidity + '</td></tr>';
            }
            html += '</tbody></table>'
            res.send(html);
            client.close();
        });
    });
});

module.exports = router;