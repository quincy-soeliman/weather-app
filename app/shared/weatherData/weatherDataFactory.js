angular.module('weatherData', [])
  .factory('weatherDataFactory', ['$http', function($http) {

    const APIKEY = 'ccf279eb1ba3481a93e236b50b2786cd';
    var urlBase = 'https://api.forecast.io/forecast/' + apiKey;

    var weatherDataFactory = {};

    weatherDataFactory.getWeatherData = function($data) {
      var $data = $data.replace(' ', '%20');

      return $http.get(urlBase + '');
    };

    return weatherDataFactory;
  }]);
