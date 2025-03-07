<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_configs.php
 * Used in: js\settings.js
 *
 * Created on Dec 04, 2023
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the configs from the databases tbl_config table.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetConfigs();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetConfigs
 *
 * Created on Dec 23, 2023
 * Updated on Aug 01, 2024
 *
 * Description: Get the configs from the databases tbl_config table.
 *
 * In:  -
 * Out: -
 *
 */
function GetConfigs()
{   
    $response = [];
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare("SELECT JSON_UNQUOTE(JSON_EXTRACT(`value`, '$.code')) AS `code` ".
                               "FROM `tbl_settings` WHERE `name` = \"language\";");
        $select->execute();
    
        // Get the language code (NL, EN, etc.).
        $row = $select->fetch();
        
        // Determine the language table.
        switch ($row["code"]) 
        {
            case 'NL': $language = "tbl_dutch";
                break;
            case 'EN': $language = "tbl_english";
                break;
        }
     
        $query = "SELECT tbl_config.id, tbl_config.`name`, COALESCE(tbl_config.`value`, $language.`value`) AS `value` ".
                 "FROM tbl_config ".
                 "LEFT JOIN $language ON tbl_config.id = $language.id_config ".
                 "ORDER BY tbl_config.id;";
    
        $select = $db->prepare($query);
        $select->execute();

        $configs = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $configs;  
 
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