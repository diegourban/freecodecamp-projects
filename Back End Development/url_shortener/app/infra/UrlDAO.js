var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://localhost:27017/fcc';

function insert(url) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Connected correctly to server");
        insertURL(db, function() {
            db.close();
        });
    });
}

var insertURL = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('urls');
    // Insert some documents
    collection.insert({"original_url" : "xablau", "short_url" : "xablau"}, function(err, result) {
        if (err) throw err;console.log("Inserted one url into the url collection");
        callback(result);
    });
}
