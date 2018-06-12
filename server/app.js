const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

var db_url = 'mongodb://localhost:27017';
var db;
var bcrypt = require('bcrypt');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.setHeader('Access-Control-Allow-Origin', 'http://salviha.us');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/', (req, res) => res.send('Hello World!'))

app.get('/api/users/', (req, res) => {
	  var cursor = db.collection('users').find().toArray((err, results) => {res.send(results);});
});

app.post('/api/users/create', (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
    	db.collection('users').count({username: req.body.username}, function(err, count) {
	    	if (count == 0) {
	        	var cursor = db.collection('users').insertOne({
	        		username: req.body.username,
	    		 	password: hash,
	    		 	email: req.body.email,
	    		 	createdAt: Date.now()			
	        	});
	        	res.status(200).send(JSON.stringify({body: "User created"}));
	    	} else {
	        	res.status(409).send(JSON.stringify({body: "Username already exists"}));
	    	}
    	});
    });
});


MongoClient.connect(db_url, (err, client) => {
	  if (err) return console.log(err);
	  db = client.db('salvihaus');
	  db.createCollection("users", {
		  capped: false,
		  autoIndexId: true
	  });
	  app.listen(3000, () => console.log('Example app listening on port 3000!'))
})


exports.comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return err == null ?
           callback(null, isPasswordMatch) :
           callback(err);
   });
};

