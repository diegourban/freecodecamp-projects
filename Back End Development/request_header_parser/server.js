var ua_parser = require('user-agent-parser')
var express = require('express')
var app = express()

app.get('/api/whoami/', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
     
    var ua = ua_parser(req.headers['user-agent']);
    
    var whoami = {
        'ipaddress' : ip,
        'language' : req.headers['accept-language'].split(',')[0],
        'software' : ua.os.name + " " + ua.os.version
    }
    
    res.send(whoami)
})

app.listen(8080, function() {
    console.log('Request Header Parser microservice listening on port 8080!')
})
