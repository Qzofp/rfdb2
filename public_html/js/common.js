/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    common.js
 * Used in: index.html
 *
 * Created on Oct 28, 2023
 * Updated on Nov 08, 2023
 *
 * Description: Common functions.
 * Dependenties: Javascript common functions.
 *
 *
 */

//////////////////////////////////////////      Common Functions     /////////////////////////////////////////


/*
 * Function:    fillHamburgerMenu
 *
 * Created on Oct 28, 2023
 * Updated on Nov 03, 2023
 *
 * Description: Fill the hamburger menu with the items.
 *
 * In:  exclude
 * Out: -
 *
 */
function fillHamburgerMenu(exclude) {

    for(let i = 0; i < cMenu.length; i++) {
        
        if (cMenu[i] !== exclude && cSheets.sheet[i].page) {               
            $(".menu_box li a").eq(i).attr("href", cPages[i]).html(cMenu[i]);
        }
        else {
            $(".menu_box li").eq(i).hide();
        }
    }
}

/*
 * Function:    showPageTitles
 *
 * Created on Nov 08, 2023
 * Updated on Nov 08, 2023
 *
 * Description: Show the page titles and the footer.
 *
 * In:  title
 * Out: 
 *
 */
function showPageTitles(title) {
       
    $("title").html(cProject);  
    $("header h1").html(title);
    $("footer h3").html(cFooter);
}

/*
 * Function:    showPageTheme
 *
 * Created on Oct 29, 2023
 * Updated on Nov 03, 2023
 *
 * Description: Show the sheet page theme colors.
 *
 * In:  page
 * Out: -
 *
 */
function showPageTheme(page) {
    
    switch (page) {
        case cSheets.sheet[0].name : 
            $(":root").css("--selected-text-color", "#6c3483");
            $(".slider .bar").css("background","#6c3483");            
            break;        
        case cSheets.sheet[1].name : 
            $(":root").css("--selected-text-color", "#ffd700");
            $(".slider .bar").css("background","#ffd700");            
            break;
        case cSheets.sheet[2].name : 
            $(":root").css("--selected-text-color", "#228b22"); 
            $(".slider .bar").css("background","#228b22");
            break;
        case cSheets.sheet[3].name : 
            $(":root").css("--selected-text-color", "#4169e1 "); 
            $(".slider .bar").css("background","#4169e1");
            break;
        case cSheets.sheet[4].name : 
            $(":root").css("--selected-text-color", "#ff8f00"); 
            $(".slider .bar").css("background","#ff8f00");
            break;
    }  
}