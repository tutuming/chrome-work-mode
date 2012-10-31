# tips is from ChromeStylist :)

loadCSS = do ->
  inited = false
  css = "
  body:not(.__worker-mode-disabled) {
    -webkit-filter: grayscale(100%) !important;
  }
  body:not(.__worker-mode-disabled) img {
    /*-webkit-filter: blur(5px) !important;*/
  }
  "

  ->
    if (!inited)
      style = document.createElement('style')
      style.id = '__chromeWorkerMode'
      style.appendChild(document.createTextNode(css))
      (document.head || document.documentElement).appendChild(style);

      inited = true

toggleClass = (status) ->
  console.log(status)
  $('body').toggleClass('__worker-mode-disabled', !status)

chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
  if(request.workermodeEnabled)
    loadCSS()
  toggleClass(request.workermodeEnabled)

chrome.extension.sendRequest {}, (response) ->
  if(response.workermodeEnabled)
    loadCSS()
