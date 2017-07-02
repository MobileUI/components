window.rebindProgressCircle = function(){
  var progress = document.querySelectorAll('.progress-circle');
  for (var i = 0; i < progress.length; i++) {
    progress[i].classList.remove("binded");
    progress[i].innerHTML = "";
  }
  bindProgressCircle();
}
window.bindProgressCircle = function(){
  var colorsMobileUI = [];
  colorsMobileUI["red"] = "rgb(244, 67, 54)";
  colorsMobileUI["red-50"] = "rgb(255, 235, 238)";
  colorsMobileUI["red-100"] = "rgb(255, 205, 210)";
  colorsMobileUI["red-200"] = "rgb(239, 154, 154)";
  colorsMobileUI["red-300"] = "rgb(229, 115, 115)";
  colorsMobileUI["red-400"] = "rgb(239, 83, 80)";
  colorsMobileUI["red-500"] = "rgb(244, 67, 54)";
  colorsMobileUI["red-600"] = "rgb(229, 57, 53)";
  colorsMobileUI["red-700"] = "rgb(211, 47, 47)";
  colorsMobileUI["red-800"] = "rgb(198, 40, 40)";
  colorsMobileUI["red-900"] = "rgb(183, 28, 28)";
  colorsMobileUI["pink"] = "rgb(233, 30, 99)";
  colorsMobileUI["pink-50"] = "rgb(252, 228, 236)";
  colorsMobileUI["pink-100"] = "rgb(248, 187, 208)";
  colorsMobileUI["pink-200"] = "rgb(244, 143, 177)";
  colorsMobileUI["Pink-300"] = "rgb(240, 98, 146)";
  colorsMobileUI["pink-400"] = "rgb(236, 64, 122)";
  colorsMobileUI["pink-500"] = "rgb(233, 30, 99)";
  colorsMobileUI["pink-600"] = "rgb(216, 27, 96)";
  colorsMobileUI["pink-700"] = "rgb(194, 24, 91)";
  colorsMobileUI["pink-800"] = "rgb(173, 20, 87)";
  colorsMobileUI["pink-900"] = "rgb(136, 14, 79)";
  colorsMobileUI["purple"] = "rgb(156, 39, 176)";
  colorsMobileUI["purple-50"] = "rgb(243, 229, 245)";
  colorsMobileUI["purple-100"] = "rgb(225, 190, 231)";
  colorsMobileUI["purple-200"] = "rgb(206, 147, 216)";
  colorsMobileUI["Purple-300"] = "rgb(186, 104, 200)";
  colorsMobileUI["Purple-400"] = "rgb(171, 71, 188)";
  colorsMobileUI["purple-500"] = "rgb(156, 39, 176)";
  colorsMobileUI["purple-600"] = "rgb(142, 36, 170)";
  colorsMobileUI["purple-700"] = "rgb(123, 31, 162)";
  colorsMobileUI["purple-800"] = "rgb(106, 27, 154)";
  colorsMobileUI["purple-900"] = "rgb(74, 20, 140)";
  colorsMobileUI["deep-purple"] = "rgb(103, 58, 183)";
  colorsMobileUI["deep-purple-50"] = "rgb(237, 231, 246)";
  colorsMobileUI["deep-purple-100"] = "rgb(209, 196, 233)";
  colorsMobileUI["deep-purple-200"] = "rgb(179, 157, 219)";
  colorsMobileUI["deep-purple-300"] = "rgb(149, 117, 205)";
  colorsMobileUI["deep-purple-400"] = "rgb(126, 87, 194)";
  colorsMobileUI["deep-purple-500"] = "rgb(103, 58, 183)";
  colorsMobileUI["deep-purple-600"] = "rgb(94, 53, 177)";
  colorsMobileUI["deep-purple-700"] = "rgb(81, 45, 168)";
  colorsMobileUI["deep-purple-800"] = "rgb(69, 39, 160)";
  colorsMobileUI["deep-purple-900"] = "rgb(49, 27, 146)";
  colorsMobileUI["indigo"] = "rgb(63, 81, 181)";
  colorsMobileUI["indigo-50"] = "rgb(232, 234, 246)";
  colorsMobileUI["indigo-100"] = "rgb(197, 202, 233)";
  colorsMobileUI["indigo-200"] = "rgb(159, 168, 218)";
  colorsMobileUI["indigo-300"] = "rgb(121, 134, 203)";
  colorsMobileUI["indigo-400"] = "rgb(92, 107, 192)";
  colorsMobileUI["indigo-500"] = "rgb(63, 81, 181)";
  colorsMobileUI["indigo-600"] = "rgb(57, 73, 171)";
  colorsMobileUI["indigo-700"] = "rgb(48, 63, 159)";
  colorsMobileUI["indigo-800"] = "rgb(40, 53, 147)";
  colorsMobileUI["indigo-900"] = "rgb(26, 35, 126)";
  colorsMobileUI["blue"] = "rgb(33, 150, 243)";
  colorsMobileUI["blue-50"] = "rgb(227, 242, 253)";
  colorsMobileUI["blue-100"] = "rgb(187, 222, 251)";
  colorsMobileUI["blue-200"] = "rgb(144, 202, 249)";
  colorsMobileUI["blue-300"] = "rgb(100, 181, 246)";
  colorsMobileUI["blue-400"] = "rgb(66, 165, 245)";
  colorsMobileUI["blue-500"] = "rgb(33, 150, 243)";
  colorsMobileUI["blue-600"] = "rgb(30, 136, 229)";
  colorsMobileUI["blue-700"] = "rgb(25, 118, 210)";
  colorsMobileUI["blue-800"] = "rgb(21, 101, 192)";
  colorsMobileUI["blue-900"] = "rgb(13, 71, 161)";
  colorsMobileUI["light-blue"] = "rgb(3, 169, 244)";
  colorsMobileUI["light-blue-50"] = "rgb(225, 245, 254)";
  colorsMobileUI["light-blue-100"] = "rgb(179, 229, 252)";
  colorsMobileUI["light-blue-200"] = "rgb(129, 212, 250)";
  colorsMobileUI["light-blue-300"] = "rgb(79, 195, 247)";
  colorsMobileUI["light-blue-400"] = "rgb(41, 182, 246)";
  colorsMobileUI["light-blue-500"] = "rgb(3, 169, 244)";
  colorsMobileUI["light-blue-600"] = "rgb(3, 155, 229)";
  colorsMobileUI["light-blue-700"] = "rgb(2, 136, 209)";
  colorsMobileUI["light-blue-800"] = "rgb(2, 119, 189)";
  colorsMobileUI["light-blue-900"] = "rgb(1, 87, 155)";
  colorsMobileUI["cyan"] = "rgb(0, 188, 212)";
  colorsMobileUI["cyan-50"] = "rgb(224, 247, 250)";
  colorsMobileUI["cyan-100"] = "rgb(178, 235, 242)";
  colorsMobileUI["cyan-200"] = "rgb(128, 222, 234)";
  colorsMobileUI["cyan-300"] = "rgb(77, 208, 225)";
  colorsMobileUI["cyan-400"] = "rgb(38, 198, 218)";
  colorsMobileUI["cyan-500"] = "rgb(0, 188, 212)";
  colorsMobileUI["cyan-600"] = "rgb(0, 172, 193)";
  colorsMobileUI["cyan-700"] = "rgb(0, 151, 167)";
  colorsMobileUI["cyan-800"] = "rgb(0, 131, 143)";
  colorsMobileUI["cyan-900"] = "rgb(0, 96, 100)";
  colorsMobileUI["teal"] = "rgb(0, 150, 136)";
  colorsMobileUI["teal-50"] = "rgb(224, 242, 241)";
  colorsMobileUI["teal-100"] = "rgb(178, 223, 219)";
  colorsMobileUI["teal-200"] = "rgb(128, 203, 196)";
  colorsMobileUI["teal-300"] = "rgb(77, 182, 172)";
  colorsMobileUI["teal-400"] = "rgb(38, 166, 154)";
  colorsMobileUI["teal-500"] = "rgb(0, 150, 136)";
  colorsMobileUI["teal-600"] = "rgb(0, 137, 123)";
  colorsMobileUI["teal-700"] = "rgb(0, 121, 107)";
  colorsMobileUI["teal-800"] = "rgb(0, 105, 92)";
  colorsMobileUI["teal-900"] = "rgb(0, 77, 64)";
  colorsMobileUI["green"] = "rgb(76, 175, 80)";
  colorsMobileUI["green-50"] = "rgb(232, 245, 233)";
  colorsMobileUI["green-100"] = "rgb(200, 230, 201)";
  colorsMobileUI["green-200"] = "rgb(165, 214, 167)";
  colorsMobileUI["green-300"] = "rgb(129, 199, 132)";
  colorsMobileUI["green-400"] = "rgb(102, 187, 106)";
  colorsMobileUI["green-500"] = "rgb(76, 175, 80)";
  colorsMobileUI["green-600"] = "rgb(67, 160, 71)";
  colorsMobileUI["green-700"] = "rgb(56, 142, 60)";
  colorsMobileUI["green-800"] = "rgb(46, 125, 50)";
  colorsMobileUI["green-900"] = "rgb(27, 94, 32)";
  colorsMobileUI["light-green"] = "rgb(139, 195, 74)";
  colorsMobileUI["light-green-50"] = "rgb(241, 248, 233)";
  colorsMobileUI["light-green-100"] = "rgb(220, 237, 200)";
  colorsMobileUI["light-green-200"] = "rgb(197, 225, 165)";
  colorsMobileUI["light-green-300"] = "rgb(174, 213, 129)";
  colorsMobileUI["light-green-400"] = "rgb(156, 204, 101)";
  colorsMobileUI["light-green-500"] = "rgb(139, 195, 74)";
  colorsMobileUI["light-green-600"] = "rgb(124, 179, 66)";
  colorsMobileUI["light-green-700"] = "rgb(104, 159, 56)";
  colorsMobileUI["light-green-800"] = "rgb(85, 139, 47)";
  colorsMobileUI["light-green-900"] = "rgb(51, 105, 30)";
  colorsMobileUI["lime"] = "rgb(205, 220, 57)";
  colorsMobileUI["lime-50"] = "rgb(249, 251, 231)";
  colorsMobileUI["lime-100"] = "rgb(240, 244, 195)";
  colorsMobileUI["lime-200"] = "rgb(230, 238, 156)";
  colorsMobileUI["lime-300"] = "rgb(220, 231, 117)";
  colorsMobileUI["lime-400"] = "rgb(212, 225, 87)";
  colorsMobileUI["lime-500"] = "rgb(205, 220, 57)";
  colorsMobileUI["lime-600"] = "rgb(192, 202, 51)";
  colorsMobileUI["lime-700"] = "rgb(175, 180, 43)";
  colorsMobileUI["lime-800"] = "rgb(158, 157, 36)";
  colorsMobileUI["lime-900"] = "rgb(130, 119, 23)";
  colorsMobileUI["yellow"] = "rgb(255, 235, 59)";
  colorsMobileUI["yellow-50"] = "rgb(255, 253, 231)";
  colorsMobileUI["yellow-100"] = "rgb(255, 249, 196)";
  colorsMobileUI["yellow-200"] = "rgb(255, 245, 157)";
  colorsMobileUI["yellow-300"] = "rgb(255, 241, 118)";
  colorsMobileUI["yellow-400"] = "rgb(255, 238, 88)";
  colorsMobileUI["yellow-500"] = "rgb(255, 235, 59)";
  colorsMobileUI["yellow-600"] = "rgb(253, 216, 53)";
  colorsMobileUI["yellow-700"] = "rgb(251, 192, 45)";
  colorsMobileUI["yellow-800"] = "rgb(249, 168, 37)";
  colorsMobileUI["yellow-900"] = "rgb(245, 127, 23)";
  colorsMobileUI["amber"] = "rgb(255, 193, 7)";
  colorsMobileUI["amber-50"] = "rgb(255, 248, 225)";
  colorsMobileUI["amber-100"] = "rgb(255, 236, 179)";
  colorsMobileUI["amber-200"] = "rgb(255, 224, 130)";
  colorsMobileUI["amber-300"] = "rgb(255, 213, 79)";
  colorsMobileUI["amber-400"] = "rgb(255, 202, 40)";
  colorsMobileUI["amber-500"] = "rgb(255, 193, 7)";
  colorsMobileUI["amber-600"] = "rgb(255, 179, 0)";
  colorsMobileUI["amber-700"] = "rgb(255, 160, 0)";
  colorsMobileUI["amber-800"] = "rgb(255, 143, 0)";
  colorsMobileUI["amber-900"] = "rgb(255, 111, 0)";
  colorsMobileUI["orange"] = "rgb(255, 152, 0)";
  colorsMobileUI["orange-50"] = "rgb(255, 243, 224)";
  colorsMobileUI["orange-100"] = "rgb(255, 224, 178)";
  colorsMobileUI["orange-200"] = "rgb(255, 204, 128)";
  colorsMobileUI["orange-300"] = "rgb(255, 183, 77)";
  colorsMobileUI["orange-400"] = "rgb(255, 167, 38)";
  colorsMobileUI["orange-500"] = "rgb(255, 152, 0)";
  colorsMobileUI["orange-600"] = "rgb(251, 140, 0)";
  colorsMobileUI["orange-700"] = "rgb(245, 124, 0)";
  colorsMobileUI["orange-800"] = "rgb(239, 108, 0)";
  colorsMobileUI["orange-900"] = "rgb(230, 81, 0)";
  colorsMobileUI["deep-orange"] = "rgb(255, 87, 34)";
  colorsMobileUI["deep-orange-50"] = "rgb(251, 233, 231)";
  colorsMobileUI["deep-orange-100"] = "rgb(255, 204, 188)";
  colorsMobileUI["deep-orange-200"] = "rgb(255, 171, 145)";
  colorsMobileUI["deep-orange-300"] = "rgb(255, 138, 101)";
  colorsMobileUI["deep-orange-400"] = "rgb(255, 112, 67)";
  colorsMobileUI["deep-orange-500"] = "rgb(255, 87, 34)";
  colorsMobileUI["deep-orange-600"] = "rgb(244, 81, 30)";
  colorsMobileUI["deep-orange-700"] = "rgb(230, 74, 25)";
  colorsMobileUI["deep-orange-800"] = "rgb(216, 67, 21)";
  colorsMobileUI["deep-orange-900"] = "rgb(191, 54, 12)";
  colorsMobileUI["brown"] = "rgb(121, 85, 72)";
  colorsMobileUI["brown-50"] = "rgb(239, 235, 233)";
  colorsMobileUI["brown-100"] = "rgb(215, 204, 200)";
  colorsMobileUI["brown-200"] = "rgb(188, 170, 164)";
  colorsMobileUI["brown-300"] = "rgb(161, 136, 127)";
  colorsMobileUI["brown-400"] = "rgb(141, 110, 99)";
  colorsMobileUI["brown-500"] = "rgb(121, 85, 72)";
  colorsMobileUI["brown-600"] = "rgb(109, 76, 65)";
  colorsMobileUI["brown-700"] = "rgb(93, 64, 55)";
  colorsMobileUI["brown-800"] = "rgb(78, 52, 46)";
  colorsMobileUI["brown-900"] = "rgb(62, 39, 35)";
  colorsMobileUI["grey"] = "rgb(158, 158, 158)";
  colorsMobileUI["grey-50"] = "rgb(250, 250, 250)";
  colorsMobileUI["grey-100"] = "rgb(245, 245, 245)";
  colorsMobileUI["grey-200"] = "rgb(238, 238, 238)";
  colorsMobileUI["grey-300"] = "rgb(224, 224, 224)";
  colorsMobileUI["grey-400"] = "rgb(189, 189, 189)";
  colorsMobileUI["grey-500"] = "rgb(158, 158, 158)";
  colorsMobileUI["grey-600"] = "rgb(117, 117, 117)";
  colorsMobileUI["grey-700"] = "rgb(97, 97, 97)";
  colorsMobileUI["grey-800"] = "rgb(66, 66, 66)";
  colorsMobileUI["grey-900"] = "rgb(33, 33, 33)";
  colorsMobileUI["blue-grey"] = "rgb(96, 125, 139)";
  colorsMobileUI["blue-grey-50"] = "rgb(236, 239, 241)";
  colorsMobileUI["blue-grey-100"] = "rgb(207, 216, 220)";
  colorsMobileUI["blue-grey-200"] = "rgb(176, 190, 197)";
  colorsMobileUI["blue-grey-300"] = "rgb(144, 164, 174)";
  colorsMobileUI["blue-grey-400"] = "rgb(120, 144, 156)";
  colorsMobileUI["blue-grey-500"] = "rgb(96, 125, 139)";
  colorsMobileUI["blue-grey-600"] = "rgb(84, 110, 122)";
  colorsMobileUI["blue-grey-700"] = "rgb(69, 90, 100)";
  colorsMobileUI["blue-grey-800"] = "rgb(55, 71, 79)";
  colorsMobileUI["blue-grey-900"] = "rgb(38, 50, 56)";
  colorsMobileUI["black"] = "rgb(0, 0, 0)";
  colorsMobileUI["white"] = "rgb(255, 255, 255)";
  colorsMobileUI["black-opacity-90"] = "rgba(0, 0, 0, 0.9)";
  colorsMobileUI["white-opacity-90"] = "rgba(255, 255, 255, 0.9)";
  colorsMobileUI["black-opacity-70"] = "rgba(0, 0, 0, 0.8)";
  colorsMobileUI["white-opacity-70"] = "rgba(255, 255, 255, 0.7)";
  colorsMobileUI["black-opacity-50"] = "rgba(0, 0, 0, 0.7)";
  colorsMobileUI["white-opacity-50"] = "rgba(255, 255, 255, 0.5)";
  colorsMobileUI["black-opacity-30"] = "rgba(0, 0, 0, 0.6)";
  colorsMobileUI["white-opacity-30"] = "rgba(255, 255, 255, 0.3)";
  colorsMobileUI["black-opacity-10"] = "rgba(0, 0, 0, 0.5)";
  colorsMobileUI["white-opacity-10"] = "rgba(255, 255, 255, 0.1)";
  var progress = document.querySelectorAll('.progress-circle:not(.binded)');
  for (var i = 0; i < progress.length; i++) {
    progress[i].classList.add("binded");
    var config = {};
    config.value = Number(progress[i].getAttribute('value'));
    config.title = progress[i].getAttribute('title') || '';
    config.subTitle = progress[i].getAttribute('subTitle') || '';
    config.text = progress[i].getAttribute('text') || '';
    config.color = progress[i].getAttribute('color') || 'blue';
    config.textColor = progress[i].getAttribute('textColor') || 'grey-800';
    config.textWeight = progress[i].getAttribute('textWeight') || 'normal';
    config.titleWeight = progress[i].getAttribute('titleWeight') || 'normal';
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
    config.durationAnimate = Number(progress[i].getAttribute('duration') || '800');
    progress[i].style.width=config.width;
    progress[i].style.height=config.height;
    var bindProgressCircleInner = function(elm, config){
      var bar = new ProgressBar.Circle(elm, {
        color: colorsMobileUI[config.color],
        trailColor: colorsMobileUI[config.trailColor],
        strokeWidth: config.strokeWidth,
        trailWidth: config.trailWidth,
        easing: 'easeInOut',
        duration: config.durationAnimate,
        fill: config.fill,
        text: {
          autoStyleContainer: true,
          style: {
            color: colorsMobileUI[config.textColor],
            position: 'absolute',
            fontSize: config.textSize,
            fontWeight: config.textWeight,
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)'
            }
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

          var valueInner = Math.round(circle.value() * 100);
          var valueText = '';
          if(config.title){
            var style = 'style="';
            if(config.titleSize) style += ';font-size:'+config.titleSize;
            if(config.titleWeight) style += ';font-weight:'+config.titleWeight;
            if(config.titleColor) style += ';color:'+colorsMobileUI[config.titleColor];
            style += '"';
            valueText += '<div '+style+' class="progress-circle-title">'+config.title+'</div>'
          }
          valueText += valueInner + config.text;
          if(config.subTitle){
            var style = 'style="';
            if(config.subTitleSize) style += ';font-size:'+config.subTitleSize;
            if(config.subTitleWeight) style += ';font-weight:'+config.subTitleWeight;
            if(config.subTitleColor) style += ';color:'+colorsMobileUI[config.subTitleColor];
            style += '"';
            valueText += '<div '+style+' class="progress-circle-subtitle">'+config.subTitle+'</div>'
          }
          circle.setText(valueText);

        }
      });
      var valueBar = 0;
      if(config.value < 100){
        valueBar = Number("0." + config.value.toString().replace('.',''));
      }
      bar.animate(valueBar);
    }
    bindProgressCircleInner(progress[i], config);
  }
}
