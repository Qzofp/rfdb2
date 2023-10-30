/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Oct 29, 2023
 *
 * Description: Common functions.
 * Dependenties: .
 *
 *
 */

//////////////////////////////////////////      Common Functions     /////////////////////////////////////////


/*
 * Function:    fillHamburgerMenu
 *
 * Created on Oct 28, 2023
 * Updated on Oct 29, 2023
 *
 * Description: Fill the hamburger menu with the items.
 *
 * In:  exclude
 * Out: -
 *
 */
function fillHamburgerMenu(exclude) {

    for(let i = 0; i < cMenu.length; i++) {
        
        if (cMenu[i] !== exclude) {           
            $(".menu_box li a").eq(i).html(cMenu[i]);
        }
        else {
            $(".menu_box li").eq(i).hide();
        }
    }
}


