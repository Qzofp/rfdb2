<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_select_finances.php
 * Used in: js\dashboard_edit.js
 *
 * Created on Nov 15, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Check if the user is signed in and get the select menu for the dashboard popup.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetSelectMenu();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetSelectMenu
 *
 * Created on Nov 15, 2024
 * Updated on Nov 17, 2024
 *
 * Description: Get the select menus for the dashboard activa list popup.
 *
 * In:  -
 * Out: -
 *
 */
function GetSelectMenu()
{      
    $limit = filter_input(INPUT_POST, 'limit' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $response = []; 
    
    // Get the settings, e.g. currency sign and the active pages (finance, stock, savings and crypto).
    $input = GetSettings();  
    if ($input['success']) 
    {
        try 
        {
            $db = OpenDatabase();

            $date = MySqlToDate($input['sign'], "date");        
            $query = "SELECT 1 AS `id`, $date AS `mdate`, `date` AS `sdate` FROM `tbl_value_accounts` ". 
                     "UNION ".
                     "SELECT 1 AS `id`, $date AS `mdate`, `date` AS `sdate` FROM `tbl_value_cryptos` ".
                     "ORDER BY `sdate` DESC ".
                     "LIMIT $limit;";
    
            $select = $db->prepare($query);
            $select->execute();

            $menu = $select->fetchAll(PDO::FETCH_ASSOC);  
            $response['data'] = $menu;  
            $response['success'] = true;
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }    
    }
    else {
        $response = $input;
    }
    
    // Close database connection
    $db = null;   
   
    echo $json = json_encode($response);    
}
