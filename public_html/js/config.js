/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.js
 * Used in: sheet.js
 *
 * Created on Oct 02, 2023
 * Updated on Oct 22, 2023
 *
 * Description: .
 * Dependenties: -
 *
 */

// Define constants
const cVersion = "0.1";
const cDate = new Date();


// Load constants from the database.
const cMonths   = ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
const cQuarters = ["Jan - Maa","Apr - Jun","Jul - Sept", "Okt - Dec"];
const cYear     = ["Jan - Dec"];

// Test function
function showConfigs() {
    
    console.log("Test Constant: " + cDate);
    
}

/*
 * Function:    getContants
 *
 * Created on Oct 15, 2023
 * Updated on Oct 21, 2023
 *
 * Description: Get the constants from de database tblConfig table.
 *
 * In:  -
 * Out: -
 *
 */
function getConstants() {

    $.ajax({
        url: "php/get_constants.php",
        type: 'post',
        dataType: 'json',
        success: function (result) {

            if (result.success) {

                $(".content_finance .tbl_list").html("");
                $(".content_finance .tbl_list").append("<tr><th>Name</th><th>Value</th></tr>");
                
                $.each(result.data, function (i, field) {

                    $(".content_finance .tbl_list").append("<tr><td>" + field.name + "</td><td>" + field.value + "</td></tr>");

                });

            }
            else {
                $("#error").append(result.message);
            }
        },
        error: function (xhr, status, error) {

        }
    });
}