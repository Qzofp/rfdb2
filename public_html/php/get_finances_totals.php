<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_finances.php
 * Used in: js\settings.js
 *
 * Created on May 05, 2024
 * Updated on May 13, 2024
 *
 * Description: Check if the user is signed in and get the finances total from the databases tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
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
 * Updated on May 13, 2024
 *
 * Description: Get the fiannces from the databases tbl_finances table.
 *
 * In:  -
 * Out: -
 *
 */
function GetFinancesTotals()
{   
    $scale   = filter_input(INPUT_POST, 'scale'  , FILTER_SANITIZE_STRING);
    $year    = filter_input(INPUT_POST, 'year'   , FILTER_SANITIZE_STRING);
    $quarter = filter_input(INPUT_POST, 'quarter', FILTER_SANITIZE_STRING);
    $month   = filter_input(INPUT_POST, 'month'  , FILTER_SANITIZE_STRING);
    $sign    = filter_input(INPUT_POST, 'sign'   , FILTER_SANITIZE_STRING);
    $name    = filter_input(INPUT_POST, 'name'   , FILTER_SANITIZE_STRING);
    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
         
        // Determine the currency format.
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $format = "en_US";
                break;
            
            case "€"  :
                $format = "de_DE";       
                break;
        }  
        
        // Create select and the table.
        switch($name) 
        {
            case "finance" :
                $income  = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(sum(`income`),2,'$format'), 0 )), '&nbsp;' ) AS `income`";
                $fixed   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`fixed`),2,'$format'), 0 )), '&nbsp;' ) AS `fixed`";
                $other   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`other`),2,'$format'), 0 )), '&nbsp;' ) AS `other`";
                $balance = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT((COALESCE(sum(`income`),0) - COALESCE(sum(`fixed`),0) - COALESCE(sum(`other`),0)),2,'$format'), 0 )), '&nbsp;' ) AS `balance`";                
                $select  = "$income, $fixed, $other, $balance";
                $table   = "tbl_finances";
                break;
            
            case "stock" :
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(sum(`deposit`),2,'$format'), 0 )), '&nbsp;' ) AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`withdrawal`),2,'$format'), 0 )), '&nbsp;' ) AS `withdrawal`";
                $balance    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT((COALESCE(sum(`deposit`),0) - COALESCE(sum(`withdrawal`),0)),2,'$format'), 0 )), '&nbsp;' ) AS `balance`";
                $select     = "$deposit, $withdrawal, $balance";
                $table      = "tbl_stocks";
                break;
            
            case "savings" :
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(sum(`deposit`),2,'$format'), 0 )), '&nbsp;' ) AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`withdrawal`),2,'$format'), 0 )), '&nbsp;' ) AS `withdrawal`";
                $balance    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT((COALESCE(sum(`deposit`),0) - COALESCE(sum(`withdrawal`),0)),2,'$format'), 0 )), '&nbsp;' ) AS `balance`";
                $select     = "$deposit, $withdrawal, $balance";
                $table      = "tbl_savings";
                break;                
                
            case "crypto" :
                
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
        
        //$response['query'] = $query;
 
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