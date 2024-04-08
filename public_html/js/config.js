/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Apr 08, 2024
 *
 * Description: Javascript config functions.
 * Dependenties: -
 *
 */

// Define constants
const cVersion = "0.1";
const cDate = new Date();
//const cDate = new Date('02/19/2023');

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
 * Updated on Apr 08, 2024
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
       project:  tmp[0],
       footer:   tmp[1],
       pages:    tmp[2].split(","),
       titles:   tmp[3].split(","),
       
       salt:     tmp[4]     
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
 * Updated on Apr 08, 2024
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
       project:  tmp[0],
       footer:   tmp[1],
       pages:    tmp[2].split(","),
       titles:   tmp[3].split(","),
       months:   tmp[4].split(","),
       quarters: tmp[5].split(","),
       year:     tmp[6].split(","),  
       settings: tmp[7].split(","),             
       errors:   tmp[8].split(","), 
       messages: tmp[9].split(","),
       
       days:     tmp[10].split(","),
       smonths:  tmp[11].split(","),
       misc:     tmp[12].split(","),       
       
       salt:     tmp[14]     
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
 * Updated on Apr 08, 2024
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
       users:    tmp[12].split(","),
       services: tmp[13].split(","),
       messages: tmp[14].split(","),
       accounts: tmp[15].split(","),
       days:     tmp[16].split(","),
       smonths:  tmp[17].split(","),
       misc:     tmp[18].split(","),       
       groups:   tmp[19].split(","),
       
       businesses: tmp[20].split(","),
       
       salt:     tmp[21]     
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field; 
    }); 
    
    return [con, set];
}