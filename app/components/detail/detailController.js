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

    // TODO: Set weatherIcon default
    $scope.windBearing = '';

    // $scope.$on("initDetail", function(event, args) {
    //   $scope.timeStamp = angular.fromJson( localStorage.getItem('timeStamp') );
    //   $scope.latLng = angular.fromJson( localStorage.getItem("latLng") );
    //
    //   weatherDataFactory.getWeatherDataByTime($scope.latLng.lat, $scope.latLng.lng, $scope.timeStamp).then( function(response) {
    //
    //       $timeout( function() {
    //         $scope.$apply( function() {
    //           $scope.test = "Test";
    //           console.log("in");
    //         });
    //       }, 0, false);
    //
    //   });
    //
    //   //$scope.fetchWeatherDetailData($scope.latLng.lat, $scope.latLng.lng, $scope.timeStamp);
    // });

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

          $scope.minTemp = Math.round($scope.weatherData.temperatureMin);
          $scope.maxTemp = Math.round($scope.weatherData.temperatureMax);
          $scope.getTemperature($scope.minTemp, $scope.maxTemp);

          $scope.minApparentTemp = $scope.weatherData.apparentTemperatureMin;
          $scope.maxApparentTemp = $scope.weatherData.apparentTemperatureMax;
          $scope.getApparentTemperature($scope.minApparentTemp, $scope.maxApparentTemp);

          $scope.summary = $scope.weatherData.summary;

          $scope.weatherIcon = $scope.weatherData.icon;

          $scope.windSpeed = $scope.weatherData.windSpeed;
          $scope.humidity = $scope.weatherData.humidity;
          $scope.getWindBearing($scope.weatherData.windBearing);

          $timeout(function() {
            $scope.loadWeatherImage();
          }, 1);
        });

    };

    $scope.getTemperature = function(minTemp, maxTemp) {
      $scope.temperature = Math.round((minTemp + maxTemp) / 2);
    };

    $scope.getApparentTemperature = function(minApparentTemp, maxApparentTemp) {
      $scope.apparentTemp = Math.round((minApparentTemp + maxApparentTemp) / 2);
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
