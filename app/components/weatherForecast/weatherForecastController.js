angular
  .module('weatherForecast', ['weatherForecastDirective', 'weatherData'])
  .controller('weatherForecastController', ['$scope', '$window', '$location','weatherDataFactory', function($scope, $window, $location, weatherDataFactory) {

    $scope.$on('initDayFetch', function(event, args) {
      $scope.latLng = angular.fromJson( localStorage.getItem("latLng") );

      weatherDataFactory.getWeatherData($scope.latLng.lat, $scope.latLng.lng).then( function(res){
        $scope.dailyWeather = res.data.daily.data;
      });
    });

    $scope.redirectToDaily = function(time) {
      localStorage.setItem('timeStamp', angular.toJson(time));
      $window.location.href = "/#/detail";
    }
  }]);
