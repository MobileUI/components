window.openMenu = function(m){
  var name = m;
  var m = document.getElementById(m);
  if(m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
    var e = document.createElement('div');
    e.className = 'backdrop backdrop-menu';
    m.parentNode.appendChild(e);
    setTimeout(function(){
      e.className += ' show';
    });
    e.addEventListener('click', function(evt){
      window.closeMenu(name);
    }, false);
    if(SO.code === 2) {
      var classSideMenu = ' side-menu';
      if(m.className.indexOf('menu-right') >= 0) {
        classSideMenu = ' side-menu-right';
      }
      if(m.parentNode.className.indexOf('body') >= 0) {
        m.parentNode.className += classSideMenu;
      } else {
        document.getElementsByTagName('body')[0].className += classSideMenu;
      }
    }
    m.className += ' open';
  }
}
window.closeMenu = function(m){
  m = document.getElementById(m);
  m.className = m.className.replace('open','');
  var e = m.parentNode.getElementsByClassName('backdrop-menu')
  if(e && e.length){
    e = e[0];
    e.className = e.className.replace('show','');
    setTimeout(function(){
      e.parentNode.removeChild(e);
    }, 500)
  }
  if(SO.code !== 1) {
    if(m.parentNode.className.indexOf('body') >= 0) {
      m.parentNode.className = m.parentNode.className.replace('side-menu','');
    } else {
      document.getElementsByTagName('body')[0].className = document.getElementsByTagName('body')[0].className.replace('side-menu','');
    }
  }
}
