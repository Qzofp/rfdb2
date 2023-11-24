/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Nov 24, 2023
 *
 * Description: Common functions.
 * Dependenties: Javascript common functions.
 *
 *
 */

//////////////////////////////////////////      Common Functions     /////////////////////////////////////////

/*
 * Function:    fillHamburgerMenu
 *
 * Created on Oct 28, 2023
 * Updated on Nov 16, 2023
 *
 * Description: Fill the hamburger menu with the items.
 *
 * In:  c, s, exclude
 * Out: -
 *
 */
function fillHamburgerMenu(c, s, exclude) {
   
    var tmp;
    for(let i = 0; i < c.titles.length; i++) {
        tmp = JSON.parse(s[i].value);
        if (i !== exclude && tmp.page === "true") {               
            $(".menu_box li a").eq(i).attr("href", c.pages[i]).html(c.titles[i]);
        }
        else {
            $(".menu_box li").eq(i).hide();
        }
    }
}

/*
 * Function:    fillSheetSlideMenu
 *
 * Created on Nov 16, 2023
 * Updated on Nov 16, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  items, s
 * Out: -
 *
 */
function fillSlideMenu(items, s) {
    
    var tmp;
    
    // Add labels.
    for (let i = 0; i < 6; i++) {
        tmp = JSON.parse(s[i].value);
        if (i === 0) {
            $("#slide6-item-" + i).prop('checked', true);
        }
            
        if (i < items.length && tmp.page === "true") {
           $("#slide6-item-" + i).next().find("span").html(items[i]); 
        }
        else {
           $("#slide6-item-" + i).next().hide(); 
        }
    }    
}

/*
 * Function:    showPageTitles
 *
 * Created on Nov 08, 2023
 * Updated on Nov 13, 2023
 *
 * Description: Show the page titles and the footer.
 *
 * In:  c, i, add
 * Out: 
 *
 */
function showPageTitles(c, i, add) {  
        
    $("title").html(c.project);  
    $("header h1").html(c.titles[i] + add);
    $("footer h3").html(c.footer);
}

/*
 * Function:    showPageTheme
 *
 * Created on Oct 29, 2023
 * Updated on Nov 12, 2023
 *
 * Description: Show the sheet page theme colors.
 *
 * In:  s
 * Out: -
 *
 */
function showPageTheme(s) {
        
    var tmp = JSON.parse(s.value);
    
    $(":root").css("--selected-text-color", tmp.theme.color);
    $(".slider .bar").css("background", tmp.theme.color); 
}

/*
 * Function:    closePopupWindow
 *
 * Created on Nov 19, 2023
 * Updated on Nov 24, 2023
 *
 * Description: Close the Popup window.
 *
 * In:  -
 * Out: -
 *
 */
function closePopupWindow() {
    
    // Close popup error.
    $(".close").on("click", function () {
      $("#popup_container").fadeOut("slow");
    });   
}

/*
 * Function:    showDatabaseError
 *
 * Created on Nov 12, 2023
 * Updated on Nov 12, 2023
 *
 * Description: Show the database error
 *
 * In:  msg
 * Out: -
 *
 */
function showDatabaseError(msg) {
    
    $("#error h2").html("Database error"); 
    $("#error p").html(msg);
    $("#popup_error").fadeIn("slow");
}

/*
 * Function:    showAjaxError
 *
 * Created on Nov 12, 2023
 * Updated on Nov 12, 2023
 *
 * Description: Show the ajax error
 *
 * In:  xhr, msg
 * Out: -
 *
 */
function showAjaxError(xhr, msg) {
    
    $("#error h2").html("Ajax " + msg ); 
    $("#error p").html(xhr.responseText);
    $("#popup_error").fadeIn("slow");    
}

/*
 * Function:    closeErrorMessage
 *
 * Created on Nov 12, 2023
 * Updated on Nov 12, 2023
 *
 * Description: Close the error message.
 *
 * In:  -
 * Out: -
 *
 */
function closeErrorMessage() {
    
    // Close popup error.
    $(".close").on("click", function () {
      $("#popup_error").fadeOut("slow");
    });
 
    // Close popup error when click outside.
    $("#popup_error").on("click", function () {
      $("#popup_error").fadeOut("slow");
    }).children().click(function () {
      return false;
    });    
}

/*
 * Function:    changeScaleSetting
 *
 * Created on Nov 15, 2023
 * Updated on Nov 15, 2023
 *
 * Description: Change the scale in the settings database.
 *
 * In:  name, scale
 * Out: -
 *
 */
function changeScaleSetting(name, scale) {
    
    var request = $.ajax({
        url: "php/change_scale.php",
        method: "POST",
        dataType: "json",
        data: { name: name, scale: scale }
    }); 
      
    request.done(function(result) {
        if (!result.success) {         
            showDatabaseError(result.message);                    
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage();
}

