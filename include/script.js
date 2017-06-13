window.include = function(element, file, callback){
  if(file.indexOf('.html') < 0){
    file =file+'.html';
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (this.readyState == 4) {
      var page = this.responseText;
      var div = typeof(element) === 'string' ? document.getElementById(element) : element;
      console.log(div)
      if(div){
          div.innerHTML = page
      }
      if(callback){
        callback();
      }
    }
  };
  xhttp.open("GET", file + '?cache='+new Date().getTime(), true);
  xhttp.send();
}
window.bindIncludeEvent = function(){
  document.querySelectorAll('[include]').forEach(function(element, i){
    window.include(element, element.getAttribute('include'));
  });
}
window.bindIncludeEvent();

document.addEventListener("openPage", function(){
  window.bindIncludeEvent();
});
