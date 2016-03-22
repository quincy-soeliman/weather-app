angular
	.module('settings', [
		'settingsDirective',
		'weatherData'
	])
	.controller('settingsController', ['$scope', 'weatherDataFactory', function($scope, weatherDataFactory) {
		$scope.title = 'Settings';
		localStorage.background_color;

		$('body').css('background-color', localStorage.background_color);

		$('.color').each(function(i, color) {
			if ($(this).css('background-color') == localStorage.background_color) {
				$(color).addClass('selected');
			}
		});

		$('.color').on('click', function() {
			$('.color').removeClass('selected');
			$(this).addClass('selected');

			localStorage.background_color = $(this).css('background-color');
			$('body').css('background-color', localStorage.background_color);
			
			return localStorage.background_color;
		});

		$scope.setTempScale = function(tempScale) {
			weatherDataFactory.tempScale = tempScale;
		};
		
	}]);