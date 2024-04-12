<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_scale.php
 * Used in: js\settings.js
 *
 * Created on Nov 17, 2023
 * Updated on Apr 12, 2024
 *
 * Description: Check if the user is signed in and get the scale from the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetScale();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetScale
 *
 * Created on Dec 24, 2023
 * Updated on Dec 24, 2023
 *
 * Description: Get the scale from the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function GetScale()
{
    // Get data from ajax call.
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

    $response = [];

    // Change the scale setting.
    try 
    {
        $db = OpenDatabase();

        $query = "SELECT JSON_UNQUOTE(JSON_EXTRACT(`value`, '$.scale')) AS scale FROM `tbl_settings` WHERE `name` = \"$name\";"; 
                      
        $select = $db->prepare($query);
        $select->execute();    
    
        $data = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $data;
    
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