angular.module('homeDirective', ['searchBarDirective'])
  .directive('homePage', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/home/homeView.html',
      controller: 'homeController'
    }
  })
