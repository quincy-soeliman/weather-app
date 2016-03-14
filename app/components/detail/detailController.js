angular
  .module('detail', [
    'locationData',
    'weatherData'
  ])
  .controller('detailController', ['$scope', 'locationDataFactory', 'weatherDataFactory', function($scope, locationDataFactory, weatherDataFactory) {
    $scope.location = {};

    $scope.fetchLocationData = function() {
      // TODO: get location data from homeController
    };

    $scope.fetchWeatherData = function() {
      // TODO: make a request when location data is valid
    };
  }]);
