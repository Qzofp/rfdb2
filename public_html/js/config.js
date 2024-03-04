/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Mar 04, 2024
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
 * Function:    getContants
 *
 * Created on Oct 15, 2023
 * Updated on Nov 11, 2023
 *
 * Description: Get the constants and settings from de database tblConfig table.
 *
 * In:  -
 * Out: request
 *
 */
 /*function getConstants() {   // Oud, vervang deze door getAjaxRequest(page, send)
     
    var request = $.ajax({
        url: "php/get_constants.php",
        method: "POST",
        dataType: "json"
    }); 
      
    return request;
} */

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
 * Function:    processContants
 *
 * Created on Nov 12, 2023
 * Updated on Feb 26, 2024
 *
 * Description: Process the constants and settings from the database tblConfig table.
 *
 * In:  data
 * Out: [con, set]
 *
 */
function processConstants(data) {
    
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
       
       salt:     tmp[18]      
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field; 
    }); 
    
    return [con, set];
}