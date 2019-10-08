/* @exports */
export default class UnsupportedOperationError extends Error {
	constructor(message) {
		super(message);
		this.__overrideName();
	}

	__overrideName() {
		let constructor = this.constructor;
		this.name = constructor.name;
	}
}
