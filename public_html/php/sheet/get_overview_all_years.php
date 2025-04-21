<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_overview_all_years.php
 * Used in: js\sheet_chart.js
 *
 * Created on Apr 19, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Check if the user is signed in and get the data from the database tbl_finances, tbl_stocks
 *              tbl_savings or tbl_crypto table for the sheets bar chart for all years.
 * 
 * Dependenties: config.php
 *
 */
require_once '../config.php';
require_once '../common.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetOverviewAllYears();
}
else {
    RedirectAjaxRequest();
}

/*
 * Function:    GetOverviewAllYears
 *
 * Created on Apr 19, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Get the data from the database tbl_finances, tbl_stocks, tbl_savings or tbl_crypto table 
 *              for the sheets bar chart for all years.
 *
 * In:  -
 * Out: -
 *
 */
function GetOverviewAllYears()
{ 
    $page  = filter_input(INPUT_POST, 'page', FILTER_SANITIZE_FULL_SPECIAL_CHARS);   

    $response = [];
    try 
    {
        $db = OpenDatabase();
                          
        switch ($page)
        {
            case "finance" :
                $query = CreateFinancesQuery(); 
                break;
          
            case "stock"   :  
                $query = CreateStocksQuery(); 
                break;    
        
            case "savings" :    
                $query = CreateSavingsQuery(); 
                break; 
            
            case "crypto"  :    
                $query = CreateCryptoQuery(); 
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
 * Created on Apr 19, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Create the query for the finance data from the tbl_finances table.
 *
 * In:  -
 * Out: $query
 *
 */
function CreateFinancesQuery()
{   
    $input = GetDateYearLimits("tbl_finances");  
    if ($input['success']) 
    {         
        $min = $input['data'][0]['min'];
        $max = $input['data'][0]['max'];
        
        // Set min and max if the values are empty.
        if ($min == null || $max == null) {
            $min = date("Y");
            $max = $min + 10;
        }
        else if ($max - $min < 10) {
            $max += 9 - $max + $min;
        }
        else {
            $max = date("Y");
        }
             
        $query = "WITH RECURSIVE all_dates(dt) AS ( ".
                    "SELECT '$min-01-01' AS dt ".
                    "UNION ALL ".
                    "SELECT dt + INTERVAL 1 YEAR FROM all_dates WHERE dt < '$max-01-01' ".
                  ") ".
                  "SELECT YEAR(d.dt) AS `year`, SUM(coalesce(f.`income`, 0)) AS `income`, SUM(coalesce(f.`fixed`, 0)) AS `fixed`, SUM(coalesce(f.`other`, 0)) AS `other` ".
                  "FROM all_dates d ".
                  "LEFT JOIN tbl_finances f ON YEAR(f.`date`) = YEAR(d.dt) ".
                  "GROUP BY `year` ".
                  "ORDER BY `year`;";     
    }
    else {
        $query = "Query Failed!";
    }    
    
    return $query;    
       
    
/*
    $query = "SELECT `year`, SUM(`income`) AS `income`, SUM(`fixed`) AS `fixed`, SUM(`other`) AS `other` ".
             "FROM (".
                "SELECT YEAR(`date`) AS `year`, SUM(`income`) AS `income`, SUM(`fixed`) AS `fixed`, SUM(`other`) AS `other` ".
                "FROM tbl_finances ".
                "GROUP BY `year` ";
                
    for ($i = 0; $i <= 10; $i++) {
        $query .= "UNION SELECT (SELECT MIN(YEAR(`date`) + $i) AS `year` FROM tbl_finances) AS `year`, 0 AS `income`, 0 AS `fixed`, 0  AS `other` ";
    }
        
    $query .= ") tmp ".
              "GROUP BY `year` ".
              "ORDER BY `year`;";
*/    
            
    return $query;
}

/*
 * Function:    CreateStocksQuery
 *
 * Created on Apr 21, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Create the query for the stock data from the tbl_stocks table.
 *
 * In:  -
 * Out: $query
 *
 */
function CreateStocksQuery()
{  
    $input = GetDateYearLimits("tbl_stocks");  
    if ($input['success']) 
    {         
        $min = $input['data'][0]['min'];
        $max = $input['data'][0]['max'];
        
        // Set min and max if the values are empty.
        if ($min == null || $max == null) {
            $min = date("Y");
            $max = $min + 10;
        }
        else if ($max - $min < 10) {
            $max += 9 - $max + $min;
        }
        else {
            $max = date("Y");
        }
             
        $query = "WITH RECURSIVE all_dates(dt) AS ( ".
                    "SELECT '$min-01-01' AS dt ".
                    "UNION ALL ".
                    "SELECT dt + INTERVAL 1 YEAR FROM all_dates WHERE dt < '$max-01-01' ".
                  ") ".
                  "SELECT YEAR(d.dt) AS `year`, SUM(coalesce(s.`deposit`, 0)) AS `deposit`, SUM(coalesce(s.`withdrawal`, 0)) AS `withdrawal` ".
                  "FROM all_dates d ".
                  "LEFT JOIN tbl_stocks s ON YEAR(s.`date`) = YEAR(d.dt) ".
                  "GROUP BY `year` ".
                  "ORDER BY `year`;";     
    }
    else {
        $query = "Query Failed!";
    }    
    
    return $query;
}

/*
 * Function:    CreateSavingsQuery
 *
 * Created on Apr 20, 2025
 * Updated on Apr 20, 2025
 *
 * Description: Create the query for the savings data from the tbl_savings table.
 *
 * In:  -
 * Out: $query
 *
 */
function CreateSavingsQuery()
{  
    $input = GetDateYearLimits("tbl_savings");  
    if ($input['success']) 
    {         
        $min = $input['data'][0]['min'];
        $max = $input['data'][0]['max'];
        
        // Set min and max if the values are empty.
        if ($min == null || $max == null) {
            $min = date("Y");
            $max = $min + 10;
        }
        else if ($max - $min < 10) {
            $max += 9 - $max + $min;
        }
        else {
            $max = date("Y");
        }
             
        $query = "WITH RECURSIVE all_dates(dt) AS ( ".
                    "SELECT '$min-01-01' AS dt ".
                    "UNION ALL ".
                    "SELECT dt + INTERVAL 1 YEAR FROM all_dates WHERE dt < '$max-01-01' ".
                  ") ".
                  "SELECT YEAR(d.dt) AS `year`, SUM(coalesce(s.`deposit`, 0)) AS `deposit`, SUM(coalesce(s.`withdrawal`, 0)) AS `withdrawal` ".
                  "FROM all_dates d ".
                  "LEFT JOIN tbl_savings s ON YEAR(s.`date`) = YEAR(d.dt) ".
                  "GROUP BY `year` ".
                  "ORDER BY `year`;";     
    }
    else {
        $query = "Query Failed!";
    }    
    
    return $query;
}

/*
 * Function:    CreateCryptoQuery
 *
 * Created on Apr 21, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Create the query for the crypto data from the tbl_crypto table.
 *
 * In:  
 * Out: $query
 *
 */
function CreateCryptoQuery()
{  
    $input = GetDateYearLimits("tbl_crypto");  
    if ($input['success']) 
    {         
        $min = $input['data'][0]['min'];
        $max = $input['data'][0]['max'];
        
        // Set min and max if the values are empty.
        if ($min == null || $max == null) {
            $min = date("Y");
            $max = $min + 10;
        }
        else if ($max - $min < 10) {
            $max += 9 - $max + $min;
        }
        else {
            $max = date("Y");
        }
             
        $query = "WITH RECURSIVE all_dates(dt) AS ( ".
                    "SELECT '$min-01-01' AS dt ".
                    "UNION ALL ".
                    "SELECT dt + INTERVAL 1 YEAR FROM all_dates WHERE dt < '$max-01-01' ".
                  ") ".
                  "SELECT YEAR(d.dt) AS `year`, SUM(coalesce(c.`deposit`, 0)) AS `deposit`, SUM(coalesce(c.`withdrawal`, 0)) AS `withdrawal` ".
                  "FROM all_dates d ".
                  "LEFT JOIN tbl_crypto c ON YEAR(c.`date`) = YEAR(d.dt) ".
                  "GROUP BY `year` ".
                  "ORDER BY `year`;";     
    }
    else {
        $query = "Query Failed!";
    }    
    
    return $query;    
}

/*
 * Function:    GetDateYearLimits
 *
 * Created on Apr 20, 2025
 * Updated on Apr 21, 2025
 *
 * Description: Get the date year limits (min and max) from a table with a `date` column.
 *
 * In:  $table
 * Out: $results
 *
 */
function GetDateYearLimits($table)
{
    $results = [];
          
    try 
    {
        $db = OpenDatabase();
            
        $query = "SELECT MIN(YEAR(`date`)) AS min, MAX(YEAR(`date`)) AS max ".
                 "FROM $table";
            
            $select = $db->prepare($query);
            $select->execute();

            $limits = $select->fetchAll(PDO::FETCH_ASSOC);  
    
            // Debug
            //$response['query'] = $query;         
        
            $results['data'] = $limits;
            $results['success'] = true;
        }
    catch (PDOException $e) 
    {    
        $results['message'] = $e->getMessage();
        $results['success'] = false;
    }   
    
    // Close database connection.
    $db = null;
 
    return $results;
}