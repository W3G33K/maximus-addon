/* @imports */
import { CookieMonster } from "app/library/cookies";
import YummyCookies from "app/library/cookies";
import JqueryAjaxService from "app/service/jquery-ajax.service";

/* @main */
let hostname = location.hostname,
	pathname = location.pathname;
if (hostname === "www.google.com" && pathname === "/") {
	browser.runtime.sendMessage(true).then(function(response) {
		let host = response.host,
			port = response.port;
		if ((typeof host === "string" && host.trim() !== "") &&
			(typeof port === "string" && port.trim() !== "")) {
			let jQueryAjaxService = new JqueryAjaxService();
			let yummyCookies = new YummyCookies(document.cookie, hostname),
				cookieMonster = new CookieMonster(jQueryAjaxService);
			cookieMonster.consume(yummyCookies.findCookies("1P_JAR"), host, port);
		}
	});
}
