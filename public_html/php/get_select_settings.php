<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_select_settings.php
 * Used in: js\settings_finances.js
 *
 * Created on Aug 01, 2024
 * Updated on Aug 14, 2024
 *
 * Description: Check if the user is signed in and get the select menus for the finances settings popups.
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
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select menus for the finances settings popups.
 *
 * In:  -
 * Out: -
 *
 */
function GetSelectMenu()
{   
    $id    = filter_input(INPUT_POST, 'id'  , FILTER_SANITIZE_STRING);
    $type  = filter_input(INPUT_POST, 'type' , FILTER_SANITIZE_STRING);    
    $slide = filter_input(INPUT_POST, 'slide', FILTER_SANITIZE_STRING);
    
    $response = [];  
    switch($slide)
    {   
        case "finance" :
            $response = GetFinancesMenu($type);
            break;
        
        case "stock" :
            $response = GetServiceMenu($slide);
            break;        
        
        case "savings" :
            $response = GetServiceMenu($slide);
            break;
        
        case "crypto" :
            $response = GetCryptoMenu($id, $type);
            break;        
    }
    
    echo $json = json_encode($response); 
}

/*
 * Function:    GetFinancesMenu
 *
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select menus for the finances settings popups.
 *
 * In:  $type
 * Out: $response
 *
 */
function GetFinancesMenu($type)
{
    $response = [];
    switch($type)
    { 
        case "service" :
            $response = GetServiceMenu("finance");
            break;
        
        case "group" :
            $response = GetGroupMenu();
            break;            
    }     
    
    return $response;
}

/*
 * Function:    GetCryptoMenu
 *
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select menus for the crypto settings popups.
 *
 * In:  $id, $type
 * Out: $response
 *
 */
function GetCryptoMenu($id, $type)
{
    $response = [];
    switch($type)
    { 
        case "service" :
            $response = GetServiceMenu("crypto");
            break;
        
        case "account" :
            $response = GetAccountMenu($id);
            break;   

        case "crypto" :
            $response = GetCryptoSymbolMenu();
            break;        
    }     
    
    return $response;
}

/*
 * Function:    GetServiceMenu
 *
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select service menu from the databases tbl_services table.
 *
 * In:  $column
 * Out: $response
 *
 */
function GetServiceMenu($column)
{
    $response = [];
    try 
    {
        $db = OpenDatabase();
       
        $query = "SELECT `id`, `service` ". 
                 "FROM `tbl_services`  ".
                 "WHERE $column = '&#9745;' AND hide = 0 ".
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
 * Function:    GetGroupMenu
 *
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select group menu from the databases tbl_groups table.
 *
 * In:  -
 * Out: $response
 *
 */
function GetGroupMenu()
{
    try 
    {
        $db = OpenDatabase();
                
        $query = "SELECT tbl_groups.`id`, `group`, count(0) AS ranking ". 
                 "FROM `tbl_groups` ".
                 "LEFT JOIN tbl_rankings ON tbl_groups.`id` = tbl_rankings.`gid` ".
                 "WHERE hide = 0 ".
                 "GROUP BY tbl_groups.`id`, tbl_groups.`group` ".
                 "ORDER BY `group`;";
    
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
 * Created on Aug 01, 2024
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
                 "INNER JOIN tbl_services ON tbl_accounts.`sid` = $id ".
                 "WHERE tbl_accounts.`hide` = 0 ".
                 "GROUP BY tbl_accounts.`id`, `account` ".
                 "ORDER BY `account`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $accounts = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $accounts;       
 
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
 * Function:    GetCryptoSymbolMenu
 *
 * Created on Aug 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select crypto symbol menu from the databases tbl_cryptocurrenties table.
 *
 * In:  -
 * Out: $response
 *
 */
function GetCryptoSymbolMenu()
{
    $response = [];
    try 
    {
        $db = OpenDatabase();
           
        $query = "SELECT `id`, `symbol` ". 
                 "FROM tbl_cryptocurrenties ".
                 "WHERE `hide` = 0 ".
                 "ORDER BY `symbol`;";
    
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