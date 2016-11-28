class MonthlyVariance {

	constructor(year, month, variance) {
		this._year = year;
		this._month = month;
		this._variance = variance;
		Object.freeze(this);
	}

	get year() {
		return this._year;
	}

	get month() {
		return this._month;
	}

	get variance() {
		return this._variance;
	}
	
}