/* @imports */
import "app/browser/config.stylesheet.css";

import $ from "jquery";

/* @main */
let host = $("input[name='host']"),
	port = $("input[name='port']");
browser.storage.local.get(["host", "port"]).then(function(config) {
	host.val(config.host);
	port.val(config.port);
});

$("#update-server-config").on("click", function() {
	browser.storage.local.set({
		host: host.val(),
		port: port.val()
	}).then(function() {
		alert("Server Configuration has been updated.");
	});
});
