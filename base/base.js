var userAgent = navigator.userAgent || navigator.vendor || window.opera;
var SO = {name:'unknown',code:0}

if (/android/i.test(userAgent)) {
    SO.name = "Android";
    SO.class = 'platform-android';
    SO.code = 1;
}

if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    SO.name = "iOS";
    SO.class = 'platform-ios';
    SO.code = 2;
}

if (/windows phone/i.test(userAgent)) {
    SO.name = "Windows Phone";
    SO.class = 'platform-wp';
    SO.code = 3;
}

if(SO.class && document.getElementsByTagName('body').length){
  document.getElementsByTagName('body')[0].className += ' '+SO.class
}
