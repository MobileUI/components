var theme = 'default'
var mode = 'text/html'
var idGenerate = 100

SO.code=1;

$(document).ready(function(){
  var animeBanner = function(){
    $('.hero-cards').clearQueue().stop().animate({ marginTop: "0" }, 1000, function() {
      $('.hero-card-2').clearQueue().stop().animate({ left: "-=250" }, 1000, function() {
        $('.hero-card-4').clearQueue().stop().animate({ left: "-=400" }, 1000, function() {
          $('.hero-card-6').clearQueue().stop().animate({ left: "-=500" }, 1000, function() {

          });
        });
      });
      $('.hero-card-3').clearQueue().stop().animate({ left: "+=250" }, 1000, function() {
        $('.hero-card-5').clearQueue().stop().animate({ left: "+=400" }, 1000, function() {
          $('.hero-card-7').clearQueue().stop().animate({ left: "+=500" }, 1000, function() {

          });
        });
      });
    });
  }

  var tmpImg = new Image();
  tmpImg.src = '/img/sprite.jpg';
  tmpImg.onload = function() {
    $('.hero-cards').css('visibility','visible');
    animeBanner();
  };

  $(window).resize(function() {
    $('.hero-card-2').clearQueue().stop();
    $('.hero-card-3').clearQueue().stop();
    $('.hero-card-4').clearQueue().stop();
    $('.hero-card-5').clearQueue().stop();
    $('.hero-card-6').clearQueue().stop();
    $('.hero-card-7').clearQueue().stop();
    $('.hero-card-8').clearQueue().stop();

    $('.hero-card-2').removeAttr('style');
    $('.hero-card-3').removeAttr('style');
    $('.hero-card-4').removeAttr('style');
    $('.hero-card-5').removeAttr('style');
    $('.hero-card-6').removeAttr('style');
    $('.hero-card-7').removeAttr('style');
    $('.hero-card-8').removeAttr('style');
    animeBanner();
  });

  $('textarea.bind-code-example').each(function(i, block) {
    if($(block).attr('mode')) {
      mode = $(block).attr('mode')
    }
    CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  });
  $('textarea.bind-just-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    console.log(mode)
    CodeMirror.fromTextArea(block, {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  });
  $('textarea.bind-code').each(function(i, block) {
    var code = $(block).val()
    var mode = $(block).attr('mode')
    var border = $(block).attr('border')
    var absolute = $(block).attr('header-absolute')
    var replace = $(block).attr('replace')
    var hidden = $(block).attr('hidden')
    var multiplatform = $(block).attr('multiplatform')
    var heightPreview = $(block).attr('height-preview')
    var idResult = $(block).attr('id-result')
    var customClass = $(block).attr('custom-class')
    if(replace) {
      replace = replace.split('|');
      for(var i in replace){
        code = code.replace(new RegExp(replace[i].split(',')[0], 'g'), replace[i].split(',')[1]);
      }
    }
    if(absolute) {
      code = code.replace(new RegExp('"header', 'g'), '"header header-absolute')
    }
    var resultStyle = ''
    var resultClass = 'result'
    var id = idResult ? idResult : ++idGenerate;
    $(block).attr('id',id+'_code');
    var attrs = ' id="'+id+'" '
    if(border) {
      resultClass += ' with-border'
    }
    if(heightPreview) {
      resultStyle += 'height:'+heightPreview
      resultClass += ' height-change'
    }
    if(customClass) {
      resultClass += ' ' + customClass;
    }
    var divHeader = '<div class="header-bind-code">';
    if(multiplatform) {
      divHeader += '<button class="small border-green" onclick="previewPlatform(this, '+id+', 1)">Preview Android</button>';
      divHeader += '<button class="small" onclick="previewPlatform(this, '+id+', 2)">Preview iOS</button>';
    } else {
      divHeader += '<button class="small border-green" onclick="showPreview(this, '+id+')">Preview</button>';
    }
    divHeader += '<button class="small" onclick="showCode(this, '+id+')">Code</button>';
    divHeader += '</div>'
    $(block).after(divHeader+'<div '+attrs+' class="'+resultClass+'" style="'+resultStyle+'">'+code+'<div class="cls"></div></div><div class="line"></div>')
  });

  var $document = $(document);
  var $element = $('.menuland');
  var className = 'hasScrolled';

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  }

  var checkScroll = function(){
    if ($document.scrollTop() >= 580) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  }
  var checkHashSection = function(){
    var found=false;
    $('.content-doc-reader').each(function(i,e){
      if(!found) {
        if(checkVisible(e)){
          found=true;
          var idDoc = $(e).find('h2.title-doc').attr('id');
          $('.menuland a').removeClass('active');
          $('.menuland a[href="#'+idDoc+'"]').addClass('active');
          window.history.replaceState("", document.title, '#'+idDoc);
        }
      }
    });
  }

  checkScroll()
  checkHashSection()

  $document.scroll(function() {
    checkScroll()
    checkHashSection()
  });

  $('.tableDoc').each(function(i,e){
    var elm = $(e);
    if((elm.find('tr').length-1) > 4) {
      var trs = elm.find('tr')
      for(i in trs){
        if(i > 4) {
            $(trs[i]).addClass('hidden')
        }
      }
      var bt = $('<button class="show-doc">Show all '+(elm.find('tr').length-1)+' features.</button>');
      bt.click(function(){
        if($(this).text().indexOf('Hide') < 0) {
          $(this).prev().find('tr').removeClass('hidden')
          $(this).text('Hide features table');
        } else {
          $(this).text('Show all '+($(this).prev().find('tr').length-1)+' features');
          var trs = $(this).prev().find('tr')
          for(i in trs){
            if(i > 4) {
                $(trs[i]).addClass('hidden')
            }
          }
          $document.scrollTop($(this).position().top - 295)
        }
      });
      elm.parent().after(bt);
    }
  });

})

window.showPreview = function(e, id){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).removeClass('hidden');
  if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
    $('textarea[id="'+id+'_code"]').next().addClass('hidden');
  }
}

window.showCode = function(e, id){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).addClass('hidden');
  if(!$('textarea[id="'+id+'_code"]').is('.binded')){
    $('textarea[id="'+id+'_code"]').addClass('binded');
    $('#'+id).after($('textarea[id="'+id+'_code"]'));
    CodeMirror.fromTextArea($('textarea[id="'+id+'_code"]')[0], {
      lineNumbers: false,
      mode: mode,
      theme: theme,
      readOnly: true
    });
  } else {
    if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
      $('textarea[id="'+id+'_code"]').next().removeClass('hidden');
    }
  }
}

window.previewPlatform = function(e, id, p){
  $(e).parent().find('.border-green').removeClass('border-green');
  $(e).addClass('border-green');
  $('#'+id).removeClass('hidden');
  if($('textarea[id="'+id+'_code"]').next().is('.CodeMirror')){
    $('textarea[id="'+id+'_code"]').next().addClass('hidden');
  }
  if(p === 1){
    $('#'+id).removeClass('platform-ios').addClass('platform-android');
    SO.code = 1;
    $('#'+id).css('max-width','400px');
  } else {
    $('#'+id).removeClass('platform-android').addClass('platform-ios');
    SO.code = 2;
    $('#'+id).css('max-width','320px');
  }
}
