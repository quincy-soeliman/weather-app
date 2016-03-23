angular
  .module('home', [
    'homeDirective',
    'locationData',
    'weatherData',
  ])
  .controller('homeController', ['$scope', 'locationDataFactory', 'weatherDataFactory', function($scope, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherToday  = {};

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

        $scope.weatherToday.weatherStatus      = currentWeather.summary;
        $scope.weatherToday.weatherIcon        = currentWeather.icon;


        $scope.weatherToday.currentTemperature = Math.round( currentWeather.apparentTemperature ) + "°";
        $scope.weatherToday.windSpeed          = Math.round( currentWeather.windSpeed ) + " KM/h";

        $scope.humidityInPercent( currentWeather.humidity );
        $scope.convertWindDirection( currentWeather.windBearing );

        console.log(currentWeather);
      });
    };

    $scope.humidityInPercent = function(hum) {
      if( hum != 1 ) {
        hum = Math.round( hum * 100 );
        $scope.weatherToday.humidity = hum + "%";
      } else {
        $scope.weatherToday.humidity = "100%";
      }
    };

    $scope.convertWindDirection = function(deg) {
      deg = ( deg != 0 && deg != 90 && deg != 180 && deg != 270 ) ? callback() : checkNESW();

      function callback() {
        deg = ( deg <= 180 ) ? callbackLess() : callbackMore();
      }

      function checkNESW() {
        deg = ( deg == 0 || deg == 90 ) ? switchNESW('1') : switchNESW('2');
      }

      function switchNESW(mode) {
        switch(mode) {
          case '1':
            $scope.weatherToday.windDirection = ( deg == 0 ) ? 'North' : 'East';
            break;
          case '2':
            $scope.weatherToday.windDirection = ( deg == 180 ) ? 'South' : 'West';
            break;
        }
      }

      function callbackLess() {
        $scope.weatherToday.windDirection = ( deg <= 90 ) ? 'North-East' : 'South-East';
      }

      function callbackMore() {
        $scope.weatherToday.windDirection = ( deg <= 270 ) ? 'South-west' : 'North-West';
      }
    };

  }]);
