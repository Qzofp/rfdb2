<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_settings.php
 * Used in: js\config.js
 *
 * Created on Feb 09, 2024
 * Updated on Feb 09, 2024
 *
 * Description: Check if the user is signed in and get the settings from de databases tbl_settings tables.
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
    GetSettings();
}


/*
 * Function:    GetSettings
 *
 * Created on Feb 09, 2024
 * Updated on Feb 09, 2024
 *
 * Description: Get the settings from the databases tbl_settings tables.
 *
 * In:  -
 * Out: -
 *
 */
function GetSettings()
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