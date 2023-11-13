/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    index.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Nov 12, 2023
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
 * Updated on Nov 12, 2023
 *
 * Description: The index.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadMain() {
    
    $.when(getConstants()).done(function(result) {

        if (result.success) {         
            var [c, s] = processConstants(result);           
            showDashboard(c, s[0]);   
        }
        else {
            showDatabaseError(result.message);                    
        }     
    })
    .fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage();

    // Fade in the page.
    $("html").fadeIn("slow");
}

/*
 * Function:    showDashboard
 *
 * Created on Nov 11, 2023
 * Updated on Nov 12, 2023
 *
 * Description: Shows the dashboard page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showDashboard(c, s) {

    showPageTitles(c, 0, "");
                
    // Fill hamburger menu.
    fillHamburgerMenu(c, s, 0);        
    
    
    
    
    
    
    
    // Show the page theme.
    showPageTheme(s); 
}