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
 * Updated on Mar 15, 2024
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
 * Updated on Mar 15, 2024
 *
 * Description:  Shows the accounts popup content for the finances pages.
 *
 * In:  adp, c, s, slide, h
 * Out: items
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
 * Updated on Mar 18, 2024
 *
 * Description: Check the accounts input and add, edit or remove the accounts in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyAccounts(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#date").val(), $("#serv").val(), $("#acct").val(), $("#desc").val());
    
    msg = c.messages[2].replace("#", input[2]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateInput(c.messages, c.accounts, input))
        {        
            var [id, action] = getRowIdAndAction();
            var hide = getShowHideRow();
            var send = 'date='+ input[0] + '&serv=' + input[1] + '&account=' + input[2] + '&desc=' + input[3] + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
            
            var request = getAjaxRequest("modify_accounts", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        $(".msg").html(input[0] + " " + c.messages[1]);                    
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :
                                //showAddService(result);
                                break;
                                
                            case "edit"   :
                                //showEditService(result);
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
                            //$("#service").val("");                        
                            //$('input[name="services"]').prop('checked', false);
                            //$("#website").val("");   
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