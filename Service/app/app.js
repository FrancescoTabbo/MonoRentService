var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send({message: 'WebService RESTful'});
});

app.get('/Visualizza', function (req, res) {
    console.log("uno");
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        console.log("due");
        dbo.collection("Scooter").find({ stato: "no" }, { _id: 0, segnalazioni: 0, posizione: 1 }).toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
            console.log("tre");
            console.log(result);
            db.close();
        });
    });
});

app.post('/Segnala', function (req, res) {
    console.log("uno");
    console.log(req.body);
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        console.log("due");
        dbo.collection("Scooter").updateOne({ _id: parseInt(req.body.ID) }, { $push: {segnalazioni: { tipo: req.body.tipo, stato: "ko", data: new Date() } } }, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n});
            console.log({n: result.result.n});
            db.close();
        });
    });
});

app.post('/TakeOn', function (req, res) {
    console.log("uno");
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        var mI = { _id: parseInt(req.body.Scooter) };
        var nD = { $set: { stato: "si" } };
        dbo.collection("Scooter").updateOne(mI, nD, function(err, result) {
            console.log("due");
            if (err) throw err;
            res.send({n: result.result.n});
            console.log(result.result.n);
            db.close();
        });
    });
});

app.post('/TakeOff', function (req, res) {
    console.log("uno");
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        var I = { _id: parseInt(req.body.Scooter) };
        var N = { $set: { stato: "no" } };
        dbo.collection("Scooter").updateOne(I, N, function(err, result) {
            console.log("due");
            if (err) throw err;
            res.send({n: result.result.n});
            console.log(result.result.n);
            db.close();
        });
    });
});

app.listen(3000, function(){

});























/*app.post('/Togheter', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        dbo.collection("ScooteringT").find().sort({Id:-1}).toArray(function(err, result1) {
            if (err) {
                throw err;
            }
            var dbo1 = db.db("Mono");

            var myInfo = { IdProponente: parseInt(req.body.IdUtente), IdPartecipante: null, Id: result1[0].Id + 1, Percorso: { type: "Feature", geometry: [ { type: "LineString", coordinates: [ req.body.CoordI, req.body.CoordF ] } ] }, Data: new Date(req.body.Data) };
            dbo1.collection("ScooteringT").insertOne(myInfo, function(err, result2) {
                if (err) throw err;
                res.send({n: result2.result.n})
                db.close();
            });
        });
    });
});

app.post('/TogheterOn', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        var myInfo = { Id: parseInt(req.body.IdRichiesta) };
        var newData = { $set: { IdPartecipante: parseInt(req.body.IdUtente) } };
        dbo.collection("ScooteringT").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });
    });
});*/