<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_scale.php
 * Used in: js\sheet.js
 *
 * Created on Nov 15, 2023
 * Updated on Aug 01, 2024
 *
 * Description: Check if the user is signed in and change the scale in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangeScale();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangeScale
 *
 * Created on Dec 24, 2023
 * Updated on Aug 01, 2024
 *
 * Description: change the scale in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeScale()
{
    // Get data from ajax call.
    $name  = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $scale = filter_input(INPUT_POST, 'scale', FILTER_SANITIZE_STRING);

    $response = [];
    try 
    {
        $db = OpenDatabase();

        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.scale','$scale')"
                ."WHERE `name` = \"$name\";";
  
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