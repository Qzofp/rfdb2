/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard.js
 * Used in: dashboard.php
 *
 * Created on Oct 28, 2023
 * Updated on Sep 27, 2024
 *
 * Description: Javascript functions for the index page.
 * Dependenties: js/config.js
 *
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadMain
 *
 * Created on Oct 28, 2023
 * Updated on Apr 12, 2024
 *
 * Description: The index.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadMain() {
    
    $.when(getAjaxRequest("get_constants", "page=dashboard")).done(function(result) {

        if (result.success) {   
            var [c, s] = processDashboardConstants(result);           
            showDashboard(c, s);   
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
 * Function:    showDashboard
 *
 * Created on Nov 11, 2023
 * Updated on Sep 21, 2024
 *
 * Description: Shows the dashboard page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showDashboard(c, s) {

    var $adp;
        
    // Initialize the datepicker.
    $adp = initAirDatePicker(c, s);   
    
    // Remove the old rankings (only for the finances sheet).
    removeOldRankings(3);
    
    // Show the page titles.
    showPageTitles(c, 0, "");
                
    // Fill hamburger and slide menu.
    fillHamburgerMenu(c, s, 0);            
    fillSlideMenu(c.slides, s);
      
    // Show the dashboard content.
    showDashboardContent(0, c, s); 
    
    // Slidemenu button is pressed.
    $(".slidemenu input[name='slideItem']").change(function() {               
        showDashboardContent(Number(this.value), c, s);
    });
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        showDashboardButtonAction($adp, c, s, this);
    });
    
    // Table row is pressed.
    //$("#table_container").on('click', 'tbody tr', function(){        
        //showSheetEditPopup($adp, c, i, this);
    //});    
    
    // Popup button is pressed.  
    $("#popup_content").on("submit","form",function(e) {   
        setDashboardPopupChoice(e, c, s);
    });    
 
 
 
 
 
    
    // Show the page theme.
    showPageTheme(s[0]); 
     
    // Close popup windows.       
    $("#popup_container .close").on("click", function() {
        closePopupWindow();
    });    
}

/*
 * Function:    removeOldRankings
 *
 * Created on Jul 22, 2023
 * Updated on Jul 22, 2023
 *
 * Description: Remove rankings older then n months.
 *
 * In:  n
 * Out: -
 *
 */
function removeOldRankings(n) {
    
    var request = getAjaxRequest("delete_rankings", "n=" + n);      
    request.done(function(result) {
        if (!result.success) {         
            showDatabaseError(result);                    
        }
    });
    
    request.fail(function(jqXHR, textStatus) {        
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage(); 
}

/*
 * Function:    showDashboardContent
 *
 * Created on Aug 16, 2024
 * Updated on Sep 27, 2024
 *
 * Description: Shows the dashboard content for the chosen slide.
 *
 * In:  slide, c, s
 * Out: -
 *
 */
function showDashboardContent(slide, c, s) {
    
    // Check if the Crypto page is enabled or disabled.
    var set = JSON.parse(s[4].value);
    var crypto = (set.page === "true");
    
    switch(slide) {
        case 0: showActivaAccountsContent(crypto, c, s, ""); // Test date, 22-07-2024 or 07/22/2024!
                break;
        
        case 1: $("#test01").show();
                $("#activa_main").hide();
                $("#test02").hide();            
                break;
            
        case 2: $("#test02").show();  
                $("#activa_main").hide();
                $("#test01").hide();            
                break;
    }  
}

/*
 * Function:    showActivaAccountsContent
 *
 * Created on Aug 24, 2024
 * Updated on Sep 11, 2024
 *
 * Description: Shows the dashboard activa (account) slide content.
 *
 * In:  crypto, c, s, date
 * Out: -
 *
 */
function showActivaAccountsContent(crypto, c, s, date) {   

    var request = getAjaxRequest("get_entry_date", "date=" + date);    
    request.done(function(result) {
        if (result.success) {                    
     
            $("#activa_main").fadeIn("slow");
            $("#test01").hide();
            $("#test02").hide();
    
            // Show crypto button if page exists.
            if (crypto) {
                $("#page_buttons img").eq(2).attr({src:"img/crypto.png", alt:"crypto"}).css("display", "inline");
            }
            else {
                $("#page_buttons img").eq(2).css("display", "none"); 
            }
    
            // Reset button(s).
            $("#page_buttons img").eq(3).attr({src:"img/expand.png", alt:"expand"}).show();  
    
            // Show the entry date. 
            $("#input_date u").html(c.misc[0]);
            $("#input_date span").html(result.date); 
    
            // Show the labels.
            showActivaLabels(c, s, true);

            // Show the table.
            showActivaAccountsTable(c, s, result.date, "collapse");
            
            // Get and show the table totals.
            getAndShowAccountTotals(s, result.date);    
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
 * Function:    showActivaLabels
 *
 * Created on Aug 25, 2024
 * Updated on Sep 06, 2024
 *
 * Description: Shows the dashboard activa labels.
 *
 * In:  c, s, accounts
 * Out: -
 *
 */
function showActivaLabels(c, s, accounts) {
    
    var set = JSON.parse(s[0].value);   
    var start;
    
    if (accounts) {
       start = 0;
    }
    else {
       start = 3;
    }
    
    for (let i = 0, j = start; i < 3; i++, j++)
    {
        $(".label span").eq(i).html(c.labels[j]);
        $(".label span").eq(i).css("border-left","3px solid " + set.theme.color);           
    }      
}

/*
 * Function:    ShowActivaAccountsTable
 *
 * Created on Aug 25, 2024
 * Updated on Sep 11, 2024
 *
 * Description: Shows the dashboard activa accounts table.
 *
 * In:  c, s, date, action
 * Out: -
 *
 */
function showActivaAccountsTable(c, s, date, action) {
        
    var set = JSON.parse(s[0].value);  
    var items = c.accounts.slice();
    
    // Calculate table height.
    var y = $(".flex_top").height() - 98;
    $("#table_container").css("height", y);     
    
    // Remove the old and add the new class.
    var tblclass;
    if (action === "collapse") 
    {
        items.splice(3,1);
        tblclass = "tbl_collapse";
    }
    else 
    {
        items.splice(2,1);
        tblclass = "tbl_expand";
    }
    $("#table_container table").removeClass().addClass(tblclass);
    
    // Fill the table header.
    $("#table_container thead tr").remove(); 
    $("#table_container thead").append("<tr><th></th>");     
    
    for (let i = 0; i < items.length; i++) {        
        $("#table_container thead tr").append("<th>" + items[i] + "</th>");
    } 
    
    $("#table_container thead").append("</tr>");    
    
    // Fill the table body.
    fillActivaAccountsTable(c.accounts.length, s, date, action);       

    // Fill the table footer.
    $("#table_container tfoot tr").remove();      
    $("#table_container tfoot").append('<tr><td colspan="' + c.accounts.length + '">&nbsp;</td></tr>');
    
    // Set theme.
    $("#table_container thead th").css("border-bottom", "2px solid " + set.theme.color);
    $("#table_container tfoot td").css("border-top", "2px solid " + set.theme.color);
    
    // Show table effect.
    $("#table_container table").hide(0).show( "slow" );
}

/*
 * Function:    fillActivaAccountsTable
 *
 * Created on Aug 26, 2024
 * Updated on Sep 11, 2024
 *
 * Description: Get the data from the database and fill the dashboard activa accounts table with that data.
 *
 * In:  l, s, date, action
 * Out: -
 *
 */
function fillActivaAccountsTable(l, s, date, action) {

    // Show loading spinner.
    $("#loading").show(); 
    
    var request = getAjaxRequest("get_value_accounts", "date=" + date + "&action=" + action);
    request.done(function(result) {

        // Hide loading spinner.
        $("#loading").hide();
             
        if (result.success) {         
        
            // Debug
            // console.log( result.query );
            
            var crypto = JSON.parse(s[4].value);
            
            // Remove the old table body.
            $("#table_container tbody tr").remove();
            
            let i = 0, rows = 10;             
            $.each(result.data, function (n, field) {  
                
                var hclass = "";
                if (field.hide !== undefined && field.hide === 1) {
                    hclass = 'class="hide"';
                }
                                         
                i++;
                $("#table_container tbody").append('<tr ' + hclass + '>');
          
                $.each(field, function(key, value){                    
                    if (key !== "hide") {
                        $("#table_container tbody tr").last().append("<td>" + value + "</td>");
                    }    
                });
                               
                $("#table_container tbody").append("</tr>");   
            });  

            // Add empty rows.
            for (let j = i; j <= rows; j++) {
               $("#table_container tbody").append('<tr><td colspan="' + l + '">&nbsp;</td></tr>');
            }
            
            // Don't show the crypto number row if the page is disabled.
            if (crypto.page === "false") 
            {
               $(".tbl_expand thead th:nth-child(5)").hide();
               $(".tbl_expand tbody td:nth-child(5)").hide();
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
 * Function:    getAndShowAccountTotals
 *
 * Created on Sep 06, 2024
 * Updated on Sep 14, 2024
 *
 * Description: Get and show the totals of the account table totals.
 *
 * In:  s, date
 * Out: -
 *
 */
function getAndShowAccountTotals(s, date) {
        
    var request = getAjaxRequest("get_value_totals", "date=" + date);
    request.done(function(result) {
        if (result.success) {         
            
            // Debug
            // console.log( result.query );
    
            var set = JSON.parse(s[0].value);
            var col = $("#table_container thead").find("tr:first th:visible").length - 2;
            
            $("#table_container tfoot td").remove();           
            $("#table_container tfoot tr").append(
                '<td colspan="' + col + '"></td>' +
                '<td></td>' +
                '<td></td>'
            );                   
            $("#table_container tfoot td").css("border-top", "2px solid " + set.theme.color);
            
            var currency = JSON.parse(s[5].value);
            
            // Ratio counter.
            if (result.data[0].ratio !== "&nbsp;") 
            {
                $("#table_container tfoot td:nth-child(2)").data('value', result.data[0].ratio);
                $("#table_container tfoot td:nth-child(2)").startRatio(0, 1500, currency.sign);
            }
            else {
                $("#table_container tfoot td:nth-child(2)").html(result.data[0].ratio);
            }    
    
            // Value counter.
            if (result.data[0].value !== "&nbsp;") 
            {
                $("#table_container tfoot td:nth-child(3)").data('value', result.data[0].value);
                $("#table_container tfoot td:nth-child(3)").startCounter(0, 1500, currency.sign);
            }
            else {
                $("#table_container tfoot td:nth-child(3)").html(result.data[0].value);
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
 * Function:    showDashboardButtonAction
 *
 * Created on Sep 02, 2024
 * Updated on Sep 09, 2024
 *
 * Description: Shows the action when the page button is pressed for the dashboard page.
 *
 * In:  adp, c, s, that
 * Out: -
 *
 */
function showDashboardButtonAction(adp, c, s, that) {

    // Check if the Crypto page is enabled or disabled.
    var set = JSON.parse(s[4].value);
    var crypto = (set.page === "true");    
    
    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);  
    switch (slide) {
        case 0 : // Activa Slide
            showActivaButtonAction(adp, c, s, that, crypto);
            break;
            
        case 1 : // Slide Test 1
            break;
            
        case 2 : // Slide Test 2
            break;
    }
}

/*
 * Function:    showActivaButtonAction
 *
 * Created on Sep 09, 2024
 * Updated on Sep 27, 2024
 *
 * Description: Shows the action when the page button is pressed for the dashboard activa page.
 *
 * In:  adp, c, s, that, crypto
 * Out: -
 *
 */
function showActivaButtonAction(adp, c, s, that, crypto) {
       
    switch (that.alt) {
        case "list" :
            break;
        
        case "add" :
            showActivaAddPopup(adp, crypto, c, s);
            break;
        
        case "accounts" :
            showActivaAccountsContent(crypto, c, s, $("#input_date span").html()); // Test date, 22-07-2024 or 07/22/2024!
            break;
          
        case "crypto"     :
            showActivaCryptoContent(c, s, $("#input_date span").html()); // Test date, 22-07-2024 or 07/22/2024!
            break;
            
        case "expand" :
            changeActivaAccountsTable(c, s, "expand");
            break;
            
        case "collapse" : 
            changeActivaAccountsTable(c, s, "collapse");
            break;
            
        case "edit" :
            break;
    }     
}

/*
 * Function:    showActivaAddPopup
 *
 * Created on Sep 07, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Shows the popup when the page add button is pressed.
 *
 * In:  adp, crypto, c, s
 * Out: -
 *
 */
function showActivaAddPopup(adp, crypto, c, s) {

    var set = JSON.parse(s[0].value);
    
    // Reset values.
    adp.clear(); // Reset the date.
    $("#popup_content .msg").html("&nbsp;");
    
    
    
    $("#popup_content").removeClass().addClass("activa_add"); 
    
    // Find all popup_table classes and hide them.
    $("#popup_content").find("[class^=popup_table]").hide();
    
    // Show the popup_table activa class.
    $(".popup_table_activa").show();

    var title = c.labels[0];
    //if (crypto) {
    //    title += " & " + c.labels[3];
    //}
    $("#popup_content h2").html(title);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);     
    
    fillActivaAddPopup(c);
    
    
    
      
      
  
    $("#popup_container").fadeIn("slow");         
}

/*
 * Function:    fillActivaAddPopup
 *
 * Created on Sep 11, 2024
 * Updated on Sep 27, 2024
 *
 * Description: Get the value accounts (and optional the cryptos) and fill the add popup.
 *
 * In:  c
 * Out: -
 *
 */
function fillActivaAddPopup(c) {
    
    // Fill first row and column with the entry date.
    $(".popup_table_activa tr:first td:first").html(c.misc[0]);
   
    var request = getAjaxRequest("get_value_accounts", "date=null&action=add");
    request.done(function(result) {
             
        if (result.success) {         
        
            // Debug
            //console.log( result.query );
                        
            // Remove all rows except the first and last rows.
            $(".popup_table_activa tbody tr").not(":first").remove();

            // console.log( result.data[0] );

            // Build table with the accounts and input fields.            
            var i = 0, kind = "";
            var id, name, type;
            result.data.forEach((item) => {
                
                // Create a separate row for the accounts / crypto titles (kind).
                if (kind !== item.kind) 
                {
                    $(".popup_table_activa tbody").append(
                        '<tr>' +
                            '<td colspan="2">' + item.type + '</td>' +
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
                     
                // Create the input rows for accounts / crypto values.
                $(".popup_table_activa tbody").append(
                    '<tr>' +
                        '<td>- ' + item.account + '</td>' +
                        '<td>'+
                            '<input id="' + id + '_' + i + '" name="' + id + '[]" value="' + item.id + '" type="hidden" />' +
                            '<input id="' + name + '_' + i + '" name="' + name + '[]" value="' + item.account + '" type="hidden" />' +
                            '<input id="' + type + '_' + i + '" name="' + type + '[]" placeholder="" value="" type="text" />' +                             
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
 * Function:    showdActivaCryptoContent
 *
 * Created on Aug 24, 2024
 * Updated on Sep 06, 2024
 *
 * Description: Shows the dashboard activa (crypto) slide content.
 *
 * In:  c, s, date
 * Out: -
 *
 */
function showActivaCryptoContent(c, s, date) {   

    var request = getAjaxRequest("get_entry_date", "date=" + date);    
    request.done(function(result) {
        if (result.success) {                    
     
            // Reset buttons.
            $("#page_buttons img").eq(2).attr({src:"img/accounts.png", alt:"accounts"});
            $("#page_buttons img").eq(3).hide();  
                
            // Show the labels.
            showActivaLabels(c, s, false);

            // Show the table.
            showActivaCryptoTable(c, s, result.date);
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
 * Function:    showActivaCryptoTable
 *
 * Created on Sep 05, 2024
 * Updated on Sep 06, 2024
 *
 * Description: Shows the dashboard activa crypto table.
 *
 * In:  c, s
 * Out: -
 *
 */
function showActivaCryptoTable(c, s, date) {
    
    var set = JSON.parse(s[0].value);  
    
    // Calculate table height.
    var y = $(".flex_top").height() - 98;
    $("#table_container").css("height", y);     
    
    $("#table_container table").removeClass().addClass("tbl_crypto");
    
    // Fill the table header.
    $("#table_container thead tr").remove(); 
    $("#table_container thead").append("<tr><th></th>");     
    
    for (let i = 0; i < c.crypto.length; i++) {        
        $("#table_container thead tr").append("<th>" + c.crypto[i] + "</th>");
    } 
    
    $("#table_container thead").append("</tr>");    
    
    // Fill the table body.   
    fillActivaCryptoTable(c.crypto.length + 1, date);       

    // Fill the table footer.
    $("#table_container tfoot tr").remove();      
    $("#table_container tfoot").append('<tr><td colspan="' + Number(c.accounts.length + 1) + '">&nbsp;</td></tr>');
    
    // Set theme.
    $("#table_container thead th").css("border-bottom", "2px solid " + set.theme.color);
    $("#table_container tfoot td").css("border-top", "2px solid " + set.theme.color);
    
    // Show table effect.
    $("#table_container table").hide(0).show( "slow" );
}

/*
 * Function:    fillActivaAccountsTable
 *
 * Created on Sep 06, 2024
 * Updated on Sep 06, 2024
 *
 * Description: Get the data from the database and fill the dashboard activa cryptos table with that data.
 *
 * In:  l, date
 * Out: -
 *
 */
function fillActivaCryptoTable(l, date) {

    // Show loading spinner.
    $("#loading").show(); 
    
    var request = getAjaxRequest("get_value_cryptos", "date=" + date);
    request.done(function(result) {

        // Hide loading spinner.
        $("#loading").hide();
             
        if (result.success) {         
        
            // Debug
            //console.log( result.query );       
            
            // Remove the old table body.
            $("#table_container tbody tr").remove();
            
            let i = 0, rows = 10;             
            $.each(result.data, function (n, field) {  
                                                         
                i++;
                $("#table_container tbody").append('<tr>');
          
                $.each(field, function(key, value){                    
                    if (key !== "hide") {
                        $("#table_container tbody tr").last().append("<td>" + value + "</td>");
                    }    
                });
                               
                $("#table_container tbody").append("</tr>");   
            });  

            // Add empty rows.
            for (let j = i; j <= rows; j++) {
               $("#table_container tbody").append('<tr><td colspan="' + l + '">&nbsp;</td></tr>');
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
 * Function:    changeActivaAccountsTable
 *
 * Created on Sep 02, 2024
 * Updated on Sep 11, 2024
 *
 * Description: Change the dashboard activa accounts table.
 *
 * In:  c, s, action
 * Out: -
 *
 */
function changeActivaAccountsTable(c, s, action) {
    
    var date = $("#input_date span").html();
    if (action === "collapse") 
    {      
        showActivaAccountsTable(c, s, date, action);
        getAndShowAccountTotals(s, date); 
        $("#page_buttons img").eq(3).attr({src:"img/expand.png", alt:"expand"});   
    }
    else
    {
        showActivaAccountsTable(c, s, date, action);
        getAndShowAccountTotals(s, date); 
        $("#page_buttons img").eq(3).attr({src:"img/collapse.png", alt:"collapse"});
    }        
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
 * Updated on Sep 27, 2024
 *
 * Description: Check the input and modify it in the tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  c, s, btn
 * Out: -
 *
 */
function modifyActivaValues(c, s, btn) {
    
    if (btn !== "cancel")
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
            // Send and get the ajax results.
            var send = { date:date, aids:aids, accounts:avalue, cids:cids, crypto:cvalue };
        
            //console.log(send);
        
            var request = getAjaxRequest("modify_values", send);
            request.done(function(result) {
            if (result.success) {      
                                    
                // console.log( result );
                
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
