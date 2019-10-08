/* @imports */
import YummyCookies from "app/library/yummycookies";

/* @main */
if (location.hostname === "www.google.com") {
	let yummyCookies = new YummyCookies(document.cookie);
	let foundCookies = yummyCookies.findCookies("1P_JAR");
	let cookie = foundCookies.pop();

	alert(`${cookie.name}=${cookie.value}`);
}
