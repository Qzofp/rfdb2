<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_configs.php
 * Used in: js\settings.js
 *
 * Created on Apr 21, 2024
 * Updated on Apr 27, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyConfigs();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyConfigs
 *
 * Created on Apr 21, 2024
 * Updated on Apr 27, 2024
 *
 * Description: Modify (edit) the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyConfigs()
{
    // Get data from ajax call.
    $rows    = filter_input(INPUT_POST, 'rows'    , FILTER_SANITIZE_STRING);
    $sign    = filter_input(INPUT_POST, 'sign'    , FILTER_SANITIZE_STRING);    
    $salt    = filter_input(INPUT_POST, 'salt'    , FILTER_SANITIZE_STRING); 
    $finance = filter_input(INPUT_POST, 'finance' , FILTER_SANITIZE_STRING); 
    $stock   = filter_input(INPUT_POST, 'stock'   , FILTER_SANITIZE_STRING);
    $savings = filter_input(INPUT_POST, 'savings' , FILTER_SANITIZE_STRING);
    $crypto  = filter_input(INPUT_POST, 'crypto'    , FILTER_SANITIZE_STRING);
    
    $response['success'] = true;
    if ($rows) {
        $response = EditSetting("settings", "rows", $rows);
    }

    if ($response['success'] && $sign) {
        $response = EditSetting("settings", "sign", $sign);
    }
    
    if ($response['success'] && $salt) {
        $response = EditSetting("salt", "phrase", $salt);
    }
   
    if ($response['success'] && $finance) {
        $response = EditSetting("finance", "start", $finance);
    }    
    
    if ($response['success'] && $stock) {
        $response = EditSetting("stock", "start", $stock);
    } 

    if ($response['success'] && $savings) {
        $response = EditSetting("savings", "start", $savings);
    }     
    
    if ($response['success'] && $crypto) {
        $response = EditSetting("crypto", "start", $crypto);
    }     
    
    echo $json = json_encode($response);
}

/*
 * Function:    EditSetting
 *
 * Created on Apr 21, 2024
 * Updated on Apr 21, 2024
 *
 * Description: Edit the tbl_groups table with the input if the group doesn't exists.
 *
 * In:  $name, $type, $value
 * Out: $response
 *
 */
function EditSetting($name, $type, $value)
{
    $response = [];
    try 
    { 
        $db = OpenDatabase();

        // Update the number of rows
        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.$type','$value')"
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
    
    // Close database connection.
    $db = null;     
    
    return $response;
}
