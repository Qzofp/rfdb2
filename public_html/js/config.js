/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Nov 06, 2023
 *
 * Description: Javascript config functions.
 * Dependenties: -
 *
 */

// Define constants
const cVersion = "0.1";
const cDate = new Date();
//const cDate = new Date('02/19/2023');

// Load constants from the database.
var c = getConstants("NL");
const cProject = c[0];
const cFooter  = c[1];
const cMenu    = c[2].split(',');



console.log(c); // debug.




// Load constants from the database.
//const cMenu     = ["Overzicht","Financiën","Beleggen","Sparen","Crypto","Instellingen"];
const cMonths   = ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
const cQuarters = ["Januari - Maart","April - Juni","Juli - September","Oktober - December","Test 1","Test 2"];
const cYear     = ["Januari - December","Test 1","Test 2","Test 3","Test 4","Test 5"];
const cErrors   = ["Ongeldige Pagina","Error 2", "Error 3"];
const cMessages = ["Foutmelding: Pagina [PAGE] bestaat niet!","Melding 2", "Melding 3"];

// Load JSON settings from the database.
var sheets = '{ "sheet" : [' +
    '{ "name":"dashboard", "page":true,  "scale":"" },' +        
    '{ "name":"finance",   "page":true,  "scale":"months" },' +
    '{ "name":"stock",     "page":true,  "scale":"quarters" },' +
    '{ "name":"savings",   "page":true,  "scale":"year" },' +
    '{ "name":"crypto",    "page":true,  "scale":"quarters" },' +    
    '{ "name":"settings",  "page":true,  "scale":"" } ]}';

const cSheets = JSON.parse(sheets); 








/*
 * Function:    getContants
 *
 * Created on Oct 15, 2023
 * Updated on Nov 06, 2023
 *
 * Description: Get the constants from de database tblConfig table.
 *
 * In:  language
 * Out: data
 *
 */
 function getConstants(language) {
     
    var data;
    var request = $.ajax({
        url: "php/get_constants.php",
        method: "POST",
        dataType: "json"
    }); 
    
    request.done(function(result) {

        if (result.success) {
            
            var constants = [];
            $.each(result.data, function (i, field) {                   
                constants[i] = field.value;                 
            });
                
            // Store the response data in the local storage to get it out of the ajax request.
            localStorage.setItem("data", JSON.stringify(constants));
        }
        else {
            $("#error h2").html("Database Fout"); 
            $("#error p").html(result.message);
            $("#popup_error").fadeIn("slow");                             
        }     
    });
    
    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });    
    
    //console.log(localStorage.getItem("data"));
    
    data = JSON.parse(localStorage.getItem("data"));    
    localStorage.clear();
    
    //console.log(localStorage.getItem("data"));
    
    return data;
} 