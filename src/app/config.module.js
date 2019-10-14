/* @imports */
import "app/browser/config.stylesheet.css";

import ServerConfigController from "app/controller/server-config.controller";
import ServerConfigComponent from "app/component/server-config.component";

import angular from "angular";

/* @main */
angular.module("maximus-addon-config", [])
	.controller("serverConfigController", ServerConfigController)
	.component("serverConfig", ServerConfigComponent);
