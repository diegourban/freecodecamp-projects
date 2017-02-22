var mongoose = require('mongoose');

var schema = mongoose.Schema({
    term: {
        type: String,
        required: true
    },
    when: {
        type: Date,
        required: true
    }
});

mongoose.model('ImageSearchHistory', schema);