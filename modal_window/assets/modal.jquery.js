// modal window
;(function ($, w, doc) {

  'use strict';

  // list out the vars
  var $body = $('body'),
      $html = $('html'),
      $m = $('#modal_window'),
      $mOpen = $('#modal_open'),
      $mClose = $('#modal_close'),
      $modal = $('#modal_holder'),
      $allNodes =   $('*'),
      $lastFocus,
      i;
      // be sure to replace p with the appropriate
      // ID of your document wrapper element.


  // helper function to place modal window as the first child
  // of the #page node
  function swap () {
    // $body.parentNode.insertBefore($m, $body);
    $body.prepend($m);
  }

  swap();


  // set aria attributes to modal elements.
  // Doing this in case JavaScript doesn't load, so that
  // there aren't aria attributes attached to something
  // that doesn't behave the way it should, due to lack of JS.
  $m.attr({
    'aria-hidden' : true,
    'role' : 'dialog',
    'tabindex' : '-1',
    'aria-labelledby' : 'modal_title'
  });

  $modal.attr({
    'role' : 'document',
    'tabindex' : '-1'
  });
  // this role has been added to take care of a bug

  // Open the modal
  function modalShow () {
    $html.addClass('modal-is-open');
    $lastFocus = document.activeElement;
    $m.attr('aria-hidden', 'false');
    $modal.focus();
  }


  // binds to both the button click and the escape key to close the modal window
  // but only if the html element has a class of 'modal-is-open'
  function modalClose ( e ) {
    if ( $html.hasClass('modal-is-open') && !e.keyCode || e.keyCode === 27  ) {
      $html.removeClass('modal-is-open');
      $m.attr('aria-hidden', 'true');
      $lastFocus.focus();
    }
  }


  // Restrict focus to the modal window when it's open.
  // Tabbing will just loop through the whole modal.
  // Shift + Tab will allow backup to the top of the modal,
  // and then stop.
  function focusRestrict ( e ) {
    if ( $html.hasClass('modal-is-open') && !$modal.get(0).contains( e.target ) ) {
      e.stopPropagation();
      $modal.focus();
    }
  }


  // Close modal window by clicking on the overlay
  $m.on('click', function( e ) {
    if ( e.target === $modal.parent().get(0) ) {
      modalClose( e );
    }
  });


  // open modal by btn click/hit
  $mOpen.on('click', modalShow);

  // close modal by btn click/hit
  $mClose.on('click', modalClose);

  // close modal by keydown, but only if modal is open
  $(document).on('keydown', modalClose);

  // restrict tab focus on elements only inside modal window
  // for ( i = 0; i < allNodes.length; i++ ) {
  //   allNodes.item(i).addEventListener('focus', focusRestrict);
  // }

  $allNodes.on('focus', focusRestrict );

} )( jQuery, this, this.document );
