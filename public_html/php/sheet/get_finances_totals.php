<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_finances.php
 * Used in: js\sheet.js
 *
 * Created on May 05, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the finances total from the databases tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetFinancesTotals();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetFinancesTotals
 *
 * Created on May 05, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the fiannces from the databases tbl_finances table.
 *
 * In:  -
 * Out: -
 *
 */
function GetFinancesTotals()
{   
    $scale   = filter_input(INPUT_POST, 'scale'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $year    = filter_input(INPUT_POST, 'year'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $quarter = filter_input(INPUT_POST, 'quarter', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $month   = filter_input(INPUT_POST, 'month'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $name    = filter_input(INPUT_POST, 'name'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
        
        // Create select and the table.
        switch($name) 
        {
            case "finance" :
                $income  = "COALESCE(NULLIF(sum(`income`), null), '&nbsp;' ) AS `income`";
                $fixed   = "COALESCE(NULLIF(-1*sum(`fixed`), null), '&nbsp;' ) AS `fixed`";
                $other   = "COALESCE(NULLIF(-1*sum(`other`), null), '&nbsp;' ) AS `other`";
                $balance = "COALESCE(NULLIF(COALESCE(sum(`income`),0) - COALESCE(sum(`fixed`),0) - COALESCE(sum(`other`),0), 0), '&nbsp;' ) AS `balance`";                
                $select  = "$income, $fixed, $other, $balance";
                $table   = "tbl_finances";
                break;
            
            case "stock" :
                $deposit    = "COALESCE(NULLIF(sum(`deposit`), null), '&nbsp;' ) AS `deposit`";
                $withdrawal = "COALESCE(NULLIF(-1*sum(`withdrawal`), null), '&nbsp;' ) AS `withdrawal`";
                $balance    = "COALESCE(NULLIF(COALESCE(sum(`deposit`),0) - COALESCE(sum(`withdrawal`),0), 0), '&nbsp;' ) AS `balance`";
                $select     = "$deposit, $withdrawal, $balance";
                $table      = "tbl_stocks";
                break;
            
            case "savings" :
                $deposit    = "COALESCE(NULLIF(sum(`deposit`), null), '&nbsp;' ) AS `deposit`";
                $withdrawal = "COALESCE(NULLIF(-1*sum(`withdrawal`), null), '&nbsp;' ) AS `withdrawal`";
                $balance    = "COALESCE(NULLIF(COALESCE(sum(`deposit`),0) - COALESCE(sum(`withdrawal`),0), 0), '&nbsp;' ) AS `balance`";
                $select     = "$deposit, $withdrawal, $balance";
                $table      = "tbl_savings";
                break;                
                
            case "crypto" :
                $deposit    = "COALESCE(NULLIF(sum(`deposit`), null), '&nbsp;' ) AS `deposit`";
                $withdrawal = "COALESCE(NULLIF(-1*sum(`withdrawal`), null), '&nbsp;' ) AS `withdrawal`";
                $balance    = "COALESCE(NULLIF(COALESCE(sum(`deposit`),0) - COALESCE(sum(`withdrawal`),0), 0), '&nbsp;' ) AS `balance`";
                $select     = "$deposit, $withdrawal, $balance";
                $table      = "tbl_crypto";                
                break;
        }
        
        // Determine the scale.
        switch ($scale) 
        {    
            case "months" :
                $where = "WHERE year($table.`date`) = $year AND month($table.`date`) = ".$month + 1;
                break;
            
            case "quarters" :
                $where = "WHERE year($table.`date`) = $year AND quarter($table.`date`) = ".$quarter + 1;
                break;
            
            case "year" :
                $where = "WHERE year($table.`date`) = $year";
                break;         
        }
           
        $query = "SELECT $select ".
                 "FROM $table ".
                 "$where";
        
        $select = $db->prepare($query);
        $select->execute();

        $totals = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $totals; 
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