var mongoose = require('mongoose');
var ImagesClient = require('google-images');

var api = {};

var ImageSearchHistory = mongoose.model('ImageSearchHistory');

api.search = function(req, res) {
    console.log('Image search request received');
    var term = req.params.search;
    var offset = 1;
    console.log('Search parameter: ' + term);
    if(req.query.offset) {
        console.log('Offset: ' + req.query.offset);  
        offset = req.query.offset;
    }
    offset = Math.max(1, offset);
    
    var searchHistory = new ImageSearchHistory({ term: term, when : new Date() });
    
    ImageSearchHistory.create(searchHistory)
    .then(function(result) {
        console.log('Search history included in the database');
        console.log(result);
    }, function(error) {
        console.log('Unable to include the search history in the database');
        console.log(error);
    });
    
    var searchResult = [];
    var client = new ImagesClient('010979884837995675985:b4umcs_jkpw', 'AIzaSyA3mT9h8VfXMe-ctGxs7y1Ca31vx-fMgEQ');
    client.search(term, {page: offset})
    .then(function (images) {
        images.forEach(function(image) {
            var imageSearch = {url: image.url, thumbnail: image.thumbnail.url};
            searchResult.push(imageSearch);
            
        });
        res.json(searchResult);
    }, function(error) {
        res.status(500).json(error);
    });
};

api.latest = function(req, res) {
    console.log('Latest image search request received');
    ImageSearchHistory.find().sort({when: -1}).limit(10)
    .then(function(result) {
        var latest = [];
        result.forEach(function(imageSearchHistory) {
           latest.push({term: imageSearchHistory.term, when: imageSearchHistory.when}); 
        });
        res.json(latest);
    }, function(error) {
        console.log(error);
        res.status(500).json(error);
    });
};

module.exports = api;
