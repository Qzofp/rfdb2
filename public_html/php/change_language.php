<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_language.php
 * Used in: js\settings.js
 *
 * Created on Nov 29, 2023
 * Updated on Aug 02, 2024
 *
 * Description: Check if the user is signed in and change the language in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangeLanguage();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangeLanguage
 *
 * Created on Dec 24, 2023
 * Updated on Aug 02, 2024
 *
 * Description: Change the language in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeLanguage() 
{
    // Get data from ajax call.
    $language  = filter_input(INPUT_POST, 'language', FILTER_SANITIZE_STRING);

    $response = [];
    try 
    {
        $db = OpenDatabase();

        $query = "SELECT `native`, `code` FROM `tbl_language` WHERE `language` = \"$language\" LIMIT 0,1;";     
        $select = $db->prepare($query);
        $select->execute();
    
        // Get the native language and the language code (NL, EN, etc.).    
        $results = $select->fetchAll(PDO::FETCH_ASSOC);  
        foreach($results as $row=>$link) 
        {
            $native = $link['native'];
            $code   = $link['code'];
        }    
    
        // Update the settings table.
        $query = "UPDATE `tbl_settings` ".
                 "SET `value` = JSON_REPLACE(`value`,'$.language','$native'), ".
                 "    `value` = JSON_REPLACE(`value`,'$.code','$code') ".
                 "WHERE `name` = \"language\";";    
    
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
