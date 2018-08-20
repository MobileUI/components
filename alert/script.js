window.alert = function (message, title) {
  var configAlert = {}
  if (typeof message === 'object') {
    configAlert = message
  } else {
    configAlert.message = message
    configAlert.title = title
  }
  if (!configAlert.id) {
    configAlert.id = 'ALERT' + new Date().getTime()
  }
  if (!configAlert.buttons || !configAlert.buttons.length) {
    configAlert.buttons = [
      {
        label: 'OK',
        onclick: function () {
          closeAlert()
        }
      }
    ]
  }
  var body = document.getElementsByTagName('body')[0]
  if (event && event.target && event.target.parentNode && event.target.parentNode.className.indexOf('body') >= 0) {
    body = event.target.parentNode
  }

  var e = document.createElement('div')
  e.className = 'backdrop show backdrop-alert'
  e.id = configAlert.id + '_BACKDROP'
  body.appendChild(e)

  var alertMobileUI = document.createElement('div')
  alertMobileUI.className = 'alert-mobileui'
  alertMobileUI.id = configAlert.id
  e.parentNode.appendChild(alertMobileUI)

  var alertContent = document.createElement('div')
  if (!configAlert.class) {
    configAlert.class = 'white'
  }
  alertContent.className = 'alert ' + configAlert.class
  if (configAlert.width) {
    alertContent.style.maxWidth = configAlert.width
  }
  alertMobileUI.appendChild(alertContent)

  if (configAlert.title) {
    var h1 = '<h1>' + configAlert.title + '</h1>'
    alertContent.insertAdjacentHTML('beforeend', h1)
  }
  if (configAlert.message) {
    var p = '<p>' + configAlert.message + '</p>'
    alertContent.insertAdjacentHTML('beforeend', p)
  }
  if (configAlert.template) {
    alertContent.insertAdjacentHTML('beforeend', document.getElementById(configAlert.template).innerHTML)
  }

  var buttons = document.createElement('div')
  buttons.className = 'buttons'
  alertContent.appendChild(buttons)

  for (var i in configAlert.buttons) {
    var button = document.createElement('button')
    if (!configAlert.buttons[i].class) {
      configAlert.buttons[i].class = 'text-teal'
    }
    button.className = configAlert.buttons[i].class
    var text = document.createTextNode(configAlert.buttons[i].label)
    button.appendChild(text)
    if (!configAlert.buttons[i].onclick) {
      configAlert.buttons[i].onclick = closeAlert
    }
    button.addEventListener('click', configAlert.buttons[i].onclick)
    buttons.appendChild(button)
  }
  var customEvent = new CustomEvent('alertOpened')
  document.dispatchEvent(customEvent)
}

window.closeAlert = function (id) {
  alertId = id
  if (!alertId) {
    alertId = event.target.parentNode.parentNode.parentNode.id
  }
  var alert = document.getElementById(alertId)
  alert.parentNode.removeChild(alert)
  var backdrop = document.getElementById(alertId + '_BACKDROP')
  backdrop.parentNode.removeChild(backdrop)
}
