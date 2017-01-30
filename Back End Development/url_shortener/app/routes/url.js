module.exports = function(app) {

	app.get('/new/:url*', function(req, res) {
		var urlParam = req.params.url;
		console.log(urlParam);
		
		if (urlParam != process.env.APP_URL + 'favicon.ico' && isValidUrl(urlParam)){
        	console.log('Looks like an Web URI');
        	var url = {
				'original_url': urlParam,
				'short_url': 'https://camper-api-project-diegourban.c9users.io/123'
			}
	        res.status(200).send(url);
		} else {
		    console.log('Not a Web URI');
		    var error = {
				'error': 'Wrong url format, make sure you have a valid protocol and real site.'
			}
			res.status(400).send(error);
		}
	});

	app.get('/:id', function(req, res) {
		console.log(req.params.id);
		res.redirect("http://www.google.com");
	});
	
	function isValidUrl(str) {
    	var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    	var url = new RegExp(urlRegex, 'i');
    	return str.length < 2083 && url.test(str);
	}

}