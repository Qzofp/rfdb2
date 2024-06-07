/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Jun 04, 2023
 * Updated on Jun 07, 2024
 *
 * Description: Javascript edit (popup, modify data, etc.) functions for the sheet page.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    showPopupRadioButtonLabel
 *
 * Created on Jun 06, 2024
 * Updated on Jun 07, 2024
 *
 * Description: Show the radio button label in the popup window.
 *
 * In:  value c, name
 * Out: 
 *
 */
function showPopupRadioButtonLabel(value, c, name) {
    
    var c1, c2, c3, label;
   
    switch(name) {
        case "finance" :
            label = c.payment[Number(value) + 2];
            c1 = 3; c2 = 3; c3 = 8;
            break;
            
        case "stock" :
            break;
            
        case "savings" :
            break;
            
        case "crypto" :
            break;            
    } 
    
    $(".popup_table_finance tr:eq(1)").remove();
    $(".popup_table_finance tbody").append(
        '<tr>' +
            '<td colspan="' + c1 + '"></td>' +
            '<td class="label" colspan="' + c2 + '">' + label + '</td>' +
            '<td colspan="' + c3 + '"></td>' +
        '</tr>');    
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
 * In:  adp, c, s, i, that
 * Out: -
 *
 */
function showSheetEditPopup(adp, c, s, i, that="") {

    var rowid = $(that).closest('tr').find('td:first').text().split("_");    
    if (that && rowid[0] > 0) {
       $(that).addClass("marked");
    }    
    
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

/*
 * Function:    showSheetFinancePopup
 *
 * Created on Jun 04, 2024
 * Updated on Jun 07, 2024
 *
 * Description:  Shows the popup content for the finances page.
 *
 * In:  adp, c, s, i
 * Out: -
 *
 */
function showSheetFinancePopup(adp, c, s, i) {
    
    var cells;
    
    cells = setSheetPopupTable("popup_finances", c.payment[0], s[i], 9);
    
    // Test: hide 3rd radio button, sort and rank buttons.
    // $(".popup_table_finance td li:eq(2)").hide();
    // $(".popup_table_finance .srt").hide();
    
    // Hide other input fields, which are not necessary for the finances popup.
    $("#number").hide();
    $("#crypto").hide();
    
    $("#popup_content .popup_table_finance #date").attr("placeholder", c.payment[1]).val(cells[1]);
    if (cells[1]) {
        setAirDatePicker(adp, cells[1]);
    }
    else {
        adp.clear();  
    }
    
    removeSelectMenu(); 
    addSelectMenu(c, "get_accounts", "sort=account&hide=true&type=" + s[i].name, "payment", c.payment[2], cells[0].split("_")[1], "account");
        
    setAmountAndRadioButton("€ Amount", c, s[i].name, cells[3], cells[4], cells[5]);
    
    addSelectMenu(c, "get_groups", "hide=true&rank=false", "service", c.payment[6], cells[0].split("_")[2], "group"); 
    if (cells[6]) {
        addSelectMenu(c, "get_businesses", "rank=false&gid=" + cells[0].split("_")[2], "account", c.payment[7], cells[0].split("_")[3], "business");
    }
    else {
        disableSelectMenu("account", c.payment[7]);
    }    
    
    $("#popup_content .popup_table_finance #description").attr("placeholder", c.payment[8]).val(cells[8]);    
    $("#popup_container").fadeIn("slow");    
}

/*
 * Function:    setAmountAndRadioButton
 *
 * Created on Jun 07, 2024
 * Updated on Jun 07, 2024
 *
 * Description:  .
 *
 * In:  ph, c, name, x, y, z
 * Out: -
 *
 */
function setAmountAndRadioButton(ph, c, name, x, y, z="") {
      
    var value;    
    $("#popup_content input[type='radio']").prop("checked", false);
    $("#popup_content .label").html("&nbsp;");
    
    if (x) 
    {
        value = x.replace(/^.{1,2}/g, '');
        $("#popup_content input[type='radio'][value='1']").prop("checked", true);
        showPopupRadioButtonLabel(1, c, name);
    } 
    else if (y) 
    {
        value = y.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='2']").prop("checked", true);
        showPopupRadioButtonLabel(2, c, name);
    }
    else if (z) 
    {
        value = z.replace(/^.{1,2}-/g, '');
        $("#popup_content input[type='radio'][value='3']").prop("checked", true);
        showPopupRadioButtonLabel(3, c, name);
    }
    
    $("#popup_content .popup_table_finance #amount").attr("placeholder", ph); 
    $("#popup_content .popup_table_finance #amount").val(value); 
}
