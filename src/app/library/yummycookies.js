/* @imports */
import UnsupportedOperationError from "app/library/unsupportedoperation.error";
import StringUtil from "app/util/string.util";

/* @exports */
export class BakedCookie {
	constructor(name, value) {
		this.__name = name;
		this.__value = value;
	}

	get name() {
		return this.__name;
	}

	set name(name) {
		throw new UnsupportedOperationError(`Cookie ${this.__name} is read-only and cannot be modified.`);
	}

	get value() {
		return this.__value;
	}

	set value(value) {
		throw new UnsupportedOperationError(`Cookie ${this.__name} is read-only and cannot be modified.`);
	}
}

export default class YummyCookies {
	constructor(cookieJar) {
		let cookies = this.__openCookieJar(cookieJar);
		this.bakedCookies = this.__bakeCookies(cookies);
		this.__freezeCookies();
	}

	__bakeCookies(cookies) {
		return cookies.map((cookie) => cookie.split("="))
			.map((cookieDough) => {
				let name = cookieDough.shift(),
					value = cookieDough.shift();
				return new BakedCookie(name, value);
			});
	}

	__freezeCookies() {
		let bakedCookies = this.bakedCookies;
		bakedCookies.forEach((bakedCookie) => Object.freeze(bakedCookie));
		Object.freeze(bakedCookies);
	}

	__openCookieJar(cookieJar) {
		this.__cookieJar = cookieJar;
		return cookieJar.split("; ");
	}

	findCookies(...names) {
		let bakedCookies = this.bakedCookies;
		let foundCookies = [];
		for(let name of names) {
			for (let bakedCookie of bakedCookies) {
				if (StringUtil.equals(bakedCookie.name, name)) {
					foundCookies.push(bakedCookie);
				}
			}
		}

		return foundCookies;
	}
}
