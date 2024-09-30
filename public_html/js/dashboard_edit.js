/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_edit.js
 * Used in: sheet.html
 *
 * Created on Sep 29, 2024
 * Updated on Sep 30, 2024
 *
 * Description: Javascript edit (popup, modify data, etc.) functions for the dashboard page.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    showActivaModifyPopup
 *
 * Created on Sep 07, 2024
 * Updated on Sep 29, 2024
 *
 * Description: Shows the popup when the page add or edit button is pressed.
 *
 * In:  adp, btn, c, s
 * Out: -
 *
 */
function showActivaModifyPopup(adp, btn, c, s) {

    var set = JSON.parse(s[0].value);
    
    // Reset values.
    setAirDatePicker(adp, ""); // Reset the date.
    $("#popup_content .msg").html("&nbsp;");
    
    
    
    $("#popup_content").removeClass().addClass("activa_add"); 
    
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();
    
    // Show the popup_table activa class.
    $(".popup_table_activa").show();
    
    $("#popup_content h2").html(c.labels[0]);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);     
    
    fillActivaModifyPopup(adp, btn, c, s);
    
    
    
      
      
  
    $("#popup_container").fadeIn("slow");         
}

/*
 * Function:    fillActivaModifyPopup
 *
 * Created on Sep 11, 2024
 * Updated on Sep 30, 2024
 *
 * Description: Get the value accounts (and optional the cryptos) and fill the add popup.
 *
 * In:  adp, btn, c, s
 * Out: -
 *
 */
function fillActivaModifyPopup(adp, btn, c, s) {
    
    var set = JSON.parse(s[5].value);
    
    // Fill first row and column with the entry date.
    $(".popup_table_activa tr:first td:first").html(c.misc[0]);
    $("#popup_content #date").attr("placeholder", c.misc[1]);
   
    var date;
    if (btn === "edit") 
    {
        date = $("#input_date span").html();
        setAirDatePicker(adp, date);
        $("#popup_content .btn").attr({src: "img/del.png", alt: "del"}).show();
    }
    else {
        $("#popup_content .btn").hide();
    }
   
    var request = getAjaxRequest("get_value_accounts", "date=" + date + "&action=" + btn);
    request.done(function(result) {
             
        if (result.success) {         
        
            // Debug
            //console.log( result.query );
                        
            // Remove all rows except the first and last rows.
            $(".popup_table_activa tbody tr").not(":first").remove();

            // console.log( result.data[0] );

            // Build table with the accounts and input fields.            
            var i = 0, kind = "";
            var id, name, type, value;
            result.data.forEach((item) => {
                
                // Create a separate row for the accounts / crypto titles (kind).
                if (kind !== item.kind) 
                {
                    $(".popup_table_activa tbody").append(
                        '<tr>' +
                            '<td colspan="3"><u>' + item.type + '</u></td>' +
                        '</tr>');                    
                                   
                    kind = item.kind;
                    
                    if (item.kind !== "crypto") 
                    {
                        id   = "aid";
                        name = "account";
                        type = "avalue";
                    }
                    else 
                    {
                        id   = "cid";
                        name = "crypto";
                        type = "cvalue";
                        i = 0;
                    }          
                }
                     
                if (btn === "edit") {
                    value = item.value;
                }
                else {
                    value = "";
                }
                     
                // Create the input rows for accounts / crypto values.
                $(".popup_table_activa tbody").append(
                    '<tr>' +
                        '<td>&bull; ' + item.account + '</td>' +
                        '<td class="sign">' + set.sign + '</td>' +
                        '<td>'+
                            '<input id="' + id + '_' + i + '" name="' + id + '[]" value="' + item.id + '" type="hidden" />' +
                            '<input id="' + name + '_' + i + '" name="' + name + '[]" value="' + item.account + '" type="hidden" />' +
                            '<input id="' + type + '_' + i + '" name="' + type + '[]" placeholder="' + c.misc[2] + '" value="' + value + '" type="text" />' +                             
                        '</td>' +    
                    '</tr>');
            
                i++;
            });             
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
 * Function:    setDashboardPopupChoice
 *
 * Created on Sep 08, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Set the choice made in the dashboard popup window.
 *
 * In:  e, c, s
 * Out: -
 *
 */
function setDashboardPopupChoice(e, c, s) {
    
    e.preventDefault();     
    var btn = e.originalEvent.submitter.alt;
    var popup = $('#popup_content').attr('class');
      
    switch (popup) {
        case "activa_list" :
            break;
        
        case "activa_add"  : // Change it to activa_modify?
            modifyActivaValues(c, s, btn);
            break;
            
        case "activa_edit" : // Change it to activa_modify?
            break;
            
        case "activa_value"  : // For the expand and collapse table
            break;
            
        case "activa_crypto" :
            break;     
    }
}

/*
 * Function:    modifyActivaValues
 *
 * Created on Sep 15, 2024
 * Updated on Sep 30, 2024
 *
 * Description: Check the input and modify it in the tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  c, s, btn
 * Out: -
 *
 */
function modifyActivaValues(c, s, btn) {
    
    // Debug.
    //console.log(btn);
    
    var msg = c.messages[2].replace("#", c.misc[3]);
    if (checkDashboardEditDelete(btn, msg))
    {     
        var set = JSON.parse(s[4].value);  
        var date, aids, accounts, avalue, cids, crypto, cvalue;
        var cpage = (set.page === "true");      
    
        // Get the input values.
        date     = $("#date").val();
        aids     = getMultipleItems(".activa_add input[name^=aid");
        accounts = getMultipleItems(".activa_add input[name^=account");
        avalue   = getMultipleItems(".activa_add input[name^=avalue");
    
        // Check if the crypto page is enabled.
        if (cpage)
        {
            cids   = getMultipleItems(".activa_add input[name^=cid");
            crypto = getMultipleItems(".activa_add input[name^=crypto");
            cvalue = getMultipleItems(".activa_add input[name^=cvalue");      
        }      
        
        // Validate input.
        if (validateDate(c, s, c.misc[0], date) && validateAccounts(c, s, accounts, avalue) && validateAccounts(c, s, crypto, cvalue))
        {
            var action = getDashboardPopupAction();
            
            // Send and get the ajax results.
            var send = { date:date, aids:aids, accounts:avalue, cids:cids, crypto:cvalue, action:action };
        
            // Debug
            console.log(send);
        
            var request = getAjaxRequest("modify_values", send);
            request.done(function(result) {
            if (result.success) {      
                                    
                // Debug
                //console.log( result );
                
                if (result.exists) {
                    $("#popup_content .msg").html(c.misc[0] + " " + c.messages[1]);
                }
                else 
                {
                    showActivaAccountsContent(crypto, c, s, date);     
                    closePopupWindow();       
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
 * Function:    checkDashboardEditDelete
 *
 * Created on Sep 30, 2024
 * Updated on Sep 30, 2024
 *
 * Description: Check if the edit or delete button is pressed in the dashboard popup choice window.
 *
 * In:  btn, msg
 * Out: check
 * 
 */
function checkDashboardEditDelete(btn, msg) {
    
    var check = true;
    switch (btn) {
        case "del" :
            
            $("#popup_content .btn").attr({
                src: "img/edit.png",
                alt: "edit"
            });
        
            $("#popup_content input[type=text]").prop('disabled', true); 
            $(".msg").html(msg);
             
            check = false;             
            break;
            
        case "edit" :
            
            $("#popup_content .btn").attr({
                src: "img/del.png",
                alt: "del"
            });
        
            $("#popup_content input[type=text]").prop('disabled', false);
            $(".msg").html("&nbsp;");   
      
            check = false;            
            break;
            
        case "cancel" :
            check = false;
            break;
    } 
          
    return check;
}

/*
 * Function:    validateAccounts
 *
 * Created on Sep 21, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Validate the values of the accounts, check if it is not empty and if it has a correct value.
 *
 * In:  c, s, accounts, avalue
 * Out: check
 *
 */
function validateAccounts(c, s, accounts, values) {
    
    var check = true; 
    
    if (accounts && accounts.length)
    {
        for (let i = 0; i < values.length && check; i++) {
            check = validateCurrency(c, s, accounts[i], values[i]);        
        }
    }   
    
    return check;
}

/*
 * Function:    getDashboardPopupAction
 *
 * Created on Sep 30, 2024
 * Updated on Sep 30, 2024
 *
 * Description: Get the action from the dashboard popup window.
 *
 * In:  -
 * Out: action
 * 
 */
function getDashboardPopupAction() {
    
    var action = "add";
    
    if ($("#popup_content .btn").is(":visible")) 
    {
        if ($("#popup_content .btn").attr("alt") === "edit") {
            action = "delete";
        }
        else if ($("#popup_content .btn").attr("alt") === "del") {
            action = "edit";
        }
    }
    
    return action;
}