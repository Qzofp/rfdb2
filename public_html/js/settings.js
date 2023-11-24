/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings.js
 * Used in: settings.html
 *
 * Created on Oct 29, 2023
 * Updated on Nov 24, 2023
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
 * Updated on Nov 22, 2023
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
    
    showSettingsContent(0, c, s);    
    
    $(".slidemenu input[name='slideItem']").change(function() {               
        showSettingsContent(Number(this.value), c, s);     
    });      
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        showSettingsButton(this, c, s);
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
 * Updated on Nov 18, 2023
 *
 * Description: Shows the settings content for the chosen slide.
 *
 * In:  slide, c, s
 * Out: -
 *
 */
function showSettingsContent(slide, c, s) {
    
    switch(slide) {
        case 0: ShowGeneralSettings(c);               
            break;
        
        case 1: ShowFinancesSettings(c, s[1]);                
            break;
            
        case 2: ShowStocksSettings(c, s[2]);               
            break;
            
        case 3: ShowSavingsSettings(c, s[3]);                
            break;
            
        case 4:  
            break;
    }
       
    $("#test").html("<h1>" + slide + "</h1>"); 
}

/*
 * Function:    ShowGeneralSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 20, 2023
 *
 * Description: Shows the settings content for the general slide.
 *
 * In:  c
 * Out: 
 *
 */
function ShowGeneralSettings(c) {
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }
    
    $("#page_buttons img").eq(0).attr({src:"img/language.png", alt:"language"}); 
    $("#page_buttons img").eq(1).attr({src:"img/pages.png", alt:"pages"});
    $("#page_buttons img").eq(2).hide(); 
    $("#page_buttons img").eq(3).hide(); 
    
    showLanguage(c);
}

/*
 * Function:    ShowFinancesSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 20, 2023
 *
 * Description: Shows the settings content for the finances slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowFinancesSettings(c, s) {
    
    setScaleButton(c, s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active");
    $("#page_buttons img").eq(2).attr({src:"img/groups.png", alt:"groups"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/shops.png", alt:"shops"}).show();
     
}

/*
 * Function:    ShowStocksSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 20, 2023
 *
 * Description: Shows the settings content for the stocks slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowStocksSettings(c, s) {

    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    
    setScaleButton(c, s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}

/*
 * Function:    ShowSavingsSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 20, 2023
 *
 * Description: Shows the settings content for the savings slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowSavingsSettings(c, s) {
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    
    setScaleButton(c, s.name);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}


// function ShowCryptoSettings(s)


/*
 * Function:    showSettingsButton
 *
 * Created on Nov 20, 2023
 * Updated on Nov 22, 2023
 *
 * Description: Shows the changes when the page button is pressed.
 *
 * In:  button, c, s
 * Out: -
 *
 */
function showSettingsButton(button, c, s) {

    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);
    //console.log(slide);

    switch(button.alt) {
        case "language" :           
            showGeneralPopup(button.alt, c, s);
            break;
            
        case "pages"    :
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;
        
        case "months"   :
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;
            
        case "quarters"   :
            $("#test").html("<h1>" + button.alt + "</h1>");
            break; 
        
        case "year"   :
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;        
        
        case "accounts" :
            if (slide === 1) {
                $("#page_buttons img").removeClass("active");
                $("#page_buttons img").eq(1).addClass("active");
            }
            
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;
        
        case "groups"   :
            
            $("#page_buttons img").removeClass("active");
            $("#page_buttons img").eq(2).addClass("active");
            
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;
            
        case "shops"    :
            
            $("#page_buttons img").removeClass("active");
            $("#page_buttons img").eq(3).addClass("active");
            
            $("#test").html("<h1>" + button.alt + "</h1>");
            break;
    }
}

/*
 * Function:    showGeneralPopup
 *
 * Created on Nov 22, 2023
 * Updated on Nov 24, 2023
 *
 * Description: Shows the popup content for the general page.
 *
 * In:  button, c, s
 * Out: -
 *
 */
function showGeneralPopup(button, c, s) {
    
    var setting;
    switch (button) {
        case "language" :           
            $("#popup_content").css("width", "30%");
                    
            $("#popup_content h2").html(c.language[0]); 
            $("#popup_content .options li").remove();
            
            setting = JSON.parse(s[6].value);
            for (i = 1; i < c.language.length; i++) {
                if(setting.language === c.language[i]) {
                    var chk = " checked";
                }
                $("#popup_content .options").append('<li><input type="radio" id="lng-' + i + '" name="language"' + chk + '><label for="lng-' + i + '">' + c.language[i] + '</label></li>');   
            }        
            break;
            
        case "pages"    :
            break;        
    }
    
    
    $("#popup_container").fadeIn("slow");      
}



/*
 * Function:    setScaleSetting
 *
 * Created on Nov 17, 2023
 * Updated on Nov 18, 2023
 *
 * Description: Get the scale from the settings database and set the scale button.
 *
 * In:  c, name
 * Out: -
 *
 */
function setScaleButton(c, name) {
    
    var request = $.ajax({
        url: "php/get_scale.php",
        method: "POST",
        dataType: "json",
        data: { name: name }
    }); 
      
    request.done(function(result) {
        if (result.success) {         
            
            var i, scale = result.data[0].scale.replace(/^"(.*)"$/, '$1');
            switch(scale) {
                case  "months" :
                    $("#page_buttons img").eq(0).attr({src:"img/quarters.png", alt:"quarters"});
                    i = 1;
                    break;
                    
                case "quarters" :
                    $("#page_buttons img").eq(0).attr({src:"img/year.png", alt:"year"});
                    i = 2;
                    break;
                    
                case "year" :
                    i = 3;
                    $("#page_buttons img").eq(0).attr({src:"img/months.png", alt:"months"});
                   break;
            }
            
            // Show setting on page.
            $("#settings u").html(c.scale[0]);
            $("#settings span").html(c.scale[i]);                        
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
 * Function:    showLanguage
 *
 * Created on Nov 18, 2023
 * Updated on Nov 18, 2023
 *
 * Description: Show the language setting on the general page.
 *
 * In:  c
 * Out: -
 *
 */
function showLanguage(c) {
    
    var request = $.ajax({
        url: "php/get_language.php",
        method: "POST",
        dataType: "json"
    }); 
      
    request.done(function(result) {
        if (result.success) {
            
            var language = result.data[0].language.replace(/^"(.*)"$/, '$1');
            $("#settings u").html(c.language[0]);
            $("#settings span").html(language);
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