<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_overview_year.php
 * Used in: js\sheet_chart.js
 *
 * Created on Feb 12, 2025
 * Updated on Apr 19, 2025
 *
 * Description: Check if the user is signed in and get the data from the database tbl_finances, tbl_stocks
 *              tbl_savings or tbl_crypto table for the sheets bar chart.
 * 
 * Dependenties: config.php
 *
 */
require_once '../config.php';
require_once '../common.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetOverviewYear();
}
else {
    RedirectAjaxRequest();
}

/*
 * Function:    GetOverviewYear
 *
 * Created on Feb 12, 2025
 * Updated on Feb 17, 2025
 *
 * Description: Get the data from the database tbl_finances, tbl_stocks, tbl_savings or tbl_crypto table 
 *              for the sheets bar chart.
 *
 * In:  -
 * Out: -
 *
 */
function GetOverviewYear()
{ 
    $page  = filter_input(INPUT_POST, 'page' , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $year  = filter_input(INPUT_POST, 'year' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $scale = filter_input(INPUT_POST, 'scale', FILTER_SANITIZE_FULL_SPECIAL_CHARS);    

    $response = [];
    try 
    {
        $db = OpenDatabase();
                          
        switch ($page)
        {
            case "finance" :
                $query = CreateFinancesQuery($year, $scale); 
                break;
          
            case "stock"   :  
                $query = CreateStocksQuery($year, $scale); 
                break;    
        
            case "savings" :    
                $query =  CreateSavingsQuery($year, $scale); 
                break; 
            
            case "crypto" :    
                $query =  CreateCryptoQuery($year, $scale); 
                break;                
        }        
          
        $select = $db->prepare($query);
        $select->execute();    
         
        $data = $select->fetchAll(PDO::FETCH_ASSOC); 
                    
        // Debug
        //$response['query'] = $query;  
            
        $response['data'] = $data;
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

/*
 * Function:    CreateFinancesQuery
 *
 * Created on Feb 12, 2025
 * Updated on Feb 15, 2025
 *
 * Description: Create the query for the finance data from the tbl_finances table.
 *
 * In:  $year, $scale
 * Out: $query
 *
 */
function CreateFinancesQuery($year, $scale)
{  
    $sc = "";
    switch ($scale)
    {
        case "months" : 
            $sc = "MONTH(`date`)"; 
            $n = 12;
            break;
        
        case "quarters" :
            $sc = "QUARTER(`date`)"; 
            $n = 4;
            break;

        case "year" :
            $sc = "1";
            $n = 1;
            break;        
    }
 
    $query = "SELECT SUM(`income`) AS `income`, SUM(`fixed`) AS `fixed`, SUM(`other`) AS `other` ".
             "FROM (".
                "SELECT $sc AS `row`, SUM(`income`) AS `income`, SUM(`fixed`) AS `fixed`, SUM(`other`) AS `other` ".
                "FROM tbl_finances ".
                "WHERE YEAR(`date`) = $year ".
                "GROUP BY `row` ";
                
    for ($i = 1; $i <= $n; $i++) {
        $query .= "UNION SELECT $i AS `row`, 0 AS `income`, 0 AS `fixed`, 0  AS `other` ";
    }
        
    $query .= ") tmp ".
              "GROUP BY `row` ".
              "ORDER BY `row`;";
            
    return $query;
}

/*
 * Function:    CreateStocksQuery
 *
 * Created on Feb 14, 2025
 * Updated on Feb 15, 2025
 *
 * Description: Create the query for the stock data from the tbl_stocks table.
 *
 * In:  $year, $scale
 * Out: $query
 *
 */
function CreateStocksQuery($year, $scale)
{  
    $sc = "";
    switch ($scale)
    {
        case "months" : 
            $sc = "MONTH(`date`)"; 
            $n = 12;
            break;
        
        case "quarters" :
            $sc = "QUARTER(`date`)"; 
            $n = 4;
            break;

        case "year" :
            $sc = "1";
            $n = 1;
            break;        
    }
    
    $query = "SELECT SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
             "FROM (".
                "SELECT $sc AS `row`, SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
                "FROM tbl_stocks ".
                "WHERE YEAR(`date`) = $year ".
                "GROUP BY `row` ";
                
    for ($i = 1; $i <= $n; $i++) {
        $query .= "UNION SELECT $i AS `row`, 0 AS `deposit`, 0 AS `withdrawal` ";
    }
        
    $query .= ") tmp ".
              "GROUP BY `row` ".
              "ORDER BY `row`;";
              
    return $query;
}

/*
 * Function:    CreateSavingsQuery
 *
 * Created on Feb 14, 2025
 * Updated on Feb 15, 2025
 *
 * Description: Create the query for the savings data from the tbl_savings table.
 *
 * In:  $year, $scale
 * Out: $query
 *
 */
function CreateSavingsQuery($year, $scale)
{  
    $sc = "";
    switch ($scale)
    {
        case "months" : 
            $sc = "MONTH(`date`)"; 
            $n = 12;
            break;
        
        case "quarters" :
            $sc = "QUARTER(`date`)"; 
            $n = 4;
            break;

        case "year" :
            $sc = "1";
            $n = 1;
            break;        
    }
    
    $query = "SELECT SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
             "FROM (".
                "SELECT $sc AS `row`, SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
                "FROM tbl_savings ".
                "WHERE YEAR(`date`) = $year ".
                "GROUP BY `row` ";
                
    for ($i = 1; $i <= $n; $i++) {
        $query .= "UNION SELECT $i AS `row`, 0 AS `deposit`, 0 AS `withdrawal` ";
    }
        
    $query .= ") tmp ".
              "GROUP BY `row` ".
              "ORDER BY `row`;";
              
    return $query;
}

/*
 * Function:    CreateCryptoQuery
 *
 * Created on Feb 14, 2025
 * Updated on Feb 15, 2025
 *
 * Description: Create the query for the crypto data from the tbl_crypto table.
 *
 * In:  $year, $scale
 * Out: $query
 *
 */
function CreateCryptoQuery($year, $scale)
{  
    $sc = "";
    switch ($scale)
    {
        case "months" : 
            $sc = "MONTH(`date`)"; 
            $n = 12;
            break;
        
        case "quarters" :
            $sc = "QUARTER(`date`)"; 
            $n = 4;
            break;

        case "year" :
            $sc = "1";
            $n = 1;
            break;        
    }
    
    $query = "SELECT SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
             "FROM (".
                "SELECT $sc AS `row`, SUM(`deposit`) AS `deposit`, SUM(`withdrawal`) AS `withdrawal` ".
                "FROM tbl_crypto ".
                "WHERE YEAR(`date`) = $year ".
                "GROUP BY `row` ";
                
    for ($i = 1; $i <= $n; $i++) {
        $query .= "UNION SELECT $i AS `row`, 0 AS `deposit`, 0 AS `withdrawal` ";
    }
        
    $query .= ") tmp ".
              "GROUP BY `row` ".
              "ORDER BY `row`;";
              
    return $query;
}