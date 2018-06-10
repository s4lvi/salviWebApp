const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db_url = 'mongodb://localhost:27017';
var db;

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

app.get('/api/', (req, res) => res.send('Hello World!'))

app.post('/api/user/create', (req, res) => {
	 var cursor = db.collection('salvihaus').insertOne({
		 username: req.name,
		 password: req.password,
		 email: req.email,
		 createdAt: Date.now()			
	 });
	 
	  var cursor = db.collection('salvihaus').find().toArray((err, results) => {res.send(results);});

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

