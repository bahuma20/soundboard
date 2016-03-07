angular.module('soundboardApp').controller('DevController', ['$scope', '$firebaseArray', 'Auth', function($scope, $firebaseArray, Auth) {
  $scope.auth = Auth;

  var entryBoilerplate = {
    file: '',
    playCount: 0,
    title: '',
    new: true
  };

  $scope.entry = angular.copy(entryBoilerplate);

  var ref = new Firebase('https://bahuma-soundboard.firebaseio.com/soundboards/-KC7Il71Qx1_qMglteqp/entries');
  $scope.entries = new $firebaseArray(ref);

  $scope.saveEntry = function(entry) {
    $scope.entries.$add(entry);
    $scope.entry = angular.copy(entryBoilerplate);
  };
}]);
