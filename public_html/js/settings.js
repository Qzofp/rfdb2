/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings.js
 * Used in: settings.html
 *
 * Created on Oct 29, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Javascript functions for the settings page.
 * Dependenties: js/config.js
 *
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
 * Updated on Nov 17, 2023
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
    
    // Fill the slide menu.
    fillSlideMenu(c.settings, s);
    
    showSettingsContent(0, s);    
    
    $(".slidemenu input[name='slideItem']").change(function() {               
        showSettingsContent(Number(this.value), s);     
    });      
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        
        $("#test").html("<h1>" + this.alt + "</h1>");
    });
    
    
    // Show the page theme.
    showPageTheme(s[5]);
}

/*
 * Function:    showSettingsContent
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Shows the settings content for the chosen slide.
 *
 * In:  slide, s
 * Out: -
 *
 */
function showSettingsContent(slide, s) {
    
    switch(slide) {
        case 0: ShowGeneralSettings();
                $("#test").html("<h1>" + slide + "</h1>"); 
            break;
        
        case 1: ShowFinancesSettings(s[1]);
                $("#test").html("<h1>" + slide + "</h1>"); 
            break;
            
        case 2: ShowStocksSettings(s[2]);
                $("#test").html("<h1>" + slide + "</h1>"); 
            break;
            
        case 3: ShowSavingsSettings(s[3]);
                $("#test").html("<h1>" + slide + "</h1>"); 
            break;
            
        case 4: $("#test").html("<h1>" + slide + "</h1>"); 
            break;
    }
    
}

/*
 * Function:    ShowGeneralSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Shows the settings content for the general slide.
 *
 * In:  slide
 * Out: -
 *
 */
function ShowGeneralSettings() {
    
    $("#page_buttons img").eq(0).attr({src:"img/language.png", alt:"language"}); 
    $("#page_buttons img").eq(1).attr({src:"img/pages.png", alt:"pages"});
    $("#page_buttons img").eq(2).hide(); 
    $("#page_buttons img").eq(3).hide(); 
}

/*
 * Function:    ShowFinancesSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Shows the settings content for the finances slide.
 *
 * In:  slide
 * Out: -
 *
 */
function ShowFinancesSettings(s) {
    
    setScaleButton(s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).attr({src:"img/groups.png", alt:"groups"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/shops.png", alt:"shops"}).show();
     
}

/*
 * Function:    ShowStocksSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Shows the settings content for the stocks slide.
 *
 * In:  slide
 * Out: -
 *
 */
function ShowStocksSettings(s) {
    
    setScaleButton(s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}

/*
 * Function:    ShowSavingsSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Shows the settings content for the savings slide.
 *
 * In:  slide
 * Out: -
 *
 */
function ShowSavingsSettings(s) {
    
    setScaleButton(s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}


// function ShowCryptoSettings(s)


/*
 * Function:    getScaleSetting
 *
 * Created on Nov 17, 2023
 * Updated on Nov 17, 2023
 *
 * Description: Get the scale from the settings database and set the scale button.
 *
 * In:  s
 * Out: -
 *
 */
function setScaleButton(name) {
    
    var request = $.ajax({
        url: "php/get_scale.php",
        method: "POST",
        dataType: "json",
        data: { name: name }
    }); 
      
    request.done(function(result) {
        if (result.success) {         
            
            var scale = result.data[0].scale.replace(/^"(.*)"$/, '$1');
            switch(scale) {
                case  "months" :
                    $("#page_buttons img").eq(0).attr({src:"img/quarters.png", alt:"quarters"});
                    break;
                    
                case "quarters" :
                    $("#page_buttons img").eq(0).attr({src:"img/year.png", alt:"year"});
                    break;
                    
                case "year" :
                    $("#page_buttons img").eq(0).attr({src:"img/months.png", alt:"months"});
                   break;
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