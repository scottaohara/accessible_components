(function($) {
  'use strict';

  $.tabs = function(el, options) {

  // Author(s):
  //     Scott O'Hara - github.com/scottaohara
  //     Matt Casserly - github.com/mattcass
  // License:
  //     https://github.com/scottaohara/accessible-components/blob/master/LICENSE.md


      var self         = this;
      this.$el         = $(el);
      this.$tabMenu    = this.$el.find('.tab-menu');
      this.$tabMenuLi  = this.$el.find('.tab-menu li');
      this.$tabs       = this.$el.find('.js-tab-item');
      this.$panels     = this.$el.find('.js-tab-panel');

      this.startTab    = this.$tabs.first();
      this.startPanel  = this.$panels.first();
      this.totalPanels = this.$panels.length;

      self.init = function () {

      // If JavaScript is enabled, run this function
      // on page load to apply all aria attributes
      // and CSS states to tab/panel nodes.
      function setup () {

          // Add in all ARIA attributes on page load,
          // since we don't want these here if JS is off.

          // set the UL to have a role of tablist
          self.$tabMenu.attr('role', 'tablist');
          // and show it as long as JS is enabled
          self.$tabMenu.show();

          // Set the list items to a presentation role
          self.$tabMenuLi.attr('role', 'presentation');

          // setup all panels to have the appropriate default aria attributes
          self.$tabs.attr('role', 'tab');
          self.$tabs.attr('aria-selected', false);
          self.$tabs.attr('tabindex', '-1');

          self.$tabs.each(function(i){
            parseInt(i, 10);
            $(this).attr('aria-controls', 'panel' + (i + 1) );
          });


          // set up all panels to have the appropriate default aria attributes
          self.$panels.attr('aria-hidden', true);
          self.$panels.attr('role', 'tabpanel');

          self.$panels.each(function(i) {
            $(this).attr('aria-labbeledby', "tab" + i);
          });


         // set the first child of each panel to have a tabindex -1
         // so it can be focusable on tab change, but not focused
         // on normal tabbing through the DOM
         self.$panels.children().attr('tabindex', '-1');

         // Reset the default tab to aria-selected='true'
         // and default panel to aria-hidden='false'
         self.startTab.attr('aria-selected', true);
         self.startTab.attr('tabindex', 0);
         self.startPanel.attr('aria-hidden', false);
        }
        setup();

       // Set up click events
       function assignClicks() {
         self.$tabs.on('click', function(e){
           e.preventDefault();
           updateTab(this);
           return false;
         });
       }
       assignClicks();


       // Update / Activate Tabs & Panels
       function updateTab(activeTab) {
         self.$tabs.attr('aria-selected', false);
         self.$tabs.attr('tabindex', '-1');
         self.$tabs.removeAttr('aria-live');
         self.$panels.attr('aria-hidden', true);

         // set selected tab to aria-selected true
         activeTab = $(activeTab);
         activeTab.attr({
            'aria-selected' : true,
            'tabindex' : 0,
            'aria-live' : 'polite'
          });

         // Then take the href, convert to ID and make the corresponding
         // panel set to aria-hidden false, while the others/previous become true
         var current_id = activeTab.attr('href').substring(1);
         var current_panel = self.$el.find('.tab-panel-container #' + current_id);
         //console.log(current_panel);
         current_panel.attr('aria-hidden', false);
         current_panel.children().focus();
        }

        function keytrols() {

          self.$tabs.on('keydown', function( e ) {

            // define the current tab, previous tab and next tabs,
            // make the previous / next tabs loop around if the end
            // has been reached
            var tabThis = this.parentNode,

                tabPrev = tabThis.previousElementSibling ?
                          tabThis.previousElementSibling.children[0] :
                          tabThis.parentNode.children[ tabThis.parentNode.children.length - 1 ].children[0],

                tabNext = tabThis.nextElementSibling ?
                          tabThis.nextElementSibling.children[0] :
                          tabThis.parentNode.children[0].children[0];

            // on pressing the following keys,
            // either focus on the next / previous tabs
            // or fire the updateTab function if the space
            // key is pressed
            switch ( e.keyCode ) {
              case 39: // right
              case 40: // down
                tabNext.focus();
                break;

              case 37: // left
              case 38: // up
                tabPrev.focus();
                break;

              case 32:
                e.preventDefault();
                updateTab( e.target );
                break;

              default:
                break;
            }

          });

        }
        keytrols();

      };
      self.init();
    };

    $.fn.Tabs = function(options) {
      return this.each(function() {
        (new $.tabs(this, options));
      });
    };

})(jQuery);


$('.tab-container').Tabs();

