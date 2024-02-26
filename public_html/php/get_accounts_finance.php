<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_accounts_finance.php
 * Used in: js\settings.js
 *
 * Created on Feb 26, 2024
 * Updated on Feb 26, 2024
 *
 * Description: Check if the user is signed in and get the finance accounts from the databases tbl_accounts table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
$user = $_SESSION['user'];
if(!$user) 
{
    header("location:info.php");
}
else 
{
    header("Content-Type:application/json"); 
    GetAccounts("finance");
}

/*
 * Function:    GetServices
 *
 * Created on Feb 26, 2024
 * Updated on Feb 26, 2024
 *
 * Description: Get the accounts from the databases tbl_accounts table.
 *
 * In:  $type
 * Out: -
 *
 */
function GetAccounts($type)
{   
    $response = [];

    try 
    {
        $db = OpenDatabase();
     
        $query = "SELECT tbl_accounts.`id`, tbl_accounts.`hide`, tbl_accounts.`date`, tbl_services.`service`, tbl_accounts.`account`, tbl_accounts.`description` ".
                 "FROM tbl_accounts ".
                 "INNER JOIN tbl_services ON tbl_accounts.`serviceid` = tbl_services.`id` ".
                 "WHERE tbl_accounts.`type` = '$type' ".
                 "ORDER BY `date`;";
    
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