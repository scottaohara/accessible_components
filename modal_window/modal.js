// helper function to place modal window as the first child
// of the #page node
var m = document.getElementById('modal_window'),
    p = document.getElementById('page');

function swap () {
  p.parentNode.insertBefore(m, p);
}

swap();


// modal window
(function() {

  'use strict';

  // list out the vars
  var mOverlay = getId('modal_window'),
      mOpen = getId('modal_open'),
      mClose = getId('modal_close'),
      modal = getId('modal-holder'),
      modalOpen = false,
      lastFocus;


  // Let's cut down on what we need to type to get an ID
  function getId ( id ) {
    return document.getElementById(id);
  }


  // Let's open the modal
  function modalShow () {
    lastFocus = document.activeElement;
    mOverlay.setAttribute('aria-hidden', 'false');
    modalOpen = true;
    modal.setAttribute('tabindex', '0');
    modal.focus();
  }


  // binds to both the button click and the escape key to close the modal window
  // but only if modalOpen is set to true
  function modalClose ( event ) {
    if (modalOpen && ( !event.keyCode || event.keyCode === 27 ) ) {
      mOverlay.setAttribute('aria-hidden', 'true');
      modal.setAttribute('tabindex', '-1');
      modalOpen = false;
      lastFocus.focus();
    }
  }


  // Restrict focus to the modal window when it's open.
  // Tabbing will just loop through the whole modal.
  // Shift + Tab will allow backup to the top of the modal,
  // and then stop.
  function focusRestrict ( event ) {
    document.addEventListener('focus', function( event ) {
      if ( modalOpen && !modal.contains( event.target ) ) {
        event.stopPropagation();
        modal.focus();
      }
    }, true);
  }


  // Close modal window by clicking on the overlay
  mOverlay.addEventListener('click', function( e ) {
    if (e.target == modal.parentNode) {
       modalClose( e );
     }
  }, false);


  // open modal by btn click/hit
  mOpen.addEventListener('click', modalShow);

  // close modal by btn click/hit
  mClose.addEventListener('click', modalClose);

  // close modal by keydown, but only if modal is open
  document.addEventListener('keydown', modalClose);

  // restrict tab focus on elements only inside modal window
  window.addEventListener('keypress', focusRestrict);

})();
