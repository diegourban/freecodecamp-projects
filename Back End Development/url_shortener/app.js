var app = require('./config/express')();
var urlRoute = require('./app/routes/url');

urlRoute(app);

app.listen(8080, function() {
	console.log('URL Shortener Microservice Server up and running.');
});