'use strict';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAMERVEOYGG2bVeuFvq9DQXvWwIsKjSILQ';

/////////////////////////////////////// FACEBOOK ////////////////////////////////////

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1810384482507685',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

/////////////////////////////////////// FACEBOOK ////////////////////////////////////

/////////////////////////////////////// FIREBASE ////////////////////////////////////


// Create a reference with an initial file path and name
var config = {
      apiKey: "AIzaSyArdl_7ozkcp1iAYHc5SLL1XVOxcmBHnG0",
      authDomain: "eventiflyserver-156312.firebaseapp.com",
      databaseURL: "https://eventiflyserver-156312.firebaseio.com",
      storageBucket: "eventiflyserver-156312.appspot.com",
      messagingSenderId: "324205204403"
      };
      firebase.initializeApp(config);

      var storage = firebase.storage();
      // var database = firebase.database();
      var storageRef = storage.ref();
      var imgRef = storageRef.child('myImage.png');



    function imgRec(){

      firebase.auth().signInAnonymously().then(function() {
        imgRef.getDownloadURL().then(function(url){
          document.querySelector('img').src = url; 
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
            var blob = xhr.response;
            var testurl = "gs://eventiflyserver-156312.appspot.com/myImage.png";
            sendFileToCloudVision(testurl);
            console.log(blob);
          };
          xhr.open('GET', url);
          xhr.send();
        }).catch(function(error) {
          console.error(error);
        });
      });

      setTimeout(imgRec, 4000);
      string = "/search?type=event&q=";
      JSONstring = "";


                            // firebase.app().delete();

    }

      imgRec();

// var storage = firebase.storage();
// var storageRef = storage.ref();
// var pathReference = storage.ref('myImage.png');

// // Create a reference from a Google Cloud Storage URI
// var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')

// // Create a reference from an HTTPS URL
// // Note that in the URL, characters are URL escaped!
// var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/eventiflyserver-156312.appspot.com/o/myImage.png?alt=media&token=8f74822b-b867-4741-8166-93dc5061bb2f');


// var url = httpsReference;

// storageRef.child('myImage.png').getDownloadURL().then(function(url) {
//   // `url` is the download URL for 'images/stars.jpg'

//   // This can be downloaded directly:
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   xhr.send();

//   var img = document.getElementById('myimg');
//   img.src = url;
// }).catch(function(error) {
//   // Handle any errors
// });



$(function () {
  $('#fileform').on('submit', uploadFiles);
});

var string = "/search?type=event&q=";

function test(){
  FB.login(function(response){
    console.log("in nested test");
    if(response.status === 'connected'){
        console.log("is connected");
        // string = "'" + string + "'";
        console.log(string);
        FB.api(string, function(response) {
          console.log(response);
});
    }else{
      FB.login();
    }
  });
}



/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles (event) {
  //event.preventDefault(); // Prevent the default form post
  console.log("in uploadFiles");
  console.log(window.apiKey);
  // Grab the file and asynchronously convert to base64.
  var file = document.querySelector('img').src;
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile (event) {
  var content = event.target.result;
  console.log("processing");
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision (url) {
  //var type = $('#fileform [name=type]').val();

  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        source: {
          gcsImageUri: url,
        },
      },
      features: [{
        type: 'TEXT_DETECTION',
        maxResults: 200
      }]
    }]
  };

  $('#results').text('Loading...');
  $.ajax({
    type:"POST",
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);
}

/**
 * Displays the results.
 */

// var JSONres = [];
var JSONstring = "";
var bool = 0;

function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  $('#results').text(contents);
  var o = JSON.parse(contents);
  console.log(o);
  //var title = o.responses[0].textAnnotations[0].description.split("\n")[0];
  var title = "";
  for(var i = 1; i < 3; i++){
    title += (o.responses[0].textAnnotations[i].description + ' ');
  }
  console.log(title);
  string += title;
  //string = string.replace(/\s+/g, '');
  FB.login(function(response){
    console.log("in nested test");
    if(response.status === 'connected'){
        console.log("is connected");
        // string = "'" + string + "'";
        console.log(string);
        FB.api(string, function(response) {
          console.log(response);
          // JSONres[0] = response.data[0].name;
          // JSONres[1] = response.data[0].description;
          // JSONres[2] = response.data[0].start_time;
          // JSONres[3] = response.data[0].end_time;
          // JSONres[4] = response.data[0].place.name;
          JSONstring += response.data[0].name + "~$~";
          JSONstring += response.data[0].description + "~$~";
          JSONstring += response.data[0].start_time + "~$~";
          JSONstring += response.data[0].end_time + "~$~";
          JSONstring += response.data[0].place.name;
          // console.log(JSONres);
          console.log(JSONstring);

          firebase.initializeApp(config);
            firebase.database().ref('myArray').set({
            JSONstring
            });

            // bool += '1';

          // if(bool = 0){
          //   firebase.initializeApp(config);
          //   firebase.database().ref('myArray').set({
          //   JSONstring
          // });
          //   console.log("before setting to 1" + bool);
          //   bool = 1;
          //   console.log("after setting to 1" + bool);
          // }else{
          //   firebase.database().ref('myArray').set({
          //   JSONstring
          // });
          //   console.log("inside else" + bool);
          // }

    
          
});
    }else{
      FB.login();
    }
  });
  // console.log(JSON.parse(contents));
  // for(int i = 0; i < o.textAnnotations.length; i++){
  //   console.log(o.textAnnotations[i].description);
  // }
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}

var animate, left=0, imgObj=null, report = document.getElementById('report'), i=0;

function woo(){
   $(document).ready(function(){
        var user,pass;
        console.log("entered");
        $("#lit").click(function(){
          console.log("clicked");
          user=$("#user").val();
          pass=$("#password").val();
          $.post("https://eventiflyserver-156312.appspot-preview.com/",{user: user,password: pass}, function(data){
            if(data==='done')
              {
                alert("login success");
              }
          });
        });
      });

}

function init(){
  console.log("in home.js");
}

function myFunction(){
  console.log("fuck you");
}


window.onload = function() {init();};