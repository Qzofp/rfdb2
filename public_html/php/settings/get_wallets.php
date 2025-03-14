<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_accounts.php
 * Used in: js\settings.js
 *
 * Created on May 19, 2024
 * Updated on Feb 23, 2025
 *
 * Description: Check if the user is signed in and get the wallets from the databases tbl_wallets table.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetWallets();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetWallets
 *
 * Created on May 19, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the wallets from the databases tbl_wallets table. The account column is encrypted.
 *
 * In:  -
 * Out: -
 *
 */
function GetWallets()
{   
    $sort = filter_input(INPUT_POST, 'sort', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $response = [];
    try 
    {
        $db = OpenDatabase();
        $key = cKEY;
        
        $account = "CAST(AES_DECRYPT(tbl_accounts.`account`,'$key') AS CHAR(45))";        
        $id = "CONCAT(tbl_wallets.`id`, '_',tbl_services.`id`, '_', tbl_accounts.`id`, '_', tbl_cryptocurrenties.`id`) "; 
        $query = "SELECT $id AS id,tbl_wallets.`hide` AS hide,`service`,$account,`symbol`,tbl_wallets.`description` ". 
                 "FROM tbl_wallets ".
                 "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                 "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "ORDER BY `$sort`;";
    
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

    echo $json = json_encode($response);

    // Close database connection
    $db = null;
}