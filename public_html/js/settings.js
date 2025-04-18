/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    settings.js
 * Used in: settings.php
 *
 * Created on Oct 29, 2023
 * Updated on Apr 07, 2025
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
 * Updated on Apr 12, 2024
 *
 * Description: The settings.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSettings() {
    
    $.when(getAjaxRequest("get_constants", "page=settings")).done(function(result) {

        if (result.success) {            
            var [c, s] = processSettingsConstants(result);         
            showSettings(c, s);   
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
 * Function:    showSettings
 *
 * Created on Nov 13, 2023
 * Updated on Aug 09, 2024
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
    
    // Initialize the datepicker.
    var $adp = initAirDatePicker(c, s);
    
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
        showSettingsButton($adp, c, this);    
    });
    
    // Table row is pressed.
    $("#table_container").on('click', 'tbody tr', function(){        
        editSettingsTableRow($adp, c, s, this);    
    });
    
    // Settings popup Ok button is pressed.  
    $("#popup_content").on("submit","form",function(e) {        
        setPopupChoice($adp, e, c, s);
    });
  
    // Settings popup <enter> button is pressed.  
    $("#popup_content").on("keypress","form",function(e) {    
        getPopupEnterKey(e);
    });

    // Select event is triggered.
    $("#popup_content").on('click', '.list .selected', function() {
        getSelectAndProcessChoice(c, this);
    });
    
    // Show the page theme.
    showPageTheme(s[5]);
    
    // Close popup windows.       
    $(".close").on("click", function() {        
        closePopupWindow();
    });    
}

/*
 * Function:    showSettingsContent
 *
 * Created on Nov 17, 2023
 * Updated on Feb 23, 2025
 *
 * Description: Shows the settings content for the chosen slide.
 *
 * In:  slide, c
 * Out: -
 *
 */
function showSettingsContent(slide, c) {
    
    var request = getAjaxRequest("settings/get_settings", "");  
    request.done(function(result) {
        if (result.success) {         
                
            var s = result.settings;            
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
 * Function:    ShowGeneralSettings
 *
 * Created on Nov 17, 2023
 * Updated on Feb 23, 2025
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
    $("#page_buttons img").eq(3).attr({src:"img/services.png", alt:"services"}).show();
    $("#page_buttons img").eq(4).attr({src:"img/configs.png", alt:"configs"}).show();
    
    var show = "show";
    if (set.show !== "true") {
        show = "hide";
    }
    $("#page_buttons img").eq(5).attr({src:"img/" + show + ".png", alt:"" + show + ""}).hide();
        
    if($("#page_buttons img").hasClass("show")) {
        $("#page_buttons img").removeClass("show");
    }   
    $("#page_buttons img").eq(5).addClass("show");
    
    showLanguage(c, s);
    showTable("tbl_users", c.users, s, 5, "settings/get_users", "sort=user");
}

/*
 * Function:    ShowFinancesSettings
 *
 * Created on Nov 17, 2023
 * Updated on Feb 23, 2025
 *
 * Description: Shows the settings content for the finances slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowFinancesSettings(c, s) {
    
    var items = [];
    var set = JSON.parse(s[1].value);   
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }      
    
    getAndSetScaleButton(c, s[1].name);
     
    $("#page_buttons img").css("border-bottom", "");
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
    $("#page_buttons img").eq(2).attr({src:"img/groups.png", alt:"groups"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/shops.png", alt:"shops"}).show();
    
    var show = "show";
    if (set.show !== "true") {
        show = "hide";
    }
    
    $("#page_buttons img").eq(4).attr({src:"img/" + show + ".png", alt:"" + show + ""}).show();
    $("#page_buttons img").eq(5).hide();
    
    set = JSON.parse(s[5].value);
    items = setAccountItems(c, 1);
    showTable("tbl_accounts", items, s, 1, "settings/get_accounts","type=finance&sign=" + set.sign + "&sort=tbl_accounts.`date`");
}

/*
 * Function:    ShowStocksSettings
 *
 * Created on Nov 17, 2023
 * Updated on Feb 23, 2025
 *
 * Description: Shows the settings content for the stocks slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowStocksSettings(c, s) {

    var items = [];
    var set = JSON.parse(s[2].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }    
    $("#page_buttons img").css("border-bottom", "");
    
    getAndSetScaleButton(c, s[2].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
     
    var show = "show";
    if (set.show !== "true") {
        show = "hide";
    }
    
    $("#page_buttons img").eq(2).attr({src:"img/" + show + ".png", alt:"" + show + ""}).show();
    $("#page_buttons img").eq(3).hide();    
    $("#page_buttons img").eq(4).hide();
    $("#page_buttons img").eq(5).hide();
   
    set = JSON.parse(s[5].value);
    items = setAccountItems(c, 2);
    showTable("tbl_accounts", items, s, 2, "settings/get_accounts", "type=stock&sign=" + set.sign + "&sort=tbl_accounts.`date`");   
}

/*
 * Function:    ShowSavingsSettings
 *
 * Created on Nov 17, 2023
 * Updated on Feb 23, 2025
 *
 * Description: Shows the settings content for the savings slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowSavingsSettings(c, s) {
    
    var items = [];
    var set = JSON.parse(s[3].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    } 
    $("#page_buttons img").css("border-bottom", "");
     
    getAndSetScaleButton(c, s[3].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
    
    var show = "show";
    if (set.show !== "true") {
        show = "hide";
    }
    
    $("#page_buttons img").eq(2).attr({src:"img/" + show + ".png", alt:"" + show + ""}).show();
    $("#page_buttons img").eq(3).hide();    
    $("#page_buttons img").eq(4).hide();
    $("#page_buttons img").eq(5).hide();

    set = JSON.parse(s[5].value);
    items = setAccountItems(c, 3);
    showTable("tbl_accounts", items, s, 3, "settings/get_accounts", "type=savings&sign=" + set.sign + "&sort=tbl_accounts.`date`");       
}

/*
 * Function:    ShowCryptoSettings
 *
 * Created on Dec 01, 2023
 * Updated on Mar 19, 2025
 *
 * Description: Shows the settings content for the crypto slide.
 *
 * In:  c, s
 * Out: -
 *
 */
function ShowCryptoSettings(c, s) {
    
    var items = [];
    var set = JSON.parse(s[4].value);
    
    if($("#page_buttons img").hasClass("active")) {
        $("#page_buttons img").removeClass("active");
    }
    $("#page_buttons img").css("border-bottom", "");
     
    getAndSetScaleButton(c, s[4].name);
    $("#page_buttons img").eq(1).attr({src:"img/accounts.png", alt:"accounts"}).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
    $("#page_buttons img").eq(2).attr({src:"img/crypto.png", alt:"crypto"}).show();
    $("#page_buttons img").eq(3).attr({src:"img/wallet.png", alt:"wallets"}).show();       
    
    var show = "show";
    if (set.show !== "true") {
        show = "hide";
    }
    
    $("#page_buttons img").eq(4).attr({src:"img/" + show + ".png", alt:"" + show + ""}).show();
    $("#page_buttons img").eq(5).hide(); 
      
    set = JSON.parse(s[5].value);  
    items = setAccountItems(c, 4);
    showTable("tbl_accounts", items, s, 4, "settings/get_accounts", "type=crypto&sign=" + set.sign + "&sort=tbl_accounts.`date`");
    
    // Hide the color column.
    $(".tbl_accounts td:nth-child(5),th:nth-child(5)").hide();
}

/*
 * Function:    showSettingsButton
 *
 * Created on Nov 20, 2023
 * Updated on Feb 23, 2025
 *
 * Description: Shows the changes when the page button is pressed.
 *
 * In:  adp, c, that
 * Out: -
 *
 */
function showSettingsButton(adp, c, that) {

    var request = getAjaxRequest("settings/get_settings", "");    
    request.done(function(result) {
        if (result.success) {         
                
            var s = result.settings;
            showSettingButtonAction(adp, c, s, that);           
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
 * Function:    showSettingButtonAction
 *
 * Created on Feb 12, 2024
 * Updated on Mar 26, 2025
 *
 * Description: Shows the action when the page button is pressed.
 *
 * In:  adp, c, s, that
 * Out: -
 *
 */
function showSettingButtonAction(adp, c, s, that) {
    
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
            if (that.className === 'active') {
                showGeneralPopupUsers(c, s);
            }
            else 
            {
                setPageButton(s[5], 2, 5);
                showTable("tbl_users", c.users, s, 5, "settings/get_users", "sort=user");
            }
            break;
            
        case "services" :
            if (that.className === 'active') {
                showGeneralPopupServices(c, s, false);
            }
            else 
            {                          
                $("#page_buttons img").eq(5).show();                
                setPageButton(s[5], 3, -1);
                
                let services = setServices(c, s);
                showTable("tbl_services", services, s, 5, "settings/get_services", "sort=service");             
            }
            break;              
                       
        case "configs"  :
            if (that.className === 'active') {
                showGeneralPopupConfigs(c, s);
            }
            else 
            {               
                setPageButton(s[5], 4, 5);
                showTable("tbl_config", c.configs, s, 5, "settings/get_configs", "");
            }
            break;
            
        case "months"   :   
        case "quarters" : 
        case "year"     :                      
            changeScaleSetting(s[slide].name, that.alt);    
            setScaleButton(c, that.alt);
            break;               
              
        case "accounts" :
            if (that.className === 'active') {   
                showFinancesPopupAccounts(adp, c, s, slide, false);
            }
            else 
            {     
                setPageButton(s[slide], 1, -1);
                let items = setAccountItems(c, slide);    
                showTable("tbl_accounts", items, s, slide, "settings/get_accounts","type=" + s[slide].name + "&sign=" + set.sign + "&sort=tbl_accounts.`date`");  
                
                // Hide the crypto account color column.
                if (slide === 4) {
                    $(".tbl_accounts td:nth-child(5),th:nth-child(5)").hide();              
                }
            }      
            break;
        
        case "groups"   :
            if (that.className === 'active') {   
                showFinancesPopupGroups(c, s, false);
            }
            else {
                setPageButton(s[1], 2, -1);
                showTable("tbl_groups", c.groups, s, slide, "settings/get_groups","");
            }
            break;
            
        case "shops"    :
            if (that.className === 'active') {   
                showFinancesPopupBusinesses(c, s, false);
            }
            else {            
                setPageButton(s[1], 3, -1);
                showTable("tbl_businesses", c.businesses, s, slide, "settings/get_businesses","");
            }
            break;
            
        case "crypto" :
            if (that.className === 'active') {  
                showCryptoPopupCurrenties(c, s, false);
            } 
            else {
                setPageButton(s[4], 2, -1);
                showTable("tbl_cryptocurrenties", c.cryptos, s, slide, "settings/get_cryptos","sort=name");
            }
            break;
            
        case "wallets" :
            if (that.className === 'active') {  
                showCryptoPopupWallets(c, s, false);
            } 
            else {            
                setPageButton(s[4], 3, -1);
                showTable("tbl_wallets", c.wallets, s, slide, "settings/get_wallets","sort=account");
            }
            break;
        
        case "show"     :
            setShowRows(that, slide, false);
            break;
            
        case "hide"     :
            setShowRows(that, slide, true);
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
 * Updated on Feb 23, 2025
 *
 * Description: Get the scale from the settings database and set the scale button.
 *
 * In:  c, scale
 * Out: -
 *
 */
function getAndSetScaleButton(c, name) {
   
    var send = "name=" + name;    
    var request = getAjaxRequest("settings/get_scale", send);     
    request.done(function(result) {
        if (result.success) { 
            setScaleButton(c, result.data[0].scale);            
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
 * Function:    setPopupChoice
 *
 * Created on Nov 28, 2023
 * Updated on Apr 07, 2025
 *
 * Description: Set the choice made in the settings popup window.
 *
 * In:  adp, e, c, s
 * Out: -
 *
 */
function setPopupChoice(adp, e, c, s) {
      
    e.preventDefault();
   
    var btn = e.originalEvent.submitter.alt;
    var popup  = $('#popup_content').attr('class');
        
    if (btn !== "cancel") {
        
        switch (popup) {
            case "gen_language" :
                let data = $('input[name="language"]:checked').parent().text();
                setLanguage(data, s);
                break;
            
            case "gen_pages"    :
                let result = [false,false,false,false];
                $('input[name="pages"]:checked').each(function() {
                    result[this.value - 1] = true;      
                });
               
                setPages(result, s);
                break;
                
            case "gen_users" :
                modifyUser(c, btn);      
                break;
                
            case "gen_services" :                
                modifyServices(c, btn); 
                break;
                
            case "fin_accounts" :
                modifyAccounts(adp, c, s, btn);
                break;
            
            case "gen_groups" :
                modifyGroups(c, btn);
                break;
                
            case "gen_businesses" :
                modifyBusinesses(c, btn);
                break; 
            
            case "gen_configs" :
                modifyConfigs(c, s);
                break;
                
            case "gen_currenties" :
                modifyCryptoCurrenties(c, btn);
                break;
                
            case "gen_wallets" :
                modifyCryptoWallets(c, btn);
                break;
        }
    }     
}

/*
 * Function:    getSelectAndProcessChoice
 *
 * Created on May 25, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Get the choosen select value and process that value.
 *
 * In:  c, that
 * Out: -
 *
 */
function getSelectAndProcessChoice(c, that) {

    var popup = $('#popup_content').attr('class');
    if (popup === "gen_wallets") 
    {
        var select = $(that).parents(':eq(3)').find('select').attr('id');
        var id = $(that).attr('data-value');
        
        if (select === "services") 
        {
            removeSelectMenu("accounts"); 
            addSelectMenu(c, "settings/get_select_settings", "type=account&slide=crypto&id=" + id, "accounts", c.wallets[2], 0, "", 0);
        }
        else if (select === "accounts" && !$("#table_container tbody .marked").length)
        {
            removeSelectMenu("cryptos");
            addSelectMenu(c, "settings/get_select_settings", "type=crypto&slide=crypto", "cryptos", c.wallets[3], 0, "", 1);
        }     
    }     
}

/*
 * Function:    editSettingsTableRow
 *
 * Created on Jan 31, 2024
 * Updated on May 27, 2024
 *
 * Description: Edit or delete the settings table row that was pressed.
 *
 * In:  adp, c, s, that
 * Out: -
 *
 */
function editSettingsTableRow(adp, c, s, that) {
    
    // Get active button.
    var btn = $("#page_buttons .active").attr("alt");
    var rowid = $(that).closest('tr').find('td:first').text().split("_");
       
    // Get the active slide.
    var slide = Number($(".slidemenu input[name='slideItem']:checked")[0].value);
    
    var hide = false;
    if ($(that).hasClass("hide")) {
        hide = true;
    } 
    
    if (btn !== "configs" && rowid[0] > 0) {
       $(that).addClass("marked");
    }
    
    switch(btn) {
        case "users" :           
            showGeneralPopupUsers(c, s);
            break;

        case "services" :
             showGeneralPopupServices(c, s, hide);
            break;        
        
        case "accounts" :
            showFinancesPopupAccounts(adp, c, s, slide, hide);
            break;
            
        case "groups" :
            showFinancesPopupGroups(c, s, hide);
            break;    
        
        case "shops" :
            showFinancesPopupBusinesses(c, s, hide);
            break;  
        
        case "configs" :
            showGeneralPopupConfigs(c, s);
            break;  
            
        case "crypto" :
            showCryptoPopupCurrenties(c, s, hide);
            break;
        
        case "wallets" :
            showCryptoPopupWallets(c, s, hide);
            break;
    }
}

/*
 * Function:   setShowRow
 *
 * Created on Feb 07, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Set the show rows (true, false) in the database and show or hide the hidden rows. 
 *
 * In:  that, slide, show (true | false)
 * Out: -
 *
 */
function setShowRows(that, slide, show) {
    
    if (show) {
        $(that).attr({src:"img/show.png", alt:"show"});
        $("#table_container tbody .hide").fadeIn("slow");
    }
    else {
        $(that).attr({src:"img/hide.png", alt:"hide"});
        $("#table_container tbody .hide").fadeOut("slow");
    }
     
    var send = 'slide=' + slide + '&show=' + show; 
    var request = getAjaxRequest("settings/change_showrows", send);
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