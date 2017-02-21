var express = require('express');
var consign = require('consign');

module.exports = function() {
    var app = express();
    
    consign({cwd: 'app'})
    .include('models')
    .then('api')
    .then('routes')
    .into(app);
    
    return app;
}

