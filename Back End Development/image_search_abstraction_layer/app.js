var app = require('./config/express')();
require('./config/database')('localhost/imageSearch');

var port = 8080;

app.listen(port, function() {
    console.log('Server up and running at port ' + port);
});