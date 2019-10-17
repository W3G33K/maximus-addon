function importFileDirective() {
	return {
		restrict: "A",
		link(scope, element, attrs) {
			element.bind("change", function(event) {
				console.debug("Importing FileList into $scope as Model Data with name", attrs.name);
				scope.$apply(function() {
					scope[attrs.name] = event.target.files;
					console.debug("Imported FileList", scope[attrs.name]);

					scope.$eval(attrs.importFileAction);
				});
			});
		}
	};
}

export default importFileDirective;
