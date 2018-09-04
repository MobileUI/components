window.openPopover = function (p) {
  var button = event.target
  var rect = button.getBoundingClientRect()
  var name = p
  var p = document.getElementById(p)
  var e = document.createElement('div')
  e.className = 'backdrop backdrop-popover'
  p.parentNode.appendChild(e)
  e.addEventListener('click', function (evt) {
    window.closePopover(name)
  })
  p.addEventListener('click', function (evt) {
    window.closePopover(name)
  })
  var marginRight = document.body.offsetWidth - rect.left
  var diff = document.body.offsetWidth - marginRight
  marginRight = marginRight - rect.width
  if (diff > 250) {
    p.style += ';top: 110%;right: ' + marginRight + 'px;transform-origin: right top 0px;transform: scale(1);'
  } else {
    p.style += ';top: 110%;left: ' + diff + 'px;transform-origin: right top 0px;transform: scale(1);'
  }
  p.classList.add('show')
  if (SO.code === 2) {
    p.style.top = (rect.top + rect.height) + 'px'
    var divArrow = document.createElement('div')
    divArrow.classList.add('popover-arrow')
    p.parentNode.appendChild(divArrow)
    divArrow.setAttribute('style', 'top:' + (rect.top + rect.height - 5) + 'px;left:' + (rect.left + (rect.width / 2) - 7) + 'px')
  } else {
    var pHeight = p.clientHeight
    var pWidth = p.clientWidth
    p.style.height = 0
    p.style.width = 0
    p.style.top = rect.top + 'px'
    setTimeout(function () {
      var style = p.getAttribute('style')
      style += ' ;-webkit-transition: all 200ms ease;transition: all 200ms ease;'
      p.setAttribute('style', style)
      p.style.height = pHeight + 'px'
      p.style.width = pWidth + 'px'
    })
  }
  var customEvent = new CustomEvent('popoverOpened')
  document.dispatchEvent(customEvent)
}
window.closePopover = function (p) {
  var p = document.getElementById(p)
  var timeEffect = 0
  if (SO.code !== 2) {
    p.style.opacity = 0
    timeEffect = 200
  }
  setTimeout(function () {
    var arrow = document.getElementsByClassName('popover-arrow')
    if (arrow.length) {
      arrow[0].parentNode.removeChild(arrow[0])
    }
    p.classList.remove('show')
    var e = p.parentNode.getElementsByClassName('backdrop-popover')
    if (e && e.length) {
      e = e[0]
      if (e && e.parentNode) {
        e.parentNode.removeChild(e)
      }
    }
    var customEvent = new CustomEvent('popoverClosed')
    document.dispatchEvent(customEvent)
  }, timeEffect)
}
