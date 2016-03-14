angular.module('home', [
  'homeDirective',
  'locationData'
])
  .controller('homeController', ['$scope', 'locationDataFactory', function($scope, locationDataFactory) {

    $scope.fetchLocationData = function(userInput) {
      locationDataFactory.getLocationData( userInput ).then( function(res) {
        
      });
    }
  }]);
