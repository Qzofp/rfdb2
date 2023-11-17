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
 * Updated on Nov 17, 2023
 *
 * Description: Change the scale in the tbl_settings table.
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'config.php';

// Get data from ajax call.
$name  = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$scale = filter_input(INPUT_POST, 'scale', FILTER_SANITIZE_STRING);

$response = [];

// Change the scale setting.
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