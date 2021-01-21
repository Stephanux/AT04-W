var express = require('express');
var router = express.Router();
var sensor = require("node-dht-sensor");
const MongoClient = require('mongodb').MongoClient;
let moment = require('moment');

/* GET users listing. */
router.get('/', function (req, res, next) {

    sensor.read(11, 4, function (err, temperature, humidity) {
        if (!err) {
            console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
            //insertion ici dans la base d données cloud mongoDB
            const uri = "mongodb+srv://steph:AzertyUiop@eismall.ggblm.mongodb.net/iutrt?retryWrites=true&w=majority";
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                const db = client.db("iutrt");
                let now = moment.now();
                db.collection("iot").insertOne({ timestamp: now, temp: temperature, humidity: humidity }, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    //console.log("insertion result : ", result);
                    res.contentType('application/json');
                    res.send(result.ops);
                    client.close();
                });
            });
        }
    });
});

module.exports = router;