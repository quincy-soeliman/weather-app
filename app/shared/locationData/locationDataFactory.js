angular.module('locationData', [])
  .factory('locationDataFactory', ['$http', function($http) {

    var urlBase = 'https://maps.googleapis.com/maps/api/geocode/json?&address=';

    var locationDataFactory = {};

    locationDataFactory.getLocationData = function($data) {
      $data = $data.replace(' ', '%20');

      return $http.get(urlBase + $data);
    }

    return locationDataFactory;
  }]);
