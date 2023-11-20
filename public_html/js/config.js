/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Nov 18, 2023
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
 function getConstants() {
     
    var request = $.ajax({
        url: "php/get_constants.php",
        method: "POST",
        dataType: "json"
    }); 
      
    return request;
} 

/*
 * Function:    processContants
 *
 * Created on Nov 12, 2023
 * Updated on Nov 18, 2023
 *
 * Description: Process the constants and settings from de database tblConfig table.
 *
 * In:  data
 * Out: [con, set]
 *
 */
function processConstants (data) {
    
    var tmp = [];
    $.each(data.constants, function (i, field) {                   
        tmp[i] = field.value;                 
    });

    var con = {
       project:  tmp[0],
       footer:   tmp[1],
       titles:   tmp[2].split(","),
       months:   tmp[3].split(","),
       quarters: tmp[4].split(","),
       year:     tmp[5].split(","),
       pages:    tmp[6].split(","),
       errors:   tmp[7].split(","),
       settings: tmp[8].split(","),
       language: tmp[9].split(","),
       
       scale: tmp[10].split(",")      
    };

    var set = [];
    $.each(data.settings, function (i, field) {                   
        set[i] = field;              
    }); 
    
    return [con, set];
}