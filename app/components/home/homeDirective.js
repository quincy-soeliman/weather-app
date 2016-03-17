angular
  .module('homeDirective', [
    'searchBarDirective',
    'weatherForecastDirective'
  ])
  .directive('homeView', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/home/homeView.html',
      controller: 'homeController'
    }
  });
