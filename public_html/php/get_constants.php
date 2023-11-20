<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_constants.php
 * Used in: js\config.js
 *
 * Created on Oct 15, 2023
 * Updated on Nov 18, 2023
 *
 * Description: Get the constants and settings from de databases tbl_config and tbl_settings tables.
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'config.php';

$response = [];

// Get the settings.
try 
{
    $db = OpenDatabase();

    $select = $db->prepare('SELECT `name`, value FROM `tbl_settings`;');
    $select->execute();

    $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
    $response['settings'] = $settings;
    
    foreach($settings as $row=>$link) {
        if ($link['name'] == "language") 
        {
            $json = json_decode($link['value']);
            $language = $json->code;
        }     
    }
 
    $query = "SELECT `value` FROM `tbl_config` WHERE language = \"-\" OR language = \"$language\";";
    $select = $db->prepare($query);
    $select->execute();

    $constants = $select->fetchAll(PDO::FETCH_ASSOC);  
    $response['constants'] = $constants;       
    $response['success']   = true;
}
catch (PDOException $e) 
{    
    $response['message'] = $e->getMessage();
    $response['success'] = false;
} 

echo $json = json_encode($response);

// Close database connection
$db = null;