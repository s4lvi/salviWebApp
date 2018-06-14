const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

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

app.get('/api/', (req, res) => res.send('Hello World!'));

app.post('/api/login/', (req, res) => {
	var cursor = db.collection('users').find({username: req.body.username}).toArray((err, data) => {
		if (data[0] != null) {
			 bcrypt.compare(req.body.password, data[0].password, function(err, isPasswordMatch) {   
			       if (isPasswordMatch) {
			    	   var token = Math.random().toString(36).substr(2) ;
			    	   db.collection('users').updateOne({username: req.body.username}, { $set : {lastLogin: Date.now(), token: token}}, function(err2, res2) {
				    	   res.status(200).send(JSON.stringify({token: token}));
			    	   });
			       }
			 });
			
		} else {
			res.status(404).send();
		}
	});
});

app.post('/api/login/check', (req, res) => {
	var cursor = db.collection('users').find({username: req.body.username}).toArray((err, data) => {
		if (data[0] != null) {
			if (data[0].token == req.body.token) {
				res.status(200).send();
			}
		} else {
			res.status(404).send();
		}
	});
});

/*
 * USERS
 */
app.get('/api/users/', (req, res) => {
	  var cursor = db.collection('users').find().toArray((err, results) => {
		  users = [];
	  	  for (var r in results) {
	  		  users.push({
	  			id: results[r]._id,
	  			username: results[r].username,
	  			email: results[r].email,
	  			createdAt: results[r].createdAt
	  		  });
	  	  }
		  res.send(JSON.stringify(users));
	  });
});

app.delete('/api/users/:id', (req, res, next) => {
	db.collection('users').find({_id: req.params.id}, function(err, obj) {
    	if (!err) {
        	var cursor = db.collection('users').deleteOne({
        		_id: mongoose.mongo.ObjectId(req.params.id)
        	}, function(err2, obj) {
        		if (err2) res.status(200).send(JSON.stringify({body: err2}));
            	res.status(200).send(JSON.stringify({body: "User deleted"}));
        	});
    	} else {
        	res.status(404).send(JSON.stringify({body: "User not found"}));
    	}
	});
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



/*
 * MESSAGES
 */
app.get('/api/messages/', (req, res) => {
	  var cursor = db.collection('messages').find().sort( { createdAt: 1 } ).toArray((err, results) => {
		  messages = [];
	  	  for (var r in results) {
	  		  messages.push({
	  			id: results[r]._id,
	  			messageType: results[r].messageType,
	  			message: results[r].message,
	  			createdAt: results[r].createdAt
	  		  });
	  	  }
		  res.send(JSON.stringify(messages));
	  });
});

app.post('/api/messages/', (req, res) => {
	var cursor = db.collection('messages').insertOne({
		messageType: 'user',
		message: req.body.message,
	 	createdAt: Date.now()			
	});
	res.status(200).send(JSON.stringify({body: 'added'}));
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

