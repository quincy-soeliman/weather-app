angular
  .module('weatherData', [])
  .factory('weatherDataFactory', ['$http', function($http) {
    const APIKEY = 'ccf279eb1ba3481a93e236b50b2786cd';
    var urlBase = 'https://api.forecast.io/forecast/' + APIKEY + '/';

    var weatherDataFactory = {};

    weatherDataFactory.getWeatherData = function(latitude, longitude) {
      return $http.jsonp(urlBase + latitude + ',' + longitude + '?callback=JSON_CALLBACK&units=ca');
    };

    weatherDataFactory.getWeatherDataByTime = function(latitude, longitude, time) {
      return $http.jsonp(urlBase + latitude + ',' + longitude + ',' + time + '?callback=JSON_CALLBACK&units=ca');
    }

    return weatherDataFactory;
  }]);
