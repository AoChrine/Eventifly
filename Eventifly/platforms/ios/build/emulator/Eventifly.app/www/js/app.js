// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

Eventifly.controller('PictureController', function($scope, $cordovaCamera) {

  document.addEventListener("deviceready", function () {

    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  }, false);
});

// Eventifly.controller("ExampleController", function($scope, $cordovaCamera) {
 
//     $scope.takePicture = function() {
//         var options = { 
//             quality : 75, 
//             destinationType : Camera.DestinationType.DATA_URL, 
//             sourceType : Camera.PictureSourceType.CAMERA, 
//             allowEdit : true,
//             encodingType: Camera.EncodingType.JPEG,
//             targetWidth: 300,
//             targetHeight: 300,
//             popoverOptions: CameraPopoverOptions,
//             saveToPhotoAlbum: false
//         };
 
//         $cordovaCamera.getPicture(options).then(function(imageData) {
//             $scope.imgURI = "data:image/jpeg;base64," + imageData;
//         }, function(err) {
//             // An error occured. Show a message to the user
//         });
//     }
 
// });


