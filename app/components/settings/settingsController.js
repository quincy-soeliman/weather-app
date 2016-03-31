angular
	.module('settings', [
		'settingsDirective',
		'weatherData'
	])
	.controller('settingsController', ['$scope', '$window', 'weatherDataFactory', function($scope, $window, weatherDataFactory) {
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

		//Save and load current location
		if( localStorage.getItem('currentLocationList') == null ) {
			localStorage.setItem('currentLocationList', angular.toJson( [] ));
		}
		$scope.currentLocationList = angular.fromJson( localStorage.getItem('currentLocationList') );
		$scope.currentLocationList.reverse();

		$scope.saveCurrentLocation = function() {
			$scope.currentLocationList = [];

			$scope.currentLocation = angular.fromJson( localStorage.getItem('currentLocation') );
			$scope.currentLocationList = angular.fromJson( localStorage.getItem('currentLocationList') );

			if( $scope.currentLocationList.length < 5 ) {
				$scope.currentLocationList.push( $scope.currentLocation );
				localStorage.setItem('currentLocationList', angular.toJson( $scope.currentLocationList ));
				$scope.currentLocationList.reverse();
			} else {
				$scope.currentLocationList.shift();
				$scope.currentLocationList.push( $scope.currentLocation );
				localStorage.setItem('currentLocationList', angular.toJson( $scope.currentLocationList ));
				$scope.currentLocationList.reverse();
			}
		}

		//Load recent search history
		$scope.localSearchHistory = angular.fromJson( localStorage.getItem('recentSearch') );
		$scope.localSearchHistory.reverse();

		$scope.goToSavedLocation = function(name) {
			localStorage.setItem('clickedLocation', name);
			$window.location.href = "/#/"
		}

	}]);
