/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    index.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Jul 22, 2024
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
 * Updated on Apr 12, 2024
 *
 * Description: The index.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadMain() {
    
    $.when(getAjaxRequest("get_constants", "page=dashboard")).done(function(result) {

        if (result.success) {   
            var [c, s] = processDashboardConstants(result);           
            showDashboard(c, s);   
        }
        else {
            showDatabaseError(result);                    
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
 * Updated on Jul 22, 2023
 *
 * Description: Shows the dashboard page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showDashboard(c, s) {

    // Remove the old rankings (only for the finances sheet).
    removeOldRankings(3);
    
    // Show the page titles.
    showPageTitles(c, 0, "");
                
    // Fill hamburger menu.
    fillHamburgerMenu(c, s, 0);        
    
    
    
    
    
    
    
    // Show the page theme.
    showPageTheme(s[0]); 
}

/*
 * Function:    removeOldRankings
 *
 * Created on Jul 22, 2023
 * Updated on Jul 22, 2023
 *
 * Description: Remove rankings older then n months.
 *
 * In:  n
 * Out: -
 *
 */
function removeOldRankings(n) {
    
    var request = getAjaxRequest("delete_rankings", "n=" + n);      
    request.done(function(result) {
        if (!result.success) {         
            showDatabaseError(result);                    
        }
    });
    
    request.fail(function(jqXHR, textStatus) {        
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage(); 
}
