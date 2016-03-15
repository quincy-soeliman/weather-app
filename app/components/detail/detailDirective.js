angular
  .module('detailDirective', [
    'searchBarDirective'
  ])
  .directive('detailView', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/detail/detailView.html',
      controller: 'detailController'
    };
  });
