/* @imports */

/* @main */
browser.runtime.onMessage.addListener(function() {
	return browser.storage.local.get(["host", "port"]);
});
