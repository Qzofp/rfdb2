/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 02, 2023
 * Updated on Oct 23, 2023
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
 * Updated on Oct 22, 2023
 *
 * Description: The sheet.html main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSheet() {
    
    // Show current year in header
    $("header h1 span").html(cDate.getFullYear());
   
    // YearPicker Test
    $(".yearpicker").yearpicker({
	year: cDate.getFullYear(),
	startYear: 1998,
        endYear: cDate.getFullYear(),
            onHide:function(value)
            {
                $("header h1 span").html(value);
			
		let i = $(".slidemenu input[name='slideItem']:checked").val();
                                
                fillSlideMenu(cMonths, value, i);
                
                $("#tst_text").html("<h1>" + cMonths[i] + " " + value +"</h1>");
            }
    });
  

    // Fill the slide menu.
    fillSlideMenu(cMonths, cDate.getFullYear(), cDate.getMonth());
    
    // TEST
    $("#tst_text").html("<h1>" + cMonths[cDate.getMonth()] + " " + cDate.getFullYear() + "</h1>");
	
    // TEST: Slide menu item clicked
    $(".slidemenu input[name='slideItem']").change(function() {
        
        let i = $(".slidemenu input[name='slideItem']:checked").val();
        let year = $("header h1 span").html();
        
        // TEST
        $("#tst_text").html("<h1>" + cMonths[i] + " " + year + "</h1>");
        
        //console.log("Test click:" + i);
    });    
    
    
    //getConstants();
    
    // Debug
    //console.log("Test: " + cDate.getFullYear());
}





/*
 * Function:    fillSlideMenu
 *
 * Created on Oct 21, 2023
 * Updated on Oct 21, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  items, year, active
 * Out: -
 *
 */
function fillSlideMenu(items, year, active) {

    var hide = active;
    if (year >= cDate.getFullYear()) {
	hide = cDate.getMonth();
        
        if (active > hide) {
            active = hide;
        }    
    }   
    
    for (let i = 0; i < 12; i++) {
        
        if (active === i) {
            $("#slide-item-" + i).prop('checked', true);
        }
        $("#slide-item-" + i).next().find("span").html(items[i]);
        
        if (i > hide && year >= cDate.getFullYear()) {
            $("#slide-item-" + i).next().hide();
        }
        else {
            $("#slide-item-" + i).next().show();
        }
    }
}