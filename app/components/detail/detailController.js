angular
  .module('detail', [
    'detailDirective',
    'locationData',
    'weatherData'
  ])
  .controller('detailController', ['$scope', 'locationDataFactory', 'weatherDataFactory', function($scope, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherData = {};

    $scope.address = '';
    $scope.location = {};

    $scope.minTemp = '';
    $scope.maxTemp = '';

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
        // TODO: Get daily datapoint and replace data[0]
        console.log(response);
        $scope.weatherData = response.data.daily.data[0];
        $scope.minTemp = $scope.weatherData.temperatureMin;
        $scope.maxTemp = $scope.weatherData.temperatureMax;
      })
    };
  }]);
