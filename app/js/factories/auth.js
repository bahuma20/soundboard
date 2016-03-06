angular.module('soundboardApp').factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://bahuma-soundboard.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);
