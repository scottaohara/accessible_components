// helper functions
function id ( id ) {
  return document.getElementById( id );
}

function qsa ( qsa ) {
  return document.querySelectorAll( qsa );
}


(function(){
  'use strict';

  // global variables
  var i,
      tabMenu = id('tab_menu'),
      tabMenuLI = qsa('.tab-menu li'),
      tabs = qsa('.js-tab-item'),
      panels = qsa('.js-tab-panel'),
      totalPanels = panels.length,
      currentTab,
      startTab = tabs[0].id,
      startPanel = panels[0].id,
      gotoTabs = id('goto_tabs');


  // If JavaScript is enabled, run this function
  // on page load to apply all aria attributes
  // and CSS states to tab/panel nodes.
  function setup () {

    // Add in all ARIA attributes on page load,
    // since we don't want these here if JS is off.

    // set the UL to have a role of tablist
    tabMenu.setAttribute('role', 'tablist');
    // and show it as long as JS is enabled
    tabMenu.classList.add('d-block');

    // set all attributes for the each tab / panel on the screen
    for (i = 0; i < totalPanels; i++) {
      // Set the list items to a presentation role
      tabMenuLI[i].setAttribute('role', 'presentation');

      // setup all panels to have the appropriate default aria attributes
      tabs[i].setAttribute('role', 'tab');
      tabs[i].setAttribute('aria-controls', tabs[i].getAttribute('href').substring(1));
      tabs[i].setAttribute('aria-selected', false);
      tabs[i].setAttribute('tabindex', '-1');

      // set up all panels to have the appropriate default aria attributes
      panels[i].setAttribute('aria-hidden', true);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', tabs[i].id);

      // set the first child of each panel to have a tabindex -1
      // so it can be focusable on tab change, but not focused
      // on normal tabbing through the DOM
      panels[i].children[0].setAttribute('tabindex', '-1');
    }


    // Reset the default tab to aria-selected='true'
    // and default panel to aria-hidden='false'
    id(startTab).setAttribute('aria-selected', true);
    id(startTab).setAttribute('tabindex', 0);
    id(startPanel).setAttribute('aria-hidden', false);
  }



  // Set up click events
  function assignClicks ( e ) {
    for (i = 0; i < totalPanels; i++) {
      tabs[i].addEventListener('click', function() {
        updateTab( this );
      });
    }

    gotoTabs.addEventListener('click', function() {
      var goTo = gotoTabs.getAttribute('href').substring(1);
      // firefox needs a timeout of 10 to keep focus on the <a> cause lol
      window.setTimeout(function (){ id(goTo).focus(); },10);
    });
  }


  // Update / Activate Tabs & Panels
  function updateTab ( activeTab ) {
    for (i = 0; i < totalPanels; i++) {
      tabs[i].setAttribute('aria-selected', false);
      tabs[i].setAttribute('tabindex', '-1');
      tabs[i].removeAttribute('aria-live');
      panels[i].setAttribute('aria-hidden', true);
    }

    // set selected tab to aria-selected true
    activeTab.setAttribute('aria-selected', true);
    activeTab.setAttribute('tabindex', 0);
    activeTab.setAttribute('aria-live', 'polite');

    // Then take the href, convert to ID and make the corresponding
    // panel set to aria-hidden false, while the others/previous become true
    var current_ID = activeTab.getAttribute('href').substring(1);
    id(current_ID).setAttribute('aria-hidden', false);
    id(current_ID).children[0].focus();
    gotoTabs.href='#' + activeTab.getAttribute('id');
  }


  function keytrols ( e ) {
    for (i = 0; i < totalPanels; i++) {
      tabs[i].addEventListener('keydown', function( e ) {

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

  }


  // on load, run the setup function
  window.addEventListener('load', setup);

  // Run to assign click controls
  assignClicks();

  // Run to allow key controls
  keytrols();
})();
