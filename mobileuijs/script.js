!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.superagent=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function e(a){return"[object Function]"===(d(a)?Object.prototype.toString.call(a):"")}var d=a("./is-object");b.exports=e},{"./is-object":2}],2:[function(a,b,c){function d(a){return null!==a&&"object"==typeof a}b.exports=d},{}],3:[function(a,b,c){function e(a){if(a)return f(a)}function f(a){for(var b in e.prototype)a[b]=e.prototype[b];return a}var d=a("./is-object");b.exports=e,e.prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,this},e.prototype.parse=function(b){return this._parser=b,this},e.prototype.responseType=function(a){return this._responseType=a,this},e.prototype.serialize=function(b){return this._serializer=b,this},e.prototype.timeout=function(b){if(!b||"object"!=typeof b)return this._timeout=b,this._responseTimeout=0,this;for(var c in b)switch(c){case"deadline":this._timeout=b.deadline;break;case"response":this._responseTimeout=b.response;break;default:console.warn("Unknown timeout option",c)}return this},e.prototype.retry=function(b){return 0!==arguments.length&&!0!==b||(b=1),b<=0&&(b=0),this._maxRetries=b,this._retries=0,this},e.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},e.prototype.then=function(b,c){if(!this._fullfilledPromise){var d=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise(function(a,b){d.end(function(c,d){c?b(c):a(d)})})}return this._fullfilledPromise.then(b,c)},e.prototype.catch=function(a){return this.then(void 0,a)},e.prototype.use=function(b){return b(this),this},e.prototype.ok=function(a){if("function"!=typeof a)throw Error("Callback required");return this._okCallback=a,this},e.prototype._isResponseOK=function(a){return!!a&&(this._okCallback?this._okCallback(a):a.status>=200&&a.status<300)},e.prototype.get=function(a){return this._header[a.toLowerCase()]},e.prototype.getHeader=e.prototype.get,e.prototype.set=function(a,b){if(d(a)){for(var c in a)this.set(c,a[c]);return this}return this._header[a.toLowerCase()]=b,this.header[a]=b,this},e.prototype.unset=function(a){return delete this._header[a.toLowerCase()],delete this.header[a],this},e.prototype.field=function(a,b){if(null===a||void 0===a)throw new Error(".field(name, val) name can not be empty");if(this._data&&console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"),d(a)){for(var c in a)this.field(c,a[c]);return this}if(Array.isArray(b)){for(var e in b)this.field(a,b[e]);return this}if(null===b||void 0===b)throw new Error(".field(name, val) val can not be empty");return"boolean"==typeof b&&(b=""+b),this._getFormData().append(a,b),this},e.prototype.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},e.prototype.withCredentials=function(a){return void 0==a&&(a=!0),this._withCredentials=a,this},e.prototype.redirects=function(a){return this._maxRedirects=a,this},e.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},e.prototype.send=function(a){var b=d(a),c=this._header["content-type"];if(this._formData&&console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"),b&&!this._data)Array.isArray(a)?this._data=[]:this._isHost(a)||(this._data={});else if(a&&this._data&&this._isHost(this._data))throw Error("Can't merge these send calls");if(b&&d(this._data))for(var e in a)this._data[e]=a[e];else"string"==typeof a?(c||this.type("form"),c=this._header["content-type"],this._data="application/x-www-form-urlencoded"==c?this._data?this._data+"&"+a:a:(this._data||"")+a):this._data=a;return!b||this._isHost(a)?this:(c||this.type("json"),this)},e.prototype.sortQuery=function(a){return this._sort=void 0===a||a,this},e.prototype._timeoutError=function(a,b,c){if(!this._aborted){var d=new Error(a+b+"ms exceeded");d.timeout=b,d.code="ECONNABORTED",d.errno=c,this.timedout=!0,this.abort(),this.callback(d)}},e.prototype._setTimeouts=function(){var a=this;this._timeout&&!this._timer&&(this._timer=setTimeout(function(){a._timeoutError("Timeout of ",a._timeout,"ETIME")},this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout(function(){a._timeoutError("Response timeout of ",a._responseTimeout,"ETIMEDOUT")},this._responseTimeout))}},{"./is-object":2}],4:[function(a,b,c){function e(a){if(a)return f(a)}function f(a){for(var b in e.prototype)a[b]=e.prototype[b];return a}var d=a("./utils");b.exports=e,e.prototype.get=function(a){return this.header[a.toLowerCase()]},e.prototype._setHeaderProperties=function(a){var b=a["content-type"]||"";this.type=d.type(b);var c=d.params(b);for(var e in c)this[e]=c[e];this.links={};try{a.link&&(this.links=d.parseLinks(a.link))}catch(a){}},e.prototype._setStatusProperties=function(a){var b=a/100|0;this.status=this.statusCode=a,this.statusType=b,this.info=1==b,this.ok=2==b,this.redirect=3==b,this.clientError=4==b,this.serverError=5==b,this.error=(4==b||5==b)&&this.toError(),this.accepted=202==a,this.noContent=204==a,this.badRequest=400==a,this.unauthorized=401==a,this.notAcceptable=406==a,this.forbidden=403==a,this.notFound=404==a}},{"./utils":6}],5:[function(a,b,c){var d=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];b.exports=function(b,c){return!!(b&&b.code&&~d.indexOf(b.code))||(!!(c&&c.status&&c.status>=500)||(!!(b&&"timeout"in b&&"ECONNABORTED"==b.code)||!!(b&&"crossDomain"in b)))}},{}],6:[function(a,b,c){c.type=function(a){return a.split(/ *; */).shift()},c.params=function(a){return a.split(/ *; */).reduce(function(a,b){var c=b.split(/ *= */),d=c.shift(),e=c.shift();return d&&e&&(a[d]=e),a},{})},c.parseLinks=function(a){return a.split(/ *, */).reduce(function(a,b){var c=b.split(/ *; */),d=c[0].slice(1,-1);return a[c[1].split(/ *= */)[1].slice(1,-1)]=d,a},{})},c.cleanHeader=function(a,b){return delete a["content-type"],delete a["content-length"],delete a["transfer-encoding"],delete a.host,b&&delete a.cookie,a}},{}],7:[function(a,b,c){function d(a){if(a)return e(a)}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}void 0!==b&&(b.exports=d),d.prototype.on=d.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks["$"+a]=this._callbacks["$"+a]||[]).push(b),this},d.prototype.once=function(a,b){function c(){this.off(a,c),b.apply(this,arguments)}return c.fn=b,this.on(a,c),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=d.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks["$"+a];if(!c)return this;if(1==arguments.length)return delete this._callbacks["$"+a],this;for(var d,e=0;e<c.length;e++)if((d=c[e])===b||d.fn===b){c.splice(e,1);break}return this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks["$"+a];if(c){c=c.slice(0);for(var d=0,e=c.length;d<e;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks["$"+a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}},{}],8:[function(a,b,c){function k(){}function n(a){if(!g(a))return a;var b=[];for(var c in a)o(b,c,a[c]);return b.join("&")}function o(a,b,c){if(null!=c)if(Array.isArray(c))c.forEach(function(c){o(a,b,c)});else if(g(c))for(var d in c)o(a,b+"["+d+"]",c[d]);else a.push(encodeURIComponent(b)+"="+encodeURIComponent(c));else null===c&&a.push(encodeURIComponent(b))}function p(a){for(var d,e,b={},c=a.split("&"),f=0,g=c.length;f<g;++f)d=c[f],e=d.indexOf("="),-1==e?b[decodeURIComponent(d)]="":b[decodeURIComponent(d.slice(0,e))]=decodeURIComponent(d.slice(e+1));return b}function q(a){var d,e,f,g,b=a.split(/\r?\n/),c={};b.pop();for(var h=0,i=b.length;h<i;++h)e=b[h],d=e.indexOf(":"),f=e.slice(0,d).toLowerCase(),g=m(e.slice(d+1)),c[f]=g;return c}function r(a){return/[\/+]json\b/.test(a)}function s(a){this.req=a,this.xhr=this.req.xhr,this.text="HEAD"!=this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var b=this.xhr.status;1223===b&&(b=204),this._setStatusProperties(b),this.header=this.headers=q(this.xhr.getAllResponseHeaders()),this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&a._responseType?this.body=this.xhr.response:this.body="HEAD"!=this.req.method?this._parseBody(this.text?this.text:this.xhr.response):null}function t(a,b){var c=this;this._query=this._query||[],this.method=a,this.url=b,this.header={},this._header={},this.on("end",function(){var a=null,b=null;try{b=new s(c)}catch(b){return a=new Error("Parser is unable to parse the response"),a.parse=!0,a.original=b,c.xhr?(a.rawResponse=void 0===c.xhr.responseType?c.xhr.responseText:c.xhr.response,a.status=c.xhr.status?c.xhr.status:null,a.statusCode=a.status):(a.rawResponse=null,a.status=null),c.callback(a)}c.emit("response",b);var d;try{c._isResponseOK(b)||(d=new Error(b.statusText||"Unsuccessful HTTP response"),d.original=a,d.response=b,d.status=b.status)}catch(a){d=a}d?c.callback(d,b):c.callback(null,b)})}function u(a,b,c){var d=l("DELETE",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d}var d;"undefined"!=typeof window?d=window:"undefined"!=typeof self?d=self:(console.warn("Using browser-only version of superagent in non-browser environment"),d=this);var e=a("component-emitter"),f=a("./request-base"),g=a("./is-object"),h=a("./is-function"),i=a("./response-base"),j=a("./should-retry"),l=c=b.exports=function(a,b){return"function"==typeof b?new c.Request("GET",a).end(b):1==arguments.length?new c.Request("GET",a):new c.Request(a,b)};c.Request=t,l.getXHR=function(){if(!(!d.XMLHttpRequest||d.location&&"file:"==d.location.protocol&&d.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(a){}throw Error("Browser-only verison of superagent could not find XHR")};var m="".trim?function(a){return a.trim()}:function(a){return a.replace(/(^\s*|\s*$)/g,"")};l.serializeObject=n,l.parseString=p,l.types={html:"text/html",json:"application/json",xml:"application/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},l.serialize={"application/x-www-form-urlencoded":n,"application/json":JSON.stringify},l.parse={"application/x-www-form-urlencoded":p,"application/json":JSON.parse},i(s.prototype),s.prototype._parseBody=function(a){var b=l.parse[this.type];return this.req._parser?this.req._parser(this,a):(!b&&r(this.type)&&(b=l.parse["application/json"]),b&&a&&(a.length||a instanceof Object)?b(a):null)},s.prototype.toError=function(){var a=this.req,b=a.method,c=a.url,d="cannot "+b+" "+c+" ("+this.status+")",e=new Error(d);return e.status=this.status,e.method=b,e.url=c,e},l.Response=s,e(t.prototype),f(t.prototype),t.prototype.type=function(a){return this.set("Content-Type",l.types[a]||a),this},t.prototype.accept=function(a){return this.set("Accept",l.types[a]||a),this},t.prototype.auth=function(a,b,c){switch("object"==typeof b&&null!==b&&(c=b),c||(c={type:"function"==typeof btoa?"basic":"auto"}),c.type){case"basic":this.set("Authorization","Basic "+btoa(a+":"+b));break;case"auto":this.username=a,this.password=b;break;case"bearer":this.set("Authorization","Bearer "+a)}return this},t.prototype.query=function(a){return"string"!=typeof a&&(a=n(a)),a&&this._query.push(a),this},t.prototype.attach=function(a,b,c){if(b){if(this._data)throw Error("superagent can't mix .send() and .attach()");this._getFormData().append(a,b,c||b.name)}return this},t.prototype._getFormData=function(){return this._formData||(this._formData=new d.FormData),this._formData},t.prototype.callback=function(a,b){if(this._maxRetries&&this._retries++<this._maxRetries&&j(a,b))return this._retry();var c=this._callback;this.clearTimeout(),a&&(this._maxRetries&&(a.retries=this._retries-1),this.emit("error",a)),c(a,b)},t.prototype.crossDomainError=function(){var a=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");a.crossDomain=!0,a.status=this.status,a.method=this.method,a.url=this.url,this.callback(a)},t.prototype.buffer=t.prototype.ca=t.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},t.prototype.pipe=t.prototype.write=function(){throw Error("Streaming is not supported in browser version of superagent")},t.prototype._appendQueryString=function(){var a=this._query.join("&");if(a&&(this.url+=(this.url.indexOf("?")>=0?"&":"?")+a),this._sort){var b=this.url.indexOf("?");if(b>=0){var c=this.url.substring(b+1).split("&");h(this._sort)?c.sort(this._sort):c.sort(),this.url=this.url.substring(0,b)+"?"+c.join("&")}}},t.prototype._isHost=function(b){return b&&"object"==typeof b&&!Array.isArray(b)&&"[object Object]"!==Object.prototype.toString.call(b)},t.prototype.end=function(a){return this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=a||k,this._appendQueryString(),this._end()},t.prototype._end=function(){var a=this,b=this.xhr=l.getXHR(),c=this._formData||this._data;this._setTimeouts(),b.onreadystatechange=function(){var c=b.readyState;if(c>=2&&a._responseTimeoutTimer&&clearTimeout(a._responseTimeoutTimer),4==c){var d;try{d=b.status}catch(a){d=0}if(!d){if(a.timedout||a._aborted)return;return a.crossDomainError()}a.emit("end")}};var d=function(b,c){c.total>0&&(c.percent=c.loaded/c.total*100),c.direction=b,a.emit("progress",c)};if(this.hasListeners("progress"))try{b.onprogress=d.bind(null,"download"),b.upload&&(b.upload.onprogress=d.bind(null,"upload"))}catch(a){}try{this.username&&this.password?b.open(this.method,this.url,!0,this.username,this.password):b.open(this.method,this.url,!0)}catch(a){return this.callback(a)}if(this._withCredentials&&(b.withCredentials=!0),!this._formData&&"GET"!=this.method&&"HEAD"!=this.method&&"string"!=typeof c&&!this._isHost(c)){var e=this._header["content-type"],f=this._serializer||l.serialize[e?e.split(";")[0]:""];!f&&r(e)&&(f=l.serialize["application/json"]),f&&(c=f(c))}for(var g in this.header)null!=this.header[g]&&this.header.hasOwnProperty(g)&&b.setRequestHeader(g,this.header[g]);return this._responseType&&(b.responseType=this._responseType),this.emit("request",this),b.send(void 0!==c?c:null),this},l.get=function(a,b,c){var d=l("GET",a);return"function"==typeof b&&(c=b,b=null),b&&d.query(b),c&&d.end(c),d},l.head=function(a,b,c){var d=l("HEAD",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},l.options=function(a,b,c){var d=l("OPTIONS",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},l.del=u,l.delete=u,l.patch=function(a,b,c){var d=l("PATCH",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},l.post=function(a,b,c){var d=l("POST",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d},l.put=function(a,b,c){var d=l("PUT",a);return"function"==typeof b&&(c=b,b=null),b&&d.send(b),c&&d.end(c),d}},{"./is-function":1,"./is-object":2,"./request-base":3,"./response-base":4,"./should-retry":5,"component-emitter":7}]},{},[8])(8)});


(function() {
  var observerWatchers = [];
  var tokenObserver = 0;
  var dataBind = function(){
    var elms = document.querySelectorAll('[data]');
    for (var i = 0; i < elms.length; i++) {
      if(elms[i].getAttribute('data') && !elms[i].getAttribute('data-binded')){
        var data = elms[i].getAttribute('data');
        data = fetchFromObject(window, data);
        if(data){
          writeElement(elms[i], data);
          elms[i].setAttribute('data-binded','mobileui');
          dataObserver(elms[i].getAttribute('data'), tokenObserver++);
        } else {
        }
      }
    }
    eventLoopBind();
  }
  eventLoopBind = function(){
    setTimeout(function(){
      dataBind();
    },100);
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
      //valid funcionBind
      //TODO: Improve performance and logic
      var functionBind = html.split('$$');
      for (var i = 1; i < functionBind.length; i++) {
        var prop = functionBind[i].split('{')[1].split(',')[0].split('}')[0];
        var value = fetchFromObject(dataObj,prop);
        var functionName = functionBind[i].split('{')[0];
        var functionReplace = functionBind[i].split('}')[0] + '}';
        var functionInvoke = 'window.MobileUI.' + functionBind[i].split('}')[0].replace(prop, "'"+value+"'").replace('{','(') + ')';
        var valueBind = eval(functionInvoke);
        html = html.replace(new RegExp('\\$\\$'+functionReplace, 'g'), valueBind);
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
        return !obj ? '' : obj;
      }
      return !obj[prop] ? '' : obj[prop];
  }
  dispatchEventObserver = function(watcher){
    var customEvent = new CustomEvent("dataUpdated",{ "detail": {dataKey:watcher.dataKey, dataValue: watcher.dataValue}});
    document.dispatchEvent(customEvent);
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
      dispatchEventObserver(observerWatchers[token]);
    } else if(observerWatchers[token].dataValue.constructor === Array && observerWatchers[token].dataValue.toString() !== observer.toString()){
      //TODO: Improve logic for performance
      reDataBind(observerWatchers[token]);
      dispatchEventObserver(observerWatchers[token]);
    } else if(JSON.stringify(observerWatchers[token].dataValue) !== JSON.stringify(observer)){
      //TODO: Improve logic for performance
      reDataBind(observerWatchers[token]);
      dispatchEventObserver(observerWatchers[token]);
    }
    setTimeout(function(){ dataObserver(data, token) }, 100);
  }
  copyObj = function(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  dataBind();

  //Functions Help
  window.MobileUI = {
    bind: function(){
      dataBind();
    },
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
    disable: function(id){
      var form = document.getElementById(id);
      var elms = form.querySelectorAll('input,textarea,select,button,a');
      for (var i = 0; i < elms.length; i++) {
          elms[i].setAttribute('disabled','disabled');
      }
    },
    enable: function(id){
      var form = document.getElementById(id);
      var elms = form.querySelectorAll('input,textarea,select,button,a');
      for (var i = 0; i < elms.length; i++) {
          elms[i].removeAttribute('disabled');
      }
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
        } else if(elms[i].id && data[elms[i].id]) {
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
    },
    formatMoney: function(n, c, d, t){
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;
     return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    },
    ajax: superagent
  }
})();
