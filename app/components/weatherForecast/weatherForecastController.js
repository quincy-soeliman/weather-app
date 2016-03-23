angular
  .module('weatherForecast', ['weatherForecastDirective', 'weatherData'])
  .controller('weatherForecastController', ['$scope', '$window', '$location','weatherDataFactory', function($scope, $window, $location, weatherDataFactory) {

    $scope.$on('getDaily', function() {
      $scope.dailyData = [];
      weatherDataFactory.daily = [];
      
      $scope.location = angular.fromJson(localStorage.getItem('location'));

      weatherDataFactory.getWeatherData($scope.location.lat, $scope.location.lng).then(function(response) {
        var data = response.data.daily.data;

        for (var i = 1; i < data.length; i++) {
          weatherDataFactory.daily.push(data[i]);
          $scope.dailyData = weatherDataFactory.daily;
        };
      });
    });

    $scope.redirectToDaily = function($index) {
      weatherDataFactory.dailyIndex = $index;
      $window.location.href = '/#/detail';
    };
  }]);
