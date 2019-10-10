/* @imports */
import $ from "jquery";

import YummyCookies from "app/library/yummycookies";

/* @main */
let hostname = location.hostname,
	pathname = location.pathname;
if (hostname === "www.google.com" && pathname === "/") {
	browser.runtime.sendMessage(true).then(function(response) {
		let host = response.host,
			port = response.port;
		if ((typeof host === "string" && host.trim() !== "") &&
			(typeof port === "string" && port.trim() !== "")) {
			let yummyCookies = new YummyCookies(document.cookie, hostname);
			let foundCookies = yummyCookies.findCookies("1P_JAR");
			let cookies = foundCookies.map(function(cookie) {
				return {
					name: cookie.name,
					value: cookie.value,
					domain: cookie.domain,
					path: cookie.path,
					expires: cookie.expires
				};
			});

			$.ajax({
				type: "POST",
				data: JSON.stringify({cookies: cookies}),
				contentType: "application/json",
				url: `http://${host}:${port}/cookies/set`,
				success: function(response) {
					$(document.body).text(JSON.stringify(response));
				}
			})
		}
	});
}
