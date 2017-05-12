var express = require('express');
// var request = require('superagent');

// create the express app
var app = express();
var router = express.Router();

// set the view engine to use EJS and set default views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// tell express which directory to serve static assets like css, images, etc.
app.use(express.static(__dirname + '/public'));

// client id and secret from AuthoO Client
// var NON_INTERACTIVE_CLIENT_ID = '';
// var NON_INTERACTIVE_CLIENT_SECRET = '';

// define object to use to exchange credentials for access token.
// var authData = {
// 	client_id: 	NON_INTERACTIVE_CLIENT_ID,
// 	client_secret: NON_INTERACTIVE_CLIENT_SECRET,
// 	grant_type: 'client_credentials',
// 	audience: ''
// }

// render the homepage 
app.get('/', function(req, res){
	res.render('index');
});


// app.get('/getWeather', function(req, res)
// 	.get('http://localhost:8000')
// 	.end(function(err, data) {
// 		if (data.status == 403) {
// 			res.send(403, '403 forbidden');
// 		} else {
// 			var weather = data.body;
// 			res.send(weather);
// 		}
// 	})

// set weather website to listen on port 3000
app.listen(3000);
console.log("running on port 3000");

