/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Apr 07, 2024
 *
 * Description: Common functions.
 * Dependenties: Javascript common functions.
 *
 * Links: https://github.com/t1m0n/air-datepicker?tab=readme-ov-file
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
 * Updated on Nar 15, 2024
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
    
    // Windows scroll bar FF fix.
    if (navigator.appVersion.indexOf("Win") !== -1 && navigator.userAgent.indexOf("Firefox") !== -1) {
        $("#table_container:-moz-read-only").css("scrollbar-width", "thin");
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
 * Updated on Feb 28, 2024
 *
 * Description: Show the table.
 *
 * In:  tblclass, items, s, n, page, send
 * Out: -
 *
 */
function showTable(tblclass, items, s, n, page, send) {

    var set = JSON.parse(s[n].value);
    
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
    fillTable(s, page, items.length, send);
    
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
 * Updated on Feb 28, 2024
 *
 * Description: Get the data from the database and fill the table with that data.
 *
 * In:  s, page, l
 * Out: -
 *
 */
function fillTable(s, page, l, send) {
         
    var setting = JSON.parse(s[5].value);     
    var request = getAjaxRequest(page, send);
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
 * Function:    validateInput
 *
 * Created on Mar 18, 2024
 * Updated on Mar 22, 2024
 *
 * Description: Validate the input, check if it is not empty. Skip the last item if it true.
 *
 * In:  msg, items, input, last
 * Out: check
 *
 */
function validateInput(msg, items, input, last) {
    
    var check = true;    
    $("#popup_content .msg").html("&nbsp;"); 
    input.forEach((value, i) => {
          
        if (!value && check) {        
            if (input.length - 1 !== i || !last) {
                $("#popup_content .msg").html(items[i+1] + " " + msg[5]);    
                check = false;
            }
        }        
    });   
    
    return check;    
}

/*
 * Function:    getRowIdAndAction
 *
 * Created on Feb 04, 2024
 * Updated on Mar 20, 2024
 *
 * Description: Get the row id from the table and determine the table action.
 *
 * In:  -
 * Out: id, action
 * 
 */
function getRowIdAndAction() {
    
    var id = 0; 
    var action = "add";
    
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
 * Function:    showModifyMessage
 *
 * Created on Mar 24, 2024
 * Updated on Mar 24, 2024
 *
 * Description: Show a message if modifing (add, edit or delete) a row cannot be done (i.e. name exists).
 *
 * In:  c, name, action
 * Out: -
 *
 */
function showModifyMessage(c, name, action) {
    
    if (action !== "delete") {
        $(".msg").html(name + " " + c.messages[1]);
    }
    else {
        $(".msg").html(name + " " + c.messages[3]);
    }
}

/*
 * Function:    showAddRow
 *
 * Created on Mar 22, 2024
 * Updated on Mar 22, 2024
 *
 * Description: Show the result of adding a row .
 *
 * In:  data
 * Out: -
 *
 */
function showAddRow(data) {
    
    var row = "<tr>";  
    $.each(data, function(key, value){         
        // Skip exists and success values.
        if (key !== "exists" && key !== "success") {
            row += "<td>" + value + "</td>";
        }      
    });
 
    $("#table_container").scrollTop(0); 
    $("#table_container tbody").prepend(row);
    $("#table_container tbody").children("tr:first").addClass("add");
}

/*
 * Function:    showEditRow
 *
 * Created on Mar 23, 2024
 * Updated on Apr 07, 2024
 *
 * Description: Show the result of editing a row.
 *
 * In:  data
 * Out: -
 *
 */
function showEditRow(data) {
    
    if (data.hide === "true") {
        $("#table_container tbody .marked").addClass("hide");
    }
    else {
        $("#table_container tbody .marked").removeClass("hide");
    }    
    
    var i = 0;
    $.each(data, function(key, value){         
        // Skip exists, success, id and the hide values.
        if (key !== "exists" && key !== "success" && key !== "hide") {
            $("#table_container tbody .marked td").eq(i++).html(value);
        }      
    });
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
 * Updated on Mar 22, 2024
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
            $("#popup_content .btn:first").click();
        }
        else {     
            $("#popup_content .ok").click();
        }
    }      
}

/*
 * Function:   initAirDatePicker
 *
 * Created on Mar 06, 2024
 * Updated on Mar 16, 2024
 *
 * Description: Initialize the Air datepicker.
 *
 * In:  c
 * Out: adp
 *
 */
function initAirDatePicker(c) {

    var local = {
        days: [c.days[0],c.days[1],c.days[2],c.days[3],c.days[4],c.days[5],c.days[6]],
        daysShort: [c.days[0].slice(0,2),c.days[1].slice(0,2),c.days[2].slice(0,2),c.days[3].slice(0,2),c.days[4].slice(0,2),c.days[5].slice(0,2),c.days[6].slice(0,2)],
        daysMin: [c.days[0].slice(0,2),c.days[1].slice(0,2),c.days[2].slice(0,2),c.days[3].slice(0,2),c.days[4].slice(0,2),c.days[5].slice(0,2),c.days[6].slice(0,2)],
        months: [c.months[0],c.months[1],c.months[2],c.months[3],c.months[4], c.months[5],c.months[6],c.months[7],c.months[8],c.months[9],c.months[10],c.months[11]],
        monthsShort: [c.smonths[0].slice(0,3),c.smonths[1].slice(0,3),c.smonths[2].slice(0,3),c.smonths[3].slice(0,3),c.smonths[4].slice(0,3),c.smonths[5].slice(0,3),c.smonths[6].slice(0,3),c.smonths[7].slice(0,3),c.smonths[8].slice(0,3),c.smonths[9].slice(0,3),c.smonths[10].slice(0,3),c.smonths[11].slice(0,3)],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'dd-MM-yyyy',
        timeFormat: 'HH:mm',
        firstDay: 1
    };

    var adp = new AirDatepicker('#date', {
        locale: local,
        autoClose: true,
        keyboardNav: false,
        disableNavWhenOutOfRange: true,
        minView: 'days'
    });   
    
    return adp;
}

/*
 * Function:   serAirDatePicker
 *
 * Created on Mar 13, 2024
 * Updated on Mar 18, 2024
 *
 * Description: Sets the Air datepicker.
 *
 * In:  c
 * Out: adp
 *
 */
function setAirDatePicker(adp, date) {
    
    if (date) {
        let p = date.split("-");
        adp.selectDate(p[2] + "-" + p[1] + "-" + p[0]); 
        //adp.setViewDate(p[1] + "-" + p[0] + "-" + p[2]);
    }
    else {       
        adp.setViewDate(cDate); 
        adp.clear();
    }    
}

/*
 * Function:   addSelectMenu
 *
 * Created on Mar 11, 2024
 * Updated on Mar 30, 2024
 *
 * Description: Add the select menu.
 *
 * In:  c, page, send id, name, value, item
 * Out: -
 *
 */
function addSelectMenu(c, page, send, id, name, value, item) {

    var empty, options, plh;
    var request = getAjaxRequest(page, send);      
    request.done(function(result) {
        
        $("#" + id + " option").remove();
        
        empty = true;
        if (result.success) {         
            let sel = "";
            $.each(result.data, function (n, field) {  
                              
                if (field.id === Number(value)) {
                    sel = " selected";
                }
                else {
                    sel = "";
                }

                $.each(field, function(key, val){                    
                    if (key === item) {
                        $("#" + id).append('<option value="'+ field.id + '"' + sel + '>'+ val + '</option>'); 
                    }    
                }); 
                empty = false;
            });
          
            // Remove nice-select menu if it exists.
            if ($("#popup_content .nice-select").length) {
                $("#popup_content .nice-select").remove();
            }    
    
            // Set the nice-select menu.
            plh = '<span class="placeholder">' + name + '</span>';
            options = { searchable: !empty, searchtext: c.misc[0], placeholder: plh };
            var db = NiceSelect.bind(document.getElementById(id), options);
            
            // Select placeholder fix. And shows the selected item if there is only one.
            if (!value && result.data.length > 1) {
                db.clear();
            }
                        
            if (empty) {
                $("#popup_content .msg").html(c.messages[4].replace("#", name) + " " + c.messages[5]);
                db.disable();
            }
            
            // Windows scroll bar FF fix.
            if (navigator.appVersion.indexOf("Win") !== -1 && navigator.userAgent.indexOf("Firefox") !== -1) {
                $(".nice-select .list:-moz-read-only").css("scrollbar-width", "thin");
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