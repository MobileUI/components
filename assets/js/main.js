var theme = 'default'
var mode = 'text/html'
var idGenerate = 100

if(window.SO) {
  window.SO.code = 1;
} else {
  window.SO = {
    code : 1
  }
}

$(document).ready(function(){
  $('#searchComponent input').keyup(function(e){
    var value = this.value;
    if(value) {
      $('.menuland ul a').addClass('hidden');
      $('.menuland h1').addClass('hidden');
      $('.menuland ul li').each(function(i, e){
        if($(e).text().toUpperCase().indexOf(value.toUpperCase()) >= 0){
          $(e).parent().removeClass('hidden');
          $(e).parent().parent().prev().removeClass('hidden');
        }
      });
    } else {
      $('.menuland ul a ').removeClass('hidden');
      $('.menuland h1').removeClass('hidden');
    }
    if(e.keyCode === 40 || e.keyCode === 38){
      moveFocusMenu(e.keyCode);
    } else if(e.keyCode === 13){
      selectMovedMenu();
    }
  });
  var moveFocusMenu = function(keyCode){
    if(keyCode === 40){
      var elmFocus = $('.menuland ul li.move-focus:visible');
      if(!elmFocus.length && $('.menuland ul li:visible').length){
        $($('.menuland ul li:visible')[0]).addClass('move-focus');
      } else {
        var moveNextBind = false;
        $('.menuland ul li:visible').each(function(i, e){
          if($(e).is('.move-focus') && !moveNextBind){
            $($('.menuland ul li:visible')[i+1]).addClass('move-focus');
            $(e).removeClass('move-focus');
            moveNextBind=true;
          }
        });
      }
    } else {
      var elmFocus = $('.menuland ul li.move-focus:visible');
      if(!elmFocus.length && $('.menuland ul li:visible').length){
        $($('.menuland ul li:visible').last()).addClass('move-focus');
      } else {
        var moveNextBind = false;
        $('.menuland ul li:visible').each(function(i, e){
          if($(e).is('.move-focus') && !moveNextBind){
            $($('.menuland ul li:visible')[i-1]).addClass('move-focus');
            $(e).removeClass('move-focus');
            moveNextBind=true;
          }
        });
      }
    }
  }
  var selectMovedMenu = function(){
    var elmFocus = $('.menuland ul li.move-focus:visible');
    if(elmFocus.length){
      elmFocus.parent()[0].click();
      setTimeout(function(){
        $('#searchComponent input').focus();
      }, 200);
    }
  }
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

    $('.hero-card-2').removeAttr('style');
    $('.hero-card-3').removeAttr('style');
    $('.hero-card-4').removeAttr('style');
    $('.hero-card-5').removeAttr('style');
    $('.hero-card-6').removeAttr('style');
    $('.hero-card-7').removeAttr('style');
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
    var execMobileuiBind = $(block).attr('exec-mobileui-bind')
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
    if(code.indexOf('openPage(') >= 0) {
      code = code.replace('openPage(','openPageDemo('+id+',');
    }
    $(block).after(divHeader+'<div '+attrs+' class="'+resultClass+'" style="'+resultStyle+'">'+code+'<div class="cls"></div></div><div class="line"></div>')
    if(execMobileuiBind){
      setTimeout(function(){
        if(MobileUI && MobileUI.bind){
          MobileUI.bind();
        }
        bindProgressCircle();
      },500);
    }
  });

  var $document = $(document);
  var $element = $('.menuland');
  var className = 'hasScrolled';

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return (rect.top <= 0 && rect.bottom > 0);
  }

  window.goDoc = function (idDoc){
    ga('set', 'page', '/'+idDoc);
    ga('send', 'pageview');
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
          var movedLink = $('.menuland ul li.move-focus:visible');
          if(movedLink.length && movedLink.parent().attr('href') != "#'+idDoc+'" && $('.menuland a[href="#'+idDoc+'"]').is(':visible')){
            movedLink.removeClass('move-focus');
            $('.menuland a[href="#'+idDoc+'"] li').addClass('move-focus');
          }
          if(location.hash !== '#'+idDoc){
            ga('set', 'page', '/'+idDoc);
            ga('send', 'pageview');
          }
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

window.openPageDemo = function(id, p, params, callback){
  if(arguments.length===3) {
    callback = params
  }
  var xhttp = new XMLHttpRequest();
  if(p.indexOf('.html') < 0){
    p =p+'.html';
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var page = this.responseText;
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('openPage(', 'openPageDemo('+id+',');
      page = page.replace('backPage()','backPage(\''+p+'\')');
      var body = document.getElementById(id)
      var div = document.createElement('div')
      div.setAttribute('class','box-block')
      div.setAttribute('id',p)
      div.innerHTML = page;
      body.appendChild(div)
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
      newClass += ' show';
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
  };
  xhttp.open("GET", p + '?cache='+new Date().getTime(), true);
  xhttp.send();
}

window.openPopoverLand = function(p){
  var button = event.target;
  var rect = button.getBoundingClientRect();
  var name = p;
  var p = document.getElementById(p);
  var e = document.createElement('div');
  e.className = 'backdrop backdrop-popover';
  p.parentNode.appendChild(e);
  e.addEventListener('click', function(evt){
    window.closePopover(name);
  });
  p.addEventListener('click', function(evt){
    window.closePopover(name);
  });
  p.style += ';top: 110%;right: 10px;transform-origin: right top 0px;transform: scale(1);';
  p.classList.add('show');
  if(SO.code === 2) {
    p.style.top = '45px';
    p.style.right = '5px';
    var divArrow = document.createElement('div');
    divArrow.classList.add('popover-arrow');
    p.parentNode.appendChild(divArrow);
    divArrow.setAttribute('style','top:40px;right:15px');
  } else {
    var pHeight = p.clientHeight;
    var pWidth = p.clientWidth;
    p.style.height = 0;
    p.style.width = 0;
    p.style.top = '5px';
    setTimeout(function(){
      var style = p.getAttribute('style');
      style += ' ;-webkit-transition: all 200ms ease;transition: all 200ms ease;';
      p.setAttribute('style', style);
      p.style.height = pHeight+'px';
      p.style.width = pWidth+'px';
    })
  }
}
window.loadingLand = function(message){
  var configLoading = {};
  if(typeof message === "object"){
    configLoading = message;
  } else {
    configLoading.message = message;
  }
  if(!configLoading.id){
    configLoading.id = 'LOADING'+new Date().getTime();
  }
  var body = document.getElementsByTagName('body')[0];
  if(event.target.parentNode.className.indexOf('body') >= 0) {
    body = event.target.parentNode;
  }

  var e = document.createElement('div');
  e.className = 'backdrop show backdrop-alert';
  e.id = configLoading.id + '_BACKDROP';
  body.parentNode.appendChild(e);

  var alertMobileUI = document.createElement('div');
  alertMobileUI.className = 'alert-mobileui alert-loading';
  alertMobileUI.id = configLoading.id;
  e.parentNode.appendChild(alertMobileUI);

  var alertContent = document.createElement('div');
  configLoading.class = 'white';
  alertContent.className = 'alert ' + configLoading.class;
  if(!window.SO || SO.code !== 2){
    alertContent.innerHTML = '<svg class="loading-circle" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg>';
  } else {
    alertContent.innerHTML = '<div class="loading-circle"><svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 27 27"><path d="M18.696,10.5c-0.275-0.479-0.113-1.09,0.365-1.367l4.759-2.751c0.482-0.273,1.095-0.11,1.37,0.368 c0.276,0.479,0.115,1.092-0.364,1.364l-4.764,2.751C19.583,11.141,18.973,10.977,18.696,10.5z"/><path d="M16.133,6.938l2.75-4.765c0.276-0.478,0.889-0.643,1.367-0.366c0.479,0.276,0.641,0.886,0.365,1.366l-2.748,4.762 C17.591,8.415,16.979,8.58,16.5,8.303C16.021,8.027,15.856,7.414,16.133,6.938z"/><path d="M13.499,7.5c-0.552,0-1-0.448-1-1.001V1c0-0.554,0.448-1,1-1c0.554,0,1.003,0.447,1.003,1v5.499 C14.5,7.053,14.053,7.5,13.499,7.5z"/><path d="M8.303,10.5c-0.277,0.477-0.888,0.641-1.365,0.365L2.175,8.114C1.697,7.842,1.532,7.229,1.808,6.75 c0.277-0.479,0.89-0.642,1.367-0.368l4.762,2.751C8.416,9.41,8.58,10.021,8.303,10.5z"/><path d="M9.133,7.937l-2.75-4.763c-0.276-0.48-0.111-1.09,0.365-1.366c0.479-0.277,1.09-0.114,1.367,0.366l2.75,4.765 c0.274,0.476,0.112,1.088-0.367,1.364C10.021,8.581,9.409,8.415,9.133,7.937z"/><path d="M6.499,14.5H1c-0.554,0-1-0.448-1-1c0-0.554,0.447-1.001,1-1.001h5.499c0.552,0,1.001,0.448,1.001,1.001 C7.5,14.052,7.052,14.5,6.499,14.5z"/><path d="M8.303,16.502c0.277,0.478,0.113,1.088-0.365,1.366l-4.762,2.749c-0.478,0.273-1.091,0.112-1.368-0.366 c-0.276-0.479-0.111-1.089,0.367-1.368l4.762-2.748C7.415,15.856,8.026,16.021,8.303,16.502z"/><path d="M10.866,20.062l-2.75,4.767c-0.277,0.475-0.89,0.639-1.367,0.362c-0.477-0.277-0.642-0.886-0.365-1.365l2.75-4.764 c0.277-0.477,0.888-0.638,1.366-0.365C10.978,18.974,11.141,19.585,10.866,20.062z"/><path d="M13.499,19.502c0.554,0,1.003,0.448,1.003,1.002v5.498c0,0.55-0.448,0.999-1.003,0.999c-0.552,0-1-0.447-1-0.999v-5.498 C12.499,19.95,12.946,19.502,13.499,19.502z"/><path d="M17.867,19.062l2.748,4.764c0.275,0.479,0.113,1.088-0.365,1.365c-0.479,0.276-1.091,0.112-1.367-0.362l-2.75-4.767 c-0.276-0.477-0.111-1.088,0.367-1.365C16.979,18.424,17.591,18.585,17.867,19.062z"/><path d="M18.696,16.502c0.276-0.48,0.887-0.646,1.365-0.367l4.765,2.748c0.479,0.279,0.64,0.889,0.364,1.368 c-0.275,0.479-0.888,0.64-1.37,0.366l-4.759-2.749C18.583,17.59,18.421,16.979,18.696,16.502z"/><path d="M25.998,12.499h-5.501c-0.552,0-1.001,0.448-1.001,1.001c0,0.552,0.447,1,1.001,1h5.501c0.554,0,1.002-0.448,1.002-1 C27,12.946,26.552,12.499,25.998,12.499z"/></svg></div>';
  }
  if(configLoading.message) {
    alertContent.innerHTML += '<p>'+configLoading.message+'</p>';
  }
  alertMobileUI.appendChild(alertContent);

  setTimeout(function(){
    closeLoading();
  },3000)
}

window.loadingLandElement = function(e, message, position, color){
  e = document.getElementById(e);
  var withMessage = message ? 'with-message' : '';
  if(!color){
    color = 'white-loading';
  } else {
    color = '';
  }
  if(!position) {
    position = '';
  }
  var divLoading = document.createElement('div');
  var spinner = '';
  if(!window.SO || SO.code !== 2){
    spinner = '<svg class="loading-circle loading-element '+color+' '+withMessage+' '+position+'" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="15"></svg>';
  } else {
    spinner = '<svg class="loading-circle loading-element '+color+' '+withMessage+' '+position+'" xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 27 27"><path d="M18.696,10.5c-0.275-0.479-0.113-1.09,0.365-1.367l4.759-2.751c0.482-0.273,1.095-0.11,1.37,0.368 c0.276,0.479,0.115,1.092-0.364,1.364l-4.764,2.751C19.583,11.141,18.973,10.977,18.696,10.5z"/><path d="M16.133,6.938l2.75-4.765c0.276-0.478,0.889-0.643,1.367-0.366c0.479,0.276,0.641,0.886,0.365,1.366l-2.748,4.762 C17.591,8.415,16.979,8.58,16.5,8.303C16.021,8.027,15.856,7.414,16.133,6.938z"/><path d="M13.499,7.5c-0.552,0-1-0.448-1-1.001V1c0-0.554,0.448-1,1-1c0.554,0,1.003,0.447,1.003,1v5.499 C14.5,7.053,14.053,7.5,13.499,7.5z"/><path d="M8.303,10.5c-0.277,0.477-0.888,0.641-1.365,0.365L2.175,8.114C1.697,7.842,1.532,7.229,1.808,6.75 c0.277-0.479,0.89-0.642,1.367-0.368l4.762,2.751C8.416,9.41,8.58,10.021,8.303,10.5z"/><path d="M9.133,7.937l-2.75-4.763c-0.276-0.48-0.111-1.09,0.365-1.366c0.479-0.277,1.09-0.114,1.367,0.366l2.75,4.765 c0.274,0.476,0.112,1.088-0.367,1.364C10.021,8.581,9.409,8.415,9.133,7.937z"/><path d="M6.499,14.5H1c-0.554,0-1-0.448-1-1c0-0.554,0.447-1.001,1-1.001h5.499c0.552,0,1.001,0.448,1.001,1.001 C7.5,14.052,7.052,14.5,6.499,14.5z"/><path d="M8.303,16.502c0.277,0.478,0.113,1.088-0.365,1.366l-4.762,2.749c-0.478,0.273-1.091,0.112-1.368-0.366 c-0.276-0.479-0.111-1.089,0.367-1.368l4.762-2.748C7.415,15.856,8.026,16.021,8.303,16.502z"/><path d="M10.866,20.062l-2.75,4.767c-0.277,0.475-0.89,0.639-1.367,0.362c-0.477-0.277-0.642-0.886-0.365-1.365l2.75-4.764 c0.277-0.477,0.888-0.638,1.366-0.365C10.978,18.974,11.141,19.585,10.866,20.062z"/><path d="M13.499,19.502c0.554,0,1.003,0.448,1.003,1.002v5.498c0,0.55-0.448,0.999-1.003,0.999c-0.552,0-1-0.447-1-0.999v-5.498 C12.499,19.95,12.946,19.502,13.499,19.502z"/><path d="M17.867,19.062l2.748,4.764c0.275,0.479,0.113,1.088-0.365,1.365c-0.479,0.276-1.091,0.112-1.367-0.362l-2.75-4.767 c-0.276-0.477-0.111-1.088,0.367-1.365C16.979,18.424,17.591,18.585,17.867,19.062z"/><path d="M18.696,16.502c0.276-0.48,0.887-0.646,1.365-0.367l4.765,2.748c0.479,0.279,0.64,0.889,0.364,1.368 c-0.275,0.479-0.888,0.64-1.37,0.366l-4.759-2.749C18.583,17.59,18.421,16.979,18.696,16.502z"/><path d="M25.998,12.499h-5.501c-0.552,0-1.001,0.448-1.001,1.001c0,0.552,0.447,1,1.001,1h5.501c0.554,0,1.002-0.448,1.002-1 C27,12.946,26.552,12.499,25.998,12.499z"/></svg>';
  }
  e.oldValue = e.innerHTML;
  e.innerHTML = spinner;
  e.disabled=true;
  if(message){
    e.innerHTML += message;
  }
  setTimeout(function(){
    closeLoading(e.id)
  },4000);
}


setTimeout(function(){
  window.bindIncludeEvent();
}, 500);

function binderFire(){
  if(window.ProgressCircle) ProgressCircle.bind();
  if(window.ProgressSemicircle) ProgressSemicircle.bind();
}
setInterval(binderFire, 500);
