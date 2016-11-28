class GlobalTemperatures {

	constructor(baseTemperature) {
		this._baseTemperature = baseTemperature;
		this._monthlyVariances = [];
		Object.freeze(this);
	}

	add(monthlyVariance) {
		this._monthlyVariances.push(monthlyVariance);
	}

	get baseTemperature() {
		return this._baseTemperature;
	}

	get monthlyVariances() {
		return [].concat(this._monthlyVariances);
	}

}