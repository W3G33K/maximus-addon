/* @imports */
import "app/browser/config.stylesheet.css";

import $ from "jquery";

/* @main */
let protocol = $("select[name='protocol']"),
	host = $("input[name='host']"),
	port = $("input[name='port']");
browser.storage.local.get(["protocol", "host", "port"]).then(function(config) {
	console.info("Loading Server Configuration", config.protocol, config.host, config.port);
	protocol.val(config.protocol);
	host.val(config.host);
	port.val(config.port);
});

$("#update-server-config").on("click", function() {
	console.info("Saving Server Configuration", protocol.val(), host.val(), port.val());
	browser.storage.local.set({
		protocol: protocol.val(),
		host: host.val(),
		port: port.val()
	}).then(function() {
		alert("Server Configuration has been updated.");
	});
});
