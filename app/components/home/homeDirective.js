angular
  .module('homeDirective', [
    'searchBarDirective'
  ])
  .directive('homeView', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/home/homeView.html',
      controller: 'homeController'
    }
  })
