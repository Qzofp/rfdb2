<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_select_stocks.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 28, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and get the select menus for the stocks sheet popup.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
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
 * Created on Jul 28, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the select menus for the stocks sheet popup.
 *
 * In:  -
 * Out: -
 *
 */
function GetSelectMenu()
{   
    $id   = filter_input(INPUT_POST, 'id'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $response = [];  
    switch($type) 
    {   
        case "service" :
            $response = GetServiceMenu();
            break;  
        
        case "account" :
            $response = GetAccountMenu($id);
            break;       
    }
    
    echo $json = json_encode($response); 
}

/*
 * Function:    GetServiceMenu
 *
 * Created on Jul 28, 2024
 * Updated on Aug 02, 2024
 *
 * Description: Get the select service menu from the databases tbl_services table.
 *
 * In:  -
 * Out: $response
 *
 */
function GetServiceMenu()
{
    $response = [];     
    try 
    {
        $db = OpenDatabase();
               
        $query = "SELECT `id`,`service` ". 
                 "FROM `tbl_services`  ".
                 "WHERE stock = '&#9745;' AND hide = 0 ".
                 "ORDER BY `service`;";
    
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

    // Close database connection
    $db = null;
    
    return $response;    
}

/*
 * Function:    GetAccountMenu
 *
 * Created on Jul 27, 2024
 * Updated on Aug 14, 2024
 *
 * Description: Get the select account menu from the databases tbl_accounts table. The account column is encrypted.
 *
 * In:  $id
 * Out: $response
 *
 */
function GetAccountMenu($id)
{
    $response = [];     
    try 
    {
        $db = OpenDatabase();
        $key = cKEY;
        
        $account = "CAST(AES_DECRYPT(tbl_accounts.`account`,'$key') AS CHAR(45))";
        $query = "SELECT tbl_accounts.`id` AS id, $account AS account ".
                 "FROM tbl_accounts ".
                 "INNER JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "WHERE tbl_accounts.`hide` = 0 AND tbl_accounts.`type` = 'stock' AND tbl_services.`id` = $id ".
                 "ORDER BY `account`;";
    
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

    // Close database connection
    $db = null;
    
    return $response;    
}
