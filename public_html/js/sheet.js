/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 28, 2023
 * Updated on Nov 08, 2023
 *
 * Description: Javascript functions for the sheet page.
 * Dependenties: js/config.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    loadSheet
 *
 * Created on Oct 28, 2023
 * Updated on Nov 04, 2023
 *
 * Description: The sheet.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSheet() {
    
    // Get href anchor from URL.
    var anchor = window.location.hash.substring(1);
    
    // Check if the page is valid.
    var i = checkSheetPage(anchor);
    if (i > 0) {
       openSheetPage(i);
    }
    else {
       openInvalidPage();
    }
              
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
    
    // Fade in the page.
    $("html").fadeIn("slow");
}

/*
 * Function:    checkSheetPage
 *
 * Created on Nov 03, 2023
 * Updated on Nov 03, 2023
 *
 * Description: Check the if the sheet page is valid.
 *
 * In:  page
 * Out: chk
 *
 */
function checkSheetPage(page) {
    
    var chk = -1; 
    var max = Object.keys(cSheets.sheet).length;
    for (let i = 0; i < max; i++) {
        if (cSheets.sheet[i].name === page && cSheets.sheet[i].page) {
           chk = i; 
        }
    }

    return chk;
}

/*
 * Function:    openSheetPage
 *
 * Created on Nov 03, 2023
 * Updated on Nov 08, 2023
 *
 * Description: Open the sheet page.
 *
 * In:  i
 * Out:
 *
 */
function openSheetPage(i) {
    
    var $date;
    
    // Show the sheet title and current year.
    showPageTitles(cMenu[i] + " <span>" + cDate.getFullYear() + "</span>");
    
    // Set the slie menu scale.
    setSlideMenuScale(i);
      
    // Add Yearpicker popup box and process year selection (also update the slide menu and the sheet table).
    addYearPicker();
    
    // Fill the slide menu.
    fillSheetSlideMenu(cDate.getMonth());
    
    // Change slide menu scale (months, quarters, year).
    $("#sheet_buttons").on('click', 'img', function () {
	changeSlideMenuScale(this);
        
        $date = getSelectedDateFromPage();
        
        // Date Test, show the date that will be used to get the table data. 
        $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");        
    });	
     
    // Fill hamburger menu.
    fillHamburgerMenu(cMenu[i]);

    // Process menu selection and reload the page.
    $(".menu_item").click(function () {
        window.location.href=this;
        window.location.reload(true);
    });
    
    // Date Test, show the date that will be used to get the table data.   
    $date = getSelectedDateFromPage();   
    $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");   
    
    $(".slidemenu input[name='slideItem']").change(function() {
        $date = getSelectedDateFromPage();   
        
        // Date Test, show the date that will be used to get the table data. 
        $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");     
    });   
        
    // Show the page theme for finance, stock, savings and crypto.
    showPageTheme(cSheets.sheet[i].name);
    
}

/*
 * Function:    openInvalidPage
 *
 * Created on Nov 03, 2023
 * Updated on Nov 04, 2023
 *
 * Description: Open the invalid sheet page and show error message.
 *
 * In:  anchor
 * Out:
 *
 */
function openInvalidPage() {
    
    var $msg = cMessages[0];
    
    // Show title.
    $("header h1").html(cErrors[0]);
    
    // Hide sheet page items.
    $(".hamburger_menu").hide();
    $(".picker").hide();
    $("#slide6").hide();
    $("#slide12").hide();
    $("#sheet_buttons").hide();
    
    // Error message popup.
    $("#error h2").html(cErrors[0]);
    $msg = $msg.replace("[PAGE]", "<u>"+ window.location.href + "</u>");    
    $("#error p").html($msg);
    $("#popup_error").fadeIn("slow");
}

/*
 * Function:    setSlideMenuScale
 *
 * Created on Nov 03, 2023
 * Updated on Nov 03, 2023
 *
 * Description: Set the slide menu scale with the settings from the database.
 *
 * In:  i
 * Out: 
 *
 */
function setSlideMenuScale(i) {
    
    switch(cSheets.sheet[i].scale) {
	case "quarters" :            
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();
                    
            $("#sheet_buttons img:first-child").attr("src","img/year.png");
            $("#sheet_buttons img:first-child").attr("alt","year");         
            break;
			
	case "year" :
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();            
            
            $("#sheet_buttons img:first-child").attr("src","img/months.png");
            $("#sheet_buttons img:first-child").attr("alt","months");					
            break;
			
	case "months" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            
            $("#sheet_buttons img:first-child").attr("src","img/quarters.png");
            $("#sheet_buttons img:first-child").attr("alt","quarters");
            break;
            
        default: break;
    }    
}

/*
 * Function:    addYearPicker
 *
 * Created on Oct 30, 2023
 * Updated on Nov 01, 2023
 *
 * Description: Add the YearPicker popup box (also update the slidemenu and the sheet table).
 *
 * In:  -
 * Out: -
 *
 */
function addYearPicker() {
    var $date;
    
    $(".yearpicker").yearpicker({
	year: cDate.getFullYear(),
	startYear: 1998,
        endYear: cDate.getFullYear(),
            onHide:function(value)
            {            
                $("header h1 span").html(value);			
		
                let $chk = $(".slidemenu input[name='slideItem']:checked").val();
                fillSheetSlideMenu($chk);            
                $date = getSelectedDateFromPage();
                
                // Date Test, show the date that will be used to get the table data.
                $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>"); 
            }
    });    
}

/*
 * Function:    getSelectedDateFromPage
 *
 * Created on Nov 01, 2023
 * Updated on Nov 01, 2023
 *
 * Description: Add the YearPicker popup box (also update the slidemenu and the sheet table).
 *
 * In:  -
 * Out: $date (scale, year quarter, month)
 *
 */
function getSelectedDateFromPage() {
    
    var $date, $scale;
    var $month, $quarter;
    var $year = $("header h1 span").html();    
    var $btn = $("#sheet_buttons img:first-child").attr("alt");
    
    switch ($btn) {
	case "quarters" : // Month menu, get the month.
            $scale = "months";
            $month = $(".slidemenu input[name='slideItem']:checked").val(); 
            if ($month === undefined) {
                $month = cDate.getMonth();
            }
            
            $quarter = -1;
            break;
            
        case "year" : // Quarter menu, get the quarter.
            $scale = "quarters";
            $quarter = $(".slidemenu input[name='slideItem']:checked").val();
            if ($quarter === undefined) {
                $quarter = Math.ceil((cDate.getMonth() + 1) / 3) - 1;
            }            
            
            $month = -1;
            break;
            
        case "months" : // Year menu.
            $scale = "year";
            $quarter = -1;
            $month = -1;
            break;
    }
    
    $date = {
        scale: $scale,
        year: $year,
        quarter: $quarter,
        month: $month
    };
    
    return $date;
}

/*
 * Function:    fillSheetSlideMenu
 *
 * Created on Oct 21, 2023
 * Updated on Nov 01, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  active
 * Out: -
 *
 */
function fillSheetSlideMenu(active) {
		
    var items;
    var max, hide, check = false;
    var $date = getSelectedDateFromPage();
        
    switch($date.scale) {
        case "months" :
       	max = 12;
	items = cMonths;
			
	if ($date.year >= cDate.getFullYear()) {
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
					
            if ($date.quarter > -1) {				
                active = $date.quarter;
            }
			
            hide = 3;	
            if ($date.year >= cDate.getFullYear()) {
                
                let $quarter = Math.ceil((cDate.getMonth() + 1) / 3) - 1;
                
                if (hide > $quarter) {				
                    hide = $quarter;					
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
 * Updated on Nov 01, 2023
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
            var $month = $(".slidemenu input[name='slideItem']:checked").val();
            var $quarter = Math.ceil((Number($month) + 1) / 3) - 1;
            
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();
            
            // Check the quarter slide menu.
            $("#slide6-item-" + $quarter).prop('checked', true);
            
            $(that).attr("src","img/year.png");
            $(that).attr("alt","year");
            
            // The quarter varible is only use when the scale changes from months to quarters.
            fillSheetSlideMenu($quarter);
            break;
			
	case "year" :
            $(that).attr("src","img/months.png");
            $(that).attr("alt","months");		
			
            fillSheetSlideMenu(0);
            break;
			
	case "months" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            $(that).attr("src","img/quarters.png");
            $(that).attr("alt","quarters");
				
            fillSheetSlideMenu(0);
            break;
            
        default: break;
    }
}


