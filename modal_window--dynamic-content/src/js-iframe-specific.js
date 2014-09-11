/*

  The following can be added to the accessible modal for iFrame specific support


  The button markup to call the iFrame modal would be:

  <button class="btn js-btn js-m-iframe" type="button"
          data-modal-title="iFramed Video 2"
          data-src="https://www.youtube.com/embed/tKXdQpwX9-c?vq=large&amp;rel=0">
          YouTube Video 2
  </button>


  Where the template polyfill script would be:

  <script type="text/template" id="m_iframe">
    <div class="modal-aspect" id="modal-video">
      <iframe src="#!" tabindex="0" id="modal-iFrameElement"
              webkitallowfullscreen="webkitallowfullscreen"
              allowfullscreen="allowfullscreen"
              class="modal-iFrameElement"></iframe>
    </div>
  </script>


  The following function would need to be added into the main modal window function.

*/

(function() {

  'use strict';

  // list out the vars
  var iModal = qsa('.js-m-iframe'),
      iFrameElement,
      frameSource,
      i;


  // set the source of the iFrame in a modal window
  function setIframe ( iframeSrc ) {
    iFrameElement.src=iframeSrc;
  }


  // "iframe / video" content modal
  // Grab the video source url from the data-src attribute, so we don't have to
  // create or delete a JS function if we decide to add or remove video buttons
  for (i = 0; i < iModal.length; i++) {
    iModal[i].addEventListener('click', function () {
      // first get the innerHTML of the template with the id="m_iframe"
      mContent.innerHTML = getId('m_iframe').innerHTML;
      // now that 'mv' is in the DOM, get the ID
      // of the iframe and assign it to 'iFrameElement'
      iFrameElement = getId('modal-iFrameElement');
      // grab the video source that's in the data-src attribute of
      // the button that was clicked (this)
      frameSource = this.getAttribute('data-src');
      // Call the setIframe source function and pass in the frameSource
      // variable (which is the url of the movie)
      setIframe(frameSource);
      // focus on the modal video content holder by default
      mHolder.focus();
    });
  };

})();
