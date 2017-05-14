var _ = require('lodash');
var request = require('request');
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1');

client.on('connect', function() {
	console.log('redis connected');
});

var WU_API_URL = 'http://api.wunderground.com/api/29698e56c84c01fa/forecast/q/';

module.exports = function(app) {

	_weather = [];


	app.get('/:zipcode', function( req, res) {
		var zip = req.params.zipcode +'.json?callback=your_js_callback_function';

		client.get(WU_API_URL + zip, function(error, w_data) {
			if (error) {
				throw error;
			} if (w_data) {
				// res.jsonp(JSON.parse(w_data));
				callback(null, JSON.parse(w_data));
				console.log("got data from Cache!!!");
			} else { 
				request(WU_API_URL + zip, function(error, response, body) {
					if (!error && response.statusCode === 200) {
						console.log(body);
						res.jsonp(body);
						client.set(WU_API_URL + zip, JSON.stringify(body), function(error) {
							if (error) {throw eorror;};
						});
					} else {
						res.jsonp(error);
					}
				});				
			}
		}



		// var responseJsonp = { hello: "This is first page zip: " + zip + " yay!"};
		// res.jsonp(responseJsonp);
	});

}
// app.get('/getWeather/:zipcode', function(req, res) {
// 	request(WU_API_URL + API_KEY, function(err, body) {
// 		res.json(body);
// 	})
// })