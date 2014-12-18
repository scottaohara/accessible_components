;(function() {

  'use strict';

  // keep partial focus/hover state active for when focus is removed from
  // initial focus state trigger
  var exLink = document.querySelectorAll(".js-focus"),
      i;

  for ( i = 0; i < exLink.length; i++ ) {
    exLink[i].addEventListener("focus", function () {
      this.parentNode.parentNode.setAttribute("style", "opacity: 1; z-index: 4");
    });

    exLink[i].addEventListener("blur", function () {
      this.parentNode.parentNode.removeAttribute("style");
    });
  }

  // function to see if the current device is a touch device.
  function is_touch_device() {
    return ( ('ontouchstart' in window)
             || (navigator.MaxTouchPoints > 0)
             || (navigator.msMaxTouchPoints > 0)
           );
  }

  if ( is_touch_device() ) {
    document.getElementById('page').classList.add('if-touch-device');
  }

})();
