/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 02, 2023
 * Updated on Oct 28, 2023
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
 * Updated on Oct 27, 2023
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
                                
                fillSlideMenu(i, -1);
                
                $("#tst_text").html("<h1>" + cMonths[i] + " " + value +"</h1>");
            }
    });
  

    // Fill the slide menu.
    fillSlideMenu(cDate.getMonth(), -1);

    // Change slide menu scale (months, quarters, year).
    $("#sheet_buttons").on('click', 'img', function () {
	changeSlideMenuScale(this);
    });	
	
	
/*	
    // Setting popup.
    $("#sheet_buttons").on('click', function () {
        $(".popup_content").show();
    });
*/
    
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
 * Updated on Oct 28, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  active, quarter
 * Out: -
 *
 */
function fillSlideMenu(active, quarter) {
		
    var max, hide, check = false;
    var year = $("header h1 span").html();
	
    // Get slide menu scale type (months, quarters, year).
    var scale = $("#sheet_buttons img:first-child").attr("alt");
	
    switch(scale) {
        case "months" :
       	max = 12;
	items = cMonths;
			
	if (year >= cDate.getFullYear()) {
            hide = cDate.getMonth();       
            if (active > hide) {
                active = hide;
            }    
            check = true;
	}			
	break;
			
        case "quarters" :
            max = 6;
            items = cQuarters;
					
            if (quarter > -1) {				
                active = quarter;
            }
			
            hide = 3;	
            if (year >= cDate.getFullYear()) {
                quarter = Math.ceil((cDate.getMonth() + 1) / 3) - 1;
                if (hide > quarter) {				
                    hide = quarter;					
                    if (active > hide) {				
                        active = hide;
                    }
                }
            }
				
            check = true;
            break;
			
	case "year" :
            max = 6;
            items = cYear;	
            hide = 0;
            check = true;
            break;
    }

    //console.log(quarter, hide, active);
  
    // Add labels.
    for (let i = 0; i < max; i++) {
        
        if (active === i) {
            $("#slide" + max + "-item-" + i).prop('checked', true);
        }
        $("#slide" + max + "-item-" + i).next().find("span").html(items[i]);
     
        if (i > hide && check) {
            $("#slide" + max + "-item-" + i).next().hide();
        }
        else {
            $("#slide" + max + "-item-" + i).next().show();
        }		
    }
}

/*
 * Function:    changeSlideMenuScale
 *
 * Created on Oct 25, 2023
 * Updated on Oct 27, 2023
 *
 * Description: Change the Slide menu scale (months, quarters, year).
 *
 * In:  that
 * Out: -
 *
 */
 function changeSlideMenuScale(that) {
	
    switch(that.alt) {
	case "months" : 
            // Change month to quarter.
            var month = $(".slidemenu input[name='slideItem']:checked").val();
            var quarter = Math.ceil((Number(month) + 1) / 3) - 1;
            
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();
            $(that).attr("src","img/quarters.png");
            $(that).attr("alt","quarters");
	
            // The quarter varible is only use when the scale changes from months to quarters.
            fillSlideMenu(3, quarter);
            break;
			
	case "quarters" :
            $(that).attr("src","img/year.png");
            $(that).attr("alt","year");		
			
            fillSlideMenu(0, -1);
            break;
			
	case "year" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            $(that).attr("src","img/months.png");
            $(that).attr("alt","months");
				
            fillSlideMenu(0, -1);
            break;
    }
}
