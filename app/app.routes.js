angular
  .module('routes', [
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })

      .state('detail', {
        url: '/detail',
        templateUrl: 'templates/detail.html'
      })

      .state('404', {
        url: '/404',
        templateUrl: 'templates/404.html'
      });

    $urlRouterProvider.otherwise('/404');
  }]);
