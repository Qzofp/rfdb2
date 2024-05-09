<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.php
 * Used in: *.php
 *
 * Created on Oct 14, 2023
 * Updated on May 09, 2024
 *
 * Description: .
 * Dependenties: -
 *
 */
 
///////////////////////////////////////////     Config Main     //////////////////////////////////////////////

// Define database constants
define("cHOST",  "127.0.0.1");
define("cUSER",  "rfdb2_dbo");
define("cPASS",  "Put your password here!");
//define("cDBASE", "rfdb2");
define("cDBASE", "rfdb2_empty");

/*
 * Function:    OpenDatabase
 *
 * Created on Oct 15, 2023
 * Updated on Oct 15, 2023
 *
 * Description: Open a database connection.
 *
 * In:  -
 * Out: -
 *
 */
function OpenDatabase():PDO
{    
    $db = sprintf("mysql:host=%s;dbname=%s;charset=utf8", cHOST, cDBASE);   
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    return new PDO($db, cUSER, cPASS, $options);
}

/*
 * Function:    RedirectAjaxRequest
 *
 * Created on Apr 11, 2024
 * Updated on Apr 12, 2024
 *
 * Description: Redirect the Ajax request when the user is log out.
 *
 * In:  -
 * Out: -
 *
 */
function RedirectAjaxRequest()
{
    if (isAjax()) 
    {
        $response = [];
        $response['success'] = false;
        $response['redirect'] = true;
        
        echo $json = json_encode($response);        
    }
    else {
        header("location:info.php"); //Test
        //header("location:/rfdb2");
        exit();
    }
}

/**
 * Is the Request an AJAX Request?
 *
 * This works if your JavaScript library sets the X-Requested-With HTTP header. Most common JavaScript frameworks do:
 *
 * @see http://en.wikipedia.org/wiki/List_of_Ajax_frameworks#JavaScript
 *
 * @return bool Returns true if the request is an AJAX request, false otherwise
 * 
 * Source: https://www.ozzu.com/snippets/608142/detect-an-ajax-request-with-php
 * 
 */
function isAjax()
{
    $x = filter_input(INPUT_SERVER, 'HTTP_X_REQUESTED_WITH', FILTER_SANITIZE_STRING);
    return isset($x) && $x == 'XMLHttpRequest';
}