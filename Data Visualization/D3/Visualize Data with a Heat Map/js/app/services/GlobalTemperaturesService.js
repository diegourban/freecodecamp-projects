class GlobalTemperaturesService {

	constructor() {
		this._d3 = new D3Service();
	}

	obtainGlobalTemperatures() {
		return new Promise((resolve, reject) => {
			this._d3.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
				.then(globalTemperatures => {
					console.log(globalTemperatures);
				})
				.catch(error => {
					console.log(error);
					reject('Unable to load data');
				});
		});
	}
}