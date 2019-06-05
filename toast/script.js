window.openToast = function (config) {
  var defaultConfig = {
    class: 'black radius padding shadow',
    duration: 2000,
    position: 'bottom',
    onclick: window.closeToast
  }
  if (typeof config === 'string') {
    defaultConfig.message = config
  }
  if (typeof config === 'object' && config.message) {
    defaultConfig.message = config.message
  }
  if (typeof config === 'object' && config.class) {
    defaultConfig.class = config.class
  }
  if (typeof config === 'object' && config.duration) {
    defaultConfig.duration = config.duration
  }
  if (typeof config === 'object' && config.position) {
    defaultConfig.position = 'toast-' + config.position
  }
  if (typeof config === 'object' && config.onclick) {
    defaultConfig.onclick = config.onclick
  }

  var body = document.getElementsByTagName('body')[0]
  if (event && event.target && event.target.parentNode && event.target.parentNode.className.indexOf('body') >= 0) {
    body = event.target.parentNode
  }

  var toast = document.createElement('div')
  toast.className = 'toast'
  toast.classList.add(defaultConfig.position)

  var spanToast = document.createElement('div')
  spanToast.className = defaultConfig.class
  spanToast.innerHTML = defaultConfig.message
  spanToast.onclick = defaultConfig.onclick

  toast.appendChild(spanToast)
  body.appendChild(toast)

  setTimeout(function() {
    toast.classList.add('show')
  }, 100)

  setTimeout(function() {
    if(!toast) return false
    toast.classList.remove('show')
    setTimeout(function() {
      if(!toast.parentNode) return false
      toast.parentNode.removeChild(toast)
    }, 400)
  }, defaultConfig.duration)
}

window.closeToast = function(event) {
  event.target.parentNode.classList.remove('show')
  setTimeout(function() {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  }, 400) 
}