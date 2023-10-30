/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings.js
 * Used in: settings.html
 *
 * Created on Oct 29, 2023
 * Updated on Oct 29, 2023
 *
 * Description: .
 * Dependenties: js/config.js
 *
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadSettings
 *
 * Created on Oct 29, 2023
 * Updated on Oct 29, 2023
 *
 * Description: The index.html main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSettings() {
    
    // Show title and current year.
    $("header h1").html(cMenu[5] + " " + cDate.getFullYear());
    
    // Fill hamburger menu.
    fillHamburgerMenu(cMenu[5]);

    // Fade in the page.
    $("html").fadeIn("slow");
}
