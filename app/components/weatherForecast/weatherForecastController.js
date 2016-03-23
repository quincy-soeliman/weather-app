angular
  .module('weatherForecast', ['weatherForecastDirective', 'weatherData'])
  .controller('weatherForecastController', ['$scope', '$window', '$location','weatherDataFactory', function($scope, $window, $location, weatherDataFactory) {

    $scope.$on('getDaily', function() {
      $scope.location = angular.fromJson(localStorage.getItem('location'));

      weatherDataFactory.getWeatherData($scope.location.lat, $scope.location.lng).then(function(response) {
        var data = response.data.daily.data;

        $scope.dailyData = [];

        for (var i = 2; i < data.length; i++) {
          weatherDataFactory.daily.push(data[i]);
          $scope.dailyData = weatherDataFactory.daily;
        };
      });
    });

    $scope.redirectToDaily = function($index) {
      console.log($index);
      $window.location.href = '/#/detail';
    };

    // $scope.redirectToDaily = function(time) {
    //   localStorage.setItem('timeStamp', angular.toJson(time));
    //   $window.location.href = "/#/detail";
    // }
  }]);
