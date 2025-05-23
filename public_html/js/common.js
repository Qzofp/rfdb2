/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.3
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on May 19, 2025
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
 * Updated on Oct 05, 2024
 *
 * Description: Fill the Slidemenu bar with the items for the index and settings pages.
 *
 * In:  items, s, skip (optional)
 * Out: -
 *
 */
function fillSlideMenu(items, s, skip=false) {
    
    var tmp;

    // Add labels.
    var j = 0;
    for (let i = 0; i < 6; i++) {
        tmp = JSON.parse(s[i].value);
        if (i === 0) {
            $("#slide6-item-" + i).prop('checked', true);
        }
            
        if (i < items.length) {         
            if (tmp.page === "true" || skip) {
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
 * Updated on Aug 16, 2024
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
    $("footer h3").html(c.footer + " " + cVersion);
}

/*
 * Function:    showPageTheme
 *
 * Created on Oct 29, 2023
 * Updated on Oct 16, 2024
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
    if (navigator.appVersion.indexOf("Win") !== -1 && navigator.userAgent.indexOf("Firefox") !== -1) 
    {
        $("#table_container:-moz-read-only").css("scrollbar-width", "thin");
        $(".popup_scroll_table:-moz-read-only").css("scrollbar-width", "thin");
    }
}

/*
 * Function:    closePopupWindow
 *
 * Created on Nov 19, 2023
 * Updated on Jun 04, 2024
 *
 * Description: Close the Popup window.
 *
 * In:  -
 * Out: -
 *
 */
function closePopupWindow() {
       
    var mark = "";
    
    $("#popup_content input[type=text]").prop('disabled', false);
    $("#popup_content input[type=password]").prop('disabled', false);
    $("#popup_content input[type=checkbox]").prop('disabled', false);    
        
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
 * Updated on Apr 19, 2024
 *
 * Description: Show the database error
 *
 * In:  result
 * Out: -
 *
 */
function showDatabaseError(result) {
    
    if (result.redirect) 
    {
        // The user has been logged out.        
        document.location.href = "/rfdb2_dev";
        //document.location.href = "/rfdb2";
    }
    else 
    { 
        $("#error h2").html("Database error"); 
        $("#error p").html(result.message);
        $("#popup_error").fadeIn("slow");
    }
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
 * Updated on Jun 04, 2023
 *
 * Description: Close the error message.
 *
 * In:  -
 * Out: -
 *
 */
function closeErrorMessage() {
    
    // Close popup error.
    $("#popup_error .close").on("click", function () {        
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
 * Updated on Apr 12, 2024
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
            showDatabaseError(result);                    
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
 * Updated on Feb 14, 2025
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
    //var y = $(".content_main").height() - 190;
    //$("#table_container").css("height", y);
    
    // Set the table height.
    $("#table_container").css("height", cSheetMax);  
    
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
 * Updated on Aug 01, 2024
 *
 * Description: Get the data from the database and fill the table with that data.
 *
 * In:  s, page, l, send
 * Out: -
 *
 */
function fillTable(s, page, l, send) {
         
    // Show loading spinner.
    $("#loading").show(); 
    
    var setting = JSON.parse(s[5].value);
    var request = getAjaxRequest(page, send);
    request.done(function(result) {

        // Hide loading spinner.
        $("#loading").hide();
        
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
            for (let j = i; j <= setting.rows; j++) {
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
            showDatabaseError(result);         
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
    
    closeErrorMessage();      
}

/*
 * Function:    checkShowHide
 *
 * Created on Feb 23, 2024
 * Updated on Feb 23, 2024
 *
 * Description: Check if the show or hide button is pressed in de popup choice window.
 *
 * In:  btn
 * Out: check
 * 
 */
function checkShowHide(btn) {  
    
    var check = false;
      
    if (btn === "show" || btn === "hide") {
        
        if (btn === "show") {
            
            $("#popup_content .shw").attr({
                src: "img/hide.png",
                alt: "hide"
            });           
        }
        else {
            
            $("#popup_content .shw").attr({
                src: "img/show.png",
                alt: "show"
            });                            
        }
        
        check = true;
    }
    
    return check;
}

/*
 * Function:    checkEditDelete
 *
 * Created on Feb 03, 2024
 * Updated on Jun 01, 2024
 *
 * Description: Check if the edit or delete button is pressed in the popup choice window.
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
        
        $("#popup_content input[type=text]").prop('disabled', true);
        $("#popup_content input[type=password]").prop('disabled', true);
        $("#popup_content input[type=checkbox]").prop('disabled', true);
        $("#popup_content .nice-select").addClass("disabled");
        
        check = true;
    }  
    else if (btn === "edit") {
        
        $("#popup_content .btn").attr({
            src: "img/del.png",
            alt: "del"
        });
        
        $("#table_container tbody .delete").toggleClass("delete marked");
        $(".msg").html("&nbsp;");     
        
        $("#popup_content input[type=text]").prop('disabled', false);
        $("#popup_content input[type=password]").prop('disabled', false);
        $("#popup_content input[type=checkbox]").prop('disabled', false);
        $("#popup_content .nice-select").removeClass("disabled");
              
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
 * Function:    validateDate
 *
 * Created on Sep 18, 2024
 * Updated on Apr 08, 2025
 *
 * Description: Validate the date, check if it is not empty and the date is valid.
 *
 * In:  c, s, name, date
 * Out: check
 *
 */
function validateDate(c, s, name, date) {
   
    var check = true;   
    if (!date) 
    {
        $("#popup_content .msg").html(name + " " + c.messages[5]);
        check = false;
    }
    else
    {     
        let regex, set = JSON.parse(s[5].value);
        switch (set.sign) {
            case "$" :
            case "£" :
                regex = /^(0[1-9]|1[0,1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2}$/;         
                break;
            
            case "€"  :
                regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0,1,2])-(19|20)\d{2}$/;
                break;
        }
        
        if (!regex.test(date) ? true : false) 
        {
            $("#popup_content .msg").html(name + " " + c.messages[0]);
            check = false;
        }         
    }
    return check;
}

/*
 * Function:    validateCurrency
 *
 * Created on Sep 21, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Validate the currency, check if it is not empty and if it has a correct value.
 *
 * In:  c, s, name, value
 * Out: check
 *
 */
function validateCurrency(c, s, name, value) {
   
    var check = true;
    if (!value) 
    {
        $("#popup_content .msg").html(name + " " + c.messages[5]);
        check = false;
    }
    else 
    {        
        let regex, set = JSON.parse(s[5].value);
        switch (set.sign) {
            case "$" :
            case "£" :
                regex = /^[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/;                
                break;
            
            case "€"  :
                regex = /^[0-9]{1,3}(?:\.?[0-9]{3})*(?:,[0-9]{1,2})?$/;           
                break;
        }
        
        if (!regex.test(value) ? true : false) 
        {
            $("#popup_content .msg").html(name + " " + c.messages[0]); 
            check = false;
        }     
    }  
    return check;       
}

/*
 * Function:    validateCrypto
 *
 * Created on Nov 04, 2024
 * Updated on Nov 04, 2024
 *
 * Description: Validate the crypto value, check if it is not empty and if it has a correct value.
 *
 * In:  c, s, name, value
 * Out: check
 *
 */
function validateCrypto(c, s, name, value) {
   
    var check = true;
    if (!value) 
    {
        $("#popup_content .msg").html(name + " " + c.messages[5]);
        check = false;
    }
    else 
    {        
        let regex, set = JSON.parse(s[5].value);
        switch (set.sign) {
            case "$" :
            case "£" :
                regex = /^-?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,8})?$/;                
                break;
            
            case "€"  :
                regex = /^-?[0-9]{1,3}(?:\.?[0-9]{3})*(?:,[0-9]{1,8})?$/;           
                break;
        }
        
        if (!regex.test(value) ? true : false) 
        {
            $("#popup_content .msg").html(name + " " + c.messages[0]); 
            check = false;
        }     
    }  
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
 * Updated on Aug 09, 2024
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
 * In:  c, s
 * Out: adp
 *
 */
function initAirDatePicker(c, s) {

    var df, set = JSON.parse(s[5].value);
    switch (set.sign) {
        case "$" :
        case "£" :  
            df = 'MM/dd/yyyy';
            break;
            
        case "€"  :
            df = 'dd-MM-yyyy';    
            break;
    }    
    
    var local = {
        days: [c.days[0],c.days[1],c.days[2],c.days[3],c.days[4],c.days[5],c.days[6]],
        daysShort: [c.days[0].slice(0,2),c.days[1].slice(0,2),c.days[2].slice(0,2),c.days[3].slice(0,2),c.days[4].slice(0,2),c.days[5].slice(0,2),c.days[6].slice(0,2)],
        daysMin: [c.days[0].slice(0,2),c.days[1].slice(0,2),c.days[2].slice(0,2),c.days[3].slice(0,2),c.days[4].slice(0,2),c.days[5].slice(0,2),c.days[6].slice(0,2)],
        months: [c.months[0],c.months[1],c.months[2],c.months[3],c.months[4], c.months[5],c.months[6],c.months[7],c.months[8],c.months[9],c.months[10],c.months[11]],
        monthsShort: [c.smonths[0].slice(0,3),c.smonths[1].slice(0,3),c.smonths[2].slice(0,3),c.smonths[3].slice(0,3),c.smonths[4].slice(0,3),c.smonths[5].slice(0,3),c.smonths[6].slice(0,3),c.smonths[7].slice(0,3),c.smonths[8].slice(0,3),c.smonths[9].slice(0,3),c.smonths[10].slice(0,3),c.smonths[11].slice(0,3)],
        today: 'Today',
        clear: 'Clear',
        dateFormat: df,
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
 * Updated on Nov 16, 2024
 *
 * Description: Sets the Air datepicker.
 *
 * In:  c
 * Out: adp
 *
 */
function setAirDatePicker(adp, date) {

    if (date) 
    {
        if (date.includes("-")) 
        {   
            let p = date.split("-");
            adp.selectDate(p[2] + "-" + p[1] + "-" + p[0]);
        }
        else
        {
            let p = date.split("/");
            adp.selectDate(p[0] + "/" + p[1] + "/" + p[2]);      
        }
    }
    else 
    {       
        adp.setViewDate(cDate); 
        adp.clear();
    }    
}

/*
 * Function:   addSelectMenu
 *
 * Created on Mar 11, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Add the select menu.
 *
 * In:  c, page, send, id, menu, value, name, n       
 * Out: -
 *
 */
function addSelectMenu(c, page, send, id, menu, value, name, n) {

    var options, plh;
    var request = getAjaxRequest(page, send);      
    request.done(function(result) {
        
        $("#" + id + " option").remove();

        if (result.success) {         
            let s, match = false;            
            $.each(result.data, function (i, field) {  
                
                if (field.id === Number(value)) {
                    s = " selected";
                    match = true;
                }
                else {
                    s = "";
                }

                $.each(field, function(key, item){
                    // Get the item from the 2nd column of the query.
                    if (key === Object.keys(field)[1]) {
                        $("#" + id).append('<option value="'+ field.id + '"' + s + '>'+ item + '</option>'); 
                    }    
                });
            });
            
            // Add select menu item if the name doesn't exists (hidden), only for the edit row mode.
            if (!match && $("#table_container tbody .marked").length && name) 
            {                
                $("#" + id).append('<option value="'+ value + '" selected>' + name + '</option>');             
                if (!send.includes('rank=true')) {
                    sortSelectOptions("#" + id, false);
                }
            }
            
            // Set the nice-select menu.
            plh = '<span class="placeholder">' + menu + '</span>';
            options = { searchable: true, searchtext: c.misc[0], placeholder: plh };
            var db = NiceSelect.bind(document.getElementById(id), options);
            
            // Select placeholder fix and shows the selected item if there is only one.
            if (!value && result.data.length > n) {
                db.clear();
            }
             
            // The select menu is empty.
            $("#popup_content .msg").html("&nbsp;");
            if ($("#" + id + " > option").length <= 0) 
            {
                $("#popup_content .msg").html(c.messages[4].replace("#", menu) + " " + c.messages[5]);
                db.disable();
            }
            
            // Windows scroll bar FF fix.
            if (navigator.appVersion.indexOf("Win") !== -1 && navigator.userAgent.indexOf("Firefox") !== -1) {
                $(".nice-select .list:-moz-read-only").css("scrollbar-width", "thin");
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
 * Function:   removeSelectMenu
 *
 * Created on May 26, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Remove the select menu.
 *
 * In:  id
 * Out: -
 *
 */
function removeSelectMenu(id="") {
    
    // Check if nice-select menu exists.
    if ($("#popup_content .nice-select").length) 
    {        
        if (id) { // Remove nice-select by the select id.
            if ($("#" + id).next().length) {
                $("#" + id).next().remove();
            }
        }
        else { // Remove all nice-select menus.
            $("#popup_content .nice-select").remove();
        }
    }
}

/*
 * Function:   disableSelectMenu
 *
 * Created on May 26, 2024
 * Updated on Jun 08, 2024
 *
 * Description: Disable the select menu.
 *
 * In:  id, nmae
 * Out: -
 *
 */
function disableSelectMenu(id, name) {
    
    var plh, options, db;
    
    // Set the nice-select menu.
    plh = '<span class="placeholder">' + name + '</span>';
    options = { searchable: false , placeholder: plh };  
    if ($("#" + id).length) 
    {
        db = NiceSelect.bind(document.getElementById(id), options);    
        db.clear();
        db.disable();
    } 
}

/*
 * Function:   setStartYear
 *
 * Created on Apr 15, 2024
 * Updated on Apr 15, 2024
 *
 * Description: Set the start year for .
 *
 * In:  page, year
 * Out: year
 *
 */
function setStartYear(page, year) {

    var request = getAjaxRequest("change_startyear", "page=" + page + "&year=" + year);    
    request.done(function(result) {
        if (!result.success) {
            showDatabaseError(result); 
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage();    

    return year;
}

/*
 * Function:    getMultipleItems
 *
 * Created on Sep 16, 2024
 * Updated on Sep 16, 2024
 *
 * Description: Get multiple input items.
 *
 * In:  name
 * Out: items
 *
 */
function getMultipleItems(name) {

    var items = $(name).map(function(idx, elem) {
        return $(elem).val();
    }).get();     
    
    return items;
}

/*
 * Function:   startCounter
 *
 * Created on May 14, 2024
 * Updated on Sep 07, 2024
 *
 * Description: Start the counter, i.e. $(".count").startCounter(200, 1500, "€ ");
 *
 * In:  start, duration, sign
 * Out: 
 *
 */
$.fn.startCounter = function(start, duration, sign) {
    
    var format, $el;
    
    // Determine the currency format.
    switch (sign) 
    {
        case "$" :
        case "£" :
            format = "en-US";
            break;
            
        case "€"  :
            format = "de-DE";     
            break;
    } 
            
    $el = this;  
    $el.prop('Counter',start).animate({Counter: $el.data('value')}, 
    {
        duration: duration,
        easing: 'swing',
        step: function () {
            $(this).text(sign + " " + this.Counter.toLocaleString(format, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        },
        complete: function () {                      
            $(this).text(sign + " " +  this.Counter.toLocaleString(format, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }    
    });
};

/*
 * Function:   startRatio
 *
 * Created on May 14, 2024
 * Updated on Sep 06, 2024
 *
 * Description: Start the counter, i.e. $(".count").startRatio(200, 1500, "€ "));
 *
 * In:  start, duration, sign
 * Out: 
 *
 */
$.fn.startRatio = function(start, duration, sign) {
                 
    var format, $el;
    
    // Determine the currency format.
    switch (sign) 
    {
        case "$" :
        case "£" :
            format = "en-US";
            break;
            
        case "€"  :
            format = "de-DE";     
            break;
    } 
            
    $el = this;  
    $el.prop('Counter',start).animate({Counter: $el.data('value')}, 
    {
        duration: duration,
        easing: 'swing',
        step: function () {
            $(this).text(this.Counter.toLocaleString(format, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%");
        },
        complete: function () {                      
            $(this).text(this.Counter.toLocaleString(format, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%");
        }    
    });
};

/*
 * Function:   currencyToNumber
 *
 * Created on Jul 09, 2024
 * Updated on Jul 12, 2024
 *
 * Description: Convert the currency to a number.
 *
 * In:  
 * Out: 
 *
 */
$.fn.currencyToNumber = function() {
  
    var $el = this.html().replace(/^.{1,2}|\.|,/g, '');
    
    if(isNaN($el)) {
        $el = 0;
    }
        
    return Number($el)/100;
};

/*
 * Function:   sortSelectOptions
 *
 * Created on Aug 05, 2024
 * Updated on Aug 05, 2024
 *
 * Description: Sorts the select menu options.
 *
 * In:  selector, skip_first
 * Out: 
 * 
 * Links: https://stackoverflow.com/questions/12073270/sorting-options-elements-alphabetically-using-jquery
 *
 */
function sortSelectOptions(selector, skip_first) {
    var options = (skip_first) ? $(selector + ' option:not(:first)') : $(selector + ' option');
    var arr = options.map(function(_, o) { return { t: $(o).text(), v: o.value, s: $(o).prop('selected') }; }).get();
    arr.sort(function(o1, o2) {
      var t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();
      return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    }); 
    options.each(function(i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
        if (arr[i].s) {
            $(o).attr('selected', 'selected').prop('selected', true);
        } else {
            $(o).removeAttr('selected');
            $(o).prop('selected', false);
        }
    }); 
}

/*
 * Function:   decodeHTML
 *
 * Created on Aug 07, 2024
 * Updated on Aug 07, 2024
 *
 * Description: Decode HTML code characters, i.e. decode &amp; to &.
 *
 * In:  encodedString
 * Out: 
 * 
 * Links: https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
 *
 */
function decodeHTML(encodedString) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

/*
 * Function:   getLocale
 *
 * Created on Dec 26, 2024
 * Updated on Dec 27, 2024
 *
 * Description: Get the locale format. Which can be used in the chart.js functions.
 *
 * In:  s
 * Out: locale
 *
 */
function getLocale(s) {
    
    var set, locale;
    
    set = JSON.parse(s[5].value);
    switch (set.sign) {
        case "$" :
        case "£" :
            locale = "en-US";        
            break;
            
        case "€"  :
            locale = "nl-NL";        
            break;
    }       
   
    return locale;
}

/*
 * Function:   getCurrency
 *
 * Created on Jan 12, 2025
 * Updated on Jan 12, 2025
 *
 * Description: Get the currency format. Which can be used in the chart.js functions.
 *
 * In:  s
 * Out: locale
 *
 */
function getCurrency(s) {
    
    var set, currency;
    
    set = JSON.parse(s[5].value);
    switch (set.sign) {
        case "$" :
            currency = "USD"; 
            break;
        case "£" :
            currency = "GBP";        
            break;
            
        case "€"  :
            currency = "EUR";        
            break;
    }       
   
    return currency;
}

/*
 * Function:   getLangauge
 *
 * Created on Jan 26, 2025
 * Updated on Jan 26, 2025
 *
 * Description: Get the language format. Which can be used in the chart.js functions.
 *
 * In:  s
 * Out: locale
 *
 */
function getLanguage(s) {
    
    var set, locale;
    
    set = JSON.parse(s[7].value);
    switch (set.code) {
        case "EN" :
            locale = "en-US";        
            break;
            
        case "NL"  :
            locale = "nl-NL";        
            break;
    }       
   
    return locale;
}

/*
 * Function:   fn.textWidth
 *
 * Created on Feb 21, 2025
 * Updated on Feb 21, 2025
 *
 * Description: Calculating the real text width.
 *
 * In:  -
 * Out: -
 * 
 * Links: https://stackoverflow.com/questions/1582534/calculating-text-width
 *
 */
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

/*
 * Function:   showTooltipText
 *
 * Created on Feb 20, 2025
 * Updated on Feb 22, 2025
 *
 * Description: Show the tooltip text if the "text-overflow:ellipsis" css is detected.
 *
 * In:  that
 * Out: -
 *
 */
function showTooltipText(that) {
    
    if (that[0].scrollWidth >  that.innerWidth()) 
    {
        that.addClass("tooltip");
        if (that.find(".tooltiptext").length === 0)
        {     
           that.append('<span class="tooltiptext">' + that.text() + '</span>');
           
           // Calculate the real text width of the table cell.
           let textwidth = (that.textWidth() / 2 * -1) - 5;      
           that.find(".tooltiptext").css({"margin-left":textwidth});         
        }
    }
    else 
    {
        that.removeClass("tooltip");
        that.find(".tooltiptext").remove();       
    }
}

/*
 * Function:    showTableTooltips
 *
 * Created on Feb 22, 2025
 * Updated on May 19, 2025
 *
 * Description: Show the tooltips in the table.
 *
 * In:  -
 * Out: -
 *
 */
function showTableTooltips() {
    
    $('#table_container tbody').on("mouseover", "td", function() {     
        
        if ($(this).index() > 0) {
            showTooltipText($(this));
        }
    });       
}