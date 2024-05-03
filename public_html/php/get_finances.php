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
 * Updated on May 03, 2024
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
 * Updated on May 03, 2024
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
        
        // COALESCE(NULLIF(fixed, 0), ' ')
        
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $income = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`income`,2,'en_US'), 0 )), ' ' ) AS `income`";
                $fixed  = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`fixed`,2,'en_US'), 0 )), ' ' ) AS `fixed`";
                $other  = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`other`,2,'en_US'), 0 )), ' ' ) AS `other`";
                break;
            
            case "€"  :
                $income = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`income`,2,'de_DE'), 0 )), ' ' ) AS `income`";
                $fixed  = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`fixed`,2,'de_DE'), 0 )), ' ' ) AS `fixed`";
                $other  = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`other`,2,'de_DE'), 0 )), ' ' ) AS `other`";                
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
           
        $query = "SELECT tbl_finances.id, $date, `account`, $income, $fixed, $other, `group`, `business`, tbl_finances.`description` ".
                 "FROM tbl_finances ".
                 "LEFT JOIN tbl_accounts ON tbl_finances.aid = tbl_accounts.id ".
                 "LEFT JOIN tbl_businesses ON tbl_finances.bid = tbl_businesses.id ".
                 "LEFT JOIN tbl_groups ON tbl_businesses.gid = tbl_groups.id ".
                 "$where ".
                 "ORDER BY tbl_finances.`$sort`";
        
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