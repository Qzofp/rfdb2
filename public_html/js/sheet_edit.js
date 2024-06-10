/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Jun 04, 2023
 * Updated on Jun 10, 2024
 *
 * Description: Javascript edit (popup, modify data, etc.) functions for the sheet page.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    setSheetPopupChoice
 *
 * Created on Jun 10, 2024
 * Updated on Jun 10, 2024
 *
 * Description: Set the choice made in the sheet popup window.
 *
 * In:  e, c, s, i
 * Out: -
 *
 */
function setSheetPopupChoice(e, c, s, i) {
    
    e.preventDefault();
        
    var btn = e.originalEvent.submitter.alt;      
       
    // debug
    console.log(btn);
    if (btn === "ok") {
        changePopupMessageRow("This is a test message!");
    }
    // debug
    
    switch (btn) {
        case "ok"  :
        case "add" :
            break;
        
        case "srt" :
            
            console.log($(e.originalEvent.submitter).parent().next().find('select').attr('id'));
            
            break
        
        case "rnk" :
            
            console.log($(e.originalEvent.submitter).parent().next().find('select').attr('id'));
            
            break
    }
}

/*
 * Function:    showPopupRadioButtonLabel
 *
 * Created on Jun 06, 2024
 * Updated on Jun 09, 2024
 *
 * Description: Show the radio button label in the popup window.
 *
 * In:  value c, name
 * Out: label
 *
 */
function showPopupRadioButtonLabel(value, c, name) {
    
    var x, y, z, label;
    var n = $("#popup_content .popup_table_finance .sign").html().substr(0, 7);  
    var signs = [n + "&nbsp;", n + "-", n + "-"];
    $("#popup_content .popup_table_finance .sign").html(signs[Number(value)-1]);
   
    switch(name) {
        case "finance" :
            label = c.payment[Number(value) + 2];
            x = 2; y = 3; z = 10;
            break;
            
        case "stock" :
            break;
            
        case "savings" :
            break;
            
        case "crypto" :
            break;            
    } 
    
    changePopupMessageRow(label, x, y, z); 
    return label;
}

/*
 * Function:    changeMessageRow
 *
 * Created on Jun 09, 2024
 * Updated on Jun 09, 2024
 *
 * Description: change the sheet popup window message row.
 *
 * In: msg, x, y, z
 * Out: 
 *
 */
function changePopupMessageRow(msg, x=0, y=0, z=0) {
      
    $(".popup_table_finance tr:eq(1)").remove();  
    if (x) {
    
        $(".popup_table_finance tbody").append(
            '<tr>' +
                '<td colspan="' + x + '"></td>' +
                '<td class="label" colspan="' + y + '">' + msg + '</td>' +
                '<td colspan="' + z + '"></td>' +
            '</tr>');
    }
    else {
        $(".popup_table_finance tbody").append(
            '<tr>' +
                '<td class="msg" colspan="15">' + msg + '</td>' +
            '</tr>');           
    }
}

/*
 * Function:    setSheetPopupTable
 *
 * Created on Jun 05, 2024
 * Updated on Jun 07, 2024
 *
 * Description: Set (prepare) the sheet popup table, return the add or delete button and the cell values.
 *
 * In:  popclass, title, n
 * Out: cells
 *
 */
function setSheetPopupTable(popclass, title, page, n) {

    var set;
    var btn = "add"; 
    var cells = [];
      
    $("#popup_content").removeClass().addClass(popclass);                   
    
    set = JSON.parse(page.value);
    $("#popup_content h2").css("text-decoration-color", set.theme.color);       
    $("#popup_content h2").html(title); 

    // Remove add marker if a new row was added.
    removeAddRowMarker();
        
    // Show update popup and get the cell values.    
    if ($("#table_container tbody .marked").length) 
    {         
        $("#table_container tbody .marked").find("td").each(function(){
            cells.push($(this).html());            
        });        
        btn = "del";
    }
    else {  // Fill the cells with empty values.
        for (let i = 0; i < n; i++) {
            cells.push("");
        }
    }
    
    $("#popup_content .popup_table_finance .btn").attr({
                src: "img/" + btn + ".png",
                alt: btn
    });    
       
    return cells;
}

/*
 * Function:    showSheetEditPopup
 *
 * Created on Jun 04, 2024
 * Updated on Jun 07, 2024
 *
 * Description: Shows the popup when the page edit button is pressed.
 *
 * In:  adp, c, i, that
 * Out: -
 *
 */
function showSheetEditPopup(adp, c, i, that="") {

    var request = getAjaxRequest("get_settings", "");    
    request.done(function(result) {
        if (result.success) {         
                
            let rowid = $(that).closest('tr').find('td:first').text().split("_");    
            if (that && rowid[0] > 0) {
                $(that).addClass("marked");
            }    
    
            let s = result.settings; 
            switch(s[i].name) {
                case "finance" :
                    showSheetFinancePopup(adp, c, s, i);
                    break;
            
                case "stock" :
                    break;
            
                case "savings" :
                    break;
            
                case "crypto" :
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
 * Function:    showSheetFinancePopup
 *
 * Created on Jun 04, 2024
 * Updated on Jun 09, 2024
 *
 * Description:  Shows the popup content for the finances page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetFinancePopup(adp, c, s, i) {
    
    var cells, label;
    var set  = JSON.parse(s[5].value);
    
    // Get row input, is empty when row is empty or not selected.
    cells = setSheetPopupTable("popup_finances", c.payment[0], s[i], 9);
    
    // Test: hide 3rd radio button, sort and rank buttons.
    // $(".popup_table_finance td li:eq(2)").hide();
    // $(".popup_table_finance .srt").hide();
    
    // Hide other input fields, which are not necessary for the finances popup.
    $("#number").hide();
    $("#crypto").hide();
    
    // Add date.
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.payment[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }
    
    // Add Sort buttons.
    addSortButtons(JSON.parse(s[1].value)); 

    // Add radio buttons and label.
    $("#popup_content .popup_table_finance .sign").html(set.sign + "&nbsp;&nbsp;");    
    label = addAmountAndRadioButton(c.misc[2], c, s[i].name, cells[3], cells[4], cells[5]);    
    changePopupMessageRow(label, 2, 3, 10);    
      
    // Add Select Menus.
    removeSelectMenu(); 
    addSelectMenu(c, "get_accounts", "sort=account&hide=true&type=" + s[i].name, "payment", c.payment[2], cells[0].split("_")[1], "account");
    addSelectMenu(c, "get_groups", "hide=true&rank=false", "service", c.payment[6], cells[0].split("_")[2], "group"); 
    if (cells[6]) {
        addSelectMenu(c, "get_businesses", "rank=false&hide=true&gid=" + cells[0].split("_")[2], "account", c.payment[7], cells[0].split("_")[3], "business");
    }
    else {
        disableSelectMenu("account", c.payment[7]);
    }    
    
    // Add description.
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.payment[8]).val(cells[8]);  

    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    addSortButtons
 *
 * Created on Jun 10, 2024
 * Updated on Jun 10, 2024
 *
 * Description:  Add the sort buttons for the finances page.
 *
 * In:  set
 * Out: -
 *
 */
function addSortButtons(set) {
    
    // Group sort.
    if (set.sort.grp === "true") {
        $("#popup_content .srt").eq(0).attr({src:"img/sort.png", alt:"srt"});
    }
    else {
        $("#popup_content .srt").eq(0).attr({src:"img/rank.png", alt:"rnk"}); 
    }
    
    // Business sort.
    if (set.sort.bsn === "true") {
        $("#popup_content .srt").eq(1).attr({src:"img/sort.png", alt:"srt"});
    }
    else {
        $("#popup_content .srt").eq(1).attr({src:"img/rank.png", alt:"rnk"}); 
    }    
}

/*
 * Function:    addAmountAndRadioButton
 *
 * Created on Jun 07, 2024
 * Updated on Jun 10, 2024
 *
 * Description:  .
 *
 * In:  ph, c, name, x, y, z
 * Out: label
 *
 */
function addAmountAndRadioButton(ph, c, name, x, y, z="") {
      
    var value, label;    
    $("#popup_content input[type='radio']").prop("checked", false);
    $("#popup_content .label").html("&nbsp;");
    
    if (x) 
    {
        value = x.replace(/^.{1,2}/g, '');
        $("#popup_content input[type='radio'][value='1']").prop("checked", true);
        label = showPopupRadioButtonLabel(1, c, name);
    } 
    else if (y) 
    {
        value = y.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='2']").prop("checked", true);
        label = showPopupRadioButtonLabel(2, c, name);
    }
    else if (z) 
    {
        value = z.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='3']").prop("checked", true);
        label = showPopupRadioButtonLabel(3, c, name);
    }
    else {
        label = "&nbsp;";
    }
    
    $("#popup_content .popup_table_finance #amount").attr("placeholder", ph); 
    $("#popup_content .popup_table_finance #amount").val(value);
    
    return label;
}
