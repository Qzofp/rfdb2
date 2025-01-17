<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_value_lnchart.php
 * Used in: js\dashboard.js
 *
 * Created on Jan 10, 2025
 * Updated on Jan 17, 2025
 *
 * Description: Check if the user is signed in and get the data from the database tbl_value_accounts table
 *              for the line chart.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetValueLineChart();
}
else {
    RedirectAjaxRequest();
}

/*
 * Function:    GetValueLineChart
 *
 * Created on Jan 10, 2025
 * Updated on Jan 17, 2025
 *
 * Description: Get the data from de database tbl_value_accounts table for the line chart.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueLineChart()
{ 
    $date   = filter_input(INPUT_POST, 'date'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);      
     
    $response = [];
    try 
    {
        $db = OpenDatabase();
                          
        switch ($action) 
        {
            case "collapse" :
                $query = CreateCollapseQuery($date);  
                break;
          
            case "expand"   :  
                $query = CreateExpandQuery();
                break;    
        
            case "crypto" :    
            
                break;    
        }        
          
        $select = $db->prepare($query);
        $select->execute();    
           
        $data = $select->fetchAll(PDO::FETCH_ASSOC); 
                    
        // Debug
        $response['query'] = $query;  
            
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
 * Function:    GetInput
 *
 * Created on Aug 30, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the input from the tbl_settings and language (tbl_dutch or tbl_english) tables.
 *
 * In:  -
 * Out: $input
 *
 */
function GetInput() 
{
    $tmp = GetSettings();
    if ($tmp['success']) {
        $input = GetConfigs($tmp);
    }    
        
    return $input;
}

/*
 * Function:    GetConfigs
 *
 * Created on Aug 30, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the language configs from the (tbl_dutch or tbl_english) tables.
 *
 * In:  $data
 * Out: $data
 *
 */
function GetConfigs($data) 
{   
    try 
    {
        $db = OpenDatabase();

        // Determine the language table.
        switch ($data['code']) 
        {
            case 'NL': $table = "tbl_dutch";
                break;
            case 'EN': $table = "tbl_english";
                break;
        }
          
        $select = $db->prepare("SELECT `value` FROM `$table` WHERE `id_config` = 4;");
        $select->execute();

        $configs = $select->fetchAll(PDO::FETCH_ASSOC);  
    
        // Create an array from the configs results and remove the first item.
        $tmp = explode(",", array_values($configs[0])[0]);
        array_shift($tmp);
        
        $data['configs'] = $tmp;
        $data['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $data['message'] = $e->getMessage();
        $data['success'] = false;
    }   
    
    // Close database connection.
    $db = null;        
    
    return $data;    
}

/*
 * Function:    CreateCollapseQuery
 *
 * Created on Aug 30, 2024
 * Updated on Jan 17, 2025
 *
 * Description: Create the query to get the rows from the tbl_value_accounts for the collapse table.
 *
 * In:  $date
 * Out: $query
 *
 */
function CreateCollapseQuery($date)
{    
    $query = "Empty Query!";

    // Get the settings, e.g. the active pages (finance, stock, savings and crypto).
    $input = GetInput();   
    //$input = GetTypes($date);
    if ($input['success']) 
    {        
        $case  = "";
        $configs = $input['configs'];            
            
        $pages = ["finance","stock","savings","crypto"];        
        $i = 0;
        foreach ($input['pages'] as $key=>$value)
        {
            if ($value == "true") {
                $case .= "IFNULL(SUM(CASE WHEN `type` = '$pages[$key]' THEN `value` END),'NaN') AS `$i"."_"."$configs[$key]`,";             
            }
            $i++;
        }            
        // Remove the last comma.
        $case = substr_replace($case, '', -1);        

        $date = "`Date`";    
        if ($case) {
            $date .= ",";
        }
            
        $query = "SELECT $date $case ".
                 "FROM (".
                    "SELECT tbl_value_accounts.`date` AS `Date`, tbl_accounts.`type` AS `type`, tbl_value_accounts.`value` AS `value` ".
                    "FROM tbl_value_accounts ".
                    "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                    "UNION ".
                    "SELECT tbl_value_cryptos.`date` AS `Date`, tbl_accounts.`type` AS `type`, `amount`*`value` AS `value` ".
                    "FROM tbl_value_cryptos ".
                    "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                    "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                    "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                 ") total ".
                 "GROUP BY `Date` ".
                 "ORDER BY `Date`;";         
    }
    
    return $query;
}

/*
 * Function:    GetTypes
 *
 * Created on Jan 17, 2025
 * Updated on Jan 17, 2025
 *
 * Description: Get the types from de database tbl_value_accounts and tbl_amount_wallets table for the line chart.
 *
 * In:  $date
 * Out: $response
 *
 */
function GetTypes($date)
{
    $response = [];
    
    // Get the settings, e.g. the active pages (finance, stock, savings and crypto).
    $input = GetInput();  
    if ($input['success']) 
    {  
        try 
        {
            $db = OpenDatabase();
            
            $field = "";
            $pages = ["finance","stock","savings","crypto"];
            foreach ($input['pages'] as $key=>$value)
            {
                if ($value == "true") {
                    $field .= "'$pages[$key]',";
                }
            }      
            // Remove the last comma.
            $field = substr_replace($field, '', -1);            
            
            $query = "SELECT `id`, COUNT(`hide`) AS `hide`, `service`, ".
                        "CASE WHEN `type` = 'finance' then 0 ".
                             "WHEN `type` = 'stock'   then 1 ".
                             "WHEN `type` = 'savings' then 2 ".
                             "WHEN `type` = 'crypto'  then 3 ".
                        "END AS `type`, CAST(AES_DECRYPT(`account`, 'Put your encryption key or phrase here!') AS CHAR(45)) AS `account` ".
                     "FROM (".
                        "SELECT tbl_value_accounts.`hide` AS `hide`, tbl_value_accounts.`aid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "UNION ".
                        "SELECT tbl_amount_wallets.`hide` AS `hide`, tbl_amount_wallets.`wid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id`".
                     ") total ".
                     "WHERE `type` IN ($field) ".
                     "GROUP BY `type`, `id`, `service`, `account` ".
                     "ORDER BY FIELD(`type`, $field), `service`, `account`;";
            
            $select = $db->prepare($query);
            $select->execute();

            $accounts = $select->fetchAll(PDO::FETCH_ASSOC);  
    
            // Debug
            $response['query'] = $query;         
        
            $response['data'] = $accounts;
            $response['success'] = true;
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }   
    
        // Close database connection.
        $db = null;
    }
    else {
        $response = $input;
    }    
  
    return $response;
}

/*
 * Function:    CreateExpandQuery
 *
 * Created on Jan 15, 2025
 * Updated on Jan 17, 2025
 *
 * Description: Create the query to get the rows from the tbl_value_accounts for the expand table.
 *
 * In:  -
 * Out: $query
 *
 */
function CreateExpandQuery()
{
    $query = "Empty Query!";
    
    // Get the accounts for the the line chart.
    $input = GetAccounts();  
    if ($input['success']) 
    {  
        $case  = "";
        foreach ($input['data'] as $key=>$value)
        {
            if ($value['hide'] == 1) {
                $case .= "IFNULL(SUM(CASE WHEN `id` =".$value['id']." AND `service` = '".$value['service']."' THEN `value` END),'NaN') AS `".$value['type']."_".$value['account']."_".$value['id']."`,";       
            }
        }
        
        // Remove the last comma.
        $case = substr_replace($case, '', -1);  
        
        $date = "`Date`";    
        if ($case) {
            $date .= ",";
        }
        
        $query = "SELECT $date $case ".
                 "FROM (".
                    "SELECT tbl_value_accounts.`date` AS `Date`, tbl_value_accounts.`aid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account`, tbl_value_accounts.`value` AS `value` ".
                    "FROM tbl_value_accounts ".
                    "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                    "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                    "UNION ".
                    "SELECT tbl_value_cryptos.`date` AS `Date`, tbl_amount_wallets.`wid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account`, `amount`*`value` AS `value` ".
                    "FROM tbl_value_cryptos ".
                    "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                    "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                    "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                    "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                    "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id`".
                 ") total ".                
                 "GROUP BY `Date` ".
                 "ORDER BY `Date`;";     
    }
    
    //$query = $input['query'];
      
    return $query;
}

/*
 * Function:    GetAccounts
 *
 * Created on Jan 15, 2025
 * Updated on Jan 15, 2025
 *
 * Description: Get the accounts from de database tbl_value_accounts and tbl_amount_wallets tables for the line chart.
 *
 * In:  -
 * Out: $response
 *
 */
function GetAccounts()
{
    $response = [];
    
    // Get the settings, e.g. the active pages (finance, stock, savings and crypto).
    $input = GetInput();  
    if ($input['success']) 
    {  
        try 
        {
            $db = OpenDatabase();
            
            $field = "";
            $pages = ["finance","stock","savings","crypto"];
            foreach ($input['pages'] as $key=>$value)
            {
                if ($value == "true") {
                    $field .= "'$pages[$key]',";
                }
            }      
            // Remove the last comma.
            $field = substr_replace($field, '', -1);            
            
            $query = "SELECT `id`, COUNT(`hide`) AS `hide`, `service`, ".
                        "CASE WHEN `type` = 'finance' then 0 ".
                             "WHEN `type` = 'stock'   then 1 ".
                             "WHEN `type` = 'savings' then 2 ".
                             "WHEN `type` = 'crypto'  then 3 ".
                        "END AS `type`, CAST(AES_DECRYPT(`account`, 'Put your encryption key or phrase here!') AS CHAR(45)) AS `account` ".
                     "FROM (".
                        "SELECT tbl_value_accounts.`hide` AS `hide`, tbl_value_accounts.`aid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "UNION ".
                        "SELECT tbl_amount_wallets.`hide` AS `hide`, tbl_amount_wallets.`wid` AS `id`, tbl_services.`service` AS `service`, `type`, tbl_accounts.`account` AS `account` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id`".
                     ") total ".
                     "WHERE `type` IN ($field) ".
                     "GROUP BY `type`, `id`, `service`, `account` ".
                     "ORDER BY FIELD(`type`, $field), `service`, `account`;";
            
            $select = $db->prepare($query);
            $select->execute();

            $accounts = $select->fetchAll(PDO::FETCH_ASSOC);  
    
            // Debug
            $response['query'] = $query;         
        
            $response['data'] = $accounts;
            $response['success'] = true;
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }   
    
        // Close database connection.
        $db = null;
    }
    else {
        $response = $input;
    }

    return $response;
}

