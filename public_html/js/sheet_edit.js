/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    sheet_edit.js
 * Used in: sheet.html
 *
 * Created on Jun 04, 2023
 * Updated on Apr 08, 2025
 *
 * Description: Javascript edit (popup, modify data, etc.) functions for the sheet page.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    setSheetPopupChoice
 *
 * Created on Jun 10, 2024
 * Updated on Nov 20, 2024
 *
 * Description: Set the choice made in the sheet popup window.
 *
 * In:  e, c, s, i
 * Out: -
 *
 */
function setSheetPopupChoice(e, adp, c, s, i) {
    
    e.preventDefault();     
    var btn = e.originalEvent.submitter.alt;          
    switch (btn) {        
        case "srt" :
            setSortButton(c, s, i, "srt", e);
            break
        
        case "rnk" :
            setSortButton(c, s, i, "rnk", e);
            break
            
        case "cancel" :
            break;
            
        default :
            modifySheets(adp, c, s, i, btn);
            break;
    }
}

/*
 * Function:    showPopupRadioButtonLabel
 *
 * Created on Jun 06, 2024
 * Updated on Jun 20, 2024
 *
 * Description: Show the radio button label in the popup window.
 *
 * In:  value c, name
 * Out: label
 *
 */
function showPopupRadioButtonLabel(value, c, name) {
    
    var x, y, z, label;
    var n = $("#popup_content .popup_table_finance .sign").html().substr(0, 7);  
    var signs = [n + "&nbsp;", n + "-", n + "-"];
    $("#popup_content .popup_table_finance .sign").html(signs[Number(value)-1]);
   
    switch(name) {
        case "finance" :
            label = c.payment[Number(value) + 2];
            x = 2; y = 3; z = 10;
            break;
            
        case "stock" :
            label = c.investment[Number(value) + 1];
            x = 1; y = 3; z = 12;
            break;
            
        case "savings" :
            label = c.savings[Number(value) + 1];
            x = 1; y = 3; z = 12;            
            break;
            
        case "crypto" :
            label = c.crypto[Number(value) + 1];
            x = 1; y = 3; z = 12;
            break;            
    } 
    
    changePopupMessageRow(label, x, y, z); 
    return label;
}

/*
 * Function:    getPopupSelectAndProcessChoice
 *
 * Created on Jun 12, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Get the choosen select value and process that value.
 *
 * In:  c, i, that
 * Out: -
 *
 */
function getPopupSelectAndProcessChoice(c, i, that) {

    var request = getAjaxRequest("settings/get_settings", "");    
    request.done(function(result) {
        if (result.success) {   
    
            let ph, set, page, send, n;
            let select = $(that).parents(':eq(3)').find('select').attr('id');
            let id = $(that).attr('data-value');
            
            let s = result.settings; 
            switch (s[i].name) {
                case "finance" :
                    ph = c.payment[7];
                    set = JSON.parse(s[1].value);
                    page = "sheet/get_select_finances";
                    send = "type=business&rank=" + set.sort.bsn + "&id=" + id;
                    n = 0;
                break;
            
            case "stock" :
                ph = c.investment[5];
                page = "sheet/get_select_stocks";
                send = "type=account&id=" + id;
                n = 1;
                break;
            
            case "savings" :
                ph = c.savings[5];
                page = "sheet/get_select_savings";
                send = "type=account&id=" + id;    
                n = 1;
                break;
            
            case "crypto" :
                ph = c.crypto[5];
                page = "sheet/get_select_crypto";
                send = "type=account&id=" + id; 
                n = 0;
                break;         
            }
            
            // Remove and add select menus.
            switch(select) {
                case "account" :
                    if (s[i].name === "finance" && !$("#table_container tbody .marked").length) {
                        addPopupSheetHistory(c, s[i].name, id);
                    }
                    else if (s[i].name === "crypto") {
                        removeSelectMenu("crypto");
                        addSelectMenu(c, "sheet/get_select_crypto", "type=crypto&id=" + id, "crypto", c.crypto[7], 0, "", 1); 
                    }                    
                    break;
                    
                case "service" :
                    removeSelectMenu("account");   
                    addSelectMenu(c, page, send, "account", ph, 0, "", n);                    
                    break;
            }
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage(); 
}   

/*
 * Function:    addPopupSheetHistory
 *
 * Created on Jul 31, 2024
 * Updated on Apr 02, 2025
 *
 * Description: Get the history (radio button and description) and add it to the popup of the sheet.
 *
 * In:  c, name, id
 * Out: -
 *
 */
function addPopupSheetHistory(c, name, id) {
    
    var send = "name=" + name + "&id=" + id;
    var request = getAjaxRequest("sheet/get_popup_history", send);    
    request.done(function(result) {
        if (result.success) {   
            
            if (result.data[0].rad_history > 0) 
            {
                $("#mny-" + result.data[0].rad_history).prop("checked", true);
                showPopupRadioButtonLabel(result.data[0].rad_history, c, name);
                $("#description").val(decodeHTML(result.data[0].desc_history));
            }
            else {
                $("#description").val("");
            }       
        }
    });    
     
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage();     
}

/*
 * Function:    changeMessageRow
 *
 * Created on Jun 09, 2024
 * Updated on Feb 03, 2025
 *
 * Description: change the sheet popup window message row.
 *
 * In: msg, x, y, z
 * Out: 
 *
 */
function changePopupMessageRow(msg, x=0, y=0, z=0) {
         
    $(".popup_table_finance tr:eq(1)").remove();  
    if (x) {
    
        $(".popup_table_finance tbody").append(
            '<tr>' +
                '<td colspan="' + x + '"></td>' +
                '<td class="label" colspan="' + y + '">' + msg + '</td>' +
                '<td class="msg" colspan="' + z + '"></td>' +
            '</tr>');
    }
    else {
        $(".popup_table_finance tbody").append(
            '<tr>' +
                '<td class="msg" colspan="15">' + msg + '</td>' +
            '</tr>');           
    }
}

/*
 * Function:    setSheetPopupTable
 *
 * Created on Jun 05, 2024
 * Updated on Jun 07, 2024
 *
 * Description: Set (prepare) the sheet popup table, return the add or delete button and the cell values.
 *
 * In:  popclass, title, n
 * Out: cells
 *
 */
function setSheetPopupTable(popclass, title, page, n) {

    var set;
    var btn = "add"; 
    var cells = [];
      
    $("#popup_content").removeClass().addClass(popclass);                   
    
    set = JSON.parse(page.value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);       
    $("#popup_content h2").html(title); 

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
    
    $("#popup_content .popup_table_finance .btn").attr({
                src: "img/" + btn + ".png",
                alt: btn
    });    
       
    return cells;
}

/*
 * Function:    showSheetEditPopup
 *
 * Created on Jun 04, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Shows the popup when the page edit button is pressed.
 *
 * In:  adp, c, i, that
 * Out: -
 *
 */
function showSheetEditPopup(adp, c, i, that="") {

    var request = getAjaxRequest("settings/get_settings", "");    
    request.done(function(result) {
        if (result.success) {         
                
            let rowid = $(that).closest('tr').find('td:first').text().split("_");    
            if (that && rowid[0] > 0) {
                $(that).addClass("marked");
            }    
    
            let s = result.settings; 
            switch(s[i].name) {
                case "finance" :
                    showSheetFinancePopup(adp, c, s, i);
                    break;
            
                case "stock" :
                    showSheetStocksPopup(adp, c, s, i);
                    break;
            
                case "savings" :
                    showSheetSavingsPopup(adp, c, s, i);
                    break;
            
                case "crypto" :
                    showSheetCryptoPopup(adp, c, s, i);
                    break;            
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
 * Function:    showSheetFinancePopup
 *
 * Created on Jun 04, 2024
 * Updated on Feb 26, 2024
 *
 * Description:  Shows the popup content for the finances page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetFinancePopup(adp, c, s, i) {
    
    var cells, label;
    var set = JSON.parse(s[5].value);
    var fin = JSON.parse(s[1].value);
    
    // Get row input, is empty when row is empty or not selected.
    cells = setSheetPopupTable("popup_finances", c.payment[0], s[i], 9);
        
    // Hide other input fields, which are not necessary for the finances popup.
    $("#number").hide();
    $("#crypto").hide();
    
    // Add date.
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.payment[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }
    
    // Add Sort buttons.
    addSortButtons(fin); 

    // Add radio buttons and label.
    $("#popup_content .popup_table_finance .sign").html(set.sign + "&nbsp;&nbsp;");    
    label = addAmountAndRadioButton(c.misc[2], c, s[i].name, cells[3], cells[4], cells[5]);    
    changePopupMessageRow(label, 2, 3, 10);
            
    // Add Select Menus.
    removeSelectMenu(); 
    addSelectMenu(c, "sheet/get_select_finances", "type=account", "payment", c.payment[2], cells[0].split("_")[1], cells[2], 1);
    addSelectMenu(c, "sheet/get_select_finances", "type=group&rank=" + fin.sort.grp, "service", c.payment[6], cells[0].split("_")[2], cells[6], 0);
    if (cells[7]) {  
        addSelectMenu(c, "sheet/get_select_finances", "type=business&rank=" + fin.sort.bsn + "&id=" + cells[0].split("_")[2], "account", c.payment[7], cells[0].split("_")[3], cells[7], 1);
    }
    else {
        disableSelectMenu("account", c.payment[7]);
    }    
        
    // Add description.
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.payment[8]).val(decodeHTML(cells[8]));
    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    showSheetStocksPopup
 *
 * Created on Jun 15, 2024
 * Updated on Feb 26, 2025
 *
 * Description:  Shows the popup content for the stocks page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetStocksPopup(adp, c, s, i) {

    var cells, label;
    var set = JSON.parse(s[5].value);
    
    // Get row input, is empty when row is empty or not selected.
    cells = setSheetPopupTable("popup_stocks", c.investment[0], s[i], 9);    
       
    // Hide other input fields, which are not necessary for the stocks popup.
    $("#payment").hide();
    $(".popup_table_finance td:eq(4)").hide();
    $(".popup_table_finance .srt").hide();
    $("#number").hide();
    $("#crypto").hide();  
    
    // Add date.
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.investment[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }    
    
    // Add radio buttons and label.
    $("#popup_content .popup_table_finance .sign").html(set.sign + "&nbsp;&nbsp;");    
    label = addAmountAndRadioButton(c.misc[2], c, s[i].name, cells[2], cells[3]);    
    changePopupMessageRow(label, 1, 3, 12);    
       
    // Add Select Menus.
    removeSelectMenu(); 
    addSelectMenu(c, "sheet/get_select_stocks", "type=service", "service", c.investment[4], cells[0].split("_")[1], cells[4], 0);
    if (cells[5]) {
        addSelectMenu(c, "sheet/get_select_stocks", "type=account&id=" + cells[0].split("_")[1], "account", c.investment[5], cells[0].split("_")[2], cells[5], 1);
    }
    else {
        disableSelectMenu("account", c.investment[5]);
    } 
     
    // Add description.
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.investment[6]).val(decodeHTML(cells[6]));        
    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    showSheetSavingsPopup
 *
 * Created on Jun 19, 2024
 * Updated on Feb 26, 2025
 *
 * Description:  Shows the popup content for the savings page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetSavingsPopup(adp, c, s, i) {

    var cells, label;
    var set = JSON.parse(s[5].value);
    
    // Get row input, is empty when row is empty or not selected.
    cells = setSheetPopupTable("popup_savings", c.savings[0], s[i], 9);    
       
    // Hide other input fields, which are not necessary for the savings popup.
    $("#payment").hide();
    $(".popup_table_finance td:eq(4)").hide();
    $(".popup_table_finance .srt").hide();
    $("#number").hide();
    $("#crypto").hide();  
    
    // Add date.
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.savings[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }    
    
    // Add radio buttons and label.
    $("#popup_content .popup_table_finance .sign").html(set.sign + "&nbsp;&nbsp;");    
    label = addAmountAndRadioButton(c.misc[2], c, s[i].name, cells[2], cells[3]);    
    changePopupMessageRow(label, 1, 3, 12);    
    
    // Add Select Menus.
    removeSelectMenu(); 
    addSelectMenu(c, "sheet/get_select_savings", "type=service", "service", c.savings[4], cells[0].split("_")[1], cells[4], 0);
    if (cells[5]) {
        addSelectMenu(c, "sheet/get_select_savings", "type=account&id=" + cells[0].split("_")[1], "account", c.savings[5], cells[0].split("_")[2], cells[5], 1);
    }
    else {
        disableSelectMenu("account", c.savings[5]);
    } 
     
    // Add description.
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.savings[6]).val(decodeHTML(cells[6]));       
    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    showSheetCryptoPopup
 *
 * Created on Jun 20, 2024
 * Updated on Feb 26, 2025
 *
 * Description:  Shows the popup content for the crypto page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetCryptoPopup(adp, c, s, i) {

    var cells, label;
    var set = JSON.parse(s[5].value);
    
    // Get row input, is empty when row is empty or not selected.
    cells = setSheetPopupTable("popup_crypto", c.crypto[0], s[i], 9);    
       
    // Hide other input fields, which are not necessary for the crypto popup.
    $("#payment").hide();
    $(".popup_table_finance td:eq(4)").hide();
    $(".popup_table_finance .srt").hide();
    
    // Add date.
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.crypto[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }    
    
    // Add radio buttons and label.
    $("#popup_content .popup_table_finance .sign").html(set.sign + "&nbsp;&nbsp;");    
    label = addAmountAndRadioButton(c.misc[2], c, s[i].name, cells[2], cells[3]);    
    changePopupMessageRow(label, 1, 3, 12);    
    
    // Add Select Menus.
    removeSelectMenu(); 
    addSelectMenu(c, "sheet/get_select_crypto", "type=service", "service", c.crypto[4], cells[0].split("_")[1], cells[4], 0);
    if (cells[5]) {
        addSelectMenu(c, "sheet/get_select_crypto", "type=account&id=" + cells[0].split("_")[1], "account", c.crypto[5], cells[0].split("_")[2], cells[5], 1);
    }
    else {
        disableSelectMenu("account", c.crypto[5]);
    } 
    
    // Add number input field.
    $("#popup_content .popup_table_finance #number").attr("placeholder", c.crypto[6]).val(cells[6]);      
    
    // Add crypto select menu.
    if (cells[7]) {
        addSelectMenu(c, "sheet/get_select_crypto", "type=crypto&id=" + cells[0].split("_")[2], "crypto", c.crypto[7], cells[0].split("_")[3], cells[7], 1);
    }
    else {
        disableSelectMenu("crypto", c.crypto[7]);
    }
      
    // Add description input field.
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.crypto[8]).val(decodeHTML(cells[8]));
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    addSortButtons
 *
 * Created on Jun 10, 2024
 * Updated on Jun 12, 2024
 *
 * Description:  Add the sort buttons for the finances page.
 *
 * In:  set
 * Out: -
 *
 */
function addSortButtons(set) {
    
    // Group sort.
    if (set.sort.grp === "true") {
        $("#popup_content .srt").eq(0).attr({src:"img/rank.png", alt:"rnk"}); 
    }
    else {
        $("#popup_content .srt").eq(0).attr({src:"img/sort.png", alt:"srt"});
    }
    
    // Business sort.
    if (set.sort.bsn === "true") {
        $("#popup_content .srt").eq(1).attr({src:"img/rank.png", alt:"rnk"}); 
    }
    else {
        $("#popup_content .srt").eq(1).attr({src:"img/sort.png", alt:"srt"});
    }    
}

/*
 * Function:    setSortButtons
 *
 * Created on Jun 14, 2024
 * Updated on Feb 26, 2025
 *
 * Description:  Set the sort buttons for the finances page.
 *
 * In:  c, s, i, btn, e
 * Out: -
 *
 */
function setSortButton(c, s, i, btn, e) {
    
    var phg, pha, page, rank;
    var select = $(e.originalEvent.submitter).parent().next().find('select').attr('id');
    var send = "name=" + s[i].name + "&btn=" + btn + "&sel=" + select;
    
    //console.log(send);
    
    var request = getAjaxRequest("sheet/change_sortbutton", send);
    request.done(function(result) {
        if (result.success) 
        {                        
            switch (s[i].name) {
                case "finance" :
                    phg = c.payment[6];
                    pha = c.payment[7];
                    page = "sheet/get_select_finances";
                break;
            
            case "stock" :
                break;
            
            case "savings" :
                break;
            
            case "crypto" :
                break;         
            }        
            
            if (btn === "rnk") 
            {
                $("#popup_content .srt").eq(result.button).attr({src:"img/sort.png", alt:"srt"});
                rank = "false";
            }
            else 
            {
                $("#popup_content .srt").eq(result.button).attr({src:"img/rank.png", alt:"rnk"}); 
                rank = "true";
            }
            
            // Refresh the first select menu, else the second select menu.
            if (result.button === 0) 
            {
                removeSelectMenu("service"); 
                addSelectMenu(c, page, "type=group&rank=" + rank, "service", phg, 0, "", 1);
                removeSelectMenu("account"); 
                disableSelectMenu("account", pha);
            }
            else if ($("#account").next().attr('class').split(' ')[1] !== "disabled") 
            {                    
                let id = $("#service").next().find(".selected").attr('data-value');
                removeSelectMenu("account");
                addSelectMenu(c, page, "type=business&rank=" + rank + "&id=" + id, "account", pha, 0, "", 1);
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
 * Function:    addAmountAndRadioButton
 *
 * Created on Jun 07, 2024
 * Updated on Jun 12, 2024
 *
 * Description:  Add the amount and radio button.
 *
 * In:  ph, c, name, x, y, z
 * Out: label
 *
 */
function addAmountAndRadioButton(ph, c, name, x, y, z="") {
      
    var value, label;    
    $("#popup_content input[type='radio']").prop("checked", false);
    $("#popup_content .label").html("&nbsp;");
    
    if (x) 
    {
        value = x.replace(/^.{1,2}/g, '');
        $("#popup_content input[type='radio'][value='1']").prop("checked", true);
        label = showPopupRadioButtonLabel(1, c, name);
    } 
    else if (y) 
    {
        value = y.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='2']").prop("checked", true);
        label = showPopupRadioButtonLabel(2, c, name);
    }
    else if (z) 
    {
        value = z.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='3']").prop("checked", true);
        label = showPopupRadioButtonLabel(3, c, name);
    }
    else {
        label = "&nbsp;";
    }
    
    $("#popup_content .popup_table_finance #amount").attr("placeholder", ph); 
    $("#popup_content .popup_table_finance #amount").val(value);
    
    return label;
}

/*
 * Function:    modifySheets
 *
 * Created on Jun 24, 2024
 * Updated on Nov 22, 2024
 *
 * Description: Modify one of the finances sheets.
 *
 * In:  adp, c, s, i, btn
 * Out: -
 *
 */
function modifySheets(adp, c, s, i, btn) {
    
    switch(s[i].name) {
        case "finance" :    
            modifyFinances(adp, c, s, btn);
            break;

        case "stock" :
            modifyStocks(adp, c, s, btn);
            break;
        
        case "savings" :
            modifySavings(adp, c, s, btn);
            break;
        
        case "crypto" :
            modifyCrypto(adp, c, s, btn);
            break;        
    }
}

/*
 * Function:    validateSheetInput
 *
 * Created on Jun 27, 2024
 * Updated on Jun 29, 2024
 *
 * Description: Validate the input, check if it is not empty.
 *
 * In:  msg, items, input
 * Out: check
 *
 */
function validateSheetInput(msg, items, input) {
    
    var check = true; 
    input.forEach((value, i) => {
          
        if (!value && check) 
        {        
                changePopupMessageRow(items[i] + " " + msg);  
                check = false;
        }        
    });   

    return check;
}

/*
 * Function:    validateSheetCurrency
 *
 * Created on Jun 28, 2024
 * Updated on Jul 20, 2024
 *
 * Description: Validate the currency, check if it is not empty and if it has a correct value.
 *
 * In:  c, s, value
 * Out: check
 *
 */
function validateSheetCurrency(c, s, value) {
   
    var check = true;
    if (!value) 
    {
        changePopupMessageRow(c.misc[2] + " " + c.messages[5]); 
        check = false;
    }
    else 
    {        
        let regex, set = JSON.parse(s[5].value);
        switch (set.sign) {
            case "$" :
            case "£" :
                regex = /^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/;                
                break;
            
            case "€"  :
                regex = /^[0-9]{1,3}(?:\.?[0-9]{3})*(?:,[0-9]{1,2})?$/;           
                break;
        }
        
        if (!regex.test(value) ? true : false) 
        {
            changePopupMessageRow(c.misc[2] + " " + c.messages[0]); 
            check = false;
        }     
    }  
    return check;       
}

/*
 * Function:    validateSheetCrypto
 *
 * Created on Jul 17, 2024
 * Updated on Jul 21, 2024
 *
 * Description: Validate the crypto input, check if it is not empty and if it has a correct value.
 *
 * In:  c, s, input
 * Out: check
 *
 */
function validateSheetCrypto(c, s, input) {
    
    var check = true;    
    
    // Check the amount value.
    check = validateSheetCurrency(c, s, input[0]);
    
    // Check if the number value is correct.
    if (check) 
    {
        let regex, set = JSON.parse(s[5].value);
        switch (set.sign) {
            case "$" :
            case "£" :
                regex = /^-?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,8})?$/;                
                break;
            
            case "€"  :
                regex = /^-?[0-9]{1,3}(?:\.?[0-9]{3})*(?:,[0-9]{1,8})?$/;           
                break;
        }
        
        if (!regex.test(input[1]) ? true : false) 
        {
            changePopupMessageRow(c.crypto[6] + " " + c.messages[0]); 
            check = false;
        }          
    }    
    
    return check;       
}

/*
 * Function:    correctAmount
 *
 * Created on Jul 07, 2024
 * Updated on Jul 21, 2024
 *
 * Description: Correct the amount. Add zero's after the point or comma if they are missing.
 *
 * In:  s, amount
 * Out: value
 *
 */
function correctAmount(s, amount, n=2) {
   
    var format, tmp, value;
    var set = JSON.parse(s[5].value);
   
    switch (set.sign) {
        case "$" :
        case "£" :
            format = "en-US";
            tmp = amount.replace(/[,]/g, '');    
            break;
            
        case "€"  :
            format = "de-DE";
            tmp = amount.replace(/[.]/g, '').replace(/[,]/g, '.');
            break;
    }   

    value = Number(tmp).toLocaleString(format, { minimumFractionDigits: n, maximumFractionDigits: n });
    return value;
}

/*
 * Function:    modifyFinances
 *
 * Created on Jun 24, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Check the finances sheet input and add, edit or remove the finances in the database.
 *
 * In:  adp, c, s, btn
 * Out: -
 *
 */
function modifyFinances(adp, c, s, btn) {
    
    var msg, amount, input = [];
    
    // Get the input values.
    input.push($("#date").val(), $("#payment").val(), $('input[name="money"]:checked').val(), 
               $("#amount").val(), $("#service").val(), $("#account").val(), $("#description").val());    
    amount = $("#amount").val();
    
    msg = c.messages[2].replace("#", $("#payment option:selected").text());    
    if(!checkEditDelete(btn, msg))
    {     
        let items = [c.payment[1], c.payment[2], c.misc[2] + " " + c.misc[3], c.misc[2], c.payment[6], 
                     c.payment[7], c.payment[8]];
        
        // Add, edit or delete the finances table row.
        if (validateSheetInput(c.messages[5], items, input) && 
            validateDate(c, s, items[0], input[0]) &&
            validateSheetCurrency(c, s, amount)
        ) {
           
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            }
            
            let set = JSON.parse(s[5].value);            
            var send = 'date=' + input[0] + '&payment=' + input[1] + '&type=' + input[2] + '&sign=' + set.sign +
                       '&amount=' + correctAmount(s, amount) + '&service=' + input[4] + '&account=' + input[5] + 
                       '&desc=' + encodeURIComponent(input[6]) + '&id=' + id + '&action=' + action; 
            
            var request = getAjaxRequest("sheet/modify_finances_sheet", send);
            request.done(function(result) {              
                if (result.success) {    
                    
                    switch (action) {
                        case "add"    :                        
                            // Correct the id and get the select values.
                            result.id += "_" + result.payment + 
                                         "_" + result.service + 
                                         "_" + result.account;
                                
                            result.payment = $(".nice-select .current:first").html();
                            result.service = $(".nice-select .current:eq(1)").html();
                            result.account = $(".nice-select .current:eq(2)").html();
                            showAddRow(result);   
                            break;
                                
                        case "edit"   :   
                            // Correct the id get the select values.
                            result.id += "_" + result.payment + 
                                         "_" + result.service + 
                                         "_" + result.account;
                                                                
                            result.payment = $(".nice-select .current:first").html();
                            result.service = $(".nice-select .current:eq(1)").html();
                            result.account = $(".nice-select .current:eq(2)").html();            
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
                        // Reset date.
                        adp.clear();
                        
                        // Reset nice-select menu if there is more then 1 item.
                        if ($("#payment > option").length > 1) 
                        { 
                            $(".nice-select .current:first").html('<span class="placeholder">' + c.payment[2] + '</span>');
                            $(".nice-select-dropdown .list li").removeClass("selected focus");  
                            $("#payment").val(""); 
                        }                             
                                               
                        // Reset radio buttons.
                        $('input[name="money"]').prop('checked', false);
                        $(".popup_table_finance .label").html("&nbsp;");
                        $(".popup_table_finance .msg").html("&nbsp;");
                        
                        // Reset minus sign and amount.
                        $(".popup_table_finance .sign").html(function(i, text) { 
                            return text.replace("-", "&nbsp;");
                        });                        
                        $("#amount").val(""); 
                        
                        // Reset nice-select menu if there is one or more items.
                        if ($("#service > option").length >= 1) 
                        {
                                $(".nice-select .current:eq(1)").html('<span class="placeholder">' + c.payment[6] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                                $("#service").val("");
                        }                        
                        
                        // Reset nice-select menu if there is one or more items.
                        if ($("#account > option").length >= 1) 
                        {
                                //$(".nice-select .current:eq(2)").html('<span class="placeholder">' + c.payment[7] + '</span>');
                                //$(".nice-select-dropdown .list li").removeClass("selected focus");
                                //$("#account").val("");   
                                removeSelectMenu("account"); 
                                disableSelectMenu("account", c.payment[7]);
                        }
                        
                        // Reset the description.
                        $("#description").val("");    
                    }
                    
                    // Adjust the total value (income, xfixed or xother).
                    getAndAdjustFinancesTotals(set.sign);                    
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
 * Function:    getAndAdjustFinancesTotals
 *
 * Created on Jul 10, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Get and adjust the total(s) of the finances sheet table.
 *
 * In:  sign
 * Out: -
 *
 */
function getAndAdjustFinancesTotals(sign) {
    
    var date, send;
    
    date = getSelectedDateFromPage();    
    send = "scale=" + date.scale + "&year=" + date.year + "&quarter=" + date.quarter + "&month=" + date.month +
           "&sign=" + sign + "&name=finance";    

    var request = getAjaxRequest("sheet/get_finances_totals", send);
    request.done(function(result) {
        if (result.success) {         
            let n, balance;
            
            // Adjust balance.
            if (result.data[0].balance === "&nbsp;") {
                balance = 0;
            }
            else {
                balance = result.data[0].balance;
            }
                      
            n = $("#balance span").currencyToNumber();
            $("#balance span").data('value', balance);
            $("#balance span").startCounter(n, 2000, sign);
            
            if (result.data[0].balance.includes("-")) {
                $("#balance span").css("color", "#C11B17");
            }
            else {
                $("#balance span").css("color", "green"); 
            }            
            
            // Adjust income, fixed and other totals.
            n = $("#table_container tfoot td:nth-child(2)").currencyToNumber();
            if (n > 0 || !isNaN(result.data[0].income))  
            {             
                $("#table_container tfoot td:nth-child(2)").data('value', isNaN(result.data[0].income) ? "0" : result.data[0].income);
                $("#table_container tfoot td:nth-child(2)").startCounter(n, 1500, sign);
            }    
   
            n = $("#table_container tfoot td:nth-child(3)").currencyToNumber();
            if (n < 0 || !isNaN(result.data[0].fixed))  
            {             
                $("#table_container tfoot td:nth-child(3)").data('value', isNaN(result.data[0].fixed) ? "0" : result.data[0].fixed);
                $("#table_container tfoot td:nth-child(3)").startCounter(n, 1500, sign);
            }    

            n = $("#table_container tfoot td:nth-child(4)").currencyToNumber();  
            if (n < 0 || !isNaN(result.data[0].other))  
            {             
                $("#table_container tfoot td:nth-child(4)").data('value', isNaN(result.data[0].other) ? "0" : result.data[0].other);
                $("#table_container tfoot td:nth-child(4)").startCounter(n, 1500, sign);  
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
 * Function:    modifyStocks
 *
 * Created on Jul 12, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Check the stock sheet input and add, edit or remove the stocks in the database.
 *
 * In:  adp, c, s, btn
 * Out: -
 *
 */
function modifyStocks(adp, c, s, btn) {
    
    var msg, amount, input = [];
    
    // Get the input values.
    input.push($("#date").val(), $('input[name="money"]:checked').val(), $("#amount").val(),
               $("#service").val(), $("#account").val(), $("#description").val());   
    amount = $("#amount").val();
    
    msg = c.messages[2].replace("#", $("#account option:selected").text());
    if(!checkEditDelete(btn, msg))
    {     
        let items = [c.investment[1], c.misc[2] + " " + c.misc[3], c.misc[2], c.investment[4], 
                     c.investment[5], c.investment[6]];
        
        // Add, edit or delete the stocks table row.
        if (validateSheetInput(c.messages[5], items, input) && 
            validateDate(c, s, items[0], input[0]) &&    
            validateSheetCurrency(c, s, amount)
        ) {
           
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            }
            
            let set = JSON.parse(s[5].value);            
            var send = 'date=' + input[0] + '&type=' + input[1] + '&sign=' + set.sign +
                       '&amount=' + correctAmount(s, amount) + '&service=' + input[3] + '&account=' + input[4] + 
                       '&desc=' + encodeURIComponent(input[5]) + '&id=' + id + '&action=' + action; 
            
            var request = getAjaxRequest("sheet/modify_stocks_sheet", send);
            request.done(function(result) {              
                if (result.success) {    
                   
                    switch (action) {
                        case "add"    :                        
                            // Correct the id and get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account;
                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();
                            showAddRow(result);   
                            break;
                                
                        case "edit"   :   
                            // Correct the id get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account;
                                                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();            
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
                        // Reset date.
                        adp.clear();
                                                
                        // Reset radio buttons.
                        $('input[name="money"]').prop('checked', false);
                        $(".popup_table_finance .label").html("&nbsp;");
                        $(".popup_table_finance .msg").html("&nbsp;");

                        // Reset minus sign and amount.
                        $(".popup_table_finance .sign").html(function(i, text) { 
                            return text.replace("-", "&nbsp;");
                        });                        
                        $("#amount").val(""); 

                        // Reset nice-select menu if there is one or more items.
                        if ($("#service > option").length >= 1) 
                        {
                            $(".nice-select .current:first").html('<span class="placeholder">' + c.investment[4] + '</span>');
                            $(".nice-select-dropdown .list li").removeClass("selected focus");
                            $("#service").val(""); 
                        }                        
                        
                        // Reset nice-select menu if there is one or more items.
                        if ($("#account > option").length >= 1) 
                        {
                            //$(".nice-select .current:eq(1)").html('<span class="placeholder">' + c.investment[5] + '</span>');
                            //$(".nice-select-dropdown .list li").removeClass("selected focus");
                            //$("#account").val(""); 
                            
                            removeSelectMenu("account"); 
                            disableSelectMenu("account", c.investment[5]);                      
                        }                                                  
                        
                        // Reset the description.
                        $("#description").val("");    
                    }
                    
                    // Adjust the total values (balance, deposit and withdrawal).
                    getAndAdjustSheetTotals(set.sign, "stock");                    
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
 * Function:    modifySavings
 *
 * Created on Jul 13, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Check the savings sheet input and add, edit or remove the savings in the database.
 *
 * In:  adp, c, s, btn
 * Out: -
 *
 */
function modifySavings(adp, c, s, btn) {
    
    var msg, amount, input = [];
    
    // Get the input values.
    input.push($("#date").val(), $('input[name="money"]:checked').val(), $("#amount").val(),
               $("#service").val(), $("#account").val(), $("#description").val());   
    amount = $("#amount").val();
    
    msg = c.messages[2].replace("#", $("#account option:selected").text());
    if(!checkEditDelete(btn, msg))
    {     
        let items = [c.savings[1], c.misc[2] + " " + c.misc[3], c.misc[2], c.savings[4], c.savings[5], c.savings[6]];
        
        // Add, edit or delete the savings table row.
        if (validateSheetInput(c.messages[5], items, input) && 
            validateDate(c, s, items[0], input[0]) &&       
            validateSheetCurrency(c, s, amount)
        ) {
           
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            }
            
            let set = JSON.parse(s[5].value);            
            var send = 'date=' + input[0] + '&type=' + input[1] + '&sign=' + set.sign +
                       '&amount=' + correctAmount(s, amount) + '&service=' + input[3] + '&account=' + input[4] + 
                       '&desc=' + encodeURIComponent(input[5]) + '&id=' + id + '&action=' + action; 
                      
            var request = getAjaxRequest("sheet/modify_savings_sheet", send);
            request.done(function(result) {              
                if (result.success) {    
                   
                    switch (action) {
                        case "add"    :                        
                            // Correct the id and get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account;
                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();
                            showAddRow(result);   
                            break;
                                
                        case "edit"   :   
                            // Correct the id get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account;
                                                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();            
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
                        // Reset date.
                        adp.clear();
                                                
                        // Reset radio buttons.
                        $('input[name="money"]').prop('checked', false);
                        $(".popup_table_finance .label").html("&nbsp;");
                        $(".popup_table_finance .msg").html("&nbsp;");
                        
                        // Reset minus sign and amount.
                        $(".popup_table_finance .sign").html(function(i, text) { 
                            return text.replace("-", "&nbsp;");
                        });                        
                        $("#amount").val(""); 

                        // Reset nice-select menu if there is one or more items.
                        if ($("#service > option").length >= 1) 
                        {
                            $(".nice-select .current:first").html('<span class="placeholder">' + c.savings[4] + '</span>');
                            $(".nice-select-dropdown .list li").removeClass("selected focus");
                            $("#service").val("");   
                        }                        
                        
                        // Reset nice-select menu if there is one or more items.
                        if ($("#account > option").length >= 1) 
                        {
                            //$(".nice-select .current:eq(1)").html('<span class="placeholder">' + c.savings[5] + '</span>');
                            //$(".nice-select-dropdown .list li").removeClass("selected focus");
                            //$("#account").val("");  
                            
                            removeSelectMenu("account"); 
                            disableSelectMenu("account", c.savings[5]);                  
                        }   
                        
                        // Reset the description.
                        $("#description").val("");    
                    }
                    
                    // Adjust the total values (balance, deposit and withdrawal).
                    getAndAdjustSheetTotals(set.sign, "savings");                    
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
 * Function:    modifyCrypto
 *
 * Created on Jul 17, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Check the crypto sheet input and add, edit or remove the savings in the database.
 *
 * In:  adp, c, s, btn
 * Out: -
 *
 */
function modifyCrypto(adp, c, s, btn) {
    
    var msg, input = [];
    var crypto = [];
    
    // Get the input values.
    input.push($("#date").val(), $('input[name="money"]:checked').val(), $("#amount").val(), 
               $("#service").val(), $("#account").val(), $("#number").val(), $("#crypto").val(), 
               $("#description").val());   
    
    // Get the crypto input values.
    crypto.push($("#amount").val(), $("#number").val());
    
    msg = c.messages[2].replace("#", $("#account option:selected").text());
    if(!checkEditDelete(btn, msg))
    {     
        let items = [c.crypto[1], c.misc[2] + " " + c.misc[3], c.misc[2], c.crypto[4], c.crypto[5], 
                     c.crypto[6], c.crypto[7], c.crypto[8]];
                
        // Add, edit or delete the crypto table row.
        if (validateSheetInput(c.messages[5], items, input) && 
            validateDate(c, s, items[0], input[0]) &&  
            validateSheetCrypto(c, s, crypto)
        ) {
           
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            }
            
            let set = JSON.parse(s[5].value);            
            var send = 'date=' + input[0] + '&type=' + input[1] + '&sign=' + set.sign +
                       '&amount=' + correctAmount(s, crypto[0]) + '&service=' + input[3] + '&account=' + input[4] + 
                       '&number=' + correctAmount(s, crypto[1], 8) + '&crypto=' + input[6] + '&desc=' + encodeURIComponent(input[7]) + 
                       '&id=' + id + '&action=' + action;
            
            var request = getAjaxRequest("sheet/modify_crypto_sheet", send);
            request.done(function(result) {              
                if (result.success) {    
                   
                    switch (action) {
                        case "add"    :                        
                            // Correct the id and get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account +
                                         "_" + result.crypto;
                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();
                            result.crypto  = $(".nice-select .current:eq(2)").html();
                            showAddRow(result);   
                            break;
                                
                        case "edit"   :   
                            // Correct the id get the select values.
                            result.id += "_" + result.service + 
                                         "_" + result.account +
                                         "_" + result.crypto;
                                                                
                            result.service = $(".nice-select .current:first").html();
                            result.account = $(".nice-select .current:eq(1)").html();  
                            result.crypto  = $(".nice-select .current:eq(2)").html();
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
                        // Reset date.
                        adp.clear(); 
                                                
                        // Reset radio buttons.
                        $('input[name="money"]').prop('checked', false);
                        $(".popup_table_finance .label").html("&nbsp;");
                        $(".popup_table_finance .msg").html("&nbsp;");
                        
                        // Reset minus sign and amount.
                        $(".popup_table_finance .sign").html(function(i, text) { 
                            return text.replace("-", "&nbsp;");
                        });                        
                        $("#amount").val(""); 

                        // Reset nice-select menu if there is more then 1 item.
                        if ($("#service > option").length >= 1) 
                        {
                            $(".nice-select .current:first").html('<span class="placeholder">' + c.crypto[4] + '</span>');
                            $(".nice-select-dropdown .list li").removeClass("selected focus");   
                            $("#service").val("");   
                        }                        
                        
                        // Reset nice-select menu if there is more then 1 item.
                        if ($("#account > option").length >= 1) 
                        {
                            //$(".nice-select .current:eq(1)").html('<span class="placeholder">' + c.crypto[5] + '</span>');
                            //$(".nice-select-dropdown .list li").removeClass("selected focus");
                            //$("#account").val("");    
                            
                            removeSelectMenu("account"); 
                            disableSelectMenu("account", c.crypto[5]);   
                        }   
                                                  
                        // Reset the number.
                        $("#number").val(""); 
                        
                        // Reset nice-select menu if there is more then 1 item.
                        if ($("#crypto > option").length >= 1) 
                        {
                            //$(".nice-select .current:eq(2)").html('<span class="placeholder">' + c.crypto[7] + '</span>');
                            //$(".nice-select-dropdown .list li").removeClass("selected focus");
                            //$("#crypto").val("");  
                            
                            removeSelectMenu("crypto"); 
                            disableSelectMenu("crypto", c.crypto[7]);                               
                        }  
                        
                        // Reset the description.
                        $("#description").val("");    
                    }
                    
                    // Adjust the total values (balance, deposit and withdrawal).
                    getAndAdjustSheetTotals(set.sign, "crypto");                    
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
 * Function:    getAndAdjustSheetTotals
 *
 * Created on Jul 12, 2024
 * Updated on Feb 26, 2024
 *
 * Description: Get and adjust the total(s) of the stocks, savings or crypto sheet table.
 *
 * In:  sign, name
 * Out: -
 *
 */
function getAndAdjustSheetTotals(sign, name) {
    
    var date, send;
    
    date = getSelectedDateFromPage();    
    send = "scale=" + date.scale + "&year=" + date.year + "&quarter=" + date.quarter + "&month=" + date.month +
           "&sign=" + sign + "&name=" + name;    
  
    var request = getAjaxRequest("sheet/get_finances_totals", send);
    request.done(function(result) {
        if (result.success) {         
            let n, balance;
            
            // Adjust balance.
            if (result.data[0].balance === "&nbsp;") {
                balance = 0;
            }
            else {
                balance = result.data[0].balance;
            }
                      
            n = $("#balance span").currencyToNumber();
            $("#balance span").data('value', balance);
            $("#balance span").startCounter(n, 2000, sign);
            
            if (result.data[0].balance.includes("-")) {
                $("#balance span").css("color", "#C11B17");
            }
            else {
                $("#balance span").css("color", "green"); 
            }            
            
            // Adjust deposit and withdrawal totals.
            n = $("#table_container tfoot td:nth-child(2)").currencyToNumber();   
            if (n > 0 || !isNaN(result.data[0].deposit))  
            {            
                $("#table_container tfoot td:nth-child(2)").data('value', isNaN(result.data[0].deposit) ? "0" : result.data[0].deposit);
                $("#table_container tfoot td:nth-child(2)").startCounter(n, 1500, sign);  
            }
            
            n = $("#table_container tfoot td:nth-child(3)").currencyToNumber();
            if (n < 0 || !isNaN(result.data[0].withdrawal))  
            {
                $("#table_container tfoot td:nth-child(3)").data('value', isNaN(result.data[0].withdrawal) ? "0" : result.data[0].withdrawal);
                $("#table_container tfoot td:nth-child(3)").startCounter(n, 1500, sign);   
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