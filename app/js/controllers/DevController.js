angular.module('soundboardApp').controller('DevController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  $scope.entry = {
    file: '',
    playCount: 0,
    title: '',
    new: true
  };

  var ref = new Firebase('https://bahuma-soundboard.firebaseio.com/soundboards/-KC7Il71Qx1_qMglteqp/entries');
  $scope.entries = new $firebaseArray(ref);

  $scope.saveEntry = function(entry) {
    $scope.entries.$add(entry);
  };
}]);
