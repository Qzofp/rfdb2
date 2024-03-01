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
 * Updated on Mar 01, 2024
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
 * Updated on Mar 01, 2024
 *
 * Description:  Shows the accounts popup content for the finances pages.
 *
 * In:  c, s, n, h
 * Out: items
 *
 */
function showFinancesPopupAccounts(c, s, n, h) {
    
    var shw, btn, cells, set;
    [btn, cells] = setPopupTable("fin_accounts", c.accounts[n+4] + c.accounts[0], 5);    
  
    $("#popup_content .table_finance").show();
  
    // Create show or hide button.
    shw = 'img/show.png" alt="show';
    if (h) { 
        shw = 'img/hide.png" alt="hide';
    }
       
    set = JSON.parse(s[n].value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);

/*    
    $("#popup_content table").append('<tr>' +
                                         '<td><input class="shw" type="image" name="submit" src="' + shw + '" /></td>' +
                                         
                                         '<td><input type="text" class="form-control" name="date" id="date" data-select="datepicker"></td>' +
                                         
                                     //    '<td><input id="date" type="text" name="date" placeholder="' + c.accounts[1] + '" value="' + cells[1] + '" data-select="datepicker" /></td>' +
                                         
                                         '<td><input id="serv" type="text" name="service" placeholder="' + c.accounts[2] + '" value="' + cells[2] + '" /></td>' +
                                         '<td><input id="acct" type="text" name="account" placeholder="' + c.accounts[3] + '" value="' + cells[3] + '" /></td>' +
                                         '<td><input id="desc" type="text" name="description" placeholder="' + c.accounts[4] + '" value="' + cells[4] + '" /></td>' +
                                         '<td><input class="btn" type="image" name="submit" src="' + btn + '" /></td>' +    
                                     '</tr>' +
                                     '<tr><td class="msg" colspan="5">&nbsp;<td></tr>');
    
*/
    
    $("#popup_content .shw").hide();
    if ($("#table_container tbody .marked").length) {        
        $("#popup_content .shw").show();
    }     
    
    $("#popup_container").fadeIn("slow");
}