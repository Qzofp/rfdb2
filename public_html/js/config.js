/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.4
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Sep 06, 2025
 *
 * Description: Javascript config functions.
 * Dependenties: -
 *
 */

// Define constants
const cVersion = "v0.4";
const cDate = new Date();

// Sheet table min and max heights.
const cSheetMin = "18vh";
const cSheetMax = "62vh";

/*
 * Function:    getAjaxRequest
 *
 * Created on Feb 09, 2024
 * Updated on Feb 09, 2024
 *
 * Description: Get the Ajax request with send data for the PHP page.
 *
 * In:  page, send
 * Out: request
 *
 */
 function getAjaxRequest(page, send) {
     
    var request = $.ajax({
        url: "php/" + page + ".php",
        method: "POST",
        dataType: "json",
        data : send
    }); 
      
    return request;
} 

/*
 * Function:    processDashboardContants
 *
 * Created on Nov 12, 2023
 * Updated on Nov 15, 2024
 *
 * Description: Process the constants and settings from the database tblConfig table for the dashboard page.
 *
 * In:  data
 * Out: [con, set]
 *
 */
function processDashboardConstants(data) {
    
    var tmp = [];
    $.each(data.constants, function (i, field) {                   
        tmp[i] = field.value;                 
    });

    var con = {
       project:     tmp[0],
       footer:      tmp[1],
       pages:       tmp[2].split(","),
       titles:      tmp[3].split(","),
       months:      tmp[4].split(","),
       
       messages:    tmp[5].split(","),     
       days:        tmp[6].split(","),
       smonths:     tmp[7].split(","),       
       misc:        tmp[8].split(","),
       slides:      tmp[9].split(","),

       dashmisc:    tmp[10].split(","),
       labels:      tmp[11].split(","), 
       accounts:    tmp[12].split(","),
       crypto:      tmp[13].split(",")
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field; 
    }); 
    
    return [con, set];
}

/*
 * Function:    processSheetContants
 *
 * Created on Apr 08, 2024
 * Updated on Feb 10, 2025
 *
 * Description: Process the constants and settings from the database tblConfig table for the sheet pages.
 *
 * In:  data
 * Out: [con, set]
 *
 */
function processSheetConstants(data) {
    
    var tmp = [];
    $.each(data.constants, function (i, field) {                   
        tmp[i] = field.value;                 
    });

    var con = {
       project:     tmp[0],
       footer:      tmp[1],
       pages:       tmp[2].split(","),
       titles:      tmp[3].split(","),
       months:      tmp[4].split(","),
       quarters:    tmp[5].split(","),
       year:        tmp[6].split(","),             
       errors:      tmp[7].split(","), 
       messages:    tmp[8].split(","),
       days:        tmp[9].split(","),
       
       smonths:     tmp[10].split(","),
       misc:        tmp[11].split(","), 
       payment:     tmp[12].split(","),  
       investment:  tmp[13].split(","), 
       savings:     tmp[14].split(","), 
       crypto:      tmp[15].split(","),   
       
       overview:    tmp[16].split(","), 
       salt:        tmp[17]     
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field; 
    }); 
    
    return [con, set];
}

/*
 * Function:    processSettingsContants
 *
 * Created on Apr 08, 2024
 * Updated on May 17, 2024
 *
 * Description: Process the constants and settings from the database tblConfig table for the settings page.
 *
 * In:  data
 * Out: [con, set]
 *
 */
function processSettingsConstants(data) {
    
    var tmp = [];
    $.each(data.constants, function (i, field) {                   
        tmp[i] = field.value;                 
    });

    var con = {
       project:  tmp[0],
       footer:   tmp[1],
       pages:    tmp[2].split(","),
       titles:   tmp[3].split(","),
       months:   tmp[4].split(","),
       quarters: tmp[5].split(","),
       year:     tmp[6].split(","),  
       settings: tmp[7].split(","),      
       language: tmp[8].split(","),
       scale:    tmp[9].split(","),
       
       errors:   tmp[10].split(","),
       configs:  tmp[11].split(","),     
       login:    tmp[12].split(","),    
       users:    tmp[13].split(","),
       services: tmp[14].split(","),
       messages: tmp[15].split(","),
       accounts: tmp[16].split(","),
       days:     tmp[17].split(","),
       smonths:  tmp[18].split(","),
       misc:     tmp[19].split(","),   
       
       groups:     tmp[20].split(","),   
       businesses: tmp[21].split(","),
       setconfigs: tmp[22].split(","),
       cryptos:    tmp[23].split(","),
       wallets:    tmp[24].split(","),       
       
       salt:     tmp[25]     
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field; 
    }); 
    
    return [con, set];
}