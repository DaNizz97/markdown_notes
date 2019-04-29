var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
app.use(bodyParser.json());
app.use(cors());

app.get('/docs', function (req, res) {
    db.collection('docs').find().toArray(function (err, docs) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
});

app.get('/docs/:id', function (req, res) {
    db.collection('docs').findOne({_id: ObjectID(req.params.id)}, function (err, doc) {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        return res.send(doc);
    })
});

app.post('/docs', function (req, res) {
    db.collection('docs').insertOne(req.body, function (err, result) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        res.send(req.body)
    })
});

app.put('/docs/:id', function (req, res) {
    var obj = {$set: {"title": req.body.title, "user": req.body.user, "body": req.body.body}};
    db.collection('docs').updateOne({_id: ObjectID(req.params.id)}, obj, function (err, result) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        res.send(req.body)
    })
});

app.delete('/docs/:id', function (req, res) {
    db.collection('docs').deleteOne({_id: ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
        res.send("Ok")
    })
});

MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function (err, database) {
    if (err) {
        return console.error(err)
    }
    db = database.db('markdown-notes');
    app.listen(3000, function () {
        console.log('Server is started')
    });

});