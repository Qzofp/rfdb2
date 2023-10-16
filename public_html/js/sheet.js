/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 02, 2023
 * Updated on Oct 16, 2023
 *
 * Description: .
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadSheet
 *
 * Created on Oct 02, 2023
 * Updated on Oct 16, 2023
 *
 * Description: The sheet.html main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSheet() {
    
    // Show current year in header
    $("header h2").html(cDate.getFullYear());
    
    createSlideMenu(cMonths, cDate.getFullYear(), cDate.getMonth());
    
    // Test
    $("#tst_text").html("<h1>" + cMonths[cDate.getMonth()] + "</h1>");
    
    // Slide menu item clicked
    $(".slidemenu input[name='slideItem']").change(function() {
        
        let i = $(".slidemenu input[name='slideItem']:checked").val();
        
        // Test
        $("#tst_text").html("<h1>" + cMonths[i] + "</h1>");
        
        //console.log("Test click:" + i);
    });    
    
    
    getConstants();
    
    // Debug
    //console.log("Test: " + cDate.getFullYear());
}


/*
 * Function:    createSlideMenu
 *
 * Created on Oct 13, 2023
 * Updated on Oct 14, 2023
 *
 * Description: Creates and shows the Slidemenu bar with the items.
 *
 * In:  items, year, active
 * Out: -
 *
 */
function createSlideMenu(items, year, active) {

    var max = items.length;
    if (year >= cDate.getFullYear()) {
	max = active + 1;
    }
	
    for (let i = 0; i < max; i++) {
	
	if (active === i) {
            $(".slidemenu .clear").before('<input type="radio" name="slideItem" value="' + i + '" id="slide-item-' + i +'" class="slide-toggle" checked/>');		
	}
	else {
            $(".slidemenu .clear").before('<input type="radio" name="slideItem" value="' + i + '" id="slide-item-' + i +'" class="slide-toggle"/>');
	}	
		
	$(".slidemenu .clear").before('<label class="max12" for="slide-item-' + i + '"><p></p><span>' + items[i] + '</span></label>');
    }	
	
    // max6 en max12 class aanpassen.	
	
}