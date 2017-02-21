var app = require('./config/custom-express')();

var port = 8080;

app.listen(port, function() {
    console.log('Server up and running at port ' + port);
});