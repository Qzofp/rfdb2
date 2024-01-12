/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    login.js
 * Used in: index.html
 *
 * Created on Dec 20, 2023
 * Updated on Jan 10, 2024
 *
 * Description: Javascript login functions.
 * Dependenties: -
 *
 */

// Define constants
const cVersion = "0.1";
const cDate = new Date();

/*
 * Function:    loadLoginPage
 *
 * Created on Dec 20, 2023
 * Updated on Dec 20, 2023
 *
 * Description: The login.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadLoginPage() {
    
    $.when(getLoginConstants()).done(function(result) {

        if (result.success) {         
            var c = processLoginConstants(result);           
            showLoginPage(c);
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
 * Function:    showLoginPage
 *
 * Created on Dec 20, 2023
 * Updated on Jan 10, 2024
 *
 * Description: Shows the login page.
 *
 * In:  c
 * Out: -
 *
 */
function showLoginPage(c) {

    $("title").html(c.project);
    $("h1").html(c.project);  
    
    $("form").find('input').val('');   
    $("#user").attr("placeholder", c.login[1]);
    $("#pass").attr("placeholder", c.login[2]);
    
    $("form button").html(c.login[0]);
    
    // Login button is pressed.
    $(document).on("submit","form",function(e) {
       validateLogin(e, this, c); 
    });        
    
    $("footer h3").html(c.footer);
}

/*
 * Function:    validateLogin
 *
 * Created on Dec 22, 2023
 * Updated on Jan 02, 2024
 *
 * Description: Validate the login and redirect on success.
 *
 * In:  e
 * Out: -
 *
 */
function validateLogin(e, that, c) {
    
    e.preventDefault();
       
    var request = $.ajax({
        method:"POST",
        url: "login.php",
        data:$(that).serialize()
    });
        
    request.done(function(result) {
        if (result.success) {   
            if (result.login) {
                window.location.href=c.pages[0];
            }
            else {
                $("h2").html(c.login[3]);
            }
        }
        else {
            showDatabaseError(result.message); 
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
    
    closeErrorMessage();
}

/*
 * Function:    getLoginContants
 *
 * Created on Dec 22, 2023
 * Updated on Dec 22, 2023
 *
 * Description: Get the constants and settings from de database tblConfig table.
 *
 * In:  -
 * Out: request
 *
 */
 function getLoginConstants() {
     
    var request = $.ajax({
        url: "php/get_login_constants.php",
        method: "POST",
        dataType: "json"
    }); 
      
    return request;
} 

/*
 * Function:    processLoginContants
 *
 * Created on Dec 22, 2023
 * Updated on Dec 23, 2023
 *
 * Description: Process the login constants the database tblConfig table.
 *
 * In:  data
 * Out: con
 *
 */
function processLoginConstants(data) {
    
    var tmp = [];
    $.each(data.constants, function (i, field) {                   
        tmp[i] = field.value;                 
    });

    var con = {
       project:  tmp[0],
       footer :  tmp[1],
       pages:    tmp[2].split(","),
       login  :  tmp[3].split(",")
    };

    return con;
}
