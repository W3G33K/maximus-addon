import NgInject, {NgController} from "nginject-decorator";

@NgController("ServerConfigController")
@NgInject("$q")
export default class ServerConfigController {
	constructor($q) {
		$q(function(resolve) {
			console.debug("Loading Server Configuration");
			browser.storage.local.get(["protocol", "host", "port"]).then(resolve);
		}).then(config => {
			this.protocol = config.protocol;
			this.host = config.host;
			this.port = config.port;
		});
	}

	save() {
		let protocol = this.protocol,
			host = this.host,
			port = this.port;

		console.debug("Saving Server Configuration", protocol, host, port);
		browser.storage.local.set({protocol, host, port})
			.then(function() {
				alert("Server Configuration has been updated.");
			});
	}
}
