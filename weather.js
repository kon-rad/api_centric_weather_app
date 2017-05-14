var request = require('request');
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1');

client.on('connect', function() {
	console.log('redis connected');
});

var WU_API_URL = 'http://api.wunderground.com/api/29698e56c84c01fa/forecast/q/';

module.exports = function(app) {
	app.get('/:zipcode', function( req, res) {
		var zip = req.params.zipcode +'.json?callback=your_js_callback_function';

		client.get(WU_API_URL + zip, function(error, w_data) {
			if (error) {
				throw error;
			} if (w_data) {
				res.jsonp(JSON.parse(w_data));
			} else { 
				request(WU_API_URL + zip, function(error, response, body) {
					if (error) {throw error; return};
					if (!error && response.statusCode === 200) {
						res.jsonp(body);
						client.setex(WU_API_URL + zip, 3600, JSON.stringify(body), function(error) {
							if (error) {throw eorror;};
						});
					} else {
						res.send(response.statusCode);
					}
				});				
			}
		});
	});
}