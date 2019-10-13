/* @imports */

/* @main */
browser.runtime.onMessage.addListener(function() {
	return browser.storage.local.get(["protocol", "host", "port"]);
});
