/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    settings.js
 * Used in: settings.html
 *
 * Created on Oct 29, 2023
 * Updated on Dec 01, 2023
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
 * Updated on Nov 30, 2023
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
    fillSlideMenu(items.slice(1,6), s);
    
    showSettingsContent(0, c, s);    
    
    $(".slidemenu input[name='slideItem']").change(function() {               
        showSettingsContent(Number(this.value), c, s);     
    });      
    
    // Page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        showSettingsButton(this, c, s);
    });
    
    // Settings popup Ok button is pressed.
    $("#popup_content .choice").on('click', 'img', function() {
        setPopupChoice(this, c, s);      
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
 * Updated on Dec 01, 2023
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
        
        case 1: ShowFinancesSettings(c, s, 1);                
            break;
            
        case 2: ShowStocksSettings(c, s, 2);               
            break;
            
        case 3: ShowSavingsSettings(c, s, 3);                
            break;
            
        case 4: ShowCryptoSettings(c, s, 4);
            break;
    }
    
    // Debug.
    $("#test").html("<h1>" + slide + "</h1>"); 
}

/*
 * Function:    ShowGeneralSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 25, 2023
 *
 * Description: Shows the settings content for the general slide.
 *
 * In:  c, s
 * Out: 
 *
 */
function ShowGeneralSettings(c, s) {
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }
    
    $("#page_buttons img").eq(0).attr({src:"img/language.png", alt:"language"}); 
    $("#page_buttons img").eq(1).attr({src:"img/pages.png", alt:"pages"});
    $("#page_buttons img").eq(2).hide(); 
    $("#page_buttons img").eq(3).hide(); 
    
    showLanguage(c, s);
}

/*
 * Function:    ShowFinancesSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 26, 2023
 *
 * Description: Shows the settings content for the finances slide.
 *
 * In:  c, s, i
 * Out: -
 *
 */
function ShowFinancesSettings(c, s, i) {
    
    setScaleButton(c, s, i);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active");
    $("#page_buttons img").eq(2).attr({src:"img/groups.png", alt:"groups"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/shops.png", alt:"shops"}).show();
  
}

/*
 * Function:    ShowStocksSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 26, 2023
 *
 * Description: Shows the settings content for the stocks slide.
 *
 * In:  c, s, i
 * Out: -
 *
 */
function ShowStocksSettings(c, s, i) {

    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    
    setScaleButton(c, s, i);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}

/*
 * Function:    ShowSavingsSettings
 *
 * Created on Nov 17, 2023
 * Updated on Nov 26, 2023
 *
 * Description: Shows the settings content for the savings slide.
 *
 * In:  c, s, i
 * Out: -
 *
 */
function ShowSavingsSettings(c, s, i) {
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    
    setScaleButton(c, s, i);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();
     
}

/*
 * Function:    ShowCryptoSettings
 *
 * Created on Dec 01, 2023
 * Updated on Dec 01, 2023
 *
 * Description: Shows the settings content for the crypto slide.
 *
 * In:  c, s, i
 * Out: -
 *
 */
function ShowCryptoSettings(c, s, i) {
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    
    setScaleButton(c, s, i);   
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"});
    $("#page_buttons img").eq(2).hide();
    $("#page_buttons img").eq(3).hide();    
}

/*
 * Function:    showSettingsButton
 *
 * Created on Nov 20, 2023
 * Updated on Nov 27, 2023
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
    switch(button.alt) {
        case "language" :  
            showGeneralPopupLanguage(c, s);
            break;
        case "pages"    :
            showGeneralPopupPages(c, s);
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
 * Function:    showGeneralPopupLanguage
 *
 * Created on Nov 22, 2023
 * Updated on Nov 28, 2023
 *
 * Description: Shows the language popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupLanguage(c, s) {
    
    var setting;
    
    $("#popup_content").removeClass().addClass("gen_language");
    $("#popup_content h2").html(c.language[0]); 
    $("#popup_content ul li").remove();
            
    setting = JSON.parse(s[6].value);
    for (let i = 1; i < c.language.length; i++) {
        
        if(setting.language === c.language[i]) {
            var chk = " checked";
        }
        else {
            chk = "";
        }
        
        $("#popup_content ul").append('<li class="rad"><input type="radio" id="lng-' + i + '" name="language"' + 
           chk + '><label for="lng-' + i + '">' + c.language[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}

/*
 * Function:    showGeneralPopupPages
 *
 * Created on Nov 22, 2023
 * Updated on Nov 28, 2023
 *
 * Description: Shows the pages popup content for the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showGeneralPopupPages(c, s) {
    
    var chk, setting;
    
    $("#popup_content").removeClass().addClass("gen_pages");                   
    $("#popup_content h2").html(c.settings[0]); 
    $("#popup_content ul li").remove();
 
    for (let i = 1; i < c.pages.length - 1; i++) {
        
        setting = JSON.parse(s[i].value);
        if(setting.page === "true") {
            chk = " checked";
        }
        else {
            chk = "";
        }
        
        $("#popup_content ul").append('<li class="chk"><input type="checkbox" id="pag-' + i + '" name="pages"' + 
           'value="' + i + '" ' + chk + '><label for="pag-' + i + '">' + c.titles[i] + '</label></li>');   
    }        
  
    $("#popup_container").fadeIn("slow");      
}


/*
 * Function:    setScaleButton
 *
 * Created on Nov 17, 2023
 * Updated on Nov 26, 2023
 *
 * Description: Get the scale from the settings and set the scale button.
 *
 * In:  c, s, i
 * Out: -
 *
 */
function setScaleButton(c, s, i) {
    
    var j, set = JSON.parse(s[i].value);   
    switch(set.scale) {
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
 * Function:    showLanguage
 *
 * Created on Nov 18, 2023
 * Updated on Nov 26, 2023
 *
 * Description: Show the language setting on the general page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showLanguage(c, s) {
    
    var set = JSON.parse(s[6].value);
    $("#settings u").html(c.language[0]);
    $("#settings span").html(set.language);
}

/*
 * Function:    setPopupChoice
 *
 * Created on Nov 28, 2023
 * Updated on Nov 30, 2023
 *
 * Description: Set the choice made in the settings popup window.
 *
 * In:  that, c, s
 * Out: -
 *
 */
function setPopupChoice(that, c, s) {

    var popup  = $('#popup_content').attr('class');
    if (that.alt === "ok") {
        
        var choice;
        switch (popup) {
            case "gen_language" :
                choice = $('input[name="language"]:checked').parent().text();
                setLanguage(choice, s);
                break;
            
            case "gen_pages"    :
                var result = [false,false,false,false];
                $('input[name="pages"]:checked').each(function() {
                    result[this.value - 1] = true;                 
                });
               
                //console.log(result);
                setPages(result, s);
                break;
                
            case "fin_accounts" :
                choice = "TEST";
                break;
                
                
        }
    }    
    
}

/*
 * Function:    setLanguage
 *
 * Created on Nov 29, 2023
 * Updated on Nov 30, 2023
 *
 * Description: Set the language in the database en reload the settings page.
 *
 * In:  language, s
 * Out: -
 *
 */
function setLanguage(language, s) {
    
    var set = JSON.parse(s[6].value);
    if (set.language !== language) {
        
        var request = $.ajax({
            url: "php/change_language.php",
            method: "POST",
            dataType: "json",
            data: { language: language }
        }); 
      
        request.done(function(result) {
            if (result.success) {         
                                 
                // Reload the page.
                setTimeout(function(){
                    window.location.reload();
                }, 600);
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
    
    // Close popup window.
    $("#popup_container").fadeOut("slow");    
}

/*
 * Function:    setPages
 *
 * Created on Nov 30, 2023
 * Updated on Dec 01, 2023
 *
 * Description: Set the pages (true, false) in the database en reload the settings page.
 *
 * In:  p, s
 * Out: -
 *
 */
function setPages(p, s) {
       
    var changes = checkChangedPages(p, s);
    if (changes) {
        
        //console.log(changes);
        
        var pages = JSON.stringify(p);
       
        var request = $.ajax({
            url: "php/change_pages.php",
            method: "POST",
            dataType: "json",
            data: { pages: pages }
        }); 
      
        request.done(function(result) {
            if (result.success) {         
                             
                // Reload the page.         
                setTimeout(function(){
                    window.location.reload();
                }, 600);          
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
    // Close popup window.
    $("#popup_container").fadeOut("slow");    
}

/*
 * Function:    checkChangedPages
 *
 * Created on Nov 30, 2023
 * Updated on Dec 01, 2023
 *
 * Description: Check if there are any page changes.
 *
 * In:  p, s
 * Out: check
 *
 */
function checkChangedPages(p, s) {
    
    var check = false;
         
    var set, tmp;
    for(let i = 1; i <= 4; i++) {
        
        tmp = JSON.parse(s[i].value);
        set = (tmp.page === "true");  // Convert to boolean.
        
        if (set !== p[i-1]) {
            check = true;
        }
    }
    
    return check;
}