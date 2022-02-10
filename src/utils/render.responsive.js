(function (win) {
  var doc = win.document
  var docEl = doc.documentElement
  change()
  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", change, false)

  function change () {
    var devicePixelRatio = win.devicePixelRatio || 1
    if (devicePixelRatio >= 3) {
      devicePixelRatio = 3
    } else {
      if (devicePixelRatio >= 2 && devicePixelRatio < 3) {
        devicePixelRatio = 2
      }
    }
    docEl.setAttribute("data-dpr", Math.floor(devicePixelRatio))
    var width = docEl.getBoundingClientRect().width
    if (width > 1200) {
      docEl.style.fontSize = "100px"
    } else {
      if (width >= 1200 && devicePixelRatio != 3) {
        docEl.style.fontSize = 100 * (width / 1200) + "px"
      } else {
        docEl.style.fontSize = 100 * (width / 1125) + "px"
      }
    }
    setTimeout(function () {
      var width = docEl.getBoundingClientRect().width
      if (width > 1200) {
        docEl.style.fontSize = "100px"
      } else {
        if (width >= 1200 && devicePixelRatio != 3) {
          docEl.style.fontSize = 100 * (width / 1200) + "px"
        } else {
          docEl.style.fontSize = 100 * (width / 1125) + "px"
        }
      }
    }, 500)
  }
})(window)
