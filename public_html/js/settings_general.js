/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    settings_general.js
 * Used in: settings.php
 *          js/settings.js
 * 
 *
 * Created on Jan 29, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Javascript functions for the settings general page.
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
 * Updated on Mar 09, 2024
 *
 * Description: Shows the language popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupLanguage(c, s) {
    
    var chk, set;   
    setPopupList("gen_language", c.language[0]);       
    
    set = JSON.parse(s[5].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);     
    
    set = JSON.parse(s[7].value);    
    for (let i = 1; i < c.language.length; i++) {        
        if(set.language === c.language[i]) {
            chk = " checked";
        }
        else {
            chk = "";
        }
        
        $(".popup_list").append('<li class="rad"><input type="radio" id="lng-' + i + '" name="language"' + 
           chk + '><label for="lng-' + i + '">' + c.language[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showGeneralPopupPages
 *
 * Created on Nov 22, 2023
 * Updated on Sep 07, 2024
 *
 * Description: Shows the pages popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupPages(c, s) {
    
    var chk, set;
    setPopupList("gen_pages", c.settings[0]);

    set = JSON.parse(s[5].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);     
    
    //set = JSON.parse(s[7].value);   

    for (let i = 1; i < c.pages.length - 2; i++) {        
        set = JSON.parse(s[i].value);
        if(set.page === "true") {
            chk = " checked";
        }
        else {
            chk = "";
        }
        
        $(".popup_list").append('<li class="chk"><input type="checkbox" id="pag-' + i + '" name="pages"' + 
           'value="' + i + '" ' + chk + '><label for="pag-' + i + '">' + c.titles[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    setPopupList
 *
 * Created on Feb 14, 2024
 * Updated on Mar 09, 2024
 *
 * Description: Set (prepare) the popup list.
 *
 * In:  popclass, title
 * Out: -
 *
 */
function setPopupList(popclass, title) {
    
    $("#popup_content").removeClass().addClass(popclass);
    $("#popup_content h2").html(title);
    $(".popup_list li").remove();
    $(".popup_list").show();    
    $(".popup_table_setting tr").remove(); 
    $("#popup_content table").hide();     
}

/*
 * Function:    showGeneralPopupUsers
 *
 * Created on Jan 09, 2024
 * Updated on Mar 09, 2024
 *
 * Description: Shows the users popup content for the general page.
 *
 * In:  c
 * Out: -
 *
 */
function showGeneralPopupUsers(c, s) {
     
    var btn, cells, set;
    [btn, cells] = setPopupTable("gen_users", c.users[0], 5);
    
    $(".popup_table_finance").hide();
    
    set = JSON.parse(s[5].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);      

    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input id="user" type="text" name="user" placeholder="' + c.login[1] + '" value="' + cells[1] + '" /></td>' +
            '<td><input id="pass1" type="password" name="pass1" placeholder="' + c.login[2] + '" /></td>' + 
            '<td><input id="pass2" type="password" name="pass2" placeholder="' + c.login[2] + " " + c.login[3] + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +    
        '</tr>' +
        '<tr><td class="msg" colspan="4">&nbsp;<td></tr>'
    );
    
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showGeneralPopupServices
 *
 * Created on Feb 14, 2024
 * Updated on Mar 09, 2024
 *
 * Description: Shows the services popup content for the general page.
 *
 * In:  c, s, h
 * Out: -
 *
 */
function showGeneralPopupServices(c, s, h) {
    
    var chk, setting, items = "";
    var shw, btn, cells, set, col = 3;
    [btn, cells] = setPopupTable("gen_services", c.services[0], 7);     
    
    $(".popup_table_finance").hide();
    
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }
    
    set = JSON.parse(s[5].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);    
      
    // Generate the checkboxes for the pages.
    for (let i = 1, j = 2; i < c.pages.length - 2; i++) {        
        setting = JSON.parse(s[i].value);
        if(setting.page === "true") {  
            
            chk = "";
            if ((cells[j]) === "☑") {
                chk = " checked";
            }
            j++;
            col++;
            items += '<td class="chk"><li><input type="checkbox" id="srv-' + i + '" name="services"' + 
                     'value="' + i + '" ' + chk + '><label for="srv-' + i + '">' + c.services[i+1] + 
                     '</label></li></td>';   
        }
    }
    
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +
            '<td><input id="service" type="text" name="service" placeholder="' + c.services[1] + '" value="' + cells[1] + '" /></td>' +                                         
            items +
            '<td><input id="website" type="text" name="website" placeholder="' + c.services.slice(-1) + '" value="' + cells.slice(-1) + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +    
        '</tr>' +
        '<tr><td class="msg" colspan="' + col + '">&nbsp;<td></tr>'
    );
    
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }      
    
    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    setServices
 *
 * Created on Feb 10, 2024
 * Updated on Feb 12, 2024
 *
 * Description: Set the services which depends if the page is hidden or not.
 *
 * In:  c, s
 * Out: srv
 *
 */
function setServices(c, s) {
    
    var set, srv = [];
    
    srv.push(c.services[0]);
    srv.push(c.services[1]);
    
    for (let i = 1; i < c.pages.length - 2; i++) {
        
        set = JSON.parse(s[i].value);
        if(set.page === "true") {
            srv.push(c.services[i+1]);
        } 
    }     
    
    srv.push(c.services[6]);
    
    return srv;
}

/*
 * Function:    setPopupTable
 *
 * Created on Feb 14, 2024
 * Updated on Mar 09, 2024
 *
 * Description: Set (prepare) the popup table, return the add or delete button and the cell values.
 *
 * In:  popclass, title, n
 * Out: btn, cells
 *
 */
function setPopupTable(popclass, title, n) {

    var btn = "add"; 
    var cells = [];
      
    $("#popup_content").removeClass().addClass(popclass);                   
    $("#popup_content h2").html(title); 
    $(".popup_list li").remove();
    $(".popup_list").hide();
    $(".popup_table_setting").show().empty();
    
    // Remove add marker if a new row was added.
    removeAddRowMarker();
        
    // Show update popup and get the cell values.    
    if ($("#table_container tbody .marked").length) 
    {         
        $("#table_container tbody .marked").find("td").each(function(){
            cells.push($(this).html());            
        });        
        btn = "del";
    }
    else {  // Fill the cells with empty values.
        for (let i = 0; i < n; i++) {
            cells.push("");
        }
    }
    
    return [btn, cells];
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
 * Updated on Feb 23, 2025
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
        
        var send = "language=" + language;
        var request = getAjaxRequest("settings/change_language", send);   
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
 * Updated on Feb 23, 2025
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
        
        var send = "pages=" + JSON.stringify(p);
        var request = getAjaxRequest("settings/change_pages", send);
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
 * Function:    modifyUser
 *
 * Created on Jan 17, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Check the user input and add, edit or remove the user in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyUser(c, btn) {
        
    var data = [];        
    data.push($("#user").val(), $("#pass1").val(), $("#pass2").val());       
    var msg = c.messages[2].replace("#", c.login[1] + " " + data[0]);
        
    if(!checkEditDelete(btn, msg)) {
      
        // Add the input to user table if the user doesn´t exists.
        if (validateUser(c, data))
        {    
            var [id, action] = getRowIdAndAction();                        
            var send = 'user='+ data[0] + '&pass=' + hashPassword(data[1], c.salt) + '&action=' + action 
                              + '&id=' + id;
            
            var request = getAjaxRequest("settings/modify_user", send);
            request.done(function(result) {
                if (result.success) {    
                                       
                    if (!checkLastUserOrExists(result, data[0], c))
                    {
                        switch (action) {
                            case "add"    :
                                showAddRow(result);
                                break;
                                
                            case "edit"   :
                                showEditUser(result);
                                break;
                                
                            case "delete" :
                                showDeleteRow();
                                break;
                        }
                            
                        // Close popup window or clear input fields.
                        if (btn === 'ok') {
                            closePopupWindow();                           
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
                    showDatabaseError(result);
                }
            });
    
            request.fail(function(jqXHR, textStatus) {
                showAjaxError(jqXHR, textStatus);
            });  
     
            closeErrorMessage();               
        }
    }
}

/*
 * Function:    validateUser
 *
 * Created on Jan 29, 2024
 * Updated on Mar 22, 2024
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
    
    // Only validate when the data isn't marked for deletion.
    if (!$("#table_container tbody .delete").length) {
    
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
                if (data[1]) {
                    $(".msg").html(c.login[2] + " " + c.messages[0]);
                }
                else {
                    $(".msg").html(c.login[2] + " " + c.messages[5]);
                }
                check = false;         
            }     
        }
        else 
        {
            if (data[0]) {
                $(".msg").html(c.login[1] + " " + c.messages[0]);
            }
            else {
                $(".msg").html(c.login[1] + " " + c.messages[5]);
            }
            check = false;
        } 
    }
    
    return check;
}

/*
 * Function:    checkLastUserOrExists
 *
 * Created on Feb 25, 2024
 * Updated on Feb 26, 2024
 *
 * Description: Check if it is the last user or uf the user exists.
 *
 * In:  result, user, c
 * Out: -
 *
 */
function checkLastUserOrExists(result, user, c) {
    
   var check = false;
   
   if (result.exists) {
       
       $(".msg").html(user + " " + c.messages[1]);
       check = true;
   }
   else if (result.last) {
       
       $(".msg").html(user + " " + c.messages[3]);
       check = true;
   }
   
   return check; 
}

/*
 * Function:    showEditUser
 *
 * Created on Feb 04, 2024
 * Updated on Feb 04, 2024
 *
 * Description: Show the result of edit user.
 *
 * In:  result
 * Out: -
 *
 */
function showEditUser(result) {  
    
    $("#table_container tbody .marked td").eq(1).html(result.user);
    $("#table_container tbody .marked td").eq(2).html(result.hash);    
}

/*
 * Function:    modifyServices
 *
 * Created on Feb 18, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Check the services input and add, edit or remove the services in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyServices(c, btn) {
    
    var input = [];  
    var options = [];
    var msg;
    
    // Get the input values.
    input.push($("#service").val(), $("#website").val());
    $('input[name="services"]').each(function() {
        
        if ($(this).is(":checked")) {
            options[this.value-1] = true;
        }
        else {
            options[this.value-1] = false;
        }                 
    });
    
    input.push(options); 
    msg = c.messages[2].replace("#", input[0]);
   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateName(c.messages, c.services[1], input[0])) 
        {        
            var [id, action] = getRowIdAndAction();
            var hide = getShowHideRow();
            var send = 'srv='+ encodeURIComponent(input[0]) + '&web=' + encodeURIComponent(input[1]) + '&opt=' +
                        JSON.stringify(input[2]) + '&action=' + action + '&id=' + id + '&hide=' + hide;
            
            var request = getAjaxRequest("settings/modify_services", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        showModifyMessage(c, input[0], action);                   
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :
                                showAddService(result);
                                break;
                                
                            case "edit"   :
                                showEditService(result);
                                break;
                                
                            case "delete" :
                                showDeleteRow();
                                break;
                        }
                            
                        // Close popup window or clear input fields.
                        if (btn === 'ok') {
                            closePopupWindow();                           
                        }
                        else 
                        {   
                            // Reset input.
                            $("#service").val("");                        
                            $('input[name="services"]').prop('checked', false);
                            $("#website").val("");   
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
}

/*
 * Function:    validateName
 *
 * Created on Feb 19, 2024
 * Updated on Mar 22, 2024
 *
 * Description: Validate the name, check if it is not empty.
 *
 * In:  c, name, value
 * Out: check
 *
 */
function validateName(msg, name, value) {

    var check = true;
    
    if (!value) {
        $(".msg").html(name + " " + msg[5]);
        check = false;
    }
    
    return check;
}

/*
 * Function:    showAddService
 *
 * Created on Feb 21, 2024
 * Updated on Mar 20, 2024
 *
 * Description: Show the result of add service.
 *
 * In:  result
 * Out: -
 *
 */
function showAddService(result) {
    
    var items = ""; 
    var options = [];
    if (result.opt) {
        options = result.opt.split(",");          
        options.forEach((item) => {
            items += '<td>' + item + '</td>';
        }); 
    }
        
    $("#table_container").scrollTop(0);
  
    $("#table_container tbody").prepend('<tr><td>' + result.id + '</td>' +
                                            '<td>' + result.srv + '</td>' +                                            
                                            items +
                                            '<td>' + result.web + '</td>');
                                                 
    $("#table_container tbody").children("tr:first").addClass("add"); 
}

/*
 * Function:    showEditService
 *
 * Created on Feb 21, 2024
 * Updated on Feb 23, 2024
 *
 * Description: Show the result of edit service.
 *
 * In:  result
 * Out: -
 *
 */
function showEditService(result) {
    
    var options = [];
    
    if (result.hide === "true") {
        $("#table_container tbody .marked").addClass("hide");
    }
    else {
        $("#table_container tbody .marked").removeClass("hide");
    }
    
    if (result.opt) {
        options = result.opt.split(",");
        
        options.forEach(function(item, i) {            
            $("#table_container tbody .marked td").eq(i+2).html(item); 
        });     
    }
    
    $("#table_container tbody .marked td").eq(1).html(result.srv);
    $("#table_container tbody .marked td:last-child").html(result.web);    
}

/*
 * Function:    getShowHideRow
 *
 * Created on Feb 23, 2024
 * Updated on Feb 23, 2024
 *
 * Description: Get the show or hide button.
 *
 * In:  -
 * Out: hide
 * 
 */
function getShowHideRow() {
    
    var hide = false;
 
    if ($("#popup_content .shw").length) {
             
        if ($("#popup_content .shw").attr("alt") === "hide") {
            hide = true;
        }
    }
    
    return hide;
}

/*
 * Function:    showGeneralPopupConfigs
 *
 * Created on Apr 12, 2024
 * Updated on Apr 27, 2024
 *
 * Description:  Shows the configs (settings) popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupConfigs(c, s) {
    
    var set, start, salt;
    
    $("#popup_content").removeClass().addClass("gen_configs");                   
    $("#popup_content h2").html(c.configs[0]); 
    $(".popup_list li").remove();
    $(".popup_list").hide();
    $(".popup_table_setting").show().empty();
    $(".popup_table_finance").hide();
        
    set = JSON.parse(s[5].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);         
        
    // Number of sheet rows.
    $(".popup_table_setting").append(
        '<tr>' +
            '<td>' + c.setconfigs[0] + '</td>' + 
            '<td><input id="rows" type="text" name="rows" placeholder="' + c.setconfigs[1] + '" value="' + set.rows + '" /></td>' +
        '</tr>'
    );
    
    // Currency sign
    $(".popup_table_setting").append(
        '<tr>' +
            '<td>' + c.setconfigs[2] + '</td>' + 
            '<td><input id="sign" type="text" name="sign" placeholder="' + c.setconfigs[3] + '" value="' + set.sign + '" /></td>' +
        '</tr>'
    );    
      
    // Start year for finance pages.
    for (let i = 1; i < c.pages.length - 2; i++) {        
        set = JSON.parse(s[i].value);
        if(set.page === "true") {       
            
            start = set.start;
            if (set.start === 0) {
                start = "";
            }
            
            $(".popup_table_setting").append(
                '<tr>' +
                    '<td>' + c.setconfigs[4] + c.titles[i] + '</td>' + 
                    '<td><input id="' + s[i].name + '" type="text" name="' + s[i].name + '" placeholder="' + c.setconfigs[5] + cDate.getFullYear() +'" value="' + start + '" /></td>' +
                '</tr>'
            );
        }
    }        
     
    // Salt phrase.  
    salt = JSON.parse(s[8].value);
    $(".popup_table_setting").append(  
        '<tr><td colspan="2">&nbsp;<td></tr>' +
        '<tr><td class="warning" colspan="2">' + c.setconfigs[6] + '<td></tr>' +
        '<tr>' +
            '<td>' + c.setconfigs[7] + '</td>' + 
            '<td><input id="salt" type="text" name="salt" placeholder="' + c.setconfigs[8] + '" value="' + salt.phrase + '" /></td>' +
        '</tr>' +
        '<tr><td class="msg" colspan="2">&nbsp;<td></tr>'
    ); 
  
    $("#popup_container").fadeIn("slow");  
}

/*
 * Function:    modifyConfigs
 *
 * Created on Apr 19, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Check the configs (settings) input and modify it in the tbl_settings table.
 *
 * In:  c, s
 * Out: -
 *
 */
function modifyConfigs(c, s) {
    
    var set, id, check, input = [];
    
    // Get the input values.
    input.push($("#rows").val(), $("#sign").val(), $("#salt").val());   
    for (let i = 1; i < c.pages.length - 2; i++) {        
        set = JSON.parse(s[i].value);
        id = "#" + s[i].name;
        if(set.page === "true") {       
           input.push($(id).val()); 
        }
        else {
           input.push("");
        }
    }     
    
    // Validate and send data.
    [check, input] = validateConfigs(c, s, input); 
    if (check)
    {          
        var send = 'rows=' + input[0] + '&sign=' + input[1] + '&salt=' + encodeURIComponent(input[2]) + 
                   '&finance=' + input[3] + '&stock=' + input[4] + '&savings=' + input[5] + 
                   '&crypto=' + input[6]; 
            
        var request = getAjaxRequest("settings/modify_configs", send);
            request.done(function(result) {
                if (result.success) {      
                                     
                    closePopupWindow(); 
                    
                    // Reload page if the number of rows or salt phrase is changes.
                    if (input[0] || input[2]) {       
                        setTimeout(function(){
                            window.location.reload();
                        }, 600);                          
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
 * Function:    validateConfigs
 *
 * Created on Apr 19, 2024
 * Updated on Apr 27, 2024
 *
 * Description: Validate the configs (settings) input.
 *
 * In:  c, s, input
 * Out: check, input
 *
 */
function validateConfigs(c, s, input) {

    var set, check = true;
    var isValidCurrencySign = /([$€£]){1}/;
    var isValidSaltPhrase = /^[0-9A-Za-z.,!? ]{20,}$/;   
        
    // Check rows input. If the input isn't changed then make the input empty.
    if (isNaN(input[0]) || Number(input[0]) < 15 || Number(input[0]) > 50) {
        $(".msg").html(c.setconfigs[0] + " " + c.messages[0]);
        check = false;     
    } 
    else {
        set = JSON.parse(s[5].value);
        if (input[0] === set.rows) {
            input[0] = "";
        }
    }
       
    // Check currency sign.
    if (!isValidCurrencySign.test(input[1]) ? true : false || input[1].length > 1) {
        $(".msg").html(c.setconfigs[2] + " " + c.messages[0]); 
        check = false;
    }
    else {
        set = JSON.parse(s[5].value);
        if (input[1] === set.sign) {
            input[1] = "";
        }
    } 

    // Check the start year input.
    for (let i = 3; i < 7; i++) {      
        if (input[i] !== 0 && input[i] !== "" ) {           
            if (isNaN(input[i]) || Number(input[i]) < 1970 || Number(input[i]) > cDate.getFullYear()) {
                $(".msg").html(c.setconfigs[4] + " " + c.titles[i-2] + " " + c.messages[0]);
                check = false;
                i = 6;
            }
        }
    }
   
    // Check the Salt phrase input.  If the input isn't changed then make the input empty.
    if (!isValidSaltPhrase.test(input[2]) ? true : false) {
        $(".msg").html(c.setconfigs[7] + " " + c.messages[0]); 
        check = false;
    }
    else {
        set = JSON.parse(s[8].value);
        if (input[1] === set.phrase) {
            input[1] = "";
        }
    }    
   
    return [check, input];
}