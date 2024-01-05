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
 * Updated on Jan 03, 2024
 *
 * Description: Check if the user is signed in and get the constants and settings from de databases 
 *              tbl_config and tbl_settings tables.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
$user = $_SESSION['user'];
if(!$user) 
{
    header("location:info.php");
}
else 
{
    header("Content-Type:application/json"); 
    GetConstants();
}


/*
 * Function:    GetConstants
 *
 * Created on Dec 24, 2023
 * Updated on Jan 03, 2024
 *
 * Description: Get the constants and settings from de databases tbl_config and tbl_settings tables.
 *
 * In:  -
 * Out: -
 *
 */
function GetConstants()
{
    $response = [];

    // Get the settings.
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare('SELECT `name`, `value` FROM `tbl_settings`;');
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['settings'] = $settings;
    
        // Get the language code (NL, EN, etc.).
        foreach($settings as $row=>$link) 
        {
            if ($link['name'] == "language") 
            {
                $json = json_decode($link['value']);
                $code = $json->code;
            }     
        }
    
        // Determine the language table.
        switch ($code) 
        {
            case 'NL': $language = "tbl_dutch";
                break;
            case 'EN': $language = "tbl_english";
                break;
        }
      
        $query = "SELECT COALESCE(tbl_config.`value`, $language.`value`) AS `value` ".
                 "FROM tbl_config ".
                 "LEFT JOIN $language ON tbl_config.id = $language.id_config ".
                 "WHERE tbl_config.id NOT IN (13) ".
                 "ORDER BY tbl_config.id;";
    
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
}