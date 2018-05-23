window.menu = {}

window.openMenu = function (m) {
  var name = m
  var m = document.getElementById(m)
  if (m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
    var e = document.createElement('div')
    e.className = 'backdrop backdrop-menu'
    m.parentNode.appendChild(e)
    setTimeout(function () {
      e.className += ' show'
    })
    e.addEventListener('click', function (evt) {
      window.closeMenu(name)
    }, false)
    if (SO.code === 2) {
      m.style.height = window.innerHeight + 'px'
      var classSideMenu = ' side-menu'
      window.menu.position = 'left'
      if (m.className.indexOf('menu-right') >= 0) {
        classSideMenu = ' side-menu-right'
        window.menu.position = 'right'
        var headers = document.getElementsByClassName('header')
        if (headers.length) {
          for (i in headers) {
            if (headers[i].className && headers[i].className.indexOf('side-menu-right') < 0) {
              headers[i].className += ' side-menu-right'
            }
          }
        }
      }
      if (m.parentNode.className.indexOf('body') >= 0) {
        m.parentNode.className += classSideMenu
      } else {
        document.getElementsByTagName('body')[0].className += classSideMenu
      }
    }
    m.className += ' open'
    var customEvent = new CustomEvent('openMenu', { 'detail': {menu: name}})
    document.dispatchEvent(customEvent)
    window.menu.openFired = true
    document.addEventListener('firedCloseMenu', function (e) {
      window.closeMenu(name)
    }, false)
  }
}
window.closeMenu = function (m) {
  var name = m
  m = document.getElementById(m)
  if (m.className.indexOf('open') < 0) {
    return false
  }
  var customEvent = new CustomEvent('closeMenu', { 'detail': {menu: name}})
  document.dispatchEvent(customEvent)
  window.menu.openFired = false
  m.className = m.className.replace('open', '')
  var headers = document.getElementsByClassName('header')
  if (headers.length) {
    for (i in headers) {
      if (headers[i].className && headers[i].className.indexOf('side-menu-right') >= 0) {
        headers[i].className = headers[i].className.replace(' side-menu-right', '')
      }
    }
  }
  var e = m.parentNode.getElementsByClassName('backdrop-menu')
  if (e && e.length) {
    e = e[0]
    e.className = e.className.replace('show', '')
    setTimeout(function () {
      if (e && e.parentNode) {
        e.parentNode.removeChild(e)
      }
    }, 500)
  }
  if (SO.code !== 1) {
    if (m.parentNode.className.indexOf('body') >= 0) {
      m.parentNode.className = m.parentNode.className.replace('side-menu', '')
    } else {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace('side-menu', '')
    }
  }
}

document.querySelector('body').addEventListener('touchstart', function (evt) {
  window.menu.xDown = evt.touches[0].clientX
  window.menu.yDown = evt.touches[0].clientY
}, false)

window.menu.handleTouchMove = function (evt, name) {
  if (!window.menu.xDown || !window.menu.yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  window.menu.xDiff = window.menu.xDown - xUp
  window.menu.yDiff = window.menu.yDown - yUp

  if (Math.abs(window.menu.xDiff) > Math.abs(window.menu.yDiff)) { // Most significant.
    var menuRight = document.getElementById(name).classList.value.indexOf('menu-right') !== -1
    if (window.menu.xDiff > 0) {
      if (menuRight && !window.menu.openFired) {
        window.openMenu(name)
      } else if (!menuRight && window.menu.openFired) {
        window.closeMenu(name)
      }
    } else {
      if (!menuRight && !window.menu.openFired) {
        window.openMenu(name)
      } else if (menuRight && window.menu.openFired) {
        window.closeMenu(name)
      }
    }
  }

  // Reset values.
  window.menu.xDown = null
  window.menu.yDown = null
}
window.menu.enableSwiper = function (name) {
  document.querySelector('body').addEventListener('touchmove', function (evt) {
    window.menu.handleTouchMove(evt, name)
  }, false)
}
