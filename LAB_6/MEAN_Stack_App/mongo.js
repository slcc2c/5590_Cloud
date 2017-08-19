
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();

var url='mongodb://slcc2c:test@ds021333.mlab.com:21333/aplwbdemo';//1.Modify this url with the credentials of your db name and password.
var ObjectID = require('mongodb').ObjectID;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/create', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});

app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }

        db.collection('students').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }else
            {

                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");

        });
    });

});

app.get('/delete/:toBeDeleted_id', function (req, res) {
    // 2.Connect to MongoDB . Handle the error and write the logic for deleting the desired book
    MongoClient.connect(url, function(err, db) {
        if(err){
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var del = new ObjectID(req.params.toBeDeleted_id)
        db.collection('students').remove(del, function (err, result) {
            if(err)
            {
                res.write("delete Failed");
                res.end();
            }
            else{
                res.send(JSON.stringify(result));
            }
        });
    });
});


app.get('/update/:toBeUpdated_id', function (req, res) {
    //3.connect to MongoDB. Handle the error and write the logic for updating the selected field
    MongoClient.connect(url, function(err, db) {
        if(err){
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var update = new ObjectID(req.params.toBeUpdated_id)
        db.collection('students').update(update, function (err, result) {
            if(err)
            {
                res.write("update Failed");
                res.end();
            }
            else{
                res.send(JSON.stringify(result));
            }
        });
    });
});


var insertDocument = function(db, data, callback) {
    db.collection('students').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the students collection.");
        callback();
    });
};

var server = app.listen(8881, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});