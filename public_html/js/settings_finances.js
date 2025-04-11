/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    settings_finances.js
 * Used in: settings.php
 *          js/settings.js
 * 
 *
 * Created on Mar 01, 2024
 * Updated on Apr 08, 2025
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
 * Updated on Mar 19, 2025
 *
 * Description: Set the account items.
 *
 * In:  c, n
 * Out: items
 *
 */
function setAccountItems(c, n) {
    
    var items = [];  
    items.push(c.accounts[n+5] + c.accounts[0]);
    for (let i = 1; i <= 5; i++) {
       items.push(c.accounts[i]); 
    }    
    
    return items;
}

/*
 * Function:    showFinancesPopupAccounts
 *
 * Created on Mar 01, 2024
 * Updated on Mar 25, 2025
 *
 * Description:  Shows the accounts popup content for the finances pages.
 *
 * In:  adp, c, s, slide, h
 * Out: -
 *
 */
function showFinancesPopupAccounts(adp, c, s, slide, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("fin_accounts", c.accounts[slide+5] + c.accounts[0], 5);    
  
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
    
    removeSelectMenu();
    addSelectMenu(c, "settings/get_select_settings", "type=service&slide=" + s[slide].name, "serv", c.accounts[2], cells[0].split("_")[1], cells[2], 1);
        
    $("#popup_content .popup_table_finance #acct").attr("placeholder", c.accounts[3]).val(cells[3]);
    //$("#popup_content .popup_table_finance #color").attr("placeholder", c.accounts[4]).val(cells[4]);
    //$("#popup_content .popup_table_finance #desc").attr("placeholder", c.accounts[5]).val(cells[5]);
    
    // Hide crypto account color input.
    if (slide === 4) 
    {
        $(".popup_table_finance td:nth-child(5)").hide();
        $(".popup_table_finance td:nth-child(6)").css({"width":"46%"});
        $("#popup_content .popup_table_finance #desc").attr("placeholder", c.accounts[5]).val(cells[4]);
    }
    else 
    {
        let color = (cells[4].split('</span>')[1] !== undefined)?cells[4].split('</span>')[1]:"";
        $(".popup_table_finance td:nth-child(5)").show();
        $(".popup_table_finance td:nth-child(6)").css({"width":"34%"});
        $("#popup_content .popup_table_finance #color").attr("placeholder", c.accounts[4]).val(color);
        $("#popup_content .popup_table_finance #desc").attr("placeholder", c.accounts[5]).val(cells[5]);
    }
           
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
 * Updated on Apr 07, 2025
 *
 * Description: Check the accounts input and add, edit or remove the accounts in the database.
 *
 * In:  adp, c, s, btn
 * Out: -
 *
 */
function modifyAccounts(adp, c, s, btn) {
    
    var msg, input = [];
    var type = Number($(".slidemenu input[name='slideItem']:checked")[0].value); // Get the active slide.
       
    // Get the input values.
    input.push($("#date").val(), $("#serv").val(), $("#acct").val());
    if (type !== 4) {
        input.push($("#color").val());
    }
    else { // No color for the crypto accounts.
        input.push("-");
    }
    input.push($("#desc").val());
    
    // Debug
    //console.log(input);  
    
    msg = c.messages[2].replace("#", input[2]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (       
            validateInput(c.messages, c.accounts, input, true) && 
            validateDate(c, s, c.accounts[1], input[0]) &&  
            validateColor(type, c.messages, c.accounts[4], input[3])
        )
        {            
            var [id, action] = getRowIdAndAction();            
            if (id) {
                id = id.split("_")[0];
            }
            
            //var type = Number($(".slidemenu input[name='slideItem']:checked")[0].value); // Get the active slide.
            var hide = getShowHideRow();
            var send = 'date='+ input[0] + '&serv=' + input[1] + '&type=' + type + '&account=' + 
                       encodeURIComponent(input[2]) + '&color=' + input[3] + 
                       '&desc=' + encodeURIComponent(input[4]) + '&id=' + id + '&action=' + action + 
                       '&hide=' + hide; 
               
            // Debug
            //console.log( send );             
            
            var request = getAjaxRequest("settings/modify_accounts", send);
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
                                // Correct the id and service values.
                                result.id += "_" + result.serv;
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
                                $("#serv").val("");
                            }
                                                    
                            $("#acct").val(""); 
                            $("#desc").val(""); 
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
 * Function:    showFinancesPopupGroups
 *
 * Created on Mar 30, 2024
 * Updated on Apr 02, 2024
 *
 * Description:  Shows the groups popup content for the finances page.
 *
 * In:  c, s, h 
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
    
    // Fill in the ranking when it's empty.
    if(cells[2] === "") {
        cells[2] = 1;
    }   
    
    set = JSON.parse(s[1].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);       
    
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +
            
            '<td><input id="groups" type="text" name="grps" placeholder="' + c.groups[1] + '" value="' + cells[1] + '" /></td>' +
            '<td><input id="rank"   type="text" name="rank" placeholder="' + c.groups[2] + '" value="' + cells[2] + '" disabled/></td>' +
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
 * Updated on Feb 23, 2025
 *
 * Description: Check the groups input and add, edit or remove the groups in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyGroups(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#groups").val(), $("#rank").val(), $("#desc").val());
    
    msg = c.messages[2].replace("#", input[0]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateInput(c.messages, c.groups, input, true))
        {            
            var [id, action] = getRowIdAndAction();            
            var hide = getShowHideRow();
            var send = 'group=' + encodeURIComponent(input[0]) + '&ranking=' + input[1] + 
                       '&desc=' + encodeURIComponent(input[2]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
            
            // debug
            //console.log(send);
            
            var request = getAjaxRequest("settings/modify_groups", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        showModifyMessage(c, input[0], action);               
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :                                
                                showAddRow(result);
                                break;
                                
                            case "edit"   :     
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
                            $("#groups").val(""); 
                            $("#desc").val("");                             
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
 * Function:    showFinancesPopupBusinesses
 *
 * Created on Apr 05, 2024
 * Updated on Feb 23, 2025
 *
 * Description:  Shows the businesses popup content for the finances page.
 *
 * In:  c, s, h 
 * Out: -
 *
 */
function showFinancesPopupBusinesses(c, s, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("gen_businesses", c.businesses[0], 5);
    
    $(".popup_table_finance").hide();
    
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }    
    
    // Fill in the ranking when it's empty.
    if(cells[3] === "") {
        cells[3] = 1;
    }  
    
    set = JSON.parse(s[1].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);      
    
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +        
            '<td><select id="groups" placeholder=""></select></td>' +
            '<td><input id="business" type="text" name="business" placeholder="' + c.businesses[2] + '" value="' + cells[2] + '" /></td>' +
            '<td><input id="rank" type="text" name="rank" placeholder="' + c.businesses[3] + '" value="' + cells[3] + '" disabled/></td>' +
            '<td><input id="website" type="text" name="website" placeholder="' + c.businesses[4] + '" value="' + cells[4] + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +          
        '</tr>' +
        '<tr><td class="msg" colspan="5">&nbsp;<td></tr>'
    );     
    
    removeSelectMenu();
    addSelectMenu(c, "settings/get_select_settings", "type=group&slide=finance", "groups", c.businesses[1], cells[0].split("_")[1], "", 1);
    
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }    
    
    $("#popup_container").fadeIn("slow");        
}

/*
 * Function:    modifyBusinesses
 *
 * Created on Apr 06, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Check the businesses input and add, edit or remove the businesses in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyBusinesses(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#groups").val(), $("#business").val(), $("#rank").val(), $("#website").val());
    
    msg = c.messages[2].replace("#", input[1]);   
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to businesses table if the business doesn´t exists.
        if (validateInput(c.messages, c.businesses, input, true))
        {            
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            } 
            
            var hide = getShowHideRow();
            var send = 'group=' + input[0] + '&business=' + encodeURIComponent(input[1]) + 
                       '&ranking=' + input[2] + '&website=' + encodeURIComponent(input[3]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
            
            var request = getAjaxRequest("settings/modify_businesses", send);
            request.done(function(result) {
                if (result.success) {    
                    if (result.exists) {
                        showModifyMessage(c, input[1], action);               
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :  
                                // Correct the id and service values.
                                result.id += "_" + result.group;
                                result.group = $(".nice-select .current:first").html();                                            
                                showAddRow(result);
                                break;
                                
                            case "edit"   :   
                                // Correct the id and service values.
                                result.id += "_" + result.group;
                                result.group = $(".nice-select .current:first").html();
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
                            // Reset nice-select menu if there is more then 1 item.
                            if ($("#groups > option").length > 1) {
                                $(".nice-select .current:first").html('<span class="placeholder">' + c.businesses[1] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                                $("#groups").val("");
                            }                          
                            
                            // Reset input.
                            $("#business").val(""); 
                            $("#website").val("");                             
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
 * Function:    showCryptoPopupCurrenties
 *
 * Created on May 20, 2024
 * Updated on Mar 25, 2024
 *
 * Description:  Shows the crypto currenties popup content for the crypto page.
 *
 * In:  c, s, h 
 * Out: -
 *
 */
function showCryptoPopupCurrenties(c, s, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("gen_currenties", c.cryptos[0], 5);
    
    $(".popup_table_finance").hide();
    
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }    
               
    set = JSON.parse(s[4].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);      
    
    var color = (cells[3].split('</span>')[1] !== undefined)?cells[3].split('</span>')[1]:"";
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +        
            '<td><input id="name" type="text" name="name" placeholder="' + c.cryptos[1] + '" value="' + cells[1] + '" /></td>' +
            '<td><input id="crypto" type="text" name="crypto" placeholder="' + c.cryptos[2] + '" value="' + cells[2] + '" /></td>' +
            '<td><input id="color" type="text" name="color" placeholder="' + c.cryptos[3] + '" value="' + color + '" /></td>' +
            '<td><input id="website" type="text" name="website" placeholder="' + c.cryptos[4] + '" value="' + cells[4] + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +          
        '</tr>' +
        '<tr><td class="msg" colspan="5">&nbsp;<td></tr>'
    );     

    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }    
    
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    modifyCryptoCurrenties
 *
 * Created on May 28, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Check the crypto currenties input and add, edit or remove the crypto currenties in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyCryptoCurrenties(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#name").val(), $("#crypto").val(), $("#color").val(), $("#website").val());
    
    msg = c.messages[2].replace("#", input[0]); 
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to account table if the account doesn´t exists.
        if (validateInput(c.messages, c.cryptos, input, true) &&
            validateColor(0, c.messages, c.cryptos[3], input[2])
        )
        {            
            var [id, action] = getRowIdAndAction();            
            var hide = getShowHideRow();
            var send = 'name=' + encodeURIComponent(input[0]) + 
                       '&symbol=' + encodeURIComponent(input[1]) + 
                       '&color=' + encodeURIComponent(input[2]) + 
                       '&web=' + encodeURIComponent(input[3]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide;
             
            var request = getAjaxRequest("settings/modify_cryptocurrenties", send);
            request.done(function(result) {
                if (result.success) {         
                    if (result.exists) {
                        showModifyMessage(c, input[0] + " " + c.messages[6] + " " + input[1], action);               
                    }
                    else 
                    {                    
                        switch (action) {
                            case "add"    :                                
                                showAddRow(result);
                                break;
                                
                            case "edit"   :     
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
                            $("#name").val(""); 
                            $("#crypto").val("");
                            $("#color").val("");
                            $("#website").val("");   
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
 * Function:    showCryptoPopupWallets
 *
 * Created on May 20, 2024
 * Updated on Apr 08, 2025
 *
 * Description:  Shows the crypto wallets popup content for the crypto page.
 *
 * In:  c, s, h 
 * Out: -
 *
 */
function showCryptoPopupWallets(c, s, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("gen_wallets", c.wallets[0], 6);
    
    $(".popup_table_finance").hide();
    
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }      
    
    set = JSON.parse(s[4].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);      
    
    var color = (cells[4].split('</span>')[1] !== undefined)?cells[4].split('</span>')[1]:"";
    $(".popup_table_setting").append(
        '<tr>' +
            '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +        
            '<td><select id="services" placeholder=""></select></td>' +
            '<td><select id="accounts" placeholder=""></select></td>' +
            '<td><select id="cryptos" placeholder=""></select></td>' +    
            '<td><input id="color" type="text" name="color" placeholder="' + c.wallets[4] + '" value="' + color + '" /></td>' +
            '<td><input id="desc" type="text" name="desc" placeholder="' + c.wallets[5] + '" value="' + cells[5] + '" /></td>' +
            '<td><input class="btn" type="image" name="submit" src="img/' + btn + '.png" alt="' + btn + '" /></td>' +          
        '</tr>' +
        '<tr><td class="msg" colspan="6">&nbsp;<td></tr>'
    );     
    
    removeSelectMenu();
    addSelectMenu(c, "settings/get_select_settings", "type=service&slide=crypto", "services", c.wallets[1], cells[0].split("_")[1], "", 0);
    
    if (cells[2]) {
        addSelectMenu(c, "settings/get_select_settings", "type=account&slide=crypto&id=" + cells[0].split("_")[1], "accounts", c.wallets[2], cells[0].split("_")[2], cells[2], 1);
    }
    else {
        disableSelectMenu("accounts", c.wallets[2]);  
    }
    
    if (cells[3]) {
        addSelectMenu(c, "settings/get_select_settings", "type=crypto&slide=crypto", "cryptos", c.wallets[3], cells[0].split("_")[3], cells[3], 1);
    }
    else {
        disableSelectMenu("cryptos", c.wallets[3]);
    }
    
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }    
    
    $("#popup_container").fadeIn("slow");
}

/*
 * Function:    modifyCryptoWallets
 *
 * Created on May 31, 2024
 * Updated on Mar 31, 2025
 *
 * Description: Check the crypto wallets input and add, edit or remove the crypto wallets in the database.
 *
 * In:  c, btn
 * Out: -
 *
 */
function modifyCryptoWallets(c, btn) {
    
    var msg, input = [];
    
    // Get the input values.
    input.push($("#services").val(),$("#accounts").val(), $("#cryptos").val(), $("#color").val(), $("#desc").val());
        
    msg = c.messages[2].replace("#", $("#accounts option:selected").text());
    if(!checkEditDelete(btn, msg) && !checkShowHide(btn)) 
    {     
        // Add the input to businesses table if the business doesn´t exists.
        if (validateInput(c.messages, c.wallets, input, true) &&
            validateColor(0, c.messages, c.wallets[4], input[3])
        )
        {            
            var [id, action] = getRowIdAndAction();               
            if (id) {
                id = id.split("_")[0];
            }
            
            var hide = getShowHideRow();
            var send = 'service=' + input[0] + '&account=' + input[1] + '&crypto=' + input[2] + 
                       '&color=' + input[3] + '&desc=' + encodeURIComponent(input[4]) + 
                       '&id=' + id + '&action=' + action + '&hide=' + hide; 
         
            // Debug
            //console.log ( send );
         
            var request = getAjaxRequest("settings/modify_wallets", send);
            request.done(function(result) {
                if (result.success) {    
                    if (result.exists) 
                    {
                        let service = $(".nice-select .current:first").html();
                        let account = $(".nice-select .current:eq(1)").html();
                        let crypto  = $(".nice-select .current:eq(2)").html();                       
                        showModifyMessage(c, service + ", " + account + " " + c.messages[7] + " " + crypto , action);            
                    }
                    else 
                    {                    
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
                            // Reset nice-select menu if there is more then 1 item.
                            if ($("#services > option").length >= 1) {
                                $(".nice-select .current:first").html('<span class="placeholder">' + c.wallets[1] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                                $("#services").val("");   
                            }
                            

                            if ($("#accounts > option").length >= 1) {
                                $(".nice-select .current:eq(1)").html('<span class="placeholder">' + c.wallets[2] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                                $("#accounts").val(""); 
                            }  

                            
                            if ($("#cryptos > option").length >= 1) {
                                $(".nice-select .current:eq(2)").html('<span class="placeholder">' + c.wallets[3] + '</span>');
                                $(".nice-select-dropdown .list li").removeClass("selected focus");
                                $("#cryptos").val("");  
                            } 
                                                    
                            // Reset input.
                            $("#desc").val("");                             
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
 * Function:    validateColor
 *
 * Created on Apr 06, 2025
 * Updated on Apr 06, 2025
 *
 * Description: Validate the color input, check if it is a valid color code (e.g. #ffffff).
 *
 * In:  type, msg, name, input
 * Out: check
 *
 */
function validateColor(type, msg, name, input) {
    
    var reg   = /^#[0-9A-F]{6}$/i;
    var check = true;
     
    // Only check the finance, stock and savings colors. Skip the crypto account color.
    if (type !== 4) 
    {
        if (!reg.test(input)) 
        {
            $("#popup_content .msg").html(name + " " + msg[0]); 
            check = false;
        }     
    }
    
    return check;
}