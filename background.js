(function() {
  var toggleAllTabStatus;

  toggleAllTabStatus = function(status) {
    chrome.browserAction.setIcon({
      path: status ? 'icon_monochrome.png' : 'icon_color.png'
    });
    return chrome.tabs.query({}, function(tabs) {
      var tab, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tabs.length; _i < _len; _i++) {
        tab = tabs[_i];
        _results.push(chrome.tabs.sendRequest(tab.id, {
          "workermodeEnabled": status
        }));
      }
      return _results;
    });
  };

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    return sendResponse({
      "workermodeEnabled": localStorage['workermodeEnabled'] === "1"
    });
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    var enabled;
    enabled = localStorage['workermodeEnabled'] === "1";
    enabled = !enabled;
    toggleAllTabStatus(enabled);
    return localStorage['workermodeEnabled'] = enabled ? "1" : "0";
  });

}).call(this);
