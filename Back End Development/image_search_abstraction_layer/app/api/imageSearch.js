var mongoose = require('mongoose');

var api = {};

var ImageSearch = mongoose.model('ImageSearch');

api.search = function(req, res) {
    console.log('Image search request received');
    console.log('Search parameter: ' + req.params.search);
    if(req.query.offset) {
        console.log('Offset: ' + req.query.offset);  
    }
    
    var fakeSearch = new ImageSearch({ url: 'test', snippet : 'test', thumbnail: 'test', context: 'test' });
    
    ImageSearch.create(fakeSearch)
    .then(function(result) {
      res.json(result);
    }, function(error) {
      console.log(error);
      res.status(500).json(error);
    });
};

api.latest = function(req, res) {
    console.log('Latest image search request received');
    ImageSearch.find({})
    .then(function(result) {
        res.json(result);
    }, function(error) {
        console.log(error);
        res.status(500).json(error);
    });
};

module.exports = api;
