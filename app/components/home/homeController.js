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

    $('body').css('background-color', localStorage.background_color);

    $scope.fetchLocationData = function(location) {
      if (location != undefined) {
        locationDataFactory.getLocationData(location).then(function(response) {
          $scope.locationData = response.data.results[0];
          $scope.address = $scope.locationData.formatted_address;
          $scope.location.lat = $scope.locationData.geometry.location.lat;
          $scope.location.lng = $scope.locationData.geometry.location.lng;  

          var location = {
            lat: $scope.location.lat,
            lng: $scope.location.lng
          }

          // Save lat and lng
          localStorage.setItem("location", angular.toJson(location));
          $scope.$broadcast('getDaily', angular.toJson(location));

          $scope.fetchWeatherData($scope.location.lat, $scope.location.lng);
        });
      }
    };

    $scope.fetchWeatherData = function(latitude, longitude) {
      weatherDataFactory.getWeatherData(latitude, longitude).then(function(response) {
        var currentWeather = response.data.currently;

        console.log(response);

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
      })
    };
  }]);
