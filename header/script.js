window.bindHeader = function(){
	window.Header.bind();
}
window.createHeader = function(elm, config){
	window.Header.create(elm, config);
}
window.Header = {
  bind : function(){
    var headers = document.querySelectorAll('.header');
    var self = this;
    for (var i = 0; i < headers.length; i++) {
    if(headers[i].config !== undefined) continue;
      var config = {};
      config.scrollHeight = Number(headers[i].getAttribute('scrollHeight'));
      config.topClasses = headers[i].getAttribute('topClasses');
      config.bottomClasses = headers[i].getAttribute('bottomClasses');
      config.enableTransition = headers[i].getAttribute('enableTransition');
      self.create(headers[i], config);
    }
  },
  create: function(elm, config){
    if(!elm.classList.contains('header')){
      elm.classList.add('header');
    }
    config.scrollHeight = config.scrollHeight || 100;
    config.topClasses = config.topClasses || "";
    config.topClasses = config.topClasses.split(" ");
    if(config.topClasses.length===1 && config.topClasses[0]==="")
        config.topClasses =  [];
    config.bottomClasses = config.bottomClasses || "";
    config.bottomClasses = config.bottomClasses.split(" ");
    if(config.bottomClasses.length===1 && config.bottomClasses[0]==="")
        config.bottomClasses = [];
    config.enableTransition = config.enableTransition === undefined || config.enableTransition === null || config.enableTransition === "true" || config.enableTransition === "1" || config.enableTransition === true;
    if(elm.config) {
      for(x in elm.config.bottomClasses)
        elm.classList.remove(elm.config.bottomClasses[x]);
    for(x in elm.config.topClasses)
        elm.classList.remove(elm.config.bottomClasses[x]);
    }
    elm.config = config;
    elm.parentNode.querySelectorAll('.content')[0].onscroll = function () {
      if(elm.parentNode.querySelectorAll('.content')[0].scrollTop <= elm.config.scrollHeight) {
        for(x in elm.config.topClasses)
          elm.classList.add(elm.config.topClasses[x]);
        for(x in elm.config.bottomClasses)
          elm.classList.remove(elm.config.bottomClasses[x]);
      } else {
        for(x in elm.config.bottomClasses)
          elm.classList.add(elm.config.bottomClasses[x]);
        for(x in elm.config.topClasses)
          elm.classList.remove(elm.config.topClasses[x]);
      }
    };
    if(elm.parentNode.querySelectorAll('.content')[0].scrollTop <= elm.config.scrollHeight) {
      for(x in elm.config.topClasses)
        elm.classList.add(elm.config.topClasses[x]);
      for(x in elm.config.bottomClasses)
        elm.classList.remove(elm.config.bottomClasses[x]);
    } else {
      for(x in elm.config.bottomClasses)
        elm.classList.add(elm.config.bottomClasses[x]);
      for(x in elm.config.topClasses)
        elm.classList.remove(elm.config.topClasses[x]);
    }
    if(elm.config.enableTransition) {
      elm.classList.add("transition-enabled");
    } else {
        elm.classList.remove("transition-enabled");
    }
    elm.update = function(config) {
      window.Header.create(elm, config);
    };
  }
}