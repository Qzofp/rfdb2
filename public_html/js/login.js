/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    login.js
 * Used in: index.html
 *
 * Created on Dec 20, 2023
 * Updated on Apr 12, 2024
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
 * Updated on Apr 12, 2024
 *
 * Description: The login.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadLoginPage() {
    
    $.when(getAjaxRequest("get_constants", "page=login")).done(function(result) {

        if (result.success) {            
            var c = processLoginConstants(result);        
            showLoginPage(c);
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
 * Function:    showLoginPage
 *
 * Created on Dec 20, 2023
 * Updated on Jan 27, 2024
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
       validateLogin(e, c);
    });        
    
    $("footer h3").html(c.footer);
}

/*
 * Function:    validateLogin
 *
 * Created on Dec 22, 2023
 * Updated on Apr, 2024
 *
 * Description: Validate the login and redirect on success.
 *
 * In:  e
 * Out: -
 *
 */
function validateLogin(e, c) {
    
    e.preventDefault();
    
    var user=$('#user').val();
    var pass=$('#pass').val(); 
    
    var data = 'user='+ user + '&pass='+ hashPassword(pass, c.salt);
    
    var request = $.ajax({
        method:"POST",
        url: "login.php",
        data: data
    });
        
    request.done(function(result) {
        if (result.success) {   
            if (result.login) {              
                window.location.href=c.pages[0];
            }
            else {
                $("h2").html(c.login[0] + " " + c.login[4]);
            }
        }
        else {
            showDatabaseError(result);
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
    
    closeErrorMessage();
}

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
 * Function:    processLoginContants
 *
 * Created on Dec 22, 2023
 * Updated on Jan 27, 2024
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
       pages  :  tmp[2].split(","),
       login  :  tmp[3].split(","),
       salt   :  tmp[4]
    };

    return con;
}