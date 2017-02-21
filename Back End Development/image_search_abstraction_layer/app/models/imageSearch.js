var mongoose = require('mongoose');

var schema = mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    context: {
        type: String,
        required: true
    }
});

mongoose.model('ImageSearch', schema);