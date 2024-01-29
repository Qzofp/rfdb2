/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings_general.js
 * Used in: settings.php
 *          js/settings.js
 * 
 *
 * Created on Jan 29, 2024
 * Updated on Jan 29, 2024
 *
 * Description: Javascript functions for the settings page.
 * Dependenties: js/config.js
 *
 * Links: https://dev.to/fromwentzitcame/username-and-password-validation-using-regex-2175
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    showGeneralPopupLanguage
 *
 * Created on Nov 22, 2023
 * Updated on Jan 24, 2024
 *
 * Description: Shows the language popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupLanguage(c, s) {
    
    var setting;
    
    $("#popup_content").removeClass().addClass("gen_language");
    $("#popup_content h2").html(c.language[0]);
    $("#popup_content ul li").remove();
    $("#popup_content ul").show();    
    $("#popup_content table tr").remove(); 
    $("#popup_content table").hide(); 
            
    setting = JSON.parse(s[7].value);
    for (let i = 1; i < c.language.length; i++) {
        
        if(setting.language === c.language[i]) {
            var chk = " checked";
        }
        else {
            chk = "";
        }
        
        $("#popup_content ul").append('<li class="rad"><input type="radio" id="lng-' + i + '" name="language"' + 
           chk + '><label for="lng-' + i + '">' + c.language[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showGeneralPopupPages
 *
 * Created on Nov 22, 2023
 * Updated on Jan 24, 2024
 *
 * Description: Shows the pages popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupPages(c, s) {
    
    var chk, setting;
    
    $("#popup_content").removeClass().addClass("gen_pages");                   
    $("#popup_content h2").html(c.settings[0]); 
    $("#popup_content ul li").remove();
    $("#popup_content ul").show();
    $("#popup_content table tr").remove();     
    $("#popup_content table").hide(); 
 
    for (let i = 1; i < c.pages.length - 2; i++) {
        
        setting = JSON.parse(s[i].value);
        if(setting.page === "true") {
            chk = " checked";
        }
        else {
            chk = "";
        }
        
        $("#popup_content ul").append('<li class="chk"><input type="checkbox" id="pag-' + i + '" name="pages"' + 
           'value="' + i + '" ' + chk + '><label for="pag-' + i + '">' + c.titles[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showGeneralPopupUsers
 *
 * Created on Jan 09, 2024
 * Updated on Jan 24, 2024
 *
 * Description: Shows the users popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupUsers(c, s) {
    
    //var chk, setting;
    
    $("#popup_content").removeClass().addClass("gen_users");                   
    $("#popup_content h2").html(c.users[0]); 
    $("#popup_content ul li").remove();
    $("#popup_content ul").hide();
    $("#popup_content table").show().empty();

    $("#popup_content table").append('<tr>' +
                                         '<td><input id="user" type="text" name="user" placeholder="' + c.login[1] + '" /></td>' +
                                         '<td><input id="pass1" type="password" name="pass1" placeholder="' + c.login[2] + '" /></td>' + 
                                         '<td><input id="pass2" type="password" name="pass2" placeholder="' + c.login[2] + " " + c.login[3] + '" /></td>' +
                                         '<td><input type="image" name="submit" src="img/add.png" alt="add" /></td>' +
                                     '</tr>' +
                                     '<tr><td class="msg" colspan="4">&nbsp;<td></tr>');
    
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showLanguage
 *
 * Created on Nov 18, 2023
 * Updated on Dec 21, 2023
 *
 * Description: Show the language setting on the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showLanguage(c, s) {
    
    var set = JSON.parse(s[7].value);
    $("#settings u").html(c.language[0]);
    $("#settings span").html(set.language);
}

/*
 * Function:    setLanguage
 *
 * Created on Nov 29, 2023
 * Updated on Dec 21, 2023
 *
 * Description: Set the language in the database en reload the settings page.
 *
 * In:  language, s
 * Out: -
 *
 */
function setLanguage(language, s) {
    
    var set = JSON.parse(s[7].value);
    if (set.language !== language) {
        
        var request = $.ajax({
            url: "php/change_language.php",
            method: "POST",
            dataType: "json",
            data: { language: language }
        }); 
      
        request.done(function(result) {
            if (result.success) {         
                                 
                // Reload the page.
                setTimeout(function(){
                    window.location.reload();
                }, 600);
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
        
    // Close popup window.
    $("#popup_container").fadeOut("slow");    
}

/*
 * Function:    setPages
 *
 * Created on Nov 30, 2023
 * Updated on Dec 01, 2023
 *
 * Description: Set the pages (true, false) in the database en reload the settings page.
 *
 * In:  p, s
 * Out: -
 *
 */
function setPages(p, s) {
       
    var changes = checkChangedPages(p, s);
    if (changes) {
        
        var pages = JSON.stringify(p);
       
        var request = $.ajax({
            url: "php/change_pages.php",
            method: "POST",
            dataType: "json",
            data: { pages: pages }
        }); 
      
        request.done(function(result) {
            if (result.success) {         
                             
                // Reload the page.         
                setTimeout(function(){
                    window.location.reload();
                }, 600);          
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
    // Close popup window.
    $("#popup_container").fadeOut("slow");    
}

/*
 * Function:    checkChangedPages
 *
 * Created on Nov 30, 2023
 * Updated on Dec 01, 2023
 *
 * Description: Check if there are any page changes.
 *
 * In:  p, s
 * Out: check
 *
 */
function checkChangedPages(p, s) {
    
    var check = false;
         
    var set, tmp;
    for(let i = 1; i <= 4; i++) {
        
        tmp = JSON.parse(s[i].value);
        set = (tmp.page === "true");  // Convert to boolean.
        
        if (set !== p[i-1]) {
            check = true;
        }
    }
    
    return check;
}

/*
 * Function:    addUser
 *
 * Created on Jan 17, 2024
 * Updated on Jan 29, 2024
 *
 * Description: Check the user input and add the user in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function addUser(c, btn) {
    
    var data = [];
    data.push($("#user").val(), $("#pass1").val(), $("#pass2").val());    
    
    // Add the user input to user table if the user doesn´t exists.
    if (validateUser(c, data))
    {    
        let send = 'user='+ data[0] + '&pass='+ hashPassword(data[1], c.salt);        
        var request = $.ajax({
            url: "php/add_user.php",
            method: "POST",
            dataType: "json",
            data: send
        }); 
      
        request.done(function(result) {
            if (result.success) {         
                if (result.exists) {
                    $(".msg").html(c.login[1] + " " + c.login[8]);                    
                }
                else 
                {                    
                    $("#tbl_settings tbody").prepend('<tr><td></td>' +
                                                         '<td>' + result.user + '</td>' +
                                                         '<td>' + result.hash + '</td>' +
                                                         '<td></td><td></td></tr>');
                                                 
                    $("#tbl_settings tbody").children('tr:first').css("font-weight","bold");
                                       
                    // Close popup window or clear input fields.
                    if (btn === 'ok') {
                        $("#popup_container").fadeOut("slow");
                    }
                    else 
                    {
                        $("#user").val("");
                        $("#pass1").val("");
                        $("#pass2").val("");
                    }
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
}

/*
 * Function:    validateUser
 *
 * Created on Jan 29, 2024
 * Updated on Jan 29, 2024
 *
 * Description: Validate the user input (username and password).
 *
 * In:  c, data
 * Out: check
 *
 */
function validateUser(c, data) {
    
    var check = true;
    var isValidUsername = /^[0-9A-Za-z]{5,16}$/;
    var isStrongPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;   
    
    $(".msg").html("&nbsp;");
    
    // Check username, password strength and conformation.    
    if (isValidUsername.test(data[0]) ? true : false) 
    {         
        if (isStrongPassword.test(data[1]) ? true : false) 
        {                        
            if (data[1] !== data[2]) 
            {
                $(".msg").html(c.login[2] + " " + c.login[5]);
                check = false;
            }              
        }
        else 
        {       
            $(".msg").html(c.login[2] + " " + c.login[6]);
            check = false;
        }     
    }
    else 
    {
       $(".msg").html(c.login[1] + " " + c.login[7]);
       check = false;
    }    
    
    return check;
}
