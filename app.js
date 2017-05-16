var express = require('express');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');
var app = express();

var port = process.env.PORT || 3000;

// ROUTES FOR WEATHER API

var weatherRouter = express.Router();

var weather = require('./weather.js')(app);

// var jwtCheck = jwt({
// 	secret: rsaValidation(),
// 	algorithms: ['RS256'],
// 	issuer: "https://konradmgnat.authO.com/",
// 	audience: 'http://weather_api_endpoint'
// });

// app.use(jwtCheck);

// var guard = function(req, res, next) {
// 	//check scope, general, client etc.
// }

// weatherRouter.route('/weather')
// 	.get(function(req, res){
// 		var responseJson = { hello: "This is my weather api"};

// 		res.json(responseJson);
// 	});

app.use('/api', weatherRouter);


// app.get('/', function(err, req, res) {
// 	if (err.name === 'UnauthorizedError') {
// 		res.status(401).json({message:'Missing or invalid token'});
// 	} else {
// 		var responseJsonp = { hello: "This is first page"};
// 		res.jsonp(responseJsonp);

// 	}
// });

app.listen(port, function(){
	console.log('Running on PORT with gulp: ' + port);
});

