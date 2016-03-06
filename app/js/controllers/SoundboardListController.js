angular.module('soundboardApp').controller('SoundboardListController', ['$scope', '$location', '$firebaseArray', function($scope, $location, $firebaseArray) {

  var ref = new Firebase('https://bahuma-soundboard.firebaseio.com/soundboards');

  $scope.entries = $firebaseArray(ref);



  $scope.openSoundboard = function(slug) {
    $location.path('/' + slug);
  }
}]);
