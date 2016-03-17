angular
  .module('home', [
    'homeDirective',
    'locationData',
    'weatherData',
  ])
  .controller('homeController', ['$scope', 'locationDataFactory', 'weatherDataFactory', function($scope, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherData = {};

    $scope.address = '';
    $scope.location = {};

    $scope.fetchLocationData = function(location) {
      if (location != undefined) {
        locationDataFactory.getLocationData(location).then(function(response) {
          $scope.locationData = response.data.results[0];
          $scope.address = $scope.locationData.formatted_address;
          $scope.location.lat = $scope.locationData.geometry.location.lat;
          $scope.location.lng = $scope.locationData.geometry.location.lng;

          $scope.fetchWeatherData($scope.location.lat, $scope.location.lng);
        });
      }
    };


    $scope.fetchWeatherData = function(latitude, longitude) {
      weatherDataFactory.getWeatherData(latitude, longitude).then(function(response) {
        var currentWeather = response.data.currently;
console.log("test");
        $scope.weatherData.weatherStatus = {};
        $scope.weatherData.weatherStatus.status = response.summary;
        $scope.weatherData.weatherStatus.icon = response.icon;

        $scope.weatherData.currentTemperature = currentWeather.apparentTemperature;


      });
    };
  }]);
