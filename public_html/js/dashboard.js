/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard.js
 * Used in: dashboard.php
 *
 * Created on Oct 28, 2023
 * Updated on Jan 27, 2025
 *
 * Description: Javascript functions for the index page.
 * Dependenties: js/config.js, js/dashboard_edit.js, js/dashboard_chart.js
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
 * Updated on Jan 27, 2025
 *
 * Description: Shows the dashboard page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showDashboard(c, s) {

    var $adp, $dgc, $lnc;
        
    // Initialize the datepicker.
    $adp = initAirDatePicker(c, s);   
    
    // Initialize the doughnut chart.
    $dgc = initDougnutChart(s);
    
    // Initialize the line chart.
    $lnc = initLineChart(s);
      
    // Remove the old rankings (only for the finances sheet).
    removeOldRankings(3);
    
    // Show the page titles.
    showPageTitles(c, 0, "");
                
    // Fill hamburger and slide menu.
    fillHamburgerMenu(c, s, 0);            
    fillSlideMenu(c.slides, s, true);
      
    // Show the dashboard content.
    showDashboardContent($dgc, $lnc, 0, c, s); 
    
    // Slidemenu button is pressed.
    $(".slidemenu input[name='slideItem']").change(function() {               
        showDashboardContent($dgc, $lnc, Number(this.value), c, s);
    });
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        showDashboardButtonAction($adp, $dgc, $lnc, c, s, this);
    });
    
    // Table row is pressed.
    $("#table_container").on('click', 'tbody tr', function(){                
        showDashboardRowAction($adp, c, s, this);
    });    
    
    // Table rows on mouse hover action.
    $("#table_container").on("mouseover", "tbody tr", function () {
        showDoughnutChartTooltip($dgc, $(this));
        showLineChartTooltip($lnc, $(this));
    });
    $("#table_container").mouseleave(function() {
        $dgc.setActiveElements([]);
        $dgc.tooltip.setActiveElements([]);
        $lnc.setActiveElements([]);
        $lnc.tooltip.setActiveElements([]);
    });
     
    // Popup button is pressed.  
    $("#popup_content").on("submit","form",function(e) {   
        setDashboardPopupChoice($dgc, $lnc, e, c, s);
    });    
 
     // Settings popup <enter> button is pressed.  
    $("#popup_content").on("keypress","form",function(e) {
        getPopupEnterKey(e);
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
 * Updated on Jan 03, 2025
 *
 * Description: Shows the dashboard content for the chosen slide.
 *
 * In:  dgc, lnc, slide, c, s
 * Out: -
 *
 */
function showDashboardContent(dgc, lnc, slide, c, s) {
    
    // Check if the Crypto page is enabled or disabled.
    var set = JSON.parse(s[4].value);
    var crypto = (set.page === "true");
    
    switch(slide) {
        case 0: showActivaAccountsContent(dgc, lnc, crypto, c, s, "");
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
 * Updated on Jan 27, 2025
 *
 * Description: Shows the dashboard activa (account) slide content.
 *
 * In:  dgc, lnc, crypto, c, s, date
 * Out: -
 *
 */
function showActivaAccountsContent(dgc, lnc, crypto, c, s, date) {   

    var request = getAjaxRequest("get_entry_date", "date=" + date);    
    request.done(function(result) {
        if (result.success) {                    
     
            // Debug
            //console.log (result);
            
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
    
            // Show edit button if date exists.
            if (result.date) {
                $("#page_buttons img").eq(4).show();
            }
            else {
                $("#page_buttons img").eq(4).hide(); 
            }
    
            // Reset button(s).
            $("#page_buttons img").eq(3).attr({src:"img/expand.png", alt:"expand"}).show();  
    
            // Show the entry date. 
            $("#input_date u").html(c.dashmisc[0]);
            $("#input_date span").html(result.date ? result.date : "&nbsp;"); 
             
            // Show the labels.
            showActivaLabels(c, s);

            // Show the table.
            showActivaAccountsTable(c, s, result.date, "collapse");
            
            // Get and show the table totals.
            getAndShowAccountTotals(s, result.date);
            
            // Show the doughnut chart.            
            showActivaAccountsDoughnutChart(dgc, c, s, result.date, "collapse");
            
            // Show the line chart.             
            ShowActivaAccountsLineChart(lnc, c, s, result.date, "collapse");
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
 * Updated on Jan 06, 2025
 *
 * Description: Shows the dashboard activa labels.
 *
 * In:  c, s
 * Out: -
 *
 */
function showActivaLabels(c, s) {
    
    var set = JSON.parse(s[0].value);   

    $(".label span").html(c.labels[1]);
    $(".label span").css("border-left","3px solid " + set.theme.color);           
}

/*
 * Function:    ShowActivaAccountsTable
 *
 * Created on Aug 25, 2024
 * Updated on Jan 06, 2025
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
    
    // Set the table height.
    $("#table_container").css("height", "30vh");     
    
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
    
    $("#table_container thead tr").append("<th></th>");
    $("#table_container thead").append("</tr>");    
    
    // Fill the table body.
    fillActivaAccountsTable(c.accounts.length, s, date, action);   
    $("#table_container").scrollTop(0);

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
 * Updated on Dec 28, 2024
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
            //console.log( result.query );
            
            var crypto = JSON.parse(s[4].value);
            
            // Remove the old table body.
            $("#table_container tbody tr").remove();
            
            let i = 0, t = 0, rows = 10;             
            $.each(result.data, function (n, field) {  
                
                var ti = -1, hclass = "";
                if (field.hide !== undefined && field.hide === 1) {
                    hclass = 'class="hide"';
                }
                else {
                    ti = t;
                    t++;
                }
                                         
                i++;
                $("#table_container tbody").append('<tr ' + hclass + '>');
                
                $.each(field, function(key, value){                    
                    if (key !== "hide") {
                        $("#table_container tbody tr").last().append("<td>" + value + "</td>");
                    }    
                });
                
                // Index for the doughnut chart tooltip.
                $("#table_container tbody tr").last().append("<td>" + ti + "</td>");
                                              
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
 * Updated on Dec 28, 2024
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
            //console.log( result.query );
    
            var set = JSON.parse(s[0].value);
            var col = $("#table_container thead").find("tr:first th:visible").length - 3;
            
            $("#table_container tfoot td").remove();           
            $("#table_container tfoot tr").append(
                '<td colspan="' + col + '"></td>' +
                '<td></td>' +
                '<td colspan="2"></td>' 
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
 * Updated on Jan 15, 2025
 *
 * Description: Shows the action when the page button is pressed for the dashboard page.
 *
 * In:  adp, dgc, lnc, c, s, that
 * Out: -
 *
 */
function showDashboardButtonAction(adp, dgc, lnc, c, s, that) {

    // Check if the Crypto page is enabled or disabled.
    var set = JSON.parse(s[4].value);
    var crypto = (set.page === "true");    
    
    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);  
    switch (slide) {
        case 0 : // Activa Slide
            showActivaButtonAction(adp, dgc, lnc, c, s, that, crypto);
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
 * Updated on Jan 20, 2025
 *
 * Description: Shows the action when the page button is pressed for the dashboard activa page.
 *
 * In:  adp, dgc, lnc, c, s, that, crypto
 * Out: -
 *
 */
function showActivaButtonAction(adp, dgc, lnc, c, s, that, crypto) {
       
    switch (that.alt) {
        case "list" :
            showActivaListPopup(c, s);
            break;
        
        case "add"  :
        case "edit" :   
            showActivaModifyPopup(adp, that.alt, c, s);
            break;
        
        case "accounts" :
            showActivaAccountsContent(dgc, lnc, crypto, c, s, $("#input_date span").html());
            break;
          
        case "crypto"     :
            showActivaCryptoContent(dgc, lnc, c, s, $("#input_date span").html());
            break;
            
        case "expand" :
            changeActivaAccountsTable(dgc, lnc, c, s, "expand");
            break;
            
        case "collapse" : 
            changeActivaAccountsTable(dgc, lnc, c, s, "collapse");
            break;
    }     
}


/*
 * Function:    showdActivaCryptoContent
 *
 * Created on Aug 24, 2024
 * Updated on Jan 20, 2025
 *
 * Description: Shows the dashboard activa (crypto) slide content.
 *
 * In:  dgc, lnc, c, s, date
 * Out: -
 *
 */
function showActivaCryptoContent(dgc, lnc, c, s, date) {   

    var request = getAjaxRequest("get_entry_date", "date=" + date);    
    request.done(function(result) {
        if (result.success) {                    
     
            // Reset buttons.
            $("#page_buttons img").eq(2).attr({src:"img/accounts.png", alt:"accounts"});
            $("#page_buttons img").eq(3).hide();  
                
            // Show the labels.
            showActivaLabels(c, s);

            // Show the table.
            showActivaCryptoTable(c, s, result.date);
            
            // Show the doughnut chart. 
            showActivaCryptoDoughnutChart(dgc, c, result.date, "crypto");
            
            // Show the line chart.             
            ShowActivaCryptoLineChart(lnc, c, result.date, "crypto");                
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
 * Updated on Jan 06, 2025
 *
 * Description: Shows the dashboard activa crypto table.
 *
 * In:  c, s
 * Out: -
 *
 */
function showActivaCryptoTable(c, s, date) {
    
    var set = JSON.parse(s[0].value);  
    
    // Set the table height.
    $("#table_container").css("height", "30vh");     
    
    $("#table_container table").removeClass().addClass("tbl_crypto");
    
    // Fill the table header.
    $("#table_container thead tr").remove(); 
    $("#table_container thead").append("<tr><th></th>");     
    
    for (let i = 0; i < c.crypto.length; i++) {        
        $("#table_container thead tr").append("<th>" + c.crypto[i] + "</th>");
    } 
    
    $("#table_container thead tr").append("<th></th>");
    $("#table_container thead").append("</tr>");    
    
    // Fill the table body.   
    fillActivaCryptoTable(c.crypto.length + 2, date);
    $("#table_container").scrollTop(0);

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
 * Function:    fillActivaCryptoTable
 *
 * Created on Sep 06, 2024
 * Updated on Dec 29, 2024
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
                                                                      
                $("#table_container tbody").append('<tr>');
          
                $.each(field, function(key, value){                    
                    if (key !== "hide") {
                        $("#table_container tbody tr").last().append("<td>" + value + "</td>");
                    }    
                });
                
                // Index for the doughnut chart tooltip.
                $("#table_container tbody tr").last().append("<td>" + i + "</td>");
                i++;
                               
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
 * Updated on Jan 17, 2025
 *
 * Description: Change the dashboard activa accounts table.
 *
 * In:  dgc, lnc, c, s, action
 * Out: -
 *
 */
function changeActivaAccountsTable(dgc, lnc, c, s, action) {
    
    var date = $("#input_date span").html();
    if (action === "collapse") 
    {      
        showActivaAccountsTable(c, s, date, action);
        getAndShowAccountTotals(s, date); 
                 
        showActivaAccountsDoughnutChart(dgc, c, s, date, "collapse");
        ShowActivaAccountsLineChart(lnc, c, s, date, "collapse");
        
        $("#page_buttons img").eq(3).attr({src:"img/expand.png", alt:"expand"});   
    }
    else
    {
        showActivaAccountsTable(c, s, date, action);
        getAndShowAccountTotals(s, date); 
        
        showActivaAccountsDoughnutChart(dgc, c, s, date, "expand");
        ShowActivaAccountsLineChart(lnc, c, s, date, "expand");
        
        $("#page_buttons img").eq(3).attr({src:"img/collapse.png", alt:"collapse"});
    }        
}

