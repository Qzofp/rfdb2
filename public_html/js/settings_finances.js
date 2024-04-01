/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings_finances.js
 * Used in: settings.php
 *          js/settings.js
 * 
 *
 * Created on Mar 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Javascript functions for the settings finances pages.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    setAccounts
 *
 * Created on Mar 01, 2024
 * Updated on Mar 01, 2024
 *
 * Description: Set the account items.
 *
 * In:  c, n
 * Out: items
 *
 */
function setAccountItems(c, n) {
    
    var items = [];  
    items.push(c.accounts[n+4] + c.accounts[0]);
    for (let i = 1; i <= 4; i++) {
       items.push(c.accounts[i]); 
    }    
    
    return items;
}

/*
 * Function:    showFinancesPopupAccounts
 *
 * Created on Mar 01, 2024
 * Updated on Mar 30, 2024
 *
 * Description:  Shows the accounts popup content for the finances pages.
 *
 * In:  adp, c, s, slide, h
 * Out: -
 *
 */
function showFinancesPopupAccounts(adp, c, s, slide, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("fin_accounts", c.accounts[slide+4] + c.accounts[0], 5);    
  
    $("#popup_content .popup_table_finance").show();
  
    set = JSON.parse(s[slide].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);
  
    // Create show or hide button.
    shw = "show";
    if (h) { 
        shw = "hide";
    }
       
    $("#popup_content .popup_table_finance .shw").attr({
                src: "img/" + shw + ".png",
                alt: shw
    });        
       
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.accounts[1]).val(cells[1]);
    
    setAirDatePicker(adp, cells[1]);    
    addSelectMenu(c, "get_services", "sort=service&type=" + s[slide].name, "serv", c.accounts[2], cells[0].split("_")[1], "service");
        
    $("#popup_content .popup_table_finance #acct").attr("placeholder", c.accounts[3]).val(cells[3]);
    $("#popup_content .popup_table_finance #desc").attr("placeholder", c.accounts[4]).val(cells[4]);
           
    $("#popup_content .popup_table_finance .btn").attr({
                src: "img/" + btn + ".png",
                alt: btn
    });
        
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }            

    $("#popup_content .msg").html("&nbsp;");
    
    $("#popup_container").fadeIn("slow");
}

/*
 * Function:    modifyAccounts
 *
 * Created on Mar 18, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Check the accounts input and add, edit or remove the accounts in the database.
 *
 * In:  adp, c, btn
 * Out: -
 *
 */
function modifyAccounts(adp, c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#date").val(), $("#serv").val(), $("#acct").val(), $("#desc").val());
    
    msg = c.messages[2].replace("#", input[2]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateInput(c.messages, c.accounts, input, true))
        {            
            var [id, action] = getRowIdAndAction();
            
            if (id) {
                id = id.split("_")[0];
            }
            
            var type = Number($(".slidemenu input[name='slideItem']:checked")[0].value); // Get the active slide.
            var hide = getShowHideRow();
            var send = 'date='+ input[0] + '&serv=' + input[1] + '&type=' + type + '&account=' + 
                       encodeURIComponent(input[2]) + '&desc=' + encodeURIComponent(input[3]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
            
            // debug
            //console.log(send);
            
            var request = getAjaxRequest("modify_accounts", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        showModifyMessage(c, input[2], action);               
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :                                
                                // Correct the id and service values.
                                result.id += "_" + result.serv;
                                result.serv = $(".nice-select .current:first").html();
                                showAddRow(result);
                                break;
                                
                            case "edit"   :
                                // Correct the service values.
                                result.serv = $(".nice-select .current:first").html();        
                                showEditRow(result);
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
                            $("#date").val("");                        
                            
                            // Reset Air datepicker calender.
                            adp.setViewDate(cDate); 
                            adp.clear();
                            
                            // Reset nice-select menu if there is more then 1 item.
                            if ($("#serv > option").length > 1) {
                                $(".nice-select .current:first").html('<span class="placeholder">' + c.services[1] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                            }
                                                    
                            $("#acct").val(""); 
                            $("#desc").val(""); 
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
 * Function:    showFinancesPopupGroups
 *
 * Created on Mar 30, 2024
 * Updated on Mar 30, 2024
 *
 * Description:  Shows the groups popup content for the finances page.
 *
 * In:  c, s 
 * Out: -
 *
 */
function showFinancesPopupGroups(c, s, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("gen_groups", c.groups[0], 4);
    
    $(".popup_table_finance").hide();
    
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }    
    
    set = JSON.parse(s[1].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);       
    
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +
            
            '<td><input id="groups" type="text" name="grps" placeholder="' + c.groups[1] + '" value="' + cells[1] + '" /></td>' +
            '<td><input id="desc"   type="text" name="desc" placeholder="' + c.groups[3] + '" value="' + cells[3] + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +          
        '</tr>' +
        '<tr><td class="msg" colspan="4">&nbsp;<td></tr>'
    );    
    
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }    
    
    $("#popup_container").fadeIn("slow");     
}

/*
 * Function:    modifyGroups
 *
 * Created on Apr 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Check the groups input and add, edit or remove the groups in the database.
 *
 * In:  adp, c, btn
 * Out: -
 *
 */
function modifyGroups(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#groups").val(), $("#desc").val());
    
    msg = c.messages[2].replace("#", input[2]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateInput(c.messages, c.groups, input, true))
        {            
            var [id, action] = getRowIdAndAction();
            var hide = getShowHideRow();
            var send = 'group=' + encodeURIComponent(input[0]) + '&desc=' + encodeURIComponent(input[1]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
            
            // debug
            console.log(send);
            
            var request = getAjaxRequest("modify_groups", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        showModifyMessage(c, input[0], action);               
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :                                
                                //showAddRow(result);
                                break;
                                
                            case "edit"   :     
                                //showEditRow(result);
                                break;
                                
                            case "delete" :
                                //showDeleteRow();
                                break;
                        }
                            
                        // Close popup window or clear input fields.
                        if (btn === 'ok') {
                            closePopupWindow();                           
                        }
                        else 
                        {   
                            // Reset input.

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