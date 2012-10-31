toggleAllTabStatus = (status) ->
  chrome.browserAction.setIcon path : if status then 'icon_monochrome.png' else 'icon_color.png'
  chrome.tabs.query {}, (tabs)->
    for tab in tabs
      chrome.tabs.sendRequest tab.id, {"workermodeEnabled" : status}

chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
  sendResponse({"workermodeEnabled": localStorage['workermodeEnabled'] == "1"})

chrome.browserAction.onClicked.addListener (tab) ->
  enabled = localStorage['workermodeEnabled'] == "1"
  enabled = not enabled

  toggleAllTabStatus(enabled)

  localStorage['workermodeEnabled'] = if enabled then "1" else "0"

