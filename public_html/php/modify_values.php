<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    modify_values.php
 * Used in: js\dashboard.js
 *
 * Created on Sep 16, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_value_accounts and tbl_value_cryptos tables.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyValues();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyValues
 *
 * Created on Sep 16, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Modify the tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyValues()
{
    // Get data from ajax call.
    $date     = filter_input(INPUT_POST, 'date'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $aids     = filter_input(INPUT_POST, 'aids'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);
    $accounts = filter_input(INPUT_POST, 'accounts' , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);  
    $cids     = filter_input(INPUT_POST, 'cids'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);
    $crypto   = filter_input(INPUT_POST, 'crypto'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);      

    if (isset($cids)) {
        $response['cids'] = $cids;
        $response['crypto'] = $crypto;
    }
    
    $response['date']  = $date;
    $response['aids']  = $aids;
    $response["accounts"] = $accounts;
    
    
    $response['success'] = true;
    
    echo $json = json_encode($response);
}





