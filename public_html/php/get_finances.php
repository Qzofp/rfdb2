<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_finances.php
 * Used in: js\settings.js
 *
 * Created on Apr 26, 2024
 * Updated on May 13, 2024
 *
 * Description: Check if the user is signed in and get the finances from the databases tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetFinances();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetFinances
 *
 * Created on Apr 26, 2024
 * Updated on May 13, 2024
 *
 * Description: Get the fiannces from the databases tbl_finances table.
 *
 * In:  -
 * Out: -
 *
 */
function GetFinances()
{   
    $scale   = filter_input(INPUT_POST, 'scale'  , FILTER_SANITIZE_STRING);
    $year    = filter_input(INPUT_POST, 'year'   , FILTER_SANITIZE_STRING);
    $quarter = filter_input(INPUT_POST, 'quarter', FILTER_SANITIZE_STRING);
    $month   = filter_input(INPUT_POST, 'month'  , FILTER_SANITIZE_STRING);
    $sign    = filter_input(INPUT_POST, 'sign'   , FILTER_SANITIZE_STRING);
    $sort    = filter_input(INPUT_POST, 'sort'   , FILTER_SANITIZE_STRING);
    $name    = filter_input(INPUT_POST, 'name'   , FILTER_SANITIZE_STRING);
    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
     
        // Formats for date and currency.
        if ($sign == "$" ) {
            $date = "DATE_FORMAT(tbl_finances.`date`,'%m-%d-%Y') AS `date`";
        }
        else {
            $date = "DATE_FORMAT(tbl_finances.`date`,'%d-%m-%Y') AS `date`";   
        }
        
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
         
        // Create the first part of the query.
        switch($name) 
        {
            case "finance" :
                $income  = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`income`,2,'$format'), 0 )), ' ') AS `income`";
                $fixed   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`fixed`,2,'$format'), 0 )), ' ') AS `fixed`";
                $other   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`other`,2,'$format'), 0 )), ' ') AS `other`";                              
                $table   = "tbl_finances";          
                $query = "SELECT tbl_finances.id, $date, `account`, $income, $fixed, $other, `group`, `business`, tbl_finances.`description` ".
                         "FROM tbl_finances ".
                         "LEFT JOIN tbl_accounts ON tbl_finances.aid = tbl_accounts.id ".
                         "LEFT JOIN tbl_businesses ON tbl_finances.bid = tbl_businesses.id ".
                         "LEFT JOIN tbl_groups ON tbl_businesses.gid = tbl_groups.id ";            
                break;
            
            case "stock" :
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`deposit`,2,'$format'), 0 )), ' ') AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`withdrawal`,2,'$format'), 0 )), ' ') AS `withdrawal`";
                $table      = "tbl_stocks";
                $query = "SELECT tbl_stocks.`id`, tbl_stocks.`date`, $deposit, $withdrawal, `service`, `account`, tbl_stocks.`description` ".
                         "FROM tbl_stocks ".
                         "LEFT JOIN tbl_accounts ON tbl_stocks.`aid` = tbl_accounts.`id` ".
                         "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ";
                break;
            
            case "savings" :
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`deposit`,2,'$format'), 0 )), ' ') AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`withdrawal`,2,'$format'), 0 )), ' ') AS `withdrawal`";
                $table      = "tbl_savings";
                $query = "SELECT tbl_savings.`id`, tbl_savings.`date`, $deposit, $withdrawal, `service`, `account`, tbl_savings.`description` ".
                         "FROM tbl_savings ".
                         "LEFT JOIN tbl_accounts ON tbl_savings.`aid` = tbl_accounts.`id` ".
                         "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ";
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
        
        // Determine the sort order.
        $sortid = "$table.`id`";
        if(str_contains($sort, "DESC")) {
            $sortid = "$table.`id` DESC";
        }           
             
        // Complete the query by adding the last part.
        $query .= "$where ".
                  "ORDER BY $table.$sort, $sortid";
        
        $select = $db->prepare($query);
        $select->execute();

        $finances = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $finances;    
 
        // Debug
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