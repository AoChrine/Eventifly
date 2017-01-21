'use strict';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDLAgnwLn2tRtPS2WCALXdf3oBEiX6cfCg';

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

$(function () {
  $('#fileform').on('submit', uploadFiles);
});

function test(){
  FB.login();

  FB.api('/search?type=event&q=HackUCSC', function(response) {
  console.log(response);
});
}



/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post
  console.log("in uploadFiles");
  console.log(window.apiKey);
  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
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
function sendFileToCloudVision (content) {
  var type = $('#fileform [name=type]').val();

  // Strip out the file prefix when you convert to json.
  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
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
function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  $('#results').text(contents);
  var o = JSON.parse(contents);
  var title = '';
  for(var i = 1; i < 4; i++){
    title += (o.responses[0].textAnnotations[i].description + ' ');
  }
  console.log(title);
  // console.log(JSON.parse(contents));
  // for(int i = 0; i < o.textAnnotations.length; i++){
  //   console.log(o.textAnnotations[i].description);
  // }
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
}

var animate, left=0, imgObj=null, report = document.getElementById('report'), i=0;

function init(){
  window.alert("sometext");
  console.log("in home.js");
}

function myFunction(){
  console.log("fuck you");
}



window.onload = function() {init();};