/**
 * @file app.js
 *
 * App container for omgponies.
 */
var app = {
  initialize: function() {
    this.bindEvents();
    // Get pony images from flickr.
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      {
        tags: "pony",
        tagmode: "any",
        format: "json"
      },
      function(data) {
        var limit = 20;
        var grid_length = 4;
        // Display the images.
        $.each(data.items, function(i, item) {
          var grid_position = String.fromCharCode("a".charCodeAt(0) + (i % grid_length));
          $('<div class="ui-block-' + grid_position + '"><a href="#popup" data-rel="dialog" data-transition="pop"><img src="' + item.media.m + '" class="pony-image" /></a></div>').appendTo("#ponies-grid");
          if (i === limit) {
            return false;
          }
        });
        // Bind a click to pony images to pass the image src through.
        $(".pony-image").click(function() {
          $("#pony-view-image img").attr("src",  $(this).attr("src"));
        });
      }
    );
  },

  // Bind Event Listeners that are required on startup.
  // e.g. 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
    app.capturePhoto.pictureSource = navigator.camera.PictureSourceType;
    app.capturePhoto.destinationType = navigator.camera.DestinationType;
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },

  // Photo Capture.
  capturePhoto: {
    pictureSource: {},
    destinationType: {},
    onPhotoDataSuccess: function(imageData) {
      // Get image handle
      var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      smallImage.src = "data:image/jpeg;base64," + imageData;
    },

    // Called when a photo is successfully retrieved
    onPhotoURISuccess: function(imageURI) {
      // Get image handle
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    },

    // A button will call this function
    capturePhoto: function() {
      // Take picture using device camera and retrieve image as base64-encoded string.
      navigator.camera.getPicture(app.capturePhoto.onPhotoDataSuccess, app.capturePhoto.onFail, {
        quality: 50,
        destinationType: app.capturePhoto.destinationType.DATA_URL
      });
    },

    // A button will call this function
    capturePhotoEdit: function() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string.
      navigator.camera.getPicture(app.capturePhoto.onPhotoDataSuccess, app.capturePhoto.onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: app.capturePhoto.destinationType.DATA_URL
      });
    },

    // A button will call this function
    getPhoto: function(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(app.capturePhoto.onPhotoURISuccess, app.capturePhoto.onFail, {
        quality: 50,
        destinationType: app.capturePhoto.destinationType.FILE_URI,
        sourceType: source
      });
    },

    // Called if something bad happens.
    onFail: function(message) {
      alert('Failed because: ' + message);
    },
  }
};
