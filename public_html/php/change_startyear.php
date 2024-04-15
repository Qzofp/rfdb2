<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_startyear.php
 * Used in: js\common.js
 *
 * Created on Apr 15, 2024
 * Updated on Apr 15, 2024
 *
 * Description: Check if the user is signed in and change for the page the start year in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangeStartYear();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangeYear
 *
 * Created on Apr 15, 2024
 * Updated on Apr 15, 2024
 *
 * Description: Change the start year in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeStartYear()
{
    // Get data from ajax call.
    $page = filter_input(INPUT_POST, 'page', FILTER_SANITIZE_STRING);
    $year = filter_input(INPUT_POST, 'year', FILTER_SANITIZE_STRING);

    $response = [];

    // Change the scale setting.
    try 
    {
        $db = OpenDatabase();

        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.start','$year')"
                ."WHERE `name` = \"$page\";";
  
        $select = $db->prepare($query);
        $select->execute();    
    
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    } 

    echo $json = json_encode($response);

    // Close database connection
    $db = null;    
}