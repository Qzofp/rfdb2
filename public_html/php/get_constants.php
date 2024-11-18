<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_constants.php
 * Used in: js\config.js
 *
 * Created on Oct 15, 2023
 * Updated on Nov 15, 2024
 *
 * Description: Check if the user is signed in and get the constants and settings from de databases 
 *              tbl_config and tbl_settings tables.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json"); 
$page = filter_input(INPUT_POST, 'page', FILTER_SANITIZE_STRING);
if($page == "login" || isset($_SESSION['user'])) {
    GetConstants($page);   
}
else {
    RedirectAjaxRequest();
}
 
/*
 * Function:    GetConstants
 *
 * Created on Dec 24, 2023
 * Updated on Nov 15, 2024
 *
 * Description: Get the constants and settings from de databases tbl_config and tbl_settings tables.
 *
 * In:  -
 * Out: -
 *
 */
function GetConstants($page)
{    
    $response = [];
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare('SELECT `name`, `value` FROM `tbl_settings`;');
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['settings'] = $settings;
    
        // Get the language code (NL, EN, etc.) and the salt pharse.
        foreach($settings as $row=>$link) 
        {
            if ($link['name'] == "language") 
            {
                $json = json_decode($link['value']);
                $code = $json->code;
            } 
            
            if ($link['name'] == "salt") 
            {
                $json = json_decode($link['value']);
                $phrase = $json->phrase;
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
      
        $where = "";
        switch ($page)
        {
            case "login" : 
                $where = "WHERE tbl_config.id IN (1,2,3,13) ";
                break;
            
            case "dashboard":
                $where = "WHERE tbl_config.id IN (1,2,3,4,5,16,18,19,20,30,31,32,33,34) ";
                break;
            
            case "sheet":
                $where = "WHERE tbl_config.id IN (1,2,3,4,5,6,7,11,16,18,19,20,24,25,26,27) ";
                break;
            
            case "settings" :
                $where = "WHERE tbl_config.id NOT IN (24,25,26,27,30,31,32,33,34) ";
                break;
        }
              
        $query = "SELECT COALESCE(tbl_config.`value`, $language.`value`) AS `value` ".
                 "FROM tbl_config ".
                 "LEFT JOIN $language ON tbl_config.id = $language.id_config ".
                 $where.
                 "ORDER BY tbl_config.id;";
        
        $select = $db->prepare($query);
        $select->execute();

        $constants = $select->fetchAll(PDO::FETCH_ASSOC);
        $constants[count($constants)]['value'] = $phrase;
        
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