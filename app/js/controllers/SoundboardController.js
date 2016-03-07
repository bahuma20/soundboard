angular.module('soundboardApp').controller('SoundboardController', ['$scope', '$firebaseArray', '$routeParams', '$firebaseObject', '$location', 'Auth', function($scope, $firebaseArray, $routeParams, $firebaseObject, $location, Auth) {
  $scope.auth = Auth;
  $scope.soundboard = {};
  $scope.entries = {};
  $scope.currentlyPlaying = {file: ''};
  $scope.player = null;
  $scope.userData = null;
  $scope.downloadMode = false;

  $scope.auth.$onAuth(function(authData) {
    $scope.authData = authData;

    if (authData) {
      var ref = new Firebase('https://bahuma-soundboard.firebaseio.com/users/' + authData.uid);
      $scope.userData = $firebaseObject(ref);

      if ($scope.dialog.open) {
        $scope.dialog.close();
      }
    }

  });

  // Dialog Polyfill
  $scope.dialog = document.getElementById('auth-dialog');
  dialogPolyfill.registerDialog($scope.dialog);

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
        $scope.entries = $firebaseArray(boardRef.child('entries'));
      });
    } else {
      $location.path('/');
    }
  });

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
        $scope.entries[$scope.entries.$indexFor(entry.$id)].playCount++;
        $scope.entries.$save($scope.entries.$indexFor(entry.$id));
      });
    }
  };

  $scope.entryCurrentlyPlaying = function(entry) {
    if(entry.$id == $scope.currentlyPlaying.$id) {
      return true;
    } else {
      return false;
    }
  };

  $scope.toggleFav = function(entry) {
    if (!$scope.authData) {
      $scope.dialog.showModal();
      return;
    }

    if ($scope.entryIsFavorized(entry)) {
      var index = null;

      angular.forEach($scope.userData.favs, function(value, key) {
        if (entry.$id == value) {
          index = key;
        }
      });

      $scope.userData.favs.splice(index, 1);
      $scope.userData.$save();
    } else {
      $scope.userData.favs.push(entry.$id);
      $scope.userData.$save();
    }
  };

  $scope.entryIsFavorized = function(entry) {
    if (!$scope.authData) {
      return false;
    }

    var isInArray = false;

    if (!$scope.userData.favs) {
      $scope.userData.favs = [];
    }

    angular.forEach($scope.userData.favs, function(value, key){
      if (entry.$id == value) {
        isInArray = true;
      }
    });

    return isInArray;
  };

  $scope.toggleDownloadMode = function() {
    $scope.downloadMode = $scope.downloadMode == false;
  };
}]);
