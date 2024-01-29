/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings.js
 * Used in: settings.php
 *
 * Created on Oct 29, 2023
 * Updated on Jan 29, 2024
 *
 * Description: Javascript functions for the general settings page slide (tab).
 * Dependenties: js/config.js
 *               js/settings_general.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadSettings
 *
 * Created on Oct 29, 2023
 * Updated on Nov 15, 2023
 *
 * Description: The settings.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSettings() {
    
    $.when(getConstants()).done(function(result) {

        if (result.success) {         
            var [c, s] = processConstants(result);           
            showSettings(c, s);   
        }
        else {
            showDatabaseError(result.message);                    
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
 * Function:    showSettings
 *
 * Created on Nov 13, 2023
 * Updated on Jan 28, 2024
 *
 * Description: Shows the settings page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showSettings(c, s) {

    showPageTitles(c, 5, "");
                
    // Fill hamburger menu.
    fillHamburgerMenu(c, s, 5);        
    
    // Remove de "Pages" item and fill the slide menu.
    var items = c.settings.slice();
    fillSlideMenu(items.slice(1, 6), s);
    
    showSettingsContent(0, c, s);    
    
    // Slidemenu button is pressed.
    $(".slidemenu input[name='slideItem']").change(function() {               
        showSettingsContent(Number(this.value), c, s);     
    });      
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        showSettingsButton(this, c, s);
    });
    
    // Table row is pressed.
    $("#tbl_settings").on('click', 'tbody tr', function(){
        
        // Debug & test        
        $(this).addClass("marked");
                    
        var rowid = $(this).closest('tr').find('td:first').text();
        var tst = $("#page_buttons .active").attr("alt");
       
        console.log(rowid, tst);     
    });
    
    // Settings popup Ok button is pressed.  
    $("#popup_content").on("submit","form",function(e) {  
       setPopupChoice(e, c, s);
    });       
        
    // Show the page theme.
    showPageTheme(s[5]);
    
    // Close popup windows.
    closePopupWindow();
}

/*
 * Function:    showSettingsContent
 *
 * Created on Nov 17, 2023
 * Updated on Dec 05, 2023
 *
 * Description: Shows the settings content for the chosen slide.
 *
 * In:  slide, c, s
 * Out: -
 *
 */
function showSettingsContent(slide, c, s) {
    
    switch(slide) {
        case 0: ShowGeneralSettings(c, s);               
            break;
        
        case 1: ShowFinancesSettings(c, s);                
            break;
            
        case 2: ShowStocksSettings(c, s);               
            break;
            
        case 3: ShowSavingsSettings(c, s);                
            break;
            
        case 4: ShowCryptoSettings(c, s);
            break;
    }
    
    // Debug.
    //$("#test").html("<h1>" + slide + "</h1>"); 
}

/*
 * Function:    ShowGeneralSettings
 *
 * Created on Nov 17, 2023
 * Updated on Jan 28, 2023
 *
 * Description: Shows the settings content for the general slide.
 *
 * In:  c, s
 * Out: 
 *
 */
function ShowGeneralSettings(c, s) {
    
    var set = JSON.parse(s[5].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }
    $("#page_buttons img").css("border-bottom", "");
    
    $("#page_buttons img").eq(0).attr({src:"img/language.png", alt:"language"}); 
    $("#page_buttons img").eq(1).attr({src:"img/pages.png", alt:"pages"});
    $("#page_buttons img").eq(2).attr({src:"img/users.png", alt:"users"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color).show();  
    $("#page_buttons img").eq(3).attr({src:"img/configs.png", alt:"configs"}).show();
    
    showLanguage(c, s);
    showTable(c.users, s, "get_users.php");
}

/*
 * Function:    ShowFinancesSettings
 *
 * Created on Nov 17, 2023
 * Updated on Dec 19, 2023
 *
 * Description: Shows the settings content for the finances slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowFinancesSettings(c, s) {
    
    var set = JSON.parse(s[5].value);    
    getAndSetScaleButton(c, s[1].name);
    
    $("#page_buttons img").css("border-bottom", "");
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
    $("#page_buttons img").eq(2).attr({src:"img/groups.png", alt:"groups"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/shops.png", alt:"shops"}).show();
 
    // Temporary
    $("#tbl_settings thead tr").remove(); 
    $("#tbl_settings tbody td").remove();
    $("#tbl_settings tfoot tr").remove();
    
    set = JSON.parse(s[1].value);
    $("#label span").css("border-left","3px solid " + set.theme.color);
    
}

/*
 * Function:    ShowStocksSettings
 *
 * Created on Nov 17, 2023
 * Updated on Dec 19, 2023
 *
 * Description: Shows the settings content for the stocks slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowStocksSettings(c, s) {

    var set = JSON.parse(s[2].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    $("#page_buttons img").css("border-bottom", "");
    
    getAndSetScaleButton(c, s[2].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
    
    
    // Temporary
    $("#tbl_settings thead tr").remove(); 
    $("#tbl_settings tbody td").remove(); 
    $("#tbl_settings tfoot tr").remove();
    $("#label span").css("border-left","3px solid " + set.theme.color);    
     
}

/*
 * Function:    ShowSavingsSettings
 *
 * Created on Nov 17, 2023
 * Updated on Dec 19, 2023
 *
 * Description: Shows the settings content for the savings slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowSavingsSettings(c, s) {
    
    var set = JSON.parse(s[3].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    } 
    $("#page_buttons img").css("border-bottom", "");
     
    getAndSetScaleButton(c, s[3].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
    
    // Temporary
    $("#tbl_settings thead tr").remove(); 
    $("#tbl_settings tbody td").remove();
    $("#tbl_settings tfoot tr").remove();
    $("#label span").css("border-left","3px solid " + set.theme.color);     
     
}

/*
 * Function:    ShowCryptoSettings
 *
 * Created on Dec 01, 2023
 * Updated on Dec 19, 2023
 *
 * Description: Shows the settings content for the crypto slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowCryptoSettings(c, s) {
    
    var set = JSON.parse(s[4].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }
    $("#page_buttons img").css("border-bottom", "");
     
    getAndSetScaleButton(c, s[4].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();    
    
    
    // Temporary
    $("#tbl_settings thead tr").remove(); 
    $("#tbl_settings tbody td").remove();
    $("#tbl_settings tfoot tr").remove();    
    $("#label span").css("border-left","3px solid " + set.theme.color); 
}

/*
 * Function:    showSettingsButton
 *
 * Created on Nov 20, 2023
 * Updated on Jan 09, 2024
 *
 * Description: Shows the changes when the page button is pressed.
 *
 * In:  that, c, s
 * Out: -
 *
 */
function showSettingsButton(that, c, s) {

    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);
    var set = JSON.parse(s[5].value);
    switch(that.alt) {
        case "language" :  
            showGeneralPopupLanguage(c, s);
            break;
        case "pages"    :
            showGeneralPopupPages(c, s);
            break;
            
        case "users"    : 
            if (that.className === 'active') 
            {
                showGeneralPopupUsers(c, s);
            }
            else 
            {
                $("#page_buttons .active").css("border-bottom", "");
                $("#page_buttons img").removeClass("active");                
                $("#page_buttons img").eq(2).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
                
                //$("#label span").html(c.users[0]);
                //$("#label span").css("border-left","3px solid " + set.theme.color);
                
                showTable(c.users, s, "get_users.php");
                
                //showUsersTable(c, s);
            }
            break;
            
        case "configs"  :
            if (that.className === 'active') 
            {
                console.log(that.className); // debug
            }
            else 
            {
                $("#page_buttons .active").css("border-bottom", "");
                $("#page_buttons img").removeClass("active");                
                $("#page_buttons img").eq(3).addClass("active").css("border-bottom", "2px solid " + set.theme.color);   
                
                //$("#label span").html(c.configs[0]);
                //$("#label span").css("border-left","3px solid " + set.theme.color);
                
                showTable(c.configs, s, "get_configs.php");
                
                
                //showConfigsTable(c, s);
            }
            break;
            
        case "months"   :   
        case "quarters" : 
        case "year"     :                      
            changeScaleSetting(s[slide].name, that.alt);    
            setScaleButton(c, that.alt);
            break;               
      
        case "accounts" :
            if (slide === 1) {
                $("#page_buttons .active").css("border-bottom", "");
                $("#page_buttons img").removeClass("active");
                $("#page_buttons img").eq(1).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
            }
            
            // Test.
            $("#label span").html(that.alt);
            break;
        
        case "groups"   :
            $("#page_buttons .active").css("border-bottom", "");
            $("#page_buttons img").removeClass("active");
            $("#page_buttons img").eq(2).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
            
            // Test.
            $("#label span").html(that.alt);
            break;
            
        case "shops"    :
            $("#page_buttons .active").css("border-bottom", "");
            $("#page_buttons img").removeClass("active");
            $("#page_buttons img").eq(3).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
            
            // Test
            $("#label span").html(that.alt);
            break;
    }
}


/*
 * Function:    setScaleButton
 *
 * Created on Nov 17, 2023
 * Updated on Dec 02, 2023
 *
 * Description: Set the scale button.
 *
 * In:  c, scale
 * Out: -
 *
 */
function setScaleButton(c, scale) {
        
    var j;       
    switch(scale) {
        case  "months" :
            $("#page_buttons img").eq(0).attr({src:"img/quarters.png", alt:"quarters"});
            j = 1;
            break;
                    
        case "quarters" :
            $("#page_buttons img").eq(0).attr({src:"img/year.png", alt:"year"});
            j = 2;
            break;
                    
        case "year" :
            j = 3;
            $("#page_buttons img").eq(0).attr({src:"img/months.png", alt:"months"});
            break;
        }
            
    // Show setting on page.
    $("#settings u").html(c.scale[0]);
    $("#settings span").html(c.scale[j]);
}

/*
 * Function:    getAndSetScaleButton
 *
 * Created on Dec 02, 2023
 * Updated on Jan 08, 2024
 *
 * Description: Get the scale from the settings database and set the scale button.
 *
 * In:  c, scale
 * Out: -
 *
 */
function getAndSetScaleButton(c, name) {
    
    var request = $.ajax({
        url: "php/get_scale.php",
        method: "POST",
        dataType: "json",
        data: { name: name }
    }); 
      
    request.done(function(result) {
        if (result.success) { 
            setScaleButton(c, result.data[0].scale);            
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

/*
 * Function:    showTable
 *
 * Created on Jan 06, 2024
 * Updated on Jan 08, 2024
 *
 * Description: Show the table.
 *
 * In:  items, s, page
 * Out: -
 *
 */
function showTable(items, s, page) {

    var set = JSON.parse(s[5].value);
    
    // Set the table label.
    $("#label span").html(items[0]);
    $("#label span").css("border-left","3px solid " + set.theme.color);
    
    // Calculate table height.
    var y = $(".content_main").height() - 190;
    $("#tbl_settings").css("height", y);
    
    // Fill the table header.
    $("#tbl_settings thead tr").remove(); 
    $("#tbl_settings thead").append("<tr><th></th>");     
    
    for (let i = 1; i < items.length; i++) {
        $("#tbl_settings thead tr").append("<th>" + items[i] + "</th>");
    } 
    
    $("#tbl_settings thead").append("</tr>");
 
    // Fill the table body.
    $("#tbl_settings tbody tr").remove(); 
    fillTable(s, page, items.length);
    
    // Fill the table footer.
    $("#tbl_settings tfoot tr").remove();      
    $("#tbl_settings tfoot").append('<tr><td colspan="' + items.length + '">&nbsp;</td></tr>');
    
    // Set theme.
    $("#tbl_settings thead th").css("border-bottom", "2px solid " + set.theme.color);
    $("#tbl_settings tfoot td").css("border-top", "2px solid " + set.theme.color);       
}

/*
 * Function:    fillTable
 *
 * Created on Jan 08, 2024
 * Updated on Jan 28, 2024
 *
 * Description: Get the data from the database and fill the table with that data.
 *
 * In:  s, page, l
 * Out: -
 *
 */
function fillTable(s, page, l) {
    
    var set = JSON.parse(s[5].value);    
    var request = $.ajax({
        url: "php/" + page,
        method: "POST",
        dataType: "json"
    });     
    
    request.done(function(result) {
        if (result.success) {         
            
            let i = 0;             
            $.each(result.data, function (n, field) {  
                i++;
                $("#tbl_settings tbody").append('<tr>');
                
                $.each(field, function(key, value){
                    $("#tbl_settings tbody tr").last().append("<td>" + value + "</td>");
                });
                
                $("#tbl_settings tbody").append("</tr>");   
            });  

            // Add empty rows.
            for (let j = i; j < set.rows; j++) {
               $("#tbl_settings tbody").append('<tr><td colspan="' + l + '">&nbsp;</td></tr>');
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
    
/*
 * Function:    setPopupChoice
 *
 * Created on Nov 28, 2023
 * Updated on Jan 27, 2024
 *
 * Description: Set the choice made in the settings popup window.
 *
 * In:  that, e, c, s
 * Out: -
 *
 */
function setPopupChoice(e, c, s) {

    e.preventDefault();
    
    var btn = e.originalEvent.submitter.alt;
    var popup  = $('#popup_content').attr('class');
    if (btn === "ok" || btn === "add") {
        
        var data;
        switch (popup) {
            case "gen_language" :
                data = $('input[name="language"]:checked').parent().text();
                setLanguage(data, s);
                break;
            
            case "gen_pages"    :
                var result = [false,false,false,false];
                $('input[name="pages"]:checked').each(function() {
                    result[this.value - 1] = true;                 
                });
               
                setPages(result, s);
                break;
                
            case "gen_users" :                
                addUser(c, btn);           
                break;
                
                
                
            case "fin_accounts" :
                data = "TEST";
                break;
                
                
        }
    }
   
}
