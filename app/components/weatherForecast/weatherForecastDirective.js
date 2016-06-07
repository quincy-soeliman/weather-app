angular
  .module('weatherForecastDirective', [])
  .directive('weatherForecastView', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/weatherForecast/weatherForecastView.html',
      controller: 'weatherForecastController'
    }
  });
