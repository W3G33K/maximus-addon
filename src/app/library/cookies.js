/* @imports */
import StringUtil from "app/util/string.util";
import $ from "jquery";

/* @exports */
export class BakedCookie {
	constructor(name, value, domain, path, expires) {
		this.name = name;
		this.value = value;
		this.domain = (domain || location.hostname);
		this.path = (path || "/");
		this.expires = (expires || Date.now() + (1000 * 60 * 60 * 24));
	}
}

export default class BakeCookies {
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

export class CookieMonster {
	constructor(ajaxService) {
		this.__ajaxService = ajaxService;
	}

	consume(yummyCookies, protocol, host, port, endpoint = "/cookies/set") {
		let ajaxService = this.__ajaxService;
		let data = {
			cookies: yummyCookies
		};

		ajaxService.post(protocol, host, port, endpoint, data)
			.catch(e => alert(e.message))
			.then(function(response) {
				$(document.body).text(JSON.stringify(response));
			});
	}
}
