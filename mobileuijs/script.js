(function() {
  var observerWatchers = [];
  var tokenObserver = 0;
  var dataBind = function(){
    var elms = document.querySelectorAll('[data]')
    for (var i = 0; i < elms.length; i++) {
      if(elms[i].getAttribute('data') && !elms[i].getAttribute('data-binded')){
        var data = elms[i].getAttribute('data');
        data = fetchFromObject(window, data);
        if(data){
          writeElement(elms[i], data);
          elms[i].setAttribute('data-binded','mobileui');
          dataObserver(elms[i].getAttribute('data'), tokenObserver++);
        } else {
          setTimeout(function(){
            dataBind();
          },100);
        }
      }
    }
  }
  reDataBind = function(observerWatcher){
    //TODO: Improve logic for performance
    var data = fetchFromObject(window, observerWatcher.dataKey);
    var elms = document.querySelectorAll('[data-binded]');
    for (var i = 0; i < elms.length; i++) {
      if(elms[i].getAttribute('data-binded') === observerWatcher.dataKey){
        elms[i].parentNode.removeChild(elms[i])
      }
    }
    elms = document.querySelectorAll('[data][data-binded]');
    for (var i = 0; i < elms.length; i++) {
      if(elms[i].getAttribute('data') === observerWatcher.dataKey){
          writeElement(elms[i], data);
      }
    }
    observerWatcher.dataValue = copyObj(data);
  }
  writeElement = function(elm, data){
    var bindWriteElement = function(dataObj, index){
      var html = elm.outerHTML;
      var exp = /\${/g;
      while (match = exp.exec(html)) {
        var prop = html.slice(match.index+2, html.length).split('}')[0];
        var value = fetchFromObject(dataObj,prop);
        html = html.replace('${'+prop+'}', value);
      }
      if(index) {
        html = html.replace(new RegExp('\\$\\$index', 'g'), index);
      }
      var divBind = document.createElement('div');
      elm.parentNode.insertBefore(divBind, elm);
      html = html.replace('data=','data-binded=');
      divBind.outerHTML = html;
    }
    if(data.constructor === Array){
      for(var id in data){
        bindWriteElement(data[id], id);
      }
    } else {
      bindWriteElement(data);
    }
  }
  fetchFromObject = function(obj, prop) {
      if(typeof obj === 'undefined') {
         console.error('Object for property ',prop,' is undefined!');
          return '';
      }
      var _index = prop.indexOf('.')
      if(_index > -1) {
          return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
      }
      if(obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean || obj.constructor === Date){
        return obj;
      }
      return obj[prop];
  }
  dataObserver = function(data,token){
    if(!observerWatchers[token]) {
      observerWatchers[token] = {
        dataKey: data,
        dataValue: copyObj(fetchFromObject(window, data))
      };
    }
    var observer = fetchFromObject(window, observerWatchers[token].dataKey);
    if(observerWatchers[token].dataValue.constructor === Array && observerWatchers[token].dataValue.length !== observer.length){
      //TODO: Improve logic for performance
      reDataBind(observerWatchers[token]);
    } else if(observerWatchers[token].dataValue.constructor === Array && observerWatchers[token].dataValue.toString() !== observer.toString()){
      //TODO: Improve logic for performance
      reDataBind(observerWatchers[token]);
    } else if(JSON.stringify(observerWatchers[token].dataValue) !== JSON.stringify(observer)){
      //TODO: Improve logic for performance
      reDataBind(observerWatchers[token]);
    }
    setTimeout(function(){ dataObserver(data, token) }, 100);
  }
  copyObj = function(obj){
    if(obj.constructor === Array){
      return obj.slice()
    } else {
      var copy = obj.constructor();
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    }
  }

  dataBind();

  //Functions Help
  window.MobileUI = {
    objectByForm: function(id){
      var form = document.getElementById(id);
      var obj = {};
      var elms = form.querySelectorAll('input,textarea,select');
      for (var i = 0; i < elms.length; i++) {
        if(elms[i].id && elms[i].type === 'checkbox'){
          obj[elms[i].id] =  elms[i].checked;
        } else if(elms[i].name && elms[i].type === 'radio'){
          var valueRaio = form.querySelector('input[name="'+elms[i].name+'"]:checked').value;
          if(valueRaio){
              obj[elms[i].name] =  valueRaio;
          }
        } else if(elms[i].id) {
          obj[elms[i].id] =  elms[i].value;
        }
      }
      return obj;
    },
    formByObject: function(id, data){
      var form = document.getElementById(id);
      var elms = form.querySelectorAll('input,textarea,select');
      for (var i = 0; i < elms.length; i++) {
        if(elms[i].id && elms[i].type === 'checkbox'){
          elms[i].checked = data[elms[i].id];
        } else if(elms[i].name && elms[i].type === 'radio'){
          var inputRadio = form.querySelector('input[name="'+elms[i].name+'"][value="'+data[elms[i].name]+'"]');
          if(inputRadio){
            inputRadio.checked=true;
          }
        } else if(elms[i].id) {
          elms[i].value = data[elms[i].id];
        }
      }
    },
    clearForm: function(id){
      var form = document.getElementById(id);
      var elms = form.querySelectorAll('input,textarea,select');
      for (var i = 0; i < elms.length; i++) {
        if(elms[i].id && elms[i].type.indexOf('select') >= 0) {
          var options = elms[i].options;
          for (var iO = 0; iO < options.length; iO++) {
            if(options[iO].defaultSelected){
              elms[i].selectedIndex = iO;
              elms[i].found=true;
            }
          }
          if(!elms[i].found){
            elms[i].selectedIndex = 0;
          }
        } else if(elms[i].id && elms[i].type === 'checkbox') {
           elms[i].checked = elms[i].getAttribute('checked')!==null ? true : false;
        } else if(elms[i].name && elms[i].type === 'radio') {
          form.querySelector('input[name="'+elms[i].name+'"][checked]').checked=true;
        } else if(elms[i].id){
          elms[i].value = '';
        }
      }
    },
    show: function(id){
      document.getElementById(id).style.display='block';
    },
    hide: function(id){
      document.getElementById(id).style.display='none';
    },
    showHide: function(id){
      if(document.getElementById(id).offsetParent === null){
        this.show(id);
      } else {
        this.hide(id);
      }
    },
    focus: function(id){
      document.getElementById(id).focus();
    }
  }
})();
