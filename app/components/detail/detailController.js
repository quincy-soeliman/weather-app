angular
  .module('detail', [
    'detailDirective',
    'locationData',
    'weatherData'
  ])
  .controller('detailController', ['$scope', '$timeout', 'locationDataFactory', 'weatherDataFactory', function($scope, $timeout, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherData = {};

    $('body').css('background-color', localStorage.background_color);

    $timeout(function() {
      $scope.loadData();
    }, 0);

    $scope.loadData = function() {
      var index = weatherDataFactory.dailyIndex;
      $scope.weatherData = weatherDataFactory.daily[index];

      $timeout(function() {
        $scope.loadWeatherImage();
      }, 0);

      $scope.weatherIcon = $scope.weatherData.icon;

      $scope.currentDate = $scope.weatherData.time * 1000;

      $scope.minTemp = $scope.weatherData.temperatureMin;
      $scope.maxTemp = $scope.weatherData.temperatureMax;
      $scope.temp = $scope.getAverageTemp($scope.minTemp, $scope.maxTemp);

      $scope.minApparentTemp = $scope.weatherData.apparentTemperatureMin;
      $scope.maxApparentTemp = $scope.weatherData.apparentTemperatureMax;
      $scope.apparentTemp = $scope.getAverageTemp($scope.minApparentTemp, $scope.maxApparentTemp);

      $scope.humidity = $scope.weatherData.humidity;
      $scope.windSpeed = $scope.weatherData.windSpeed;
      $scope.rotateCompass($scope.weatherData.windBearing);
      $scope.convertWindDirection($scope.weatherData.windBearing);

      $scope.summary = $scope.weatherData.summary;
    };

    $scope.loadWeatherImage = function() {
      var icons = new Skycons();
      var list  = [
        "clear-day", "clear-night", "partly-cloudy-day",
        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
        "fog"
      ];

      for (var i = list.length; i--;) {
        icons.set(list[i], list[i]);
      }

      icons.play();
    };

    $scope.getAverageTemp = function(minTemp, maxTemp) {
      return Math.round((minTemp + maxTemp) / 2);
    };

    $scope.rotateCompass = function(degrees) {
      $compass = $('.compass-icon');
      
      $compass.css({ '-webkit-transform': 'rotate(' + (degrees - 45) + 'deg)' });
      $compass.css({ '-moz-transform': 'rotate(' + (degrees - 45) + 'deg)' });
      $compass.css({ 'transform': 'rotate(' + (degrees - 45) + 'deg)' });
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
            $scope.windDirection = ( deg == 0 ) ? 'North' : 'East';
            break;
          case '2':
            $scope.windDirection = ( deg == 180 ) ? 'South' : 'West';
            break;
        }
      }

      function callbackLess() {
        $scope.windDirection = ( deg <= 90 ) ? 'North-East' : 'South-East';
      }

      function callbackMore() {
        $scope.windDirection = ( deg <= 270 ) ? 'South-west' : 'North-West';
      }
    };

  }]);
