/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    index.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Oct 29, 2023
 *
 * Description: .
 * Dependenties: js/config.js
 *
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadMain
 *
 * Created on Oct 28, 2023
 * Updated on Oct 29, 2023
 *
 * Description: The index.html main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadMain() {
    
    // Show title and current year.
    $("header h1").html(cMenu[0] + " " + cDate.getFullYear());
    
    // Fill hamburger menu.
    fillHamburgerMenu(cMenu[0]);

    // Fade in the page.
    $("html").fadeIn("slow");
}
