var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

// ROUTS FOR WEATHER API

var weatherRouter = express.Router();

// middleware to check for valid request 
weatherRouter.use(function(req, res, next) {
	console.log('Somethign is happening.');
	next();
});

weatherRouter.route('/weather')
	.get(function(req, res){
		var responseJson = { hello: "This is my weather api"};

		res.json(responseJson);
	});

app.use('/api', weatherRouter);


app.get('/', function( req, res) {
	res.send("welcome to my API!");
});

// BASE SETUP
/*
var mongoose = require('mongoose');
mongoose.connect('mongodb://node@novus.modulusmongo.net ....
*/

app.listen(port, function(){
	console.log('Running on PORT with gulp: ' + port);
});

