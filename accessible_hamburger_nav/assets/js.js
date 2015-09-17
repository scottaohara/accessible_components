;(function () {

'use strict';


  var noJS = document.getElementsByTagName('HTML'),
      theNav = document.getElementById('the_nav'),
      theNavList = document.getElementById('navigation'),
      theNavLinks = document.querySelectorAll('#navigation li a'),
      theNavLinksFirst = theNavLinks[0],
      theNavLinksLast = theNavLinks[theNavLinks.length - 1],
      navState = "closed",
      navBtn = document.getElementById('menu_btn'),
      navState = false,
      i;


  // Setup the appropriate data-states and aria
  // attributes on document load. That way if JS
  // is disabled for whatever reason, the navigation
  // will still function in some form.

  // remove no-js class from HTML
  function removeClass( e, deleteClass ) {
    e.className = e.className.replace(new RegExp("\\b" + deleteClass + "\\b", 'g'), '').trim();
  }

  // run the function
  removeClass( noJS[0], 'no-js' );


  // nav element
  theNav.setAttribute('data-state', 'closed');
  // nav > ul
  theNavList.setAttribute('aria-hidden', 'true');
  // nav > button
  navBtn.setAttribute('aria-expanded', false);
  navBtn.setAttribute('aria-label', "Open Navigation");
  navBtn.setAttribute('aria-controls', 'navigation');
  navBtn.setAttribute('role', 'button');


  // Navigation Toggle
  function navToggle() {
    if ( navState === false ) {
      theNav.setAttribute('data-state', 'open');
      theNavList.setAttribute('aria-hidden', 'false');
      navBtn.setAttribute('aria-expanded', 'true');
      navBtn.setAttribute('aria-label', 'Close Navigation');
      theNavLinksFirst.focus();
      navState = true;
    }
    else {
      theNav.setAttribute('data-state', 'closed');
      theNavList.setAttribute('aria-hidden', 'true');
      navBtn.setAttribute('aria-expanded', 'false');
      navBtn.setAttribute('aria-label', 'Open Navigation');
      navBtn.focus();
      navState = false;
    }
  }



  // Restrict the tabbing while the nav is open
  function tabRestrict ( e ) {
    if ( navState && e.which === 9 ) {
      if ( e.target === theNavLinksLast && !e.shiftKey ) {
        e.preventDefault;
        navBtn.focus();
      }

      if ( e.target === navBtn && e.shiftKey ) {
        e.preventDefault;
        theNavLinksFirst.focus();
      }
    }

    if ( navState && e.which === 27 ) {
      navToggle();
      navBtn.focus();
    }
  }


  // Treat the burger like a button
  function buttonMe ( e ) {
    if ( e.which === 32  ) {
      navToggle();
      e.preventDefault;
    }
  }



  // Listeners:

  // Listen for button click / press
  navBtn.addEventListener( 'click', navToggle );

  navBtn.addEventListener( 'keydown', buttonMe );

  // Listen for various key downs
  window.addEventListener( 'keydown', tabRestrict );

  // Listen for click of jump link in nav
  for ( i = 0; i < theNavLinks.length; i++ ) {
    theNavLinks[i].addEventListener( 'click', navToggle );
  }



  // add an end of file landmark to open navigation on focus
  // useful to place before footer / at the end of a content area
  // where the next logical step would be to return to the navigation
  function addFocusArea () {
    var page = document.getElementById('page'),
        newA = document.createElement('a');

    newA.setAttribute('id', 'open_menu_focus');
    newA.setAttribute('aria-label', 'Jump to Navigation');
    newA.setAttribute('href', '#the_nav')
    page.appendChild(newA);
  }

  addFocusArea();

  document.getElementById('open_menu_focus').addEventListener( 'click', navToggle );

})();
