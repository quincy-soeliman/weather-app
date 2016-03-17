angular
  .module('weatherForecastDirective', [])
  .directive('weatherForecastDirectiveView', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/weatherForecast/weatherForecastView.html',
      controller: 'weatherForecastController'
    }
  });
