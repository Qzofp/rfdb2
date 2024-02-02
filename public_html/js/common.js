/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Feb 02, 2024
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
 * Function:    fillSlideMenu
 *
 * Created on Nov 16, 2023
 * Updated on Dec 02, 2023
 *
 * Description: Fill the Slidemenu bar with the items for the index and settings pages.
 *
 * In:  items, s
 * Out: -
 *
 */
function fillSlideMenu(items, s) {
    
    var tmp;

    // Add labels.
    var j = 0;
    for (let i = 0; i < 6; i++) {
        tmp = JSON.parse(s[i].value);
        if (i === 0) {
            $("#slide6-item-" + i).prop('checked', true);
        }
            
        if (i < items.length) {         
            if (tmp.page === "true") {
                $("#slide6-item-" + j).val(i).next().find("span").html(items[i]);             
                j++;
            }                        
        }
    }
    
    while (j < 6) {        
        $("#slide6-item-" + j).next().hide(); 
        j++;
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
 * Updated on Dec 04, 2023
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
    
    // Theme for the settings page.
    if (s.name === "settings") {
        $("#settings u").css("text-decoration-color", tmp.theme.color);
        $("#popup_content h2").css("text-decoration-color", tmp.theme.color);
        //$("#tbl_settings th").css("border-bottom", "2px solid " + tmp.theme.color);
    }
}

/*
 * Function:    closePopupWindow
 *
 * Created on Nov 19, 2023
 * Updated on Feb 02, 2024
 *
 * Description: Close the Popup window.
 *
 * In:  -
 * Out: -
 *
 */
function closePopupWindow() {
    
    var mark;
    
    // Close popup error.
    $(".close").on("click", function () {
        $("#popup_container").fadeOut("slow");     
          
        if ($("#table_container tbody .marked").length) {
            mark = $("#table_container tbody .marked").toggleClass("marked unmark");
        }
        
        if ($("#table_container tbody .delete").length) {
            mark = $("#table_container tbody .delete").toggleClass("delete unmark");
        }        
    
        setTimeout(function() {
            mark.removeClass("unmark");
        }, 1000);
          
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

/*
 * Function:    hashPassword
 *
 * Created on Jan 27, 2024
 * Updated on Jan 27, 2024
 *
 * Description: Hash the password with salt.
 *
 * In:  string, salt
 * Out: password
 *
 */
function hashPassword(string, salt)
{
    var password = string;
    
    if ($.trim(string).length) {    
        password = CryptoJS.SHA256(CryptoJS.SHA256(string) + salt).toString(CryptoJS.enc.Hex);
    }
    
    return password;
}

/*
 * Function:    showTable
 *
 * Created on Jan 06, 2024
 * Updated on Jan 31, 2024
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
    $("#table_container").css("height", y);
    
    // Fill the table header.
    $("#table_container thead tr").remove(); 
    $("#table_container thead").append("<tr><th></th>");     
    
    for (let i = 1; i < items.length; i++) {
        $("#table_container thead tr").append("<th>" + items[i] + "</th>");
    } 
    
    $("#table_container thead").append("</tr>");
 
    // Fill the table body.
    $("#table_container tbody tr").remove(); 
    fillTable(s, page, items.length);
    
    // Fill the table footer.
    $("#table_container tfoot tr").remove();      
    $("#table_container tfoot").append('<tr><td colspan="' + items.length + '">&nbsp;</td></tr>');
    
    // Set theme.
    $("#table_container thead th").css("border-bottom", "2px solid " + set.theme.color);
    $("#table_container tfoot td").css("border-top", "2px solid " + set.theme.color);       
}

/*
 * Function:    fillTable
 *
 * Created on Jan 08, 2024
 * Updated on Jan 31, 2024
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
                $("#table_container tbody").append('<tr>');
                
                $.each(field, function(key, value){
                    $("#table_container tbody tr").last().append("<td>" + value + "</td>");
                });
                
                $("#table_container tbody").append("</tr>");   
            });  

            // Add empty rows.
            for (let j = i; j < set.rows; j++) {
               $("#table_container tbody").append('<tr><td colspan="' + l + '">&nbsp;</td></tr>');
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