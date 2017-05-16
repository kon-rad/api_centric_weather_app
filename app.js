var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var weatherRouter = express.Router();

var weather = require('./weather.js')(app);

app.use('/api', weatherRouter);

app.listen(port, function(){
	console.log('Running on PORT with gulp: ' + port);
});

