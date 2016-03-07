angular.module('soundboardApp')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/soundboard-list.html',
        controller: 'SoundboardListController'
      })
      .when('/dev', {
        templateUrl: 'templates/dev.html',
        controller: 'DevController'
      })
      .when('/:soundboard_slug', {
        templateUrl: 'templates/soundboard.html',
        controller: 'SoundboardController'
      })
      .otherwise({
        redirectTo: '/'
      })
  }]);
