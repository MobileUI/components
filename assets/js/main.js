$(document).ready(function(){
  $('textarea.bind-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    var border = $(block).attr('border')
    var absolute = $(block).attr('header-absolute')
    var replace = $(block).attr('replace')
    var hidden = $(block).attr('hidden')
    var heightPreview = $(block).attr('height-preview')
    var idResult = $(block).attr('id-result')
    var theme = 'default'
    if(replace) {
      replace = replace.split('|');
      for(var i in replace){
        code = code.replace(new RegExp(replace[i].split(',')[0], 'g'), replace[i].split(',')[1]);
      }
    }
    if(!mode) {
      mode = 'text/html'
    }
    var editor = CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
    if(absolute) {
      code = code.replace(new RegExp('"header', 'g'), '"header header-absolute')
    }
    var resultStyle = ''
    var resultClass = 'result'
    var attrs = ''
    if(border) {
      resultClass += ' with-border'
    }
    if(idResult){
      attrs += ' id="'+idResult+'" '
    }
    if(heightPreview) {
      resultStyle += 'height:'+heightPreview
      resultClass += ' height-change'
    }
    $(block).after('<div '+attrs+' class="'+resultClass+'" style="'+resultStyle+'">'+code+'<div class="cls"></div></div>')
  });

  var $document = $(document);
  var $element = $('.menuland');
  var className = 'hasScrolled';

  var checkScroll = function(){
    if ($document.scrollTop() >= 80) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  }
  var checkHashSection = function(){

  }

  checkScroll()
  checkHashSection()

  $document.scroll(function() {
    checkScroll()
    checkHashSection()
  });

})


window.openMenuLand = function(m){
  var m = document.getElementById(m);
  if(m.className.indexOf('menu') >= 0 && m.className.indexOf('open') < 0) {
    var e = document.createElement('div');
    e.className = 'backdrop backdrop-menu';
    $(m).parent().append(e)
    m.className += ' open';
    setTimeout(function(){
      e.className += ' show';
    });
    e.addEventListener('click', function(evt){
      m.className = m.className.replace('open','');
      e.className = e.className.replace('show','');
      setTimeout(function(){
        e.parentNode.removeChild(e);
      }, 500)
    }, false);
  }
}
