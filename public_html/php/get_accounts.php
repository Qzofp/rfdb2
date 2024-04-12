<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_accounts.php
 * Used in: js\settings.js
 *
 * Created on Feb 26, 2024
 * Updated on Apr 12, 2024
 *
 * Description: Check if the user is signed in and get the accounts from the databases tbl_accounts table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetAccounts();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetAccounts
 *
 * Created on Feb 26, 2024
 * Updated on Mar 29, 2024
 *
 * Description: Get the accounts from the databases tbl_accounts table.
 *
 * In:  -
 * Out: -
 *
 */
function GetAccounts()
{   
    $sort = filter_input(INPUT_POST, 'sort', FILTER_SANITIZE_STRING);
    $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING);
    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
     
        $query = "SELECT CONCAT(tbl_accounts.`id`, '_',tbl_accounts.`serviceid`) AS id,tbl_accounts.`hide`,". 
                    "DATE_FORMAT(tbl_accounts.`date`,'%d-%m-%Y'),tbl_services.`service`,tbl_accounts.`account`,".
                    "tbl_accounts.`description`".
                 "FROM tbl_accounts ".
                 "INNER JOIN tbl_services ON tbl_accounts.`serviceid` = tbl_services.`id` ".
                 "WHERE tbl_accounts.`type` = '$type' ".
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