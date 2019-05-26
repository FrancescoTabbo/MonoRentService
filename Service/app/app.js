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

app.post('/login', function(req, res){
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "JPQ7c5oklq",
        password: "g4JgzatqTc",
        database: "JPQ7c5oklq"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;

    conn.connect(function(err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("SELECT * FROM User WHERE user = " + nickname + " AND password =" + password ,function(errr, fields){
            if (errr) throw errr;
            console.log("tre");
            res.send(fields);
        });
    });
});

app.post('/register', function(req, res){
    console.log("uno");
    console.log(req.body);
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "JPQ7c5oklq",
        password: "g4JgzatqTc",
        database: "JPQ7c5oklq"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;
    var nome =req.body.name;
    var cognome =req.body.cognome;
    var email =req.body.email;
    var indirizzo =req.body.indirizzo;
    var telefono =req.body.telefono;

    conn.connect(function(err) {
        console.log("due");
        if (err) throw err;
        console.log("Connected!");
        conn.query("INSERT INTO User(nome, cognome, email, password, user, indirizzo, telefono) VALUES( '" + nome +"', '" + cognome + "', '" + email + "', '" + password + "', '" + nickname + "', '" + indirizzo + "' + '" + telefono + "'"  ,function(errr, fields){
            if (errr) throw errr;
            console.log("tre");
            res.send(fields);
        });
    });
});

app.get('/Visualizza', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        dbo.collection("Scooter").find({ Stato: "no" }, { _id: 0, Segnalazioni: 0, Credenziali: 0 }).toArray(function(err, result) {
            if (err) {
                throw err;
            }
            res.send(result);
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
        var myInfo = { ID: parseInt(req.body.ID) };
        var newData = { $push: {Segnalazioni: { Tipo: req.body.tipo, Stato: "ko", Data: new Date() } } } ;
        dbo.collection("Scooter").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });
    });
});

app.post('/TakeOn', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        var myInfo = { ID: parseInt(req.body.Scooter) };
        var newData = { $set: { Stato: "si" } };
        dbo.collection("Scooter").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });
    });
});

app.post('/TakeOff', function (req, res) {
    MongoClient.connect('mongodb+srv://admin:Admin1234@francesco-i5qce.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}', function(err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("Mono");
        var myInfo = { ID: parseInt(req.body.Scooter) };
        var newData = { $set: { Stato: "no" } };
        dbo.collection("Scooter").updateOne(myInfo, newData, function(err, result) {
            if (err) throw err;
            res.send({n: result.result.n})
            db.close();
        });
    });
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
});