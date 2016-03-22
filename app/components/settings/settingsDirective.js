angular
	.module('settingsDirective', [])
	.directive('settingsView', function() {
		return {
			restrict: 'E',
			templateUrl: 'app/components/settings/settingsView.html',
			controller: 'settingsController'
		};
	});