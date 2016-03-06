angular.module('soundboardApp').controller('SoundboardController', ['$scope', '$firebaseArray', '$routeParams', '$firebaseObject', '$location', 'ngAudio', function($scope, $firebaseArray, $routeParams, $firebaseObject, $location, ngAudio) {
  $scope.soundboard = {};
  $scope.entries = {};
  $scope.currentlyPlaying = {file: ''};
  $scope.player = null;

  // Get the firebase Collection for filtering by slug
  var ref = new Firebase('https://bahuma-soundboard.firebaseio.com/soundboards');
  var soundboards = $firebaseArray(ref);
  soundboards.$ref().orderByChild('slug').equalTo($routeParams.soundboard_slug).once('value', function(dataSnapshot) {
    if(dataSnapshot.exists()) {
      // Loop over the result to get the board key
      angular.forEach(dataSnapshot.val(), function (object, key) {
        var boardKey = key;

        // Create a firebase ref for the specific board
        var boardRef = new Firebase('https://bahuma-soundboard.firebaseio.com/soundboards/' + boardKey);
        $scope.soundboard = $firebaseObject(boardRef);
        onCollectionLoaded();

        $scope.entries = $firebaseArray(boardRef.child('entries'));
      });
    } else {
      $location.path('/');
    }
  });

  var onCollectionLoaded = function () {
    // Executed after the collection $scope.entries has been created
  };

  $scope.togglePlaySound = function (entry) {
    if ($scope.player) {
      $scope.player.pause();
    }

    if ($scope.entryCurrentlyPlaying(entry)) {
      $scope.currentlyPlaying = '';
    } else {
      $scope.currentlyPlaying = entry;

      // Play The audio
      $scope.player = new Audio('./sounds/' + entry.file);
      $scope.player.play();

      // Set buttons inactive when audio finished
      $scope.player.addEventListener('ended', function() {

        $scope.currentlyPlaying = {};
        $scope.$apply();

        // Update playCount
        //entry.playCount++;
        console.log($scope.entries.$indexFor(entry.$id));
        $scope.entries[$scope.entries.$indexFor(entry.$id)].playCount++;
        $scope.entries.$save($scope.entries.$indexFor(entry.$id));
      });
    }
  };

  $scope.entryCurrentlyPlaying = function(entry) {
    if (entry.$id == $scope.currentlyPlaying.$id) {
      return true;
    } else {
      return false;
    }
  };
}]);
