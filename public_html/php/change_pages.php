<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_pages.php
 * Used in: js\settings.js
 *
 * Created on Nov 30, 2023
 * Updated on Aug 01, 2024
 *
 * Description: Check if the user is signed in and change the pages (true or false) in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangePages();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangePages
 *
 * Created on Dec 24, 2023
 * Updated on Aug 01, 2024
 *
 * Description: Change the pages (true or false) in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangePages() 
{
    // Get data from ajax call.
    $pages  = filter_input(INPUT_POST, 'pages', FILTER_SANITIZE_STRING);
    $name = ["finance","stock","savings","crypto"];
    $aPages = json_decode($pages);

    $response = [];
    try 
    {    
        $db = OpenDatabase();
    
        $query = "";
        for($i = 0; $i < 4; $i++) 
        { 
            if ($aPages[$i]) {
                $value = "true";
            }
            else {
                $value = "false";
            }
        
            // Update the settings table.
            $query .= "UPDATE `tbl_settings` ".
                      "SET `value` = JSON_REPLACE(`value`,'$.page','$value') ".
                      "WHERE `name` = \"$name[$i]\";";
        }
                        
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

    // Close database connection.
    $db = null;    
}