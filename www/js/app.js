/**
 * @file app.js
 *
 * App container for pulling in pony images from flickr.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
    // Get pony images and display them.
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
      {
        tags: "pony",
        tagmode: "any",
        format: "json"
      },
      function(data) {
        var limit = 20;
        var grid_length = 4;
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
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};
