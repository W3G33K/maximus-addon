/* @imports */
import UnsupportedOperationError from "app/library/unsupportedoperation.error";
import StringUtil from "app/util/string.util";

/* @exports */
export class BakedCookie {
	constructor(name, value, domain, path, expires) {
		this.__name = name;
		this.__value = value;
		this.__domain = (domain || location.hostname);
		this.__path = (path || "/");
		this.__expires = (expires || Date.now() + (1000 * 60 * 60 * 24));
	}

	get name() {
		return this.__name;
	}

	get value() {
		return this.__value;
	}

	get domain() {
		return this.__domain;
	}

	get path() {
		return this.__path;
	}

	get expires() {
		return this.__expires;
	}
}

export default class YummyCookies {
	constructor(cookieJar, hostname) {
		let cookies = this.__openCookieJar(cookieJar);
		this.bakedCookies = this.__bakeCookies(cookies, hostname);
		this.__freezeCookies();
	}

	__bakeCookies(cookies, hostname = "") {
		return cookies.map((cookie) => cookie.split("="))
			.map((cookieDough) => {
				let name = cookieDough.shift(),
					value = cookieDough.shift();
				return new BakedCookie(name, value, hostname);
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
