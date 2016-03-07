angular.module('soundboardApp').filter('favorized', function() {
 return function(array, authData, userData, active) {

   if (!active) {
     return array;
   }

   if (!authData) {
     return false;
   }

   if (!userData.favs) {
     userData.favs = [];
   }

   var newArray = [];

   angular.forEach(array, function(item, index) {
     var isInArray = false;

     angular.forEach(userData.favs, function(value) {
       if (item.$id == value) {
         isInArray = true;
         console.log('in array');
       }
     });

     if (isInArray) {
       newArray.push(item);
     }
   });

   return newArray;
 }
});
