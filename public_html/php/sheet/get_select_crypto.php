<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_select_crypto.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 27, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the select menus for the crypto sheet popup.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
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
 * Created on Jul 27, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the select menu from the databases tbl_wallets table.
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
        
        case "crypto" :
            $response = GetCryptoMenu($id);
            break;
    }
    
    echo $json = json_encode($response); 
}

/*
 * Function:    GetServiceMenu
 *
 * Created on Jul 27, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select service menu from the databases tbl_wallets table.
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
           
        $query = "SELECT tbl_services.`id` AS id, `service` ". 
                 "FROM tbl_wallets ".
                 "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                 "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "WHERE tbl_wallets.`hide` = 0 ".
                 "GROUP BY id ".
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
 * Description: Get the select account menu from the databases tbl_wallets table. The account column is encrypted.
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
                 "FROM tbl_wallets ".
                 "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                 "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "WHERE tbl_wallets.`hide` = 0 AND tbl_services.`id` = $id ".
                 "GROUP BY id ".
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

/*
 * Function:    GetCryptoMenu
 *
 * Created on Jul 27, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select crypto (symbol) menu from the databases tbl_wallets table.
 *
 * In:  $id
 * Out: $response
 *
 */
function GetCryptoMenu($id)
{
    $response = []; 
    try 
    {
        $db = OpenDatabase();
           
        $query = "SELECT tbl_cryptocurrenties.`id` AS id,`symbol` ". 
                 "FROM tbl_wallets ".
                 "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                 "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "WHERE tbl_wallets.`hide` = 0 AND tbl_accounts.`id` = $id ".
                 "GROUP BY id ".
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