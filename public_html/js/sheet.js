/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    sheet.js
 * Used in: sheet.html
 *
 * Created on Oct 28, 2023
 * Updated on Apr 15, 2024
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
 * Updated on Apr 12 , 2024
 *
 * Description: The sheet.js main function.
 *
 * In:  -
 * Out: -
 *
 */
function loadSheet() {
    
    $.when(getAjaxRequest("get_constants", "page=sheet")).done(function(result) {

        if (result.success) {              
            var [c, s] = processSheetConstants(result);        
            showSheetPage(c, s);
        }
        else {
            showDatabaseError(result);                    
        }     
    })
    .fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
     
    closeErrorMessage();

    // Fade in the page.
    $("html").fadeIn("slow");    
}

/*
 * Function:    showSheetPage
 *
 * Created on Nov 13, 2023
 * Updated on Nov 13, 2023
 *
 * Description: Shows (check and open) the sheet page.
 *
 * In:  c, s
 * Out: -
 *
 */
function showSheetPage(c, s) {

    // Get href anchor from URL.
    var anchor = window.location.hash.substring(1);
    
    // Check if the page is valid.
    var i = checkSheetPage(anchor, s);
    if (i > 0) {
       openSheetPage(c, s, i);
    }
    else {
       openInvalidPage(c);
    }  
}

/*
 * Function:    checkSheetPage
 *
 * Created on Nov 03, 2023
 * Updated on Nov 13, 2023
 *
 * Description: Check the if the sheet page is valid.
 *
 * In:  page, s
 * Out: chk
 *
 */
function checkSheetPage(page, s) {   
    
    var chk = -1; 
    for (let i = 0; i < 6; i++) {
        let tmp = JSON.parse(s[i].value);        
        if (s[i].name === page && tmp.page) {
           chk = i; 
        }
    }

    return chk;
}

/*
 * Function:    openSheetPage
 *
 * Created on Nov 03, 2023
 * Updated on Apr 15, 2024
 *
 * Description: Open the sheet page.
 *
 * In:  c, s, i
 * Out:
 *
 */
function openSheetPage(c, s, i) {
    
    var $date, $adp;
    
    // Show the sheet title and current year.
    showPageTitles(c, i, " <span>" + cDate.getFullYear() + "</span>");
    
    // Set the slide menu scale.
    setSlideMenuScale(s[i]);

    // Initialize the datepicker.
    $adp = initAirDatePicker(c);       
    
    // Add Yearpicker popup box and process year selection (also update the slide menu and the sheet table).
    addYearPicker(c, s[i], $adp);
         
    // Fill the slide menu.
    fillSheetSlideMenu(c, cDate.getMonth());
      
    // Change slide menu scale (months, quarters, year).
    $("#page_buttons").on('click', 'img', function() {
        changeSheetContent(c, s[i], this);
        
        // Date Test, show the date that will be used to get the table data.
        $date = getSelectedDateFromPage();
        updateAirDataPicker($adp, $date);  
        $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");             
        
    });	
    
    // Fill hamburger menu.
    fillHamburgerMenu(c, s, i);

    // Process menu selection and reload the page.
    $(".menu_item").click(function() {
        window.location.href=this;
        window.location.reload(true);
    });
        
    // Begin date Test, show the date that will be used to get the table data.   
    $date = getSelectedDateFromPage();
    updateAirDataPicker($adp, $date);   
    $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");   
    // End date Test.
  
    $(".slidemenu input[name='slideItem']").change(function() {
        
        // Date Test, show the date that will be used to get the table data.
        $date = getSelectedDateFromPage();
        updateAirDataPicker($adp, $date);  
        $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>");     
    });               
        
    
            
    // Show the page theme for finance, stock, savings and crypto.
    showPageTheme(s[i]);
     
    closeChartWindow(); 
}

/*
 * Function:    openInvalidPage
 *
 * Created on Nov 03, 2023
 * Updated on Nov 16, 2023
 *
 * Description: Open the invalid sheet page and show error message.
 *
 * In:  c
 * Out:
 *
 */
function openInvalidPage(c) {
    
    var $msg = c.errors[1];
    
    // Show title.
    $("header h1").html(c.errors[0]);
    
    // Hide sheet page items.
    $(".hamburger_menu").hide();
    $(".picker").hide();
    $("#slide6").hide();
    $("#slide12").hide();
    $("#page_buttons").hide();
    
    // Error message popup.
    $("#error h2").html(c.errors[0]);
    $msg = $msg.replace("[PAGE]", "<u>"+ window.location.href + "</u>");    
    $("#error p").html($msg);
    $("#popup_error").fadeIn("slow");
}

/*
 * Function:    setSlideMenuScale
 *
 * Created on Nov 03, 2023
 * Updated on Nov 16, 2023
 *
 * Description: Set the slide menu scale with the settings from the database.
 *
 * In:  s
 * Out: 
 *
 */
function setSlideMenuScale(s) {
    
    var tmp = JSON.parse(s.value);
    
    switch(tmp.scale) {
	case "quarters" :            
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();
                    
            $("#page_buttons img:first-child").attr("src","img/year.png");
            $("#page_buttons img:first-child").attr("alt","year");         
            break;
			
	case "year" :
            $("#slide12").hide();
            $(".slider .bar").css("width", "16.66%");
            $(".slidemenu label").css("width", "16.66%");
            $("#slide6").show();            
            
            $("#page_buttons img:first-child").attr("src","img/months.png");
            $("#page_buttons img:first-child").attr("alt","months");					
            break;
			
	case "months" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            
            $("#page_buttons img:first-child").attr("src","img/quarters.png");
            $("#page_buttons img:first-child").attr("alt","quarters");
            break;
            
        default: break;
    }    
}

/*
 * Function:    addYearPicker
 *
 * Created on Oct 30, 2023
 * Updated on Apr 15, 2024
 *
 * Description: Add the YearPicker popup box (also update the slidemenu and the sheet table).
 *
 * In:  c, s, adp
 * Out: -
 *
 */
function addYearPicker(c, s, adp) {
    
    var $set, $start, $date;
    
    // Get the start year, set it when the year isn't set.
    $set = JSON.parse(s.value);
    if ($set.start === 0) {
        $start = setStartYear(s.name, cDate.getFullYear()); 
    }
    else {
        $start = $set.start;
    }
       
    $(".yearpicker").yearpicker({
	year: cDate.getFullYear(),
	startYear: $start,
        endYear: cDate.getFullYear(),
            onHide:function(value)
            {            
                $("header h1 span").html(value);			
		
                let $chk = $(".slidemenu input[name='slideItem']:checked").val();
                fillSheetSlideMenu(c, $chk);            
                $date = getSelectedDateFromPage();
                updateAirDataPicker(adp, $date);
                
                // Date Test, show the date that will be used to get the table data.
                $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>"); 
            }
    });    
}

/*
 * Function:    getSelectedDateFromPage
 *
 * Created on Nov 01, 2023
 * Updated on Nov 16, 2023
 *
 * Description: Add the YearPicker popup box (also update the slidemenu and the sheet table).
 *
 * In:  -
 * Out: $date (scale, year quarter, month)
 *
 */
function getSelectedDateFromPage() {
    
    var $scale;
    var $month, $quarter;
    var $year = $("header h1 span").html();    
    var $btn = $("#page_buttons img:first-child").attr("alt");
    
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
    
    var $date = {
        scale: $scale,
        year: $year,
        quarter: $quarter,
        month: $month
    };
    
    return $date;
}


/*
 * Function:    updateAirDataPicker
 *
 * Created on Mar 08, 2024
 * Updated on Mar 13, 2024
 *
 * Description: Update the Air datapicker.
 *
 * In:  adp, date
 * Out: -
 *
 */
function updateAirDataPicker(adp, date) {
    
    var mindate, maxdate;
    var month, minmonth, maxmonth;
    var day;
    
    switch(date.scale) {
        case "months" :
            month = Number(date.month) + 1;            
            if (month < 10) {
               minmonth = "0" + month;
               maxmonth = "0" + month;
            }
            else {
               minmonth = month;
               maxmonth = month;                
            }
            
            day = new Date(date.year, month, 0);            
            mindate = date.year + "-" + minmonth + "-01";
            maxdate = date.year + "-" + maxmonth + "-" + day.getDate();             
            break;
            
        case "quarters" :
            month = 3*date.quarter + 1;
            if (date.quarter < 3) {
                minmonth = "0" + month;
                maxmonth = "0" + Number(month + 2);
            }
            else {
                minmonth = month;
                maxmonth = month + 2;
            }
            
            day = new Date(date.year, maxmonth, 0); 
            mindate = date.year + "-" + minmonth + "-01";
            maxdate = date.year + "-" + maxmonth + "-" + day.getDate();           
            break;            
        
        case "year" :
            mindate = date.year + "-01-01";
            maxdate = date.year + "-12-31";
            break;        
    } 
    
    adp.update({
        minDate: mindate,
        maxDate: maxdate
    });                   
}


/*
 * Function:    fillSheetSlideMenu
 *
 * Created on Oct 21, 2023
 * Updated on Nov 27, 2023
 *
 * Description: Fill the Slidemenu bar with the items.
 *
 * In:  c, active
 * Out: -
 *
 */
function fillSheetSlideMenu(c, active) {
		
    var items;
    var max, hide, check = false;
    var $date = getSelectedDateFromPage();
        
    switch($date.scale) {
        case "months" :
       	max = 12;
	items = c.months;
			
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
            items = c.quarters;
					
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
            active = 0;
            max = 6;
            items = c.year;	
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
 * Function:    changeSheetContent
 *
 * Created on Dec 17, 2023
 * Updated on Dec 17, 2023
 *
 * Description: Change sheet content for the page.
 *
 * In:  c, page, that
 * Out: -
 *
 */
function changeSheetContent(c, s, that) {
    
    switch (that.alt) {
        case "months" :
        case "quarters" :
        case "year"     :    
            changeSlideMenuScale(c, s.name, that);
            var $date = getSelectedDateFromPage();
            
            // Date Test, show the date that will be used to get the table data. 
            $("#tst_date").html("<h1>Scale: " + $date.scale + " " + $date.month + " " + $date.quarter + " " + $date.year +"</h1>"); 
            break;
            
        case "edit" :
            break;
            
        case "chart" : 
            let bottom = "-100%";
            if ($("#chart_slider").css("bottom") !== "0px") {
                bottom = "0";
            }
            $("#chart_slider").animate({"bottom":bottom}, 300);
            break;
    }    
}

/*
 * Function:    changeSlideMenuScale
 *
 * Created on Oct 25, 2023
 * Updated on Nov 15, 2023
 *
 * Description: Change the Slide menu scale (months, quarters, year) for the page.
 *
 * In:  c, page, that
 * Out: -
 *
 */
 function changeSlideMenuScale(c, page, that) {

    // Change de scale database settings.
    changeScaleSetting(page, that.alt);
     
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
            fillSheetSlideMenu(c, $quarter);
            break;
			
	case "year" :
            $(that).attr("src","img/months.png");
            $(that).attr("alt","months");		
			
            fillSheetSlideMenu(c, 0);
            break;
			
	case "months" :
            $("#slide6").hide();
            $(".slider .bar").css("width", "8.33%");
            $(".slidemenu label").css("width", "8.33%");
            $("#slide12").show();
            $(that).attr("src","img/quarters.png");
            $(that).attr("alt","quarters");
				
            fillSheetSlideMenu(c, 0);
            break;
            
        default: break;
    }
}

/*
 * Function:    changeSlideMenuScale
 *
 * Created on Dec 18, 2023
 * Updated on Dec 18, 2023
 *
 * Description: Close the chart window.
 *
 * In:  -
 * Out: -
 *
 */
function closeChartWindow() {
    
    // Close chart slider when the hamburger menu is pressed.
    $(".hamburger_menu").click(function(){
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
    });
    
    // Close chart slider when the close button is pressed.
    $("#chart_content .close").click(function(){
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
    }); 
}