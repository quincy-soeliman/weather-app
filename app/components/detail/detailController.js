angular
  .module('detail', [
    'detailDirective',
    'locationData',
    'weatherData'
  ])
  .controller('detailController', ['$scope', '$timeout', 'locationDataFactory', 'weatherDataFactory', function($scope, $timeout, locationDataFactory, weatherDataFactory) {
    $scope.locationData = {};
    $scope.weatherData = {};

    $scope.location = {};

    $('body').css('background-color', localStorage.background_color);

    // TODO: Set weatherIcon default
    $scope.windBearing = '';

    $timeout( function() {
      $scope.loadData();
    },0, false)

    $scope.loadData = function() {
      $scope.timeStamp = angular.fromJson( localStorage.getItem('timeStamp') );
      $scope.latLng = angular.fromJson( localStorage.getItem("latLng") );

      $scope.fetchWeatherDetailData($scope.latLng.lat, $scope.latLng.lng, $scope.timeStamp);
    };

    $scope.fetchWeatherDetailData = function(lat, lng, time) {
        weatherDataFactory.getWeatherDataByTime(lat, lng, time).then(function(response) {

          $scope.weatherData = response.data.currently;

          console.log(response.data.currently);

          $scope.temperature = $scope.weatherData.temperature;
          $scope.apparentTemperature = $scope.weatherData.apparentTemperature;

          $scope.currentDate = $scope.weatherData.time * 1000;
          $scope.weatherIcon = $scope.weatherData.icon;

          $scope.summary = $scope.weatherData.summary;
          $scope.windSpeed = $scope.weatherData.windSpeed;
          $scope.humidity = $scope.weatherData.humidity;
          $scope.rotateCompass($scope.weatherData.windBearing);
          $scope.getWindBearing($scope.weatherData.windBearing);

          $timeout(function() {
            $scope.loadWeatherImage();
          }, 1);
        });
    };

    $scope.getWindBearing = function(windBearing) {
      switch (true) {
        case (windBearing == 0):
        default:
          $scope.windBearing = 'north';
          break;
        case (windBearing > 0 && windBearing < 90):
          $scope.windBearing = 'north-east';
          break;
        case (windBearing == 90):
          $scope.windBearing = 'east';
          break;
        case (windBearing > 90 && windBearing < 180):
          $scope.windBearing = 'south-east';
          break;
        case (windBearing == 180):
          $scope.windBearing = 'south';
          break;
        case (windBearing > 180 && windBearing < 270):
          $scope.windBearing = 'south-west';
          break;
        case (windBearing == 270):
          $scope.windBearing = 'west';
          break;
        case (windBearing > 270 && windBearing < 360):
          $scope.windBearing = 'north-west';
          break;
      }
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

    $scope.rotateCompass = function(degrees) {
      $compass = $('.compass-icon');
      $compass.css({ WebkitTransform: 'rotate(' + (degrees - 45) + 'deg)' });
      $compass.css({ '-moz-transform': 'rotate(' + (degrees - 45) + 'deg)' });
    };
  }]);
