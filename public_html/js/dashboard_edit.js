/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_edit.js
 * Used in: dashboard.php
 *
 * Created on Sep 29, 2024
 * Updated on Jan 17, 2025
 *
 * Description: Javascript edit (popup, modify data, etc.) functions for the dashboard page.
 * Dependenties: 
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////


/*
 * Function:    showActivaListPopup
 *
 * Created on Nov 13, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Shows the popup when the page list button is pressed.
 *
 * In:  c, s
 * Out: -
 *
 */
function showActivaListPopup(c, s) {
    
    var set  = JSON.parse(s[5].value);
    var dash = JSON.parse(s[0].value);
    
    // Get the pages (finance, stock, savings and crypto) and check if one of more is enabled.
    var sheet, page = false;
    for (let i = 1; i < 5; i++)
    {
        sheet = JSON.parse(s[i].value);        
        if (sheet.page === "true") {
            page = true;
        }
    }    
    
    // Set the popup class.
    $("#popup_content").removeClass().addClass("activa_list"); 
    
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();    
    
    // Show the title.
    $("#popup_content h2").html(c.labels[0]);
    $("#popup_content h2").css("text-decoration-color", dash.theme.color);    
    
    if (page) 
    {        
        // Turn off the popup scroll.
        $(".popup_activa_slide").css("overflow", "unset");
        
        // Reset values.
        $("#popup_content .msg").html("&nbsp;");
    
        // Fill first row and column with the entry date.
        $(".popup_table_list thead tr:first th:first").html(c.dashmisc[0]);
     
        // Add Select Menu.
        removeSelectMenu(); 
        addSelectMenu(c, "get_select_date_values", "limit=" + set.rows, "list_dates", c.dashmisc[1], 0, "", 1);    
        
        // Show the popup_table activa class.
        $(".popup_table_list").show();
    }
    else 
    {        
        $("#popup_content .msg").html(c.dashmisc[3].replace("#", c.dashmisc[4]));
        $("#popup_content .ok").hide();
    }    
      
    $("#popup_container").fadeIn("slow");  
}

/*
 * Function:    showActivaModifyPopup
 *
 * Created on Sep 07, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Shows the popup when the page add or edit button is pressed.
 *
 * In:  adp, btn, c, s
 * Out: -
 *
 */
function showActivaModifyPopup(adp, btn, c, s) {

    var set = JSON.parse(s[0].value);
    
    // Get the pages (finance, stock, savings and crypto) and check if one of more is enabled.
    var sheet, page = false;
    for (let i = 1; i < 5; i++)
    {
        sheet = JSON.parse(s[i].value);        
        if (sheet.page === "true") {
            page = true;
        }
    }
    
    // Set the popup class.
    $("#popup_content").removeClass().addClass("activa_modify"); 
    
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();    
    
    // Show the title.
    $("#popup_content h2").html(c.labels[0]);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);      
    
    if (page) 
    {        
        // Calculate popup scroll table height.
        var y = $(".content_main").height() - 200;
        $(".popup_activa_slide").css({"max-height":y, "overflow":"auto"});
        
        // Reset values.
        setAirDatePicker(adp, ""); // Reset the date.
        $("#popup_content .msg").html("&nbsp;");
  
        fillActivaModifyPopup(adp, btn, c, s);
        
        // Show the popup_table activa class.
        $(".popup_table_values").show();         
    }
    else 
    {         
        $("#popup_content .msg").html(c.dashmisc[3].replace("#", c.dashmisc[4]));
        $("#popup_content .ok").hide();
    }
      
    $("#popup_container").fadeIn("slow");         
}

/*
 * Function:    fillActivaModifyPopup
 *
 * Created on Sep 11, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Get the value accounts (and optional the cryptos) and fill the add popup.
 *
 * In:  adp, btn, c, s
 * Out: -
 *
 */
function fillActivaModifyPopup(adp, btn, c, s) {
      
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
                        
            if (result.data.length)
            {
                // Fill first row and column with the entry date.
                $(".popup_table_values thead tr:first th:first").html(c.dashmisc[0]);
                $("#popup_content #date").attr("placeholder", c.dashmisc[1]);
            
                // Remove all rows.
                $(".popup_table_values tbody tr").remove();

                //console.log( result.data );
            
                // Build table with the accounts and input fields.            
                var i = 0, kind = "";
                result.data.forEach((item) => {
                
                    [i, kind] = showActivaAccount(c, s, i, kind, btn, item);
                    i++;
                });
                
                $(".popup_activa_slide").scrollTop(0);
            }
            else 
            {
                $("#popup_content .msg").html(c.dashmisc[3].replace("#", c.dashmisc[5]));
                $("#popup_content .ok").hide();                
                $("#date").hide();
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
 * Function:    showActivaAccount
 *
 * Created on Oct 05, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Show the activa account in the modify popup window.
 *
 * In:  c, s, i, kind, btn, item
 * Out: kind
 *
 */
function showActivaAccount(c, s, i, kind, btn, item) {
    
    var id, name, type, value;
    var set = JSON.parse(s[5].value);
    
    // Create a separate row for the accounts / crypto titles (kind).
    if (kind !== item.kind) 
    {
        $(".popup_table_values tbody").append(
            '<tr>' +
                '<td colspan="3"><u>' + item.type + '</u></td>' +
            '</tr>');                    
        
        if (item.kind === "crypto") {
           i = 0; 
        }
        
        kind = item.kind; 
    }    
    
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
    }  
                     
    if (btn === "edit") {
        value = item.value;
    }
    else {
        value = "";
    }
                     
    // Create the input rows for accounts / crypto values.
    $(".popup_table_values tbody").append(
        '<tr>' +
                '<td>&bull; ' + item.account + '</td>' +
                '<td class="sign">' + set.sign + '</td>' +
                '<td>'+
                    '<input id="' + id + '_' + i + '" name="' + id + '[]" value="' + item.id + '" type="hidden" />' +
                    '<input id="' + name + '_' + i + '" name="' + name + '[]" value="' + item.account + '" type="hidden" />' +
                    '<input id="' + type + '_' + i + '" name="' + type + '[]" placeholder="' + c.misc[2] + '" value="' + value + '" type="text" />' +                             
                '</td>' +    
        '</tr>');    
    
    return [i, kind];
}

/*
 * Function:    setDashboardPopupChoice
 *
 * Created on Sep 08, 2024
 * Updated on Jan 15, 2025
 *
 * Description: Set the choice made in the dashboard popup window.
 *
 * In:  dgc, lnc, e, c, s
 * Out: -
 *
 */
function setDashboardPopupChoice(dgc, lnc, e, c, s) {
    
    e.preventDefault();     
    var btn = e.originalEvent.submitter.alt;
    var popup = $('#popup_content').attr('class').split(' ')[0];
    
    // Debug
    //console.log( popup );
    
    switch (popup) {
        case "activa_list" :
            showActivaListResults(dgc, lnc, c, s, btn);
            break;
        
        case "activa_modify"   :     
            modifyActivaValues(dgc, lnc, c, s, btn);
            break;    
        
        case "activa_accounts" : 
        case "activa_crypto"   :
            modifyActivaAccountRow(dgc, lnc, c, s, btn);
            break;
    }
}

/*
 * Function:    showActivaListResults
 *
 * Created on Nov 17, 2024
 * Updated on Jan 15, 2025
 *
 * Description: Show the results from the activa list popup choice.
 *
 * In:  dgc, lnc, c, s, btn
 * Out: -
 *
 */
function showActivaListResults(dgc, lnc, c, s, btn) {
    
    // Check if the Crypto page is enabled or disabled.
    var set = JSON.parse(s[4].value);
    var crypto = (set.page === "true");
    var date;
    
    if (btn === "ok" && $("#list_dates").val() === "1") 
    {
        date = $("#list_dates").next().find(".current").text();
        showActivaAccountsContent(dgc, lnc, crypto, c, s, date);
        closePopupWindow();
    }
    else if (btn === "ok") {
        $("#popup_content .msg").html(c.dashmisc[6]);
    }
}

/*
 * Function:    modifyActivaValues
 *
 * Created on Sep 15, 2024
 * Updated on Jan 15, 2025
 *
 * Description: Check the input and modify it in the tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  dgc, lnc, c, s, btn
 * Out: -
 *
 */
function modifyActivaValues(dgc, lnc, c, s, btn) {
    
    // Debug.
    //console.log(btn);
    
    var msg = c.messages[2].replace("#", c.dashmisc[2]);
    if (checkDashboardEditDelete(btn, msg))
    {     
        var set = JSON.parse(s[4].value);  
        var date, aids, accounts, avalue, cids, crypto, cvalue;
        var cpage = (set.page === "true");      
    
        // Get the input values.
        date     = $("#date").val();
        aids     = getMultipleItems(".activa_modify input[name^=aid");
        accounts = getMultipleItems(".activa_modify input[name^=account");
        avalue   = getMultipleItems(".activa_modify input[name^=avalue");
    
        // Check if the crypto page is enabled.
        if (cpage)
        {
            cids   = getMultipleItems(".activa_modify input[name^=cid");
            crypto = getMultipleItems(".activa_modify input[name^=crypto");
            cvalue = getMultipleItems(".activa_modify input[name^=cvalue");      
        }      
        
        // Validate input.
        if (validateDate(c, s, c.dashmisc[0], date) && validateAccounts(c, s, accounts, avalue) && validateAccounts(c, s, crypto, cvalue))
        {
            var action = getDashboardPopupAction();
            
            // Send and get the ajax results.
            var send = { date:date, aids:aids, accounts:avalue, cids:cids, crypto:cvalue, action:action };
        
            // Debug
            //console.log(send);
        
            var request = getAjaxRequest("modify_values", send);
            request.done(function(result) {
            if (result.success) {      
                                    
                // Debug
                //console.log( result );
                
                if (result.exists) {
                    $("#popup_content .msg").html(c.dashmisc[0] + " " + c.messages[1]);
                }
                else 
                {
                    showActivaAccountsContent(dgc, lnc, crypto, c, s, result.date);   
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

/*
 * Function:    showDashboardRowAction
 *
 * Created on Oct 21, 2024
 * Updated on Oct 22, 2024
 *
 * Description: Shows the action when a table row is pressed.
 *
 * In:  c, that
 * Out: -
 *
 */
function showDashboardRowAction(adp, c, s, that) {
    
    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);
    switch (slide) {
        // The Activa slide.
        case 0 : 
            showActivaRowAction(adp, c, s, that);
            break;
        
        // The 2nd slide.
        case 1 :
            break;
            
        // The 3rd slide.   
        case 2 :  
            break;
    }
    //console.log( $(that).closest('tr').find('td:first').text() );  
}

/*
 * Function:    showActivaRowAction
 *
 * Created on Oct 21, 2024
 * Updated on Nov 06, 2024
 *
 * Description: Shows the action when a table row is pressed on the Activa slide.
 *
 * In:  adp, c, s, that
 * Out: -
 *
 */
function showActivaRowAction(adp, c, s, that) {
    
    var row = $(that).closest('tr').find('td:first').text();
    if (row.trim())
    {             
        // Get the active table name (collapse or expand).
        var table = $("#table_container table").attr('class');
        if (table !== "tbl_crypto") {
            showActivaAccountRowPopup(c, s, that);
        }
        else {
            showActivaCryptoRowPopup(c, s, that);
        }
    }
    else { // Row is empty
        showActivaModifyPopup(adp, "add", c, s);
    }
}

/*
 * Function:    showActivaAccountRowPopup
 *
 * Created on Oct 27, 2024
 * Updated on Dec 29, 2024
 *
 * Description: Shows the popup for the activa account row.
 *
 * In:  c, s, that
 * Out: -
 *
 */
function showActivaAccountRowPopup(c, s, that) {

    var dash = JSON.parse(s[0].value);
    var set  = JSON.parse(s[5].value);
    var tbl, cells = [];
       
    $(that).addClass("marked");
    
    // Set the popup class.
    $("#popup_content").removeClass().addClass("activa_accounts"); 
    
    // Add the collapse or expand class.
    tbl = $("#table_container table").attr('class').replace("tbl_","");
    $("#popup_content").addClass(tbl); 
      
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();   
    
    // Show the title.
    $("#popup_content h2").html(c.labels[0]);
    $("#popup_content h2").css("text-decoration-color", dash.theme.color);     
    
    // Get the row values.
    $("#table_container tbody .marked").find("td").each(function() {   
        if (!$(this).is(":hidden")) {
            cells.push($(this).html());
        }
    }); 
        
    // Remove all rows.
    $(".popup_table_accounts td").remove();
    
    // Add the table row.
    $(".popup_table_accounts tr").append(
        '<td><input class="shw" type="image" name="submit" src="img/show.png" alt="show" style=""></td>'
    );  
    
    var crypto = [];
    for (let i = 1; i < cells.length-1; i++) 
    {
        let id = 'class="dummy"';
        let ph = "";
        let disabled = "disabled";
        if (tbl === "expand") 
        {
            if (!cells[0].includes("crypto") && i === 6) 
            {
                id = 'id="amount"';
                ph = 'placeholder="' + c.misc[2] + '" ';
                disabled = $(that).attr('class').split(" ")[0] === 'hide' ? "disabled" : "";
            }
            else if (cells[0].includes("crypto") && i === 4) 
            {
                id = 'id="number"';
                ph = 'placeholder="' + c.misc[4] + '" ';
                disabled = $(that).attr('class').split(" ")[0] === 'hide' ? "disabled" : "";
                crypto = cells[i].split(" ");
                cells[i] = crypto[0];
            }        
        }
        
        // Add the currency sign in separate column and remove it from the value.
        if (cells[i].includes(set.sign)) 
        {
            $(".popup_table_accounts tr").append('<td class="sign">' + set.sign + '</td>');
            cells[i] = cells[i].replace(set.sign + ' ', '');
        }
        
        $(".popup_table_accounts tr").append('<td><input ' + id + ' type="text" ' + ph + 'value="' + cells[i] + '" ' + disabled + '></td>');  
        
        // Show the crypto symbol.
        if (crypto.length > 1 && i === 4) {
            $(".popup_table_accounts tr").append('<td class="csign">' + crypto[1] + '</td>');
        }
    }
         
    if ($(that).hasClass("hide")) {
        $(".popup_table_accounts .shw").attr({
                src: "img/hide.png",
                alt: "hide"
        });       
    }   
    
    $(".msg").html("");
    
    // Show the popup for the collapse or expand table.
    $(".popup_table_accounts").show(); 
    $("#popup_container").fadeIn("slow"); 
}

/*
 * Function:    showActivaCryptoRowPopup
 *
 * Created on Nov 06, 2024
 * Updated on Dec 29, 2024
 *
 * Description: Shows the popup for the activa crypto row.
 *
 * In:  c, s, that
 * Out: -
 *
 */
function showActivaCryptoRowPopup(c, s, that) {
    
    var dash = JSON.parse(s[0].value);
    var set  = JSON.parse(s[5].value);
    var cells = [];
       
    $(that).addClass("marked");
    
    // Set the popup class.
    $("#popup_content").removeClass().addClass("activa_crypto"); 
      
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();   
    
    // Show the title.
    $("#popup_content h2").html(c.labels[3]);
    $("#popup_content h2").css("text-decoration-color", dash.theme.color);    
    
    // Get the row values.
    $("#table_container tbody .marked").find("td").each(function() {   
        if (!$(this).is(":hidden")) {
            cells.push($(this).html());
        }
    });     
 
    // Remove all rows.
    $(".popup_table_crypto  td").remove();
     
    for (let i = 1; i < cells.length-1; i++) 
    {
        let id = 'class="dummy"';
        let ph = "";
        let disabled = "disabled";
        if (i === 3) 
        {
            id = 'id="amount"';
            ph = 'placeholder="' + c.misc[2] + '" ';
            disabled = "";
        }        
  
        // Add the currency sign in separate column and remove it from the value.
        if (cells[i].includes(set.sign)) 
        {
            $(".popup_table_crypto tr").append('<td class="sign">' + set.sign + '</td>');
            cells[i] = cells[i].replace(set.sign + ' ', '');
        }
        
        $(".popup_table_crypto tr").append('<td><input ' + id + ' type="text" ' + ph + 'value="' + cells[i] + '" ' + disabled + '></td>');
    }    
    
    $(".msg").html("");    
    
    // Show the popup for the crypto table.
    $(".popup_table_crypto").show();
    $("#popup_container").fadeIn("slow");     
}

/*
 * Function:    modifyActivaAccountRow
 *
 * Created on Oct 30, 2024
 * Updated on Jan 17, 2025
 *
 * Description: Check the input and modify it in the tbl_value_accounts and tbl_amount_wallets tables (hide or show the row).
 *
 * In:  dgc, lnc, c, s, btn
 * Out: -
 *
 */
function modifyActivaAccountRow(dgc, lnc, c, s, btn) {
    
    // Get input values.
    var date = $("#input_date span").html();
    var tbl  = $("#table_container table").attr('class').replace("tbl_","");
    var row  = $("#table_container tbody .marked").closest('tr').find('td:first').text();
    var shw  = $(".popup_table_accounts .shw").attr("alt");
    
    var value, check = true;
    if (tbl === "expand" && btn === "ok") 
    {
        if (!row.includes("crypto")) 
        {
            value = $("#amount").val();
            check = validateCurrency(c, s, c.misc[2], value);
        }
        else 
        {
            value = $("#number").val();
            check = validateCrypto(c, s, c.misc[4], value);
        }
    }
    
    if (tbl === "crypto" && btn === "ok") 
    {
        value = $("#amount").val();
        check = validateCurrency(c, s, c.misc[2], value);    
    }
    
    checkShowHide(btn);
    
    if(btn === "ok" && check)
    {
        // Send and get the ajax results.
        var send = { date:date, tbl:tbl, row:row, shw:shw, value:value };
        
        // Debug
        //console.log(send);
        
        var request = getAjaxRequest("modify_value_row", send);
        request.done(function(result) {
            if (result.success) {      
                                    
                // Debug
                //console.log( result );                
            
                if (tbl !== "crypto")
                {
                    // Show the accounts table.
                    showActivaAccountsTable(c, s, date, tbl);
            
                    // Get and show the table totals.
                    getAndShowAccountTotals(s, date);    
                    
                    // Show the doughnut chart.            
                    showActivaAccountsDoughnutChart(dgc, c, s, date, tbl);
                    
                    // Show the line chart.             
                    ShowActivaAccountsLineChart(lnc, c, s, date, tbl);
                }
                else 
                {                
                    // Show the cryptos table.
                    showActivaCryptoTable(c, s, date);                    
                }
                
                closePopupWindow();       
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