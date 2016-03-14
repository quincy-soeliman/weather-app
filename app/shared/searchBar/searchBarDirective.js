angular.module('searchBarDirective', [])
  .directive('searchBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/shared/searchBar/searchBarView.html',
      controller: 'homeController'
    };
  });
