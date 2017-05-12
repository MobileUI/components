window.PAGE={handePage:100};
window.dispatch = function(fn, args) {
    fn = (typeof fn == "function") ? fn : window[fn];
    return fn.apply(this, args || []);
}
window.openPage = function(p, params, callback){
  if(arguments.length===2) {
    callback = params
  }
  var xhttp = new XMLHttpRequest();
  if(p.indexOf('.html') < 0){
    p =p+'.html';
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
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
      body.appendChild(div)
      window.PAGE.handePage++
      var firstStyle = 'z-index:'+window.PAGE.handePage
      var secondStyle = ';transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;transition-timing-function: cubic-bezier(0.36,0.66,0.04,1);'
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
      setTimeout(function(){
        document.getElementById(p).getElementsByClassName('page')[0].setAttribute('class',newClass)
        setTimeout(function(){
          var style = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
          style = style.replace(secondStyle,'')
          document.getElementById(p).getElementsByClassName('page')[0].setAttribute('style',style)
        },280)
      },10)
    }
  };
  xhttp.open("GET", p + '?cache='+new Date().getTime(), true);
  xhttp.send();
}
window.backPage = function(p){
  var page = document.getElementById(p).getElementsByClassName('page')[0];
  var style = ';transform: translateY(0px);will-change: transform, -webkit-transform, opacity;transition-duration: 280ms;transition-timing-function: cubic-bezier(0.36,0.66,0.04,1);'
  var newStyle = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('style')
  if(newStyle) {
    newStyle += ' '+style
  } else {
    newStyle = style
  }
  document.getElementById(p).getElementsByClassName('page')[0].setAttribute("style", newStyle);
  var newClass = document.getElementById(p).getElementsByClassName('page')[0].getAttribute('class')
  newClass += newClass.replace('show','')
  document.getElementById(p).getElementsByClassName('page')[0].setAttribute('class',newClass)
  setTimeout(function(){
    var elm = document.getElementById(p);
    elm.parentElement.removeChild(elm);
  },280)
}
