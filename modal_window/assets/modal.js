// modal window
;(function() {

  'use strict';

  // list out the vars
  var mOverlay = id('modal_window'),
      mOpen = id('modal_open'),
      mClose = id('modal_close'),
      modal = id('modal_holder'),
      allNodes = document.querySelectorAll('*'),
      modalOpen = false,
      lastFocus,
      i,
      p = document.getElementById('page');
      // be sure to replace p with the appropriate
      // ID of your document wrapper element.


  // Helper function to cut down on what we need to type to get an ID
  function id ( id ) {
    return document.getElementById(id);
  }

  // helper function to place modal window as the first child
  // of the #page node
  function swap () {
    p.parentNode.insertBefore(mOverlay, p);
  }

  swap();


  // set aria attributes to modal elements.
  // Doing this in case JavaScript doesn't load, so that
  // there aren't aria attributes attached to something
  // that doesn't behave the way it should, due to lack of JS.
  mOverlay.setAttribute('aria-hidden', true);
  mOverlay.setAttribute('role', 'dialog');
  mOverlay.setAttribute('aria-labelledby', 'modal_title');

  modal.setAttribute('role', 'document');
  // this role has been added to take care of a bug in the way
  //


  // Open the modal
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
    if ( modalOpen && !modal.contains( event.target ) ) {
      event.stopPropagation();
      modal.focus();
    }
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
  for (i = 0; i < allNodes.length; i++) {
    allNodes.item(i).addEventListener('focus', focusRestrict);
  }

})();
