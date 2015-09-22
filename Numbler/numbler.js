/*
  Numbler.js
*/

;(function ( $, w, doc ) {

  // enable strict mode
  'use strict';

  // Local object for method references
  var Numbler = {};

  // Namespacing
  Numbler.NS = "Numbler";
  Numbler.AUTHOR = "Scott O'Hara";
  Numbler.VERSION = "0.0.1";
  Numbler.LICENSE = "https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md";


  // define the jQuery plug-in
  $.fn.extend({
    // numberTumbler can be called from any jQuery selector.
    Numbler: function() {

      // define the class names used for increasing/decreasing
      // the input's value.
      var btnUp   = '.js-num-up',
          btnDown = '.js-num-down';

      // If there's no JS, these buttons wont' function.
      // So the btn-pill-area--numbers class has a default
      // rule of display: none;  .show() will override this.
      $('.btn-pill-area--numbers').show();

      // 'this' refers to the elements that were selected in
      // $(...) that happened just before this call. Resulting
      // in an array of jQuery elements. The each() will let us
      // run our code on each element found and allow us to chain
      // events.
      return this.each( function() {
        // define this for each instance of the numTum
        var id = this.id,
            $this = $(this),
            min = parseInt($this.attr('min'), 10) || 0,
            max = parseInt($this.attr('max'), 10) || 1e8,
            step = parseInt($this.attr('step'), 10) || 1,

        // function to increase the value
        addVal = function( e ) {
          var v = parseInt($this.val(), 10);

          // shorthand for v = v + step
          v += step;

          // if 'v' is higher than max, then
          // instead set the max value to 'v'
          v = Math.min(v, max);

          $this.val(v);
          checkVal();
          e.preventDefault();
        },

        // function to decrease the value
        subVal = function( e ) {
          var v = parseInt($this.val(), 10);

          v -= step;
          v = Math.max(v, min);

          $this.val(v);
          checkVal();
          e.preventDefault();
        },

        // various checks for input value
        checkVal = function ( e ) {
          var v = parseInt($this.val(), 10);

          // if a value is entered that is not a number,
          // reset counter back to the minimum value
          if ( isNaN(v) ) {
            v = 0;
            $this.val(v);
          }

          // if a value is entered is less than
          // the min value, then reset it to the
          // min value
          if ( v < min ) {
            v = min;
            $this.val(v);
          }

          // if a value is entered is more than
          // the max value, then reset it to the
          // max value
          if ( v > max ) {
            v = max;
            $this.val(v);
          }

        };

        checkVal();

        // on blur of input, check the value.
        $this.on( 'blur', checkVal );

        // add the appropriate attributes to each input
        // role and aria-live to announce the updated value
        // as the buttons control an input that they are not
        // actually attached to
        // step, max and min are added in if default values were
        // not set in the mar-kup
        $this.attr({
          'role' : 'alert',
          'aria-live' : 'assertive',
          'max' : max,
          'min' : min,
          'step' : step,
          'pattern' : '[0-9]*'
        })
        .addClass('clean-input-number');
        // .clean-input-number removes the native up/down
        // controls from number inputs so that we don't
        // have double controls going on here.

        $(btnUp + '[aria-controls="' + id + '"]').attr('title', 'Increase by ' + step).on('click', addVal.bind(this));

        $(btnDown + '[aria-controls="' + id + '"]').attr('title', 'Decrease by ' + step).on('click', subVal.bind(this));

        // test
        // console.log(btnUp + '[aria-controls="' + id + '"]', $(btnDown + '[aria-controls="' + id + '"]'));

      });
    }
  });

  $(".js-numbler").Numbler();


})( jQuery, this, this.document );


// Expected minimum Mark-up

// <div class="number-input-area">
//   <label for="unique_id">
//     Label for input:
//   </label>
//   <input type="number" class="js-numtum" name="unique_id" id="unique_id" />

//   <div class="btn-pill-area btn-pill-area--numbers">
//     <button class="js-num-up" type="button">
//       <span class="is-visually-hidden">
//         Increase
//       </span>
//       <span aria-hidden="true">+</span>
//     </button>

//     <button class="js-num-down" type="button">
//       <span class="is-visually-hidden">
//         Decrease
//       </span>
//       <span aria-hidden="true">-</span>
//     </button>
//   </div> <!-- end .number-controls -->
// </div>
