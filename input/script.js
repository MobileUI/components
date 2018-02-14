(function bindInputEvent(){
  setTimeout(function(){
    var inputs = document.getElementsByTagName('input');
    for(i in inputs){
      var parent = inputs[i].parentNode;
      if(parent && (parent.className.indexOf('left') >=0 || parent.className.indexOf('right') >=0) && parent.parentNode.className.indexOf('item') >= 0){
        parent = parent.parentNode;
      }
      if(parent && parent.className.indexOf('item') >=0 && parent.className.indexOf('bind-input-event-click') < 0 ){
        parent.className += ' bind-input-event-click';
        parent.addEventListener('click', function(){
          if(this.getElementsByTagName('input').length) {
            this.getElementsByTagName('input')[0].focus();
            if(this.getElementsByTagName('input')[0].type === 'radio' && !this.getElementsByTagName('input')[0].disabled) {
              this.getElementsByTagName('input')[0].checked=true;
            }
          }
        }, false);
      }
    }
    var labelsFloat = document.getElementsByClassName('label-float');
    for(i in labelsFloat) {
      if(labelsFloat[i].className && labelsFloat[i].className.indexOf('bind-input-event-focus') < 0 && labelsFloat[i].querySelectorAll('input,textarea').length) {
        labelsFloat[i].className += ' bind-input-event-focus';
        labelsFloat[i].querySelectorAll('input,textarea')[0].addEventListener('focus', function(){
          if(this.parentNode.getElementsByTagName('label').length && this.parentNode.getElementsByTagName('label')[0].className.indexOf('focus') < 0) {
            this.parentNode.getElementsByTagName('label')[0].className += ' focus'
          }
        }, false);
        labelsFloat[i].querySelectorAll('input,textarea')[0].addEventListener('blur', function(){
          if(this.parentNode.getElementsByTagName('label').length && this.parentNode.getElementsByTagName('label')[0].className && !this.value.length) {
            this.parentNode.getElementsByTagName('label')[0].className = this.parentNode.getElementsByTagName('label')[0].className.replace('focus','');
          }
        }, false);
        if(labelsFloat[i].querySelectorAll('input,textarea')[0].value && labelsFloat[i].querySelectorAll('input,textarea')[0].value.length) {
          labelsFloat[i].querySelectorAll('input,textarea')[0].parentNode.getElementsByTagName('label')[0].className += ' focus'
        }
      }
    }

    bindInputEvent();
  },500);
})();
