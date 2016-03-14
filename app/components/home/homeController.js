angular.module('home', [
  'homeDirective',
  'locationData'
])
  .controller('homeController', ['$scope', 'locationDataFactory', function($scope, locationDataFactory) {
    $scope.data = {};
    $scope.address = '';
    $scope.location = {};

    $scope.fetchLocationData = function(userInput) {
      if (userInput != undefined) {
        locationDataFactory.getLocationData(userInput).then(function(res) {
          $scope.data = res.data.results[0];
          $scope.address = $scope.data.formatted_address;
          $scope.location.lat = $scope.data.geometry.location.lat;
          $scope.location.lng = $scope.data.geometry.location.lng;

          console.log($scope.data);
        });
      }
    }
  }]);
