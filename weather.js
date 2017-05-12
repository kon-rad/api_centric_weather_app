var _ = require('lodash');
var request = require('request');

var WU_API_URL = 'http://api.wunderground.com/api/29698e56c84c01fa/forecast/q/CA/San_Francisco.json';

module.exports = function(app) {

	_weather = [];

	app.get('/:zipcode', function( req, res) {
		var zip = req.params.zipcode;
		request(WU_API_URL, function(error, response, body) {
			if (!error && response.statusCode === 200) {
			console.log(body);
			res.jsonp(body);
			} else {
				res.jsonp(error);
			}
		});

		// var responseJsonp = { hello: "This is first page zip: " + zip + " yay!"};
		// res.jsonp(responseJsonp);
	});

}
// app.get('/getWeather/:zipcode', function(req, res) {
// 	request(WU_API_URL + API_KEY, function(err, body) {
// 		res.json(body);
// 	})
// })