/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    index.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Nov 03, 2023
 *
 * Description: Javascript functions for the index page.
 * Dependenties: js/config.js
 *
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadMain
 *
 * Created on Oct 28, 2023
 * Updated on Nov 01, 2023
 *
 * Description: The index.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadMain() {
    
    // Show title and current year.
    $("header h1").html(cMenu[0]);
    
    // Fill hamburger menu.
    fillHamburgerMenu(cMenu[0]);

    // Fade in the page.
    $("html").fadeIn("slow");
}
