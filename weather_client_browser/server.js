var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

// create the express app
var app = express();
var router = express.Router();
var weather_api = "http://localhost:8000/";
var zip;

// set the view engine to use EJS and set default views directory
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views');

// tell express which directory to serve static assets like css, images, etc.
app.use(express.static(__dirname + '/public'));
app.use('\node_modules', express.static(__dirname + "/server"));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

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

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send_zip', function(req, res) {
	console.log("-"+req.body.zip_input + "-");
	zip = req.body.zip_input;

	  request.get("http://localhost:8000/" + zip, {json: true}, function(err, res, body) {
	      if (!err && res.statusCode === 200) {
	      	console.log(body);
	      }
	  }).pipe(res);
})

// set weather website to listen on port 3000
app.listen(3000);
console.log("running on port 3000");

