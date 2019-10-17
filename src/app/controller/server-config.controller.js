import NgInject, {NgController} from "nginject-decorator";

const STATUS_TEXT_TEST_FAILURE = "Connection Failed";
const STATUS_TEXT_TEST_SUCCESS = "Connection Successful";
const STATUS_TEXT_CONFIG_SAVED = "Server Config Saved";
const STATUS_TEXT_CONNECTION_UNTESTED = "...";

@NgController("ServerConfigController")
@NgInject("$http", "$q", "$scope", "fileService")
export default class ServerConfigController {
	constructor($http, $q, $scope, fileService) {
		this.$http = $http;
		this.$q = $q;
		this.$scope = $scope;
		this.fileService = fileService;
		this.isExportable = false;

		this.loadConfig();
		this.__watchConfig();
	}

	$onInit() {
		let $scope = this.$scope;
		$scope.protocol = null;
		$scope.host = null;
		$scope.port = null;
		$scope.importServerConfig = null;
		$scope.isHealthy = false;
		$scope.statusText = STATUS_TEXT_CONNECTION_UNTESTED;

		console.debug("$scope was initialized.");
	}

	__watchConfig() {
		let $scope = this.$scope;
		$scope.$watchGroup(["protocol", "host", "port"], function() {
			$scope.isHealthy = false;
			$scope.statusText = STATUS_TEXT_CONNECTION_UNTESTED;
		});
	}

	importConfig(serverConfig) {
		let $scope = this.$scope,
			fileService = this.fileService;
		let importServerConfigFile = $scope.importServerConfig[0];
		fileService.readJson(importServerConfigFile)
			.then(function(jsonData) {
				$scope.protocol = jsonData.protocol;
				$scope.host = jsonData.host;
				$scope.port = jsonData.port;
				serverConfig.$setDirty();
			})
			.catch(function(error) {
				console.error("Server Config could not be parsed. Reason:", error);
				alert("Server Configuration could not be parsed. Please double check the file type to ensure it is JSON.");
			})
	}

	exportConfig() {
		let fileService = this.fileService;
		browser.storage.local.get(["protocol", "host", "port"]).then(function(config) {
			fileService.download(config, "serverConfig.json", "application/json");
		});
	}

	loadConfig() {
		let $ctrl = this,
			$q = this.$q,
			$scope = this.$scope;
		$q(function(resolve) {
			browser.storage.local.get(["protocol", "host", "port"]).then(resolve);
		}).then(function(config) {
			console.debug("Loading Server Configuration",
				config.protocol, config.host, config.port);
			$scope.protocol = (typeof config.protocol === "string") ? config.protocol : null;
			$scope.host = (typeof config.host === "string") ? config.host : null;
			$scope.port = (typeof config.port === "number") ? config.port : null;
			if ($scope.protocol !== null && $scope.host !== null && $scope.port !== null) {
				$ctrl.isExportable = true;
			}
		});
	}

	testConfig() {
		let $http = this.$http,
			$q = this.$q,
			$scope = this.$scope;

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
		let $ctrl = this,
			$q = this.$q,
			$scope = this.$scope;
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
				$ctrl.isExportable = true;

				alert("Server Configuration has been updated.");
			})
			.catch(function(error) {
				console.error("Server Configuration could not be updated.", error);
				alert("Server Configuration could not be updated. Please check console logs.");
			});
	}
}
