(function() {
  var loadCSS, toggleClass;

  loadCSS = (function() {
    var css, inited;
    inited = false;
    css = "  body:not(.__worker-mode-disabled) {    -webkit-filter: grayscale(100%) !important;  }  body:not(.__worker-mode-disabled) img {    /*-webkit-filter: blur(5px) !important;*/  }  ";
    return function() {
      var style;
      if (!inited) {
        style = document.createElement('style');
        style.id = '__chromeWorkerMode';
        style.appendChild(document.createTextNode(css));
        (document.head || document.documentElement).appendChild(style);
        return inited = true;
      }
    };
  })();

  toggleClass = function(status) {
    console.log(status);
    return $('body').toggleClass('__worker-mode-disabled', !status);
  };

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.workermodeEnabled) loadCSS();
    return toggleClass(request.workermodeEnabled);
  });

  chrome.extension.sendRequest({}, function(response) {
    if (response.workermodeEnabled) return loadCSS();
  });

}).call(this);
