window.openTab = function(t){
  var button = event.target;
  while (!button.parentNode.classList.contains('tab')) {
    if(button.nodeName == 'BODY') {
      console.error('The component tab not found, please check your code.');
      return false;
     }
    button = button.parentNode
  }
  var tabContent = document.getElementById(t).parentNode.getElementsByClassName('tab-content');
  var buttonActived = button.parentNode.getElementsByClassName('active');
  for (var i = 0; i < tabContent.length; i++) {
    tabContent[i].setAttribute('class',tabContent[i].getAttribute('class').replace('active',''));
  }
  for (var i = 0; i < buttonActived.length; i++) {
    buttonActived[i].setAttribute('class',buttonActived[i].getAttribute('class').replace('active',''));
  }
  button.setAttribute('class', button.getAttribute('class') + ' active');
  document.getElementById(t).setAttribute('class', document.getElementById(t).getAttribute('class') + ' active');
}
