/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 28, 2023
 * Updated on Oct 30, 2023
 *
 * Description: .
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadSheet
 *
 * Created on Oct 28, 2023
 * Updated on Oct 30, 2023
 *
 * Description: The sheet.html main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSheet() {

    // Get href anchor from URL.
    var anchor = window.location.hash.substring(1);
           
    // Show title and current year.
    var i = showPageTitle(anchor);
    
    addYearPicker();
    
    // Fill the slide menu.
    fillSheetSlideMenu(cDate.getMonth(), -1);
    
    // Change slide menu scale (months, quarters, year).
    $("#sheet_buttons").on('click', 'img', function () {
	changeSlideMenuScale(this);
    });	
    

    // Temp. solution. Will be fixed when bar scale is red from the database.
    $("#slide6").hide();
    $(".slider .bar").css("width", "8.33%");
    $(".slidemenu label").css("width", "8.33%");
  
    
    // Fill hamburger menu.
    fillHamburgerMenu(cMenu[i]);

    // Process menu selection and reload the page.
    $(".menu_item").click(function () {
        window.location.href=this;
        window.location.reload(true);
    });
    
    showPageTheme(anchor);
   
    
    
    // Fade in the page.
    $("html").fadeIn("slow");
}

/*
 * Function:    showPageTitle
 *
 * Created on Oct 28, 2023
 * Updated on Oct 28, 2023
 *
 * Description: Show the title of the page.
 *
 * In:  page
 * Out: i
 *
 */
function showPageTitle(page) {
    
    var i;
    switch (page) {
        case "finance" : i = 1; 
            break;
        case "stock"   : i = 2;
            break;
        case "savings" : i = 3;
            break;
        case "crypto"  : i = 4;
            break;
    }
    
    $("header h1").html(cMenu[i] + " <span>" + cDate.getFullYear() + "</span>");
    
    return i;
}

/*
 * Function:    addYearPicker()
 *
 * Created on Oct 30, 2023
 * Updated on Oct 30, 2023
 *
 * Description: Add the YearPicker popup box.
 *
 * In:  -
 * Out: -
 *
 */
function addYearPicker() {
    
    $(".yearpicker").yearpicker({
	year: cDate.getFullYear(),
	startYear: 1998,
        endYear: cDate.getFullYear(),
            onHide:function(value)
            {
                $("header h1 span").html(value);			
		let i = $(".slidemenu input[name='slideItem']:checked").val();                               
                fillSheetSlideMenu(i, -1);
                
                //$("#tst_text").html("<h1>" + cMonths[i] + " " + value +"</h1>");
            }
    });    
}

/*
 * Function:    fillSheetSlideMenu
 *
 * Created on Oct 21, 2023
 * Updated on Oct 30, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  active, quarter
 * Out: -
 *
 */
function fillSheetSlideMenu(active, quarter) {
		
    var max, hide, check = false;
    var year = $("header h1 span").html();
	
    // Get slide menu scale type (months, quarters, year).
    var scale = $("#sheet_buttons img:first-child").attr("alt");
	
    switch(scale) {
        case "quarters" :
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
			
        case "year" :
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
			
	case "months" :
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
 * Updated on Oct 30, 2023
 *
 * Description: Change the Slide menu scale (months, quarters, year).
 *
 * In:  that
 * Out: -
 *
 */
 function changeSlideMenuScale(that) {
	
    switch(that.alt) {
	case "quarters" : 
            // Change month to quarter.
            var month = $(".slidemenu input[name='slideItem']:checked").val();
            var quarter = Math.ceil((Number(month) + 1) / 3) - 1;
            
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();
            $(that).attr("src","img/year.png");
            $(that).attr("alt","year");
	
            // The quarter varible is only use when the scale changes from months to quarters.
            fillSheetSlideMenu(3, quarter);
            break;
			
	case "year" :
            $(that).attr("src","img/months.png");
            $(that).attr("alt","months");		
			
            fillSheetSlideMenu(0, -1);
            break;
			
	case "months" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            $(that).attr("src","img/quarters.png");
            $(that).attr("alt","quarters");
				
            fillSheetSlideMenu(0, -1);
            break;
    }
}

/*
 * Function:    showPageTheme
 *
 * Created on Oct 29, 2023
 * Updated on Oct 30, 2023
 *
 * Description: Show the sheet page theme colors.
 *
 * In:  page
 * Out: -
 *
 */
function showPageTheme(page) {
    
    switch (page) {
        case "finance" : $(":root").css("--selected-text-color", "#ffd700"); // #ffe87c
                         $(".slider .bar").css("background","#ffd700");            
                         break;
        case "stock"   : $(":root").css("--selected-text-color", "#228b22"); 
                         $(".slider .bar").css("background","#228b22");
                         break;
        case "savings" : $(":root").css("--selected-text-color", "#4169e1 "); 
                         $(".slider .bar").css("background","#4169e1");
                         break;
        case "crypto"  : $(":root").css("--selected-text-color", "#ff8f00"); 
                         $(".slider .bar").css("background","#ff8f00");
                         break;
    }  
}
