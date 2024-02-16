/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Feb 14, 2024
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
 * Updated on Feb 09, 2024
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
    }
}

/*
 * Function:    closePopupWindow
 *
 * Created on Nov 19, 2023
 * Updated on Feb 05, 2024
 *
 * Description: Close the Popup window.
 *
 * In:  -
 * Out: -
 *
 */
function closePopupWindow() {
       
    var mark = "";
        
    $("#popup_container").fadeOut("slow");     
          
    if ($("#table_container tbody .marked").length) {
        mark = $("#table_container tbody .marked").toggleClass("marked unmark");
    }
        
    if ($("#table_container tbody .delete").length) {
        mark = $("#table_container tbody .delete").toggleClass("delete unmark");
    }        
    
    if ($("#table_container tbody .unmark").length) {
        setTimeout(function() {
            mark.removeClass("unmark");
        }, 1000);
    }  
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
 * Updated on Feb 09, 2024
 *
 * Description: Change the scale in the settings database.
 *
 * In:  name, scale
 * Out: -
 *
 */
function changeScaleSetting(name, scale) {
    
    var send = "name=" + name + "&scale=" + scale;
    var request = getAjaxRequest("change_scale", send);      
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
 * Function:    setPageButton
 *
 * Created on Feb 06, 2024
 * Updated on Feb 07, 2024
 *
 * Description: Set the line under the page button image.
 *
 * In:  s, n, h
 * Out: -
 *
 */
function setPageButton(s, n, h) {
    
     var set = JSON.parse(s.value);
    
     $("#page_buttons .active").css("border-bottom", "");
     $("#page_buttons img").removeClass("active");                
     $("#page_buttons img").eq(n).addClass("active").css("border-bottom", "2px solid " + set.theme.color);
     
     if (h > 0) {
         $("#page_buttons img").eq(h).hide();
     }
}

/*
 * Function:    showTable
 *
 * Created on Jan 06, 2024
 * Updated on Feb 14, 2024
 *
 * Description: Show the table.
 *
 * In:  tblclass, items, s, page
 * Out: -
 *
 */
function showTable(tblclass, items, s, page) {

    var set = JSON.parse(s[5].value);
    
    // Set the table label.
    $("#label span").html(items[0]);
    $("#label span").css("border-left","3px solid " + set.theme.color);
    
    // Calculate table height.
    var y = $(".content_main").height() - 190;
    $("#table_container").css("height", y);
    
    // Remove the old and add the new class.
    $("#table_container table").removeClass().addClass(tblclass);
    
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
 * Updated on Feb 12, 2024
 *
 * Description: Get the data from the database and fill the table with that data.
 *
 * In:  s, page, l
 * Out: -
 *
 */
function fillTable(s, page, l) {
         
    var setting = JSON.parse(s[5].value);     
    var request = getAjaxRequest(page, ""); 
    request.done(function(result) {
        if (result.success) {         
            
            let i = 0;             
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
            for (let j = i; j < setting.rows; j++) {
               $("#table_container tbody").append('<tr><td colspan="' + l + '">&nbsp;</td></tr>');
            }
            
            // Hide or show the hidden rows.            
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
 * Function:    checkEditDelete
 *
 * Created on Feb 03, 2024
 * Updated on Feb 03, 2024
 *
 * Description: Check if the edit or delete button is pressed in de popup choice window.
 *
 * In:  btn, msg
 * Out: check
 * 
 */
function checkEditDelete(btn, msg) {
    
    var check = false;
    
    if (btn === "del") {
        
        $("#popup_content .btn").attr({
            src: "img/edit.png",
            alt: "edit"
        });
        
        $("#table_container tbody .marked").toggleClass("marked delete");
        $(".msg").html(msg);
        
        check = true;
    }  
    else if (btn === "edit") {
        
        $("#popup_content .btn").attr({
            src: "img/del.png",
            alt: "del"
        });
        
        $("#table_container tbody .delete").toggleClass("delete marked");
        $(".msg").html("&nbsp;");         
              
        check = true;
    }
      
    return check;
}

/*
 * Function:    getRowIdAndAction
 *
 * Created on Feb 04, 2024
 * Updated on Feb 04, 2024
 *
 * Description: Get the row id from the table and determine the table action.
 *
 * In:  -
 * Out: action
 * 
 */
function getRowIdAndAction() {
    
    var id, action = "add";
    
    if ($("#table_container tbody .marked").length) {  
        id = $("#table_container tbody .marked").closest('tr').find('td:first').text();
        action = "edit";
    }
    
    if ($("#table_container tbody .delete").length) {
        id = $("#table_container tbody .delete").closest('tr').find('td:first').text();
        action = "delete";
    } 
    
    return [id, action];
}

/*
 * Function:    showDeleteRow
 *
 * Created on Feb 04, 2024
 * Updated on Feb 04, 2024
 *
 * Description: Show the result of a row deletion.
 *
 * In:  -
 * Out: -
 *
 */
function showDeleteRow() { 
    
    $("#table_container tbody .delete").fadeOut("slow");
}

/*
 * Function:    removeAddRowMarker
 *
 * Created on Feb 05, 2024
 * Updated on Feb 05, 2024
 *
 * Description: Remove add marker if a new row(s) was added.
 *
 * In:  -
 * Out: -
 *
 */
function removeAddRowMarker() {
    
    var mark = "";
    
    if ($("#table_container tbody .add").length) {
        mark = $("#table_container tbody .add").toggleClass("add unmark");  
        if ($("#table_container tbody .unmark").length) {
            setTimeout(function() {
                mark.removeClass("unmark");
            }, 1000);
        }  
    }
}

/*
 * Function:   getPopupEnterKey
 *
 * Created on Feb 06, 2024
 * Updated on Feb 06, 2024
 *
 * Description: When the <enter> key is pressed get the right button and click it.
 *
 * In:  e
 * Out: -
 *
 */
function getPopupEnterKey(e) {
    
    if(e.which === 13){     
            
        e.preventDefault();  
            
        let btn = $("#popup_content table .btn").attr('alt');            
        if (btn === "add") {
            $("#popup_content .btn").click();
        }
        else {     
            $("#popup_content .ok").click();
        }
    }      
}