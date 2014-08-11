/*
  A Modal to get in everyone's way v1.0
  Copyright 2014
  Built by Scott O'Hara // @scottohara // scottohara.me
  Licensed under MIT  // github.com/scottaohara/accessible-modal/blob/master/LICENSE.md
*/

(function() {

  'use strict';

  // list out the vars
  var btns = qsa('.js-btn'),
      tModal = qsa('.js-m-template'),
      jModal = qsa('.js-m-ajax'),
      modal = getId('modal-dialog'),
      close = getId('modal-close'),
      mContent = getId('modal-content'),
      mHolder = getId('modal-holder'),
      page = getId('page'),
      modalOpen = false,
      heading,
      newHeading,
      lastFocus,
      i;

  // Let's cut down on what we need to type to get:
  // an ID
  function getId ( id ) {
    return document.getElementById(id);
  }

  // selectors (all)
  function qsa ( string ) {
    return document.querySelectorAll( string );
  }


  // Let's open the modal
  function modalShow () {
    lastFocus = document.activeElement; // keep track of what was last focused
    lastFocus.blur(); // now unfocus that last element
    page.setAttribute('aria-hidden', 'true'); // hide the contents under the modal
    modal.setAttribute('aria-hidden', 'false'); // give assistive visibility
    modalOpen = true; // used for esc key functionality
    mHolder.focus();
    mHolder.setAttribute('tabindex', '0');
    document.body.style.overflow = "hidden";
  }



  // binds to both the button click and the escape key to close the modal window
  // but only if modalOpen is set to true
  function modalClose ( event ) {
    if (modalOpen && ( !event.keyCode || event.keyCode === 27 ) ) {
      page.setAttribute('aria-hidden', 'false'); // unhide the main content
      modal.setAttribute('aria-hidden', 'true');
      mHolder.setAttribute('tabindex', '-1');
      modalOpen = false;
      document.body.removeAttribute('style');
      lastFocus.focus();
      mContent.innerHTML = '';
      // refocus on the last element that was in focus before
      // local window opened
      if (mHolder.hasAttribute('style')) {
        mHolder.removeAttribute('style');
      }
    }
  }


  // ajax mang
  function requestContent( url ) {
    var xmlhttp = new XMLHttpRequest(),
        url;

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 ) {
        if (xmlhttp.status == 200) {
          mContent.innerHTML = xmlhttp.responseText;
        }
        else if(xmlhttp.status == 400) {
          mContent.innerHTML = "<p>Looks like there's a 400 error going on mang.</p>";
        }
        else {
          mContent.innerHTML = "<p>Couldn't find / load the content. Sorries.</p>";
        }
      }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }


  // if a Modal content is not loaded from a template, it likely
  // doesn't have a heading to map to the arial labeledby,
  // this function will add in a heading
  function labelHeading( e ) {
    // create a new heading
    heading = document.createElement('h1');
    // give the heading an ID of modal-title
    heading.setAttribute('id', 'modal-title');
    // insert the modalTitle
    mHolder.insertBefore(heading, mContent);
    // set the new Heading variable to true
    // we'll need this so we can remove any dynamically
    // created label headings from the modal, if a modal
    // that doesn't need a dynamically creating heading
    // is fired off.
    newHeading = true;
    return newHeading;
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



  // Add an event listener to all buttons that are set to load
  // content via ajax.
  for (i = 0; i < jModal.length; i++) {
    jModal[i].addEventListener('click', function () {
      // check the data-from attribute to find the location
      // that we should be pulling in the ajax content from.
      var url = this.getAttribute('data-from');
      requestContent( url );
    });
  };


  // Add an event listener to all buttons that will load the modal.
  for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
      // fire the modal show function
      modalShow();

      // // if a button has a data-max-width attribute, take the value
      // and append it to the modalHolder as an inline style
      if (this.hasAttribute('data-max-width')) {
        mHolder.style.maxWidth = this.getAttribute('data-max-width');
      }
      // same with above, only for height
      if (this.hasAttribute('data-max-height')) {
        mHolder.style.maxHeight = this.getAttribute('data-max-height');
      }

      // If we are setting the modal title via data attribute,
      // then run this here code
      if (this.getAttribute('data-modal-title')) {
        // fire the labelHeading function
        labelHeading();

        // grab the data-modal-title attribute value and set it as the
        // innerHTML of the mTItle (the heading in the modal window)
        getId('modal-title').innerHTML = this.getAttribute('data-modal-title');
      }
    });
  };


  // on click of a 'regular content'
  // i.e. not video iframe
  // grab the value of the 'data-for' attribute and match it up
  // with the corresponding <script type="text/template"> id value.
  // assign the innerHTML of the template to the innerHTML of mContent
  // to view the template's content within the modal box.
  for (i = 0; i < tModal.length; i++) {
    tModal[i].addEventListener('click', function () {
      // if the var newHeading is set to true, it means
      // that a modal with a dynamically created heading was
      // fired before a 'regular content' modal was
      if (newHeading) {
        // remove the leftover dynamic heading
        mHolder.removeChild(heading);
        // reset the newHeading variable to false
        newHeading = false;
      }
      mContent.innerHTML = getId(this.getAttribute('data-for')).innerHTML;
      // return newHeading set to false so that the if statement
      // won't run again until a modal is loaded with a dynamically
      // created heading
      return newHeading;
    });
  };




  // close modal by btn
  close.addEventListener('click', modalClose);

  // close modal by keydown, but only if modal is open
  document.addEventListener('keydown', modalClose);

  // restrict tab focus on elements only inside modal window
  window.addEventListener('keypress', focusRestrict);

})();
