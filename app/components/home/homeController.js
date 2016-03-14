angular.module('home', [
  'homeDirective',
  'locationData'
])
  .controller('homeController', ['$scope', 'locationDataFactory', function($scope, locationDataFactory) {
    $scope.fetchLocationData = function(userInput) {
      if (userInput == undefined) {
        console.log('Enter a value');
      } else {
        locationDataFactory.getLocationData(userInput).then(function(res) {
          console.log(res);
        });
      }
    }
  }]);
