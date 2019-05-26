var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send({message: 'WebService RESTful'});
});

app.post('/login', function(req, res){
    var conn = mysql.createConnection({
        host: "remotemysql.com",
        user: "JPQ7c5oklq",
        password: "g4JgzatqTc",
        database: "JPQ7c5oklq"
    });
    var nickname = req.body.nickname;
    var password = req.body.password;

    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        conn.query("SELECT * FROM User WHERE user = " + nickname + " AND password =" + password ,function(errr, fields){
            if (errr) throw errr;
            res.send(fields);
        });
    });
});

app.post('/register', function(req, res){
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
        if (err) throw err;
        console.log("Connected!");
        conn.query("INSERT INTO User(nome, cognome, email, password, user, indirizzo, telefono) VALUES( '" + nome +"', '" + cognome + "', '" + email + "', '" + password + "', '" + nickname + "', '" + indirizzo + "' + '" + telefono + "'"  ,function(errr, fields){
            if (errr) throw errr;
            res.send(fields);
        });
    });
});
