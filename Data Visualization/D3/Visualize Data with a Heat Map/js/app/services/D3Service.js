class D3Service {

	get(url) {
		return new Promise((resolve, reject) => {
			d3.json(url, function(error, data) {
				if(error) {
					console.log(error);
					reject(error);
				}

				resolve(data);
			});
		});
	}
}