angular
  .module('home', [
    'homeDirective',
    'locationData',
    'weatherData',
  ])
  .controller('homeController', ['$scope', 'locationDataFactory', 'weatherDataFactory', function($scope, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherData  = {};

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

        $scope.weatherData.weatherStatus      = currentWeather.summary;
        $scope.weatherData.weatherIcon        = currentWeather.icon;

        $scope.weatherData.currentTemperature = Math.round(currentWeather.apparentTemperature) + "°";

        humidityInPercent( currentWeather.humidity );

        function humidityInPercent(hum) {
          if( hum != 1 ) {
            hum = Math.round( hum * 100 );
            $scope.weatherData.humidity = hum + "%";
          } else {
            $scope.weatherData.humidity = "100%";
          }
        }

        function getWindDirection(deg) {

        }

        console.log(currentWeather);
      })
    };
  }]);
