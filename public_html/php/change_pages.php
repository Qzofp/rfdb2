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
 * Updated on Dec 01, 2023
 *
 * Description: Change the pages (true or false) in the tbl_settings table.
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'config.php';

// Get data from ajax call.
$pages  = filter_input(INPUT_POST, 'pages', FILTER_SANITIZE_STRING);
$name = ["finance","stock","savings","crypto"];
$aPages = json_decode($pages);

$response = [];

// Change the page settings.
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