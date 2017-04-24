window.openMenu = function(m){
  var name = m;
  var m = document.getElementById(m);
  if(m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
    var e = document.createElement('div');
    e.className = 'backdrop backdrop-menu';
    m.parentNode.appendChild(e);
    m.className += ' open';
    setTimeout(function(){
      e.className += ' show';
    });
    e.addEventListener('click', function(evt){
      window.closeMenu(name);
    }, false);
  }
}
window.closeMenu = function(m){
  m = document.getElementById(m);
  m.className = m.className.replace('open','');
  var e = m.parentNode.getElementsByClassName('backdrop-menu')[0]
  e.className = e.className.replace('show','');
  setTimeout(function(){
    e.parentNode.removeChild(e);
  }, 500)
}
