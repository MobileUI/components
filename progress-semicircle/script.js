window.ProgressSemicircle = {
  rebind : function(){
    var self = this;
    var progress = document.querySelectorAll('.progress-semicircle');
    for (var i = 0; i < progress.length; i++) {
      progress[i].classList.remove("binded");
      progress[i].innerHTML = "";
    }
    self.bind();
  },
  bind : function(){
    var progress = document.querySelectorAll('.progress-semicircle:not(.binded)');
    var self = this;
    for (var i = 0; i < progress.length; i++) {
      var config = {};
      config.value = Number(progress[i].getAttribute('value'));
      config.maxValue = Number(progress[i].getAttribute('maxValue')) || 100;
      config.title = progress[i].getAttribute('title') || '';
      config.subTitle = progress[i].getAttribute('subTitle') || '';
      config.text = progress[i].getAttribute('text') || '';
      config.color = progress[i].getAttribute('color') || 'blue';
      config.textColor = progress[i].getAttribute('textColor') || 'grey-800';
      config.textWeight = progress[i].getAttribute('textWeight') || 'normal';
      config.titleWeight = progress[i].getAttribute('titleWeight') || 'normal';
      config.titleLineHeight = progress[i].getAttribute('titleLineHeight') || 'normal';
      config.subTitleWeight = progress[i].getAttribute('subTitleWeight') || 'normal';
      config.titleColor = progress[i].getAttribute('titleColor') || 'grey-500';
      config.subTitleColor = progress[i].getAttribute('subTitleColor') || 'grey-300';
      config.width = progress[i].getAttribute('width') || '100%';
      config.height = progress[i].getAttribute('height') || '300px';
      config.trailColor = progress[i].getAttribute('trailColor') || 'grey';
      config.strokeWidth = progress[i].getAttribute('strokeWidth') || '1';
      config.trailWidth = progress[i].getAttribute('trailWidth') || '1';
      config.textSize = progress[i].getAttribute('textSize') || '16px';
      config.titleSize = progress[i].getAttribute('titleSize') || '14px';
      config.subTitleSize = progress[i].getAttribute('subTitleSize') || '12px';
      config.fill = progress[i].getAttribute('fill') || '';
      config.padding = progress[i].getAttribute('padding') || '0';
      config.textMargin = progress[i].getAttribute('textMargin') || '100px 0';
      config.durationAnimate = Number(progress[i].getAttribute('duration') || '800');
      self.create(progress[i], config);
    }
  },
  create: function(elm, config){
    if(!elm.classList.contains('binded')){
      elm.classList.add('binded');
      if(!elm.classList.contains('progress-semicircle')){
        elm.classList.add('progress-semicircle-js')
      }
      config.value = config.value || 0;
      config.maxValue = config.maxValue || 100;
      config.title = config.title || '';
      config.subTitle = config.subTitle || '';
      config.text = config.text || '';
      config.color = config.color || 'blue';
      config.textColor = config.textColor || 'grey-800';
      config.textWeight = config.textWeight || 'normal';
      config.titleWeight = config.titleWeight || 'normal';
      config.subTitleWeight = config.subTitleWeight || 'normal';
      config.titleColor = config.titleColor || 'grey-500';
      config.subTitleColor = config.subTitleColor || 'grey-300';
      config.width = config.width || '100%';
      config.height = config.height || '300px';
      config.trailColor = config.trailColor || 'grey';
      config.strokeWidth = config.strokeWidth || '1';
      config.trailWidth = config.trailWidth || '1';
      config.textSize = config.textSize || '16px';
      config.titleSize = config.titleSize || '14px';
      config.subTitleSize = config.subTitleSize || '12px';
      config.fill = config.fill || '';
      config.padding = config.padding || '0';
      config.durationAnimate = config.durationAnimate || '800';
      config.textMargin = config.textMargin || '100px 0';
      elm.style.width=config.width;
      elm.style.height=config.height;
      elm.progressSemicircle = {};
      elm.progressSemicircle.bar = new ProgressBar.SemiCircle(elm, {
        color: colorsMobileUI[config.color],
        trailColor: colorsMobileUI[config.trailColor],
        strokeWidth: config.strokeWidth,
        trailWidth: config.trailWidth,
        easing: 'easeInOut',
        duration: config.durationAnimate,
        fill: config.fill,
        text: {
          alignToBottom: false,
          style: {
            color: colorsMobileUI[config.textColor],
            position: 'absolute',
            fontSize: config.textSize,
            fontWeight: config.textWeight,
            left: '50%',
            padding: 0,
            margin: config.textMargin,
          }
        },
        svgStyle: {
            display: 'block',
            width: config.width,
            height: config.height,
            padding: config.padding
        },
        from: { color: colorsMobileUI[config.color], width: config.strokeWidth },
        to: { color: colorsMobileUI[config.color], width: config.strokeWidth },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var valueInner = Math.round(circle.value() * config.maxValue);
          var valueText = '';
          if(config.title){
            var style = 'style="';
            if(config.titleSize) style += ';font-size:'+config.titleSize;
            if(config.titleWeight) style += ';font-weight:'+config.titleWeight;
            if(config.titleLineHeight) style += ';line-height:'+config.titleLineHeight;
            if(config.titleColor) style += ';color:'+colorsMobileUI[config.titleColor];
            style += '"';
            valueText += '<div '+style+' class="progress-semicircle-title">'+config.title+'</div>'
          }
          valueText += valueInner + config.text;
          if(config.subTitle){
            var style = 'style="';
            if(config.subTitleSize) style += ';font-size:'+config.subTitleSize;
            if(config.subTitleWeight) style += ';font-weight:'+config.subTitleWeight;
            if(config.subTitleColor) style += ';color:'+colorsMobileUI[config.subTitleColor];
            style += '"';
            valueText += '<div '+style+' class="progress-semicircle-subtitle">'+config.subTitle+'</div>'
          }
          circle.setText(valueText);

        }
      });
      elm.progressSemicircle.update = function(v){
        var valueBar = 0;
        if(v <= config.maxValue && v >= 0) {
          valueBar = v/config.maxValue;
        } else if(v < 0) {
          console.warn("Value for progress semicircle is too small. (Requested value is "+v+")");
        } else {
          console.warn("Value for progress semicircle is too high. Maximum is "+config.maxValue+" and requested value is "+v+". (Value set to maximum for now.)")
          valueBar=1;
        }
        this.bar.animate(valueBar);
      }
      elm.progressSemicircle.update(config.value);
    }
  }
}
