<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    change_sortbutton.php
 * Used in: js\sheet.js
 *
 * Created on Jun 14, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and change the sort button in the tbl_settings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ChangeSortButton();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ChangeSortButton
 *
 * Created on Jun 14, 2024
 * Updated on Sep 18, 2024
 *
 * Description: change the sort button in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeSortButton()
{
    // Get data from ajax call.
    $name   = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $btn    = filter_input(INPUT_POST, 'btn',  FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $sel    = filter_input(INPUT_POST, 'sel',  FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];
    try 
    {
        $db = OpenDatabase();
        
        switch ($name) {
            case "finance" :
                $a = "grp";
                $b = "bsn";
                break;
            
            case "stock" :
                break;
            
            case "savings" :
                break;
            
            case "crypto" :
                break;
        }
        
        // Determin if the first or second select menu is choosen.
        if ($sel == "service") 
        {
            $s = $a;
            $button = 0;
        }
        else 
        {
            $s = $b;
            $button = 1;
        }
        
        // Change the sort value.
        if ($btn == "srt") {
            $value = "true";
        }
        else {
            $value = "false";
        }
        
        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.sort.$s','$value')"
                ."WHERE `name` = \"$name\";";
  
        $select = $db->prepare($query);
        $select->execute();    
    
        $response['button'] = $button;
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