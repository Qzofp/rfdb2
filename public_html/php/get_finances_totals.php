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
 * Updated on May 06, 2024
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
 * Updated on May 06, 2024
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
        
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $income  = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(sum(`income`),2,'en_US'), 0 )), '&nbsp;' ) AS `income`";
                $fixed   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`fixed`),2,'en_US'), 0 )), '&nbsp;' ) AS `fixed`";
                $other   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`other`),2,'en_US'), 0 )), '&nbsp;' ) AS `other`";
                $balance = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT((sum(`income`) - sum(`fixed`) - sum(`other`)),2,'en_US'), 0 )), '&nbsp;' ) AS `balance`";
                break;
            
            case "€"  :
                $income  = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(sum(`income`),2,'de_DE'), 0 )), '&nbsp;' ) AS `income`";
                $fixed   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`fixed`),2,'de_DE'), 0 )), '&nbsp;' ) AS `fixed`";
                $other   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(sum(`other`),2,'de_DE'), 0 )), '&nbsp;' ) AS `other`";
                $balance = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT((sum(`income`) - sum(`fixed`) - sum(`other`)),2,'de_DE'), 0 )), '&nbsp;' ) AS `balance`";          
                break;
        }  
        
        switch ($scale) 
        {    
            case "months" :
                $where = "WHERE year(tbl_finances.`date`) = $year AND month(tbl_finances.`date`) = ".$month + 1;
                break;
            
            case "quarters" :
                $where = "WHERE year(tbl_finances.`date`) = $year AND quarter(tbl_finances.`date`) = ".$quarter + 1;
                break;
            
            case "year" :
                $where = "WHERE year(tbl_finances.`date`) = $year";
                break;         
        }
           
        $query = "SELECT $income, $fixed, $other, $balance ".
                 "FROM tbl_finances ".
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