/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard.js
 * Used in: dashboard.php
 *
 * Created on Oct 28, 2023
 * Updated on Aug 30, 2024
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
 * Updated on Aug 24, 2024
 *
 * Description: Shows the dashboard page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showDashboard(c, s) {

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
    
    
    
    
    
    // Show the page theme.
    showPageTheme(s[0]); 
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
 * Updated on Aug 30, 2024
 *
 * Description: Shows the dashboard content for the chosen slide.
 *
 * In:  slide, c, s
 * Out: -
 *
 */
function showDashboardContent(slide, c, s) {
    
    switch(slide) {
        case 0: showDashboardActivaContent(c, s, "22-07-2024"); // Test date!
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
 * Function:    showDashboardActivaContent
 *
 * Created on Aug 24, 2024
 * Updated on Aug 28, 2024
 *
 * Description: Shows the dashboard activa slide content.
 *
 * In:  c, s, date
 * Out: -
 *
 */
function showDashboardActivaContent(c, s, date) {   

    var request = getAjaxRequest("get_entry_date", "date=" + date);    
    request.done(function(result) {
        if (result.success) {       
            
            // Debug.
            //console.log( result );                       
    
            var crypto = JSON.parse(s[4].value);
     
            $("#activa_main").fadeIn("slow");
            $("#test01").hide();
            $("#test02").hide();
    
            // Show crypto button if page exists.
            if (crypto.page === "true") {
            $("#page_buttons img").eq(2).css("display", "inline");
            }
            else {
                $("#page_buttons img").eq(2).css("display", "none"); 
            }
    
            // Show the entry date. 
            $("#input_date u").html(c.misc[0]);
            $("#input_date span").html(result.date); 
    
            // Show the labels.
            ShowDashboardActivaLabels(c, s);

            // Show the table.
            ShowDashboardActivaAccountsTable(c, s, result.date, true);
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
 * Function:    ShowDashboardActivaLabels
 *
 * Created on Aug 25, 2024
 * Updated on Aug 25, 2024
 *
 * Description: Shows the dashboard activa labels.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowDashboardActivaLabels(c, s) {
    
    var set = JSON.parse(s[0].value);   
    for (let i = 0; i < 3; i++) 
    {
        $(".label span").eq(i).html(c.labels[i]);
        $(".label span").eq(i).css("border-left","3px solid " + set.theme.color);           
    }      
}

/*
 * Function:    ShowDashboardActivaAccountsTable
 *
 * Created on Aug 25, 2024
 * Updated on Aug 28, 2024
 *
 * Description: Shows the dashboard activa table.
 *
 * In:  c, s, date
 * Out: -
 *
 */
function ShowDashboardActivaAccountsTable(c, s, date) {
    
    var set = JSON.parse(s[0].value);  
    
    // Calculate table height.
    var y = $(".flex_top").height() - 98;
    $("#table_container").css("height", y);     
    
    // Fill the table header.
    $("#table_container thead tr").remove(); 
    $("#table_container thead").append("<tr><th></th>");     
    
    for (let i = 0; i < c.accounts.length; i++) {
        $("#table_container thead tr").append("<th>" + c.accounts[i] + "</th>");
    } 
    
    $("#table_container thead").append("</tr>");    
    
    // Fill the table body.   
    $("#table_container tbody tr").remove(); 
    fillDashboardActivaAccountsTable(s, c.accounts.length + 1, date);       

    // Fill the table footer.
    $("#table_container tfoot tr").remove();      
    $("#table_container tfoot").append('<tr><td colspan="' + Number(c.accounts.length + 1) + '">&nbsp;</td></tr>');
    
    // Set theme.
    $("#table_container thead th").css("border-bottom", "2px solid " + set.theme.color);
    $("#table_container tfoot td").css("border-top", "2px solid " + set.theme.color);      
}

/*
 * Function:    fillDashboardActivaAccountsTable
 *
 * Created on Aug 26, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the data from the database and fill the dashboard activa accounts table with that data.
 *
 * In:  s, l, date
 * Out: -
 *
 */
function fillDashboardActivaAccountsTable(s, l, date, group) {

    // Show loading spinner.
    $("#loading").show(); 
    
    var request = getAjaxRequest("get_value_accounts", "date=" + date + "&group=" + group);
    request.done(function(result) {

        // Hide loading spinner.
        $("#loading").hide();
        
        if (result.success) {         
        
            // Debug
            //console.log( result.query );
            
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
            
            // Hide or show the hidden rows.   
            /*
            if($("#table_container tbody tr").hasClass("hide")) {
                
                let slide = Number($('input[name="slideItem"]:checked').val());
                if (slide === 0) { slide = 5; }

                let set = JSON.parse(s[slide].value);                
                if (set.show === "true") {
                    $("#table_container tbody .hide").show();
                }
                else {
                    $("#table_container tbody .hide").hide(); 
                }                
            }            
            */
           
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
