/* @imports */
import "app/browser/config.stylesheet.css";

import importFileDirective from "app/directive/import-file.directive";
import FileService from "app/service/file.service";
import ServerConfigController from "app/controller/server-config.controller";
import ServerConfigComponent from "app/component/server-config.component";

import angular from "angular";

/* @main */
angular.module("maximus-addon-config", [])
	.directive("importFile", importFileDirective)
	.service("fileService", FileService)
	.controller("serverConfigController", ServerConfigController)
	.component("serverConfig", ServerConfigComponent);
