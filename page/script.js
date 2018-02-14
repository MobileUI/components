window.PAGE={handePage:100};
document.addEventListener("deviceready", function(){
  document.addEventListener("backbutton", function(e){
    if(window.disabledBackButton) {
      return e.preventDefault();
    }
    var pages = document.getElementsByClassName('box-block');
    if(pages.length){
      e.preventDefault();
      window.backPage(pages[pages.length-1].id);
    } else {
      navigator.app.exitApp();
    }
  }, false);
}, false);
window.dispatch = function(fn, args) {
    fn = (typeof fn == "function") ? fn : window[fn];
    return fn.apply(this, args || []);
}
window.openPage = function(p, params, callback){
  var showPageEffect = function(){
    window.PAGE.handePage++
    var firstStyle = 'z-index:'+window.PAGE.handePage
    var secondStyle = ';transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;transition-timing-function: cubic-bezier(0.36,0.66,0.04,1);'
    if(SO.code === 2){
      secondStyle = ';transform: translateX(0px);transition-duration: 280ms;'
    }
    if(window.disabledOpenPageEffect) {
      secondStyle = ';opacity: 1;top: 0;'
    }
    var newStyle = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
    if(newStyle) {
      newStyle += ' '+firstStyle + secondStyle
    } else {
      newStyle = firstStyle + secondStyle
    }
    document.getElementById(p).getElementsByClassName('page')[0].setAttribute("style", newStyle);
    if(callback) {
      window.dispatch(callback, [params]);
    }
    var newClass = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('class')
    newClass += ' show'
    var validOpenPage = function(){
      setTimeout(function(){
        if(document.getElementById(p) && document.getElementById(p).querySelectorAll('.page').length){
          showPageBind();
        } else {
          validOpenPage();
        }
      },10);
    }
    validOpenPage();
    var customEvent = new CustomEvent("openPage",{ "detail": {page:p}});
    document.dispatchEvent(customEvent);
    var showPageBind = function(){
      setTimeout(function(){
        document.getElementById(p).getElementsByClassName('page')[0].setAttribute('class',newClass)
        setTimeout(function(){
          var style = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
          style = style.replace(secondStyle,'')
          document.getElementById(p).getElementsByClassName('page')[0].setAttribute('style',style)
        },280)
      }, 100);
    };
  }
  if(arguments.length===2) {
    callback = params
  }
  if(p.indexOf('.html') < 0){
    p =p+'.html';
  }
  //check if page is openned.
  if(document.getElementById(p)){
    var pages = document.getElementsByClassName('box-block');
    if(pages[pages.length-1].id === document.getElementById(p).id){
      return false;
    }
    document.getElementById(p).parentNode.removeChild(document.getElementById(p));
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (this.readyState == 4) {
      var page = this.responseText;
      page = page.replace('backPage()','backPage(\''+p+'\')');
      var body = document.getElementsByTagName('body')[0]
      if(document.getElementsByClassName('body').length){
        body = document.getElementsByClassName('body')[0]
      }
      var div = document.createElement('div')
      div.setAttribute('class','box-block')
      div.setAttribute('id',p)
      div.innerHTML = page
      body.appendChild(div);
      showPageEffect();
    }
  };
  xhttp.open("GET", p + '?cache='+new Date().getTime(), true);
  document.dispatchEvent(new Event('firedCloseMenu'));
  xhttp.send();
}
window.backPage = function(p){
  var page = ""
  if(!p) {
    var pages = document.querySelectorAll('.page.show')
    var elementFind = { zIndex:-1 }
    for (var i = 0; i < pages.length; i++) {
      var zIndexNow = Number(pages[i].style['zIndex'])
      if(elementFind.zIndex<zIndexNow) {
        elementFind.zIndex=zIndexNow
        elementFind.element = pages[i]
      }
    }
    if(elementFind.zIndex) {
      p = elementFind.element.parentElement.id
    }
  } 
  var page = document.getElementById(p).getElementsByClassName('page')[0];
  var style = ';transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;'
  if(window.disabledOpenPageEffect) {
    style = ''
  }
  var newStyle = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
  if(newStyle) {
    newStyle += ' '+style
  } else {
    newStyle = style
  }
  document.getElementById(p).getElementsByClassName('page')[0].setAttribute("style", newStyle);
  var newClass = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('class')
  newClass += newClass.replace('show','')
  document.getElementById(p).getElementsByClassName('page')[0].setAttribute('class',newClass);
  var customEvent = new CustomEvent("backPage",{ "detail": {page:p}});
  document.dispatchEvent(customEvent);
  setTimeout(function(){
    var elm = document.getElementById(p);
    elm.parentElement.removeChild(elm);
  }, !window.disabledOpenPageEffect ? 280 : 0)
}
