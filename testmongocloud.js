
const MongoClient = require('mongodb').MongoClient;
let moment = require('moment');
const uri = "mongodb+srv://steph:AzertyUiop@eismall.ggblm.mongodb.net/iutrt?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const db = client.db("iutrt");
    // perform actions on the "db" object (database iutrt in cloud.mongodb.com)
    //console.log(" collection: ", collection)
    db.collection("countries").find().toArray(function (err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        console.log("=> Tentative d'insertion : ");
        let now = moment.now();
        db.collection("iot").insertOne({ timestamp: now, temp: "18.5", humidity: "49" }, function (err, result) {
            if (err) {
                throw err;
            }
            console.log("insertion result : ", result);
            client.close();
        });
    });
});
