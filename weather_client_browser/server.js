var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');


var app = express();
var router = express.Router();
var weather_api = "http://localhost:8000/";
var zip;

var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/server', express.static(__dirname + "/server"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

var CLIENT_ID = 'uztr55EodA0VyXnmcaBQhBlonoBzZJs2';
var CLIENT_SECRET = '0VQK7Hdr8UOkM3IIiaEDqbfGu363lxTSRBMOtS9HLOyQsdxeYh9HLIaIoE-PBjX9';

var authData = {
	client_id: CLIENT_ID,
	client_secret: CLIENT_SECRET,
	grant_type: 'client_credentials',
	audience: 'http://weather_api_endpoint'
}

function getAccessToken(req, res, next) {
	request
		.post('https://konradmgnat.eu.auth0.com/oauth/token')
		.send(authData)
		.end(function(err, res) {
			if(req.body){
				console.log("success access token granted");
				console.log(res.body.access_token);
				req.access_token = res.body.access_token;
				next();
			} else {
				res.send(401, 'Unauthorized');
			}
		})
}

app.get('/api', getAccessToken, function(req, res){
	var zip = req.query.code;
	console.log("zip code passed: " + req.query.code);
	request
		.get("http://localhost:8000/" + zip)
		.set('Authentication', 'Bearer ' + req.access_token)
		.end(function(err, data) {
			if(data.status == 403){
				res.send(403, '403 Forbidden');
			} else {
				var weather_data = data;
				res.send(weather_data.text);
			}
		})
})

app.listen(port, function(err) {
	console.log("running server on port " + port);
});

