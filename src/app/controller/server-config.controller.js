import NgInject, {NgController} from "nginject-decorator";

const STATUS_TEXT_TEST_FAILURE = "Connection Failed";
const STATUS_TEXT_TEST_SUCCESS = "Connection Successful";
const STATUS_TEXT_CONFIG_SAVED = "Server Config Saved";
const STATUS_TEXT_CONNECTION_UNTESTED = "...";

@NgController("ServerConfigController")
@NgInject("$http", "$q", "$scope")
export default class ServerConfigController {
	constructor($http, $q, $scope) {
		this.$http = $http;
		this.$q = $q;
		this.__$scope = $scope;

		this.loadConfig();
		this.__watchConfig();
	}

	$onInit() {
		let $scope = this.__$scope;
		$scope.protocol = null;
		$scope.host = null;
		$scope.port = null;
		$scope.isHealthy = false;
		$scope.statusText = STATUS_TEXT_CONNECTION_UNTESTED;

		console.debug("$scope was initialized.");
	}

	__watchConfig() {
		let $scope = this.__$scope;
		$scope.$watchGroup(["protocol", "host", "port"], function() {
			$scope.isHealthy = false;
			$scope.statusText = STATUS_TEXT_CONNECTION_UNTESTED;
		});
	}

	loadConfig() {
		let $q = this.$q,
			$scope = this.__$scope;
		$q(function(resolve) {
			browser.storage.local.get(["protocol", "host", "port"]).then(resolve);
		}).then(config => {
			console.debug("Loading Server Configuration",
				config.protocol, config.host, config.port);
			$scope.protocol = (typeof config.protocol === "string") ? config.protocol : null;
			$scope.host = (typeof config.host === "string") ? config.host : null;
			$scope.port = (typeof config.port === "number") ? config.port : null;
		});
	}

	testConfig() {
		let $http = this.$http,
			$q = this.$q,
			$scope = this.__$scope;

		let deferred = $q.defer();
		let protocol = $scope.protocol,
			host = $scope.host,
			port = $scope.port;

		console.debug("Testing Server Configuration", protocol, host, port);
		$http.get(`${protocol}://${host}:${port}/health`, {responseType: "json"})
			.then(deferred.resolve, deferred.reject);

		deferred.promise
			.then(function(response) {
				console.debug("Maximus Server responded to request with", response);
				let data = response.data,
					uptime = data.uptime;
				if (typeof uptime === "number" && uptime > 0) {
					$scope.isHealthy = true;
					$scope.statusText = STATUS_TEXT_TEST_SUCCESS;
				}
			}).catch(function(response) {
				console.error("Maximus Server failed to respond. Please double check your Server Configuration. Response:", response);
				$scope.statusText = STATUS_TEXT_TEST_FAILURE;

				alert("Maximus Server failed to respond. Please double check your Server Configuration.");
			});
	}

	saveConfig() {
		let $q = this.$q,
			$scope = this.__$scope;
		let protocol = $scope.protocol,
			host = $scope.host,
			port = $scope.port;

		let deferred = $q.defer();

		console.debug("Saving Server Configuration", protocol, host, port);
		browser.storage.local.set({protocol, host, port})
			.then(deferred.resolve)
			.catch(deferred.reject);

		deferred.promise
			.then(function() {
				$scope.statusText = STATUS_TEXT_CONFIG_SAVED;

				alert("Server Configuration has been updated.");
			})
			.catch(function(error) {
				console.error("Server Configuration could not be updated.", error);
				alert("Server Configuration could not be updated. Please check console logs.");
			});
	}
}
