var MongoClient = require('mongodb').MongoClient

var connectionUrl = 'mongodb://localhost:27017/fcc';

module.exports = function(app) {

	app.get('/new/:url*', function(req, res) {
		var urlParam = req.url.slice(5);
		console.log(urlParam);
		
		if (urlParam != process.env.APP_URL + 'favicon.ico' && isValidUrl(urlParam)){
        	console.log('Looks like an Web URI');
        	var url = {
				'original_url': urlParam,
				'short_url': 'https://camper-api-project-diegourban.c9users.io/' + generateLink()
			}
			insert(url);
	        res.status(200).send(url);
		} else {
		    console.log('Not a Web URI');
		    var error = {
				'error': 'Wrong url format, make sure you have a valid protocol and real site.'
			}
			res.status(400).send(error);
		}
	});

	app.get('/:url', function(req, res) {
		console.log(req.url);
		var urlParam = "https://camper-api-project-diegourban.c9users.io" + req.url;
		console.log(urlParam);
		find(urlParam, function(redirectTo) {
			res.redirect(redirectTo);	
		});
		
	});
	
	function isValidUrl(str) {
    	var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    	var url = new RegExp(urlRegex, 'i');
    	return str.length < 2083 && url.test(str);
	}
	
	function generateLink() {
	  var num = Math.floor(100000 + Math.random() * 900000);
	  return num.toString().substring(0, 4);
	}
	
	function insert(url) {
		// Use connect method to connect to the Server
	    MongoClient.connect(connectionUrl, function(err, db) {
	        if (err) throw err;
	        console.log("Connected correctly to server");
	        insertURL(url, db, function() {
	            db.close();
	        });
	    });
	}
	
	function insertURL(url, db, callback) {
	    // Get the documents collection
	    var collection = db.collection('urls');
	    // Insert some documents
	    collection.insert(url, function(err, result) {
	        if (err) throw err;console.log("Inserted one url into the url collection");
	        callback(result);
	    });
	}
	
	function find(url, callback) {
		// Use connect method to connect to the Server
	    MongoClient.connect(connectionUrl, function(err, db) {
	        if (err) throw err;
	        console.log("Connected correctly to server");
	        findURL(url, db, function(result) {
	            db.close();
	            if(result != null) {
	            	callback(result.original_url);	
	            }
	        });
	    });
	}
	
	function findURL(url, db, callback) {
	    // Get the documents collection
	    var collection = db.collection('urls');
	    // Insert some documents
	    collection.findOne({"short_url" : url}, function(err, result) {
	        if (err) throw err;console.log("Could not find the url in the url collection");
	        callback(result);
	    });
	}

}