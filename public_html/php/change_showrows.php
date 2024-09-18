<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    change_showrows.php
 * Used in: js\settings.js
 *
 * Created on Feb 09, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and change the show setting (true or false) in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangeShowRows();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangeShowRows
 *
 * Created on Feb 09, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Change the show setting (true or false) in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeShowRows() 
{
    // Get data from ajax call.
    $slide = filter_input(INPUT_POST, 'slide' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $show  = filter_input(INPUT_POST, 'show'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
 
    $response = [];
    try 
    {    
        switch ($slide) 
        {
            case 0: 
                $name = "settings";
                break;
            
            case 1:
                $name = "finance";
                break;
                
            case 2:
                $name = "stock";
                break;                

            case 3:
                $name = "savings";
                break;

            case 4:
                $name = "crypto";
                break;            
        }
        
        $db = OpenDatabase();
    
        $query = "UPDATE `tbl_settings` ".
                      "SET `value` = JSON_REPLACE(`value`,'$.show','$show') ".
                      "WHERE `name` = \"$name\";";             
                        
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