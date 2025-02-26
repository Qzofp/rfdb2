<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_finances.php
 * Used in: js\sheet.js
 *
 * Created on Apr 26, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the finances from the databases tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
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
 * Updated on Sep 18, 2024
 *
 * Description: Get the finances from the databases tbl_finances table. The account column is encrypted.
 *
 * In:  -
 * Out: -
 *
 */
function GetFinances()
{   
    $scale   = filter_input(INPUT_POST, 'scale'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $year    = filter_input(INPUT_POST, 'year'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $quarter = filter_input(INPUT_POST, 'quarter', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $month   = filter_input(INPUT_POST, 'month'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $sign    = filter_input(INPUT_POST, 'sign'   , FILTER_SANITIZE_SPECIAL_CHARS);
    $sort    = filter_input(INPUT_POST, 'sort'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $name    = filter_input(INPUT_POST, 'name'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
        $key = cKEY;
        
        // Determine the date and currency format.
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $format = "en_US";
                $date_format = "%m/%d/%Y";
                break;
            
            case "€"  :
                $format = "de_DE";   
                $date_format = "%d-%m-%Y";
                break;
        } 
         
        // Create the first part of the query.
        $account = "CAST(AES_DECRYPT(tbl_accounts.`account`,'$key') AS CHAR(45))";
        switch($name) 
        {
            case "finance" :
                $id      = "CONCAT(tbl_finances.id, '_',tbl_finances.aid, '_', tbl_businesses.gid, '_', tbl_finances.bid)";
                $date    = "DATE_FORMAT(tbl_finances.`date`,'$date_format') AS `date`";
                $income  = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`income`,2,'$format'), null )), '') AS `income`";
                $fixed   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`fixed`,2,'$format'), null )), '') AS `fixed`";
                $other   = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`other`,2,'$format'), null )), '') AS `other`";                  
                $table   = "tbl_finances";    
                
                $query = "SELECT $id AS id, $date, $account AS account, $income, $fixed, $other, `group`, `business`, tbl_finances.`description` ".
                         "FROM tbl_finances ".
                         "LEFT JOIN tbl_accounts ON tbl_finances.aid = tbl_accounts.id ".
                         "LEFT JOIN tbl_businesses ON tbl_finances.bid = tbl_businesses.id ".
                         "LEFT JOIN tbl_groups ON tbl_businesses.gid = tbl_groups.id ";            
                break;
            
            case "stock" :
                $id         = "CONCAT(tbl_stocks.id, '_', tbl_services.id, '_', tbl_accounts.id)";
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`deposit`,2,'$format'), null )), '') AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`withdrawal`,2,'$format'), null )), '') AS `withdrawal`";
                $date       = "DATE_FORMAT(tbl_stocks.`date`,'$date_format') AS `date`";
                $table      = "tbl_stocks";
                
                $query = "SELECT $id AS id, $date, $deposit, $withdrawal, `service`, $account AS account, tbl_stocks.`description` ".
                         "FROM tbl_stocks ".
                         "LEFT JOIN tbl_accounts ON tbl_stocks.`aid` = tbl_accounts.`id` ".
                         "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ";
                break;
            
            case "savings" :
                $id         = "CONCAT(tbl_savings.id, '_', tbl_services.id, '_', tbl_accounts.id)";
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`deposit`,2,'$format'), null )), '') AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`withdrawal`,2,'$format'), null )), '') AS `withdrawal`";
                $date       = "DATE_FORMAT(tbl_savings.`date`,'$date_format') AS `date`";
                $table      = "tbl_savings";
                
                $query = "SELECT $id AS id, $date, $deposit, $withdrawal, `service`, $account AS account, tbl_savings.`description` ".
                         "FROM tbl_savings ".
                         "LEFT JOIN tbl_accounts ON tbl_savings.`aid` = tbl_accounts.`id` ".
                         "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ";
                break;  
            
            case "crypto" :
                $id         = "CONCAT(tbl_crypto.id, '_', tbl_services.id, '_', tbl_accounts.id, '_', tbl_cryptocurrenties.`id`)";
                $deposit    = "COALESCE(CONCAT('$sign ', NULLIF(FORMAT(`deposit`,2,'$format'), null )), '') AS `deposit`";
                $withdrawal = "COALESCE(CONCAT('$sign -', NULLIF(FORMAT(`withdrawal`,2,'$format'), null )), '') AS `withdrawal`";
                $amount     = "COALESCE(NULLIF(FORMAT(`amount`,8,'$format'), null ), ' ')";
                $date       = "DATE_FORMAT(tbl_crypto.`date`,'$date_format') AS `date`";
                $table      = "tbl_crypto";
                
                $query = "SELECT $id AS id, $date, $deposit, $withdrawal, `service`, $account AS account, $amount, `symbol`, tbl_crypto.`description` ".
                         "FROM tbl_crypto ".
                         "LEFT JOIN tbl_wallets ON tbl_crypto.`wid` = tbl_wallets.`id` ".
                         "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                         "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                         "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ";
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