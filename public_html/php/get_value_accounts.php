<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_value_accounts.php
 * Used in: js\dashboard.js
 *
 * Created on Aug 28, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Check if the user is signed in and get the data from de database tbl_value_accounts table.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetValueAccounts();
}
else {
    RedirectAjaxRequest();
}
 
/*
 * Function:    GetValueAccounts
 *
 * Created on Aug 28, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the data from de database tbl_value_accounts table.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueAccounts()
{    
    $date  = filter_input(INPUT_POST, 'date' , FILTER_SANITIZE_STRING);    
    $group = filter_input(INPUT_POST, 'group', FILTER_SANITIZE_STRING);  
    
    // Get the settings, e.g. currency sign and the active pages (finance, stock, savings and crypto).
    $input = GetInput();  
    if ($input['success']) 
    {
        try 
        {
            $db = OpenDatabase();

            // Determine the data format.
            switch ($input['sign'])
            {
                case "$" :
                case "£" :
                    $format = "STR_TO_DATE('$date', '%m/%d/%Y')";
                    break;
            
                case "€"  :
                    $format = "STR_TO_DATE('$date', '%d-%m-%Y')";
                    break;               
            }
            
            // Determine the which value accounts are selected, based on the active pages.
            $case  = "";
            $configs = $input['configs'];
            $field = "";
            $pages = ["finance","stock","savings","crypto"];
            foreach ($input['pages'] as $key=>$value)
            {
                if ($value == "true") 
                {
                    $case  .= "WHEN `type` = '$pages[$key]' then '$configs[$key]' ";
                    $field .= "'$pages[$key]',";
                }
            }            
            // Remove the last comma.
            $field = substr_replace($field, '', -1);
                    
            $query = CreateQuery($format, $group, $case, $field);
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC); 
                    
            // Debug
            //$response['query']   = $query;  
            //$response = $input; // debug.
            
            $response['data'] = $data;
            $response['success'] = true;
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
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
 * Function:    GetSettings
 *
 * Created on Aug 28, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the settings from the tbl_settings table, e.g. currency sign and the active pages.
 *
 * In:  -
 * Out: $data
 *
 */
function GetSettings() 
{   
    $data = [];
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare("SELECT `name`, `value` FROM `tbl_settings`;");
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
    
        // Get the currency sign from the tbl_settings table to determine the date format.
        foreach($settings as $row=>$link) 
        {            
            $json = json_decode($link['value']);
            switch ($link['name'])
            {
                case "settings" :
                    $sign = $json->sign;                    
                    break;
                
                case "finance" :
                    $finance = $json->page;
                    break;
                
                case "stock" :
                    $stock = $json->page;
                    break;

                case "savings" :
                    $savings = $json->page;
                    break;

                case "crypto" :
                    $crypto = $json->page;
                    break;                
                
                case "language" :
                    $code = $json->code;
                    break;                   
            }            
        }
        
        $data['sign']    = $sign;
        $data['pages']   = [$finance, $stock, $savings, $crypto];
        $data['code']    = $code;
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
 * Function:    CreateQuery
 *
 * Created on Aug 30, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Create the query to get the rows from the tbl_value_accounts.
 *
 * In:  $format, $group, $case, $field
 * Out: $query
 *
 */
function CreateQuery($format, $group, $case, $field)
{
    $query = "";
    
    if ($case) {
        $type = "CASE $case END AS `type`";
    }
    else {
        $type = "`type`";
    }
    
    
    
    if ($field) 
    {
        $where = "WHERE type IN ($field) ";
        $order = "ORDER BY FIELD(type, $field) ";
    }
    else 
    {
        $where = "WHERE type = '' ";
        $order = "";
    }
     
    if ($group) 
    {
        $query = "SELECT type AS id, $type, hide, `service` AS services, `account` AS accounts, '-' AS number, ".
                        "ROUND(100 * `value` / SUM(`value`) OVER (),2) ratio, SUM(`value`) AS `value` ".
                 "FROM (".
                        "SELECT type, tbl_value_accounts.`hide` AS hide, count(DISTINCT `service`) AS `service`, count(`account`) AS `account`, SUM(IF(tbl_value_accounts.`hide` = 0, `value`, 0)) AS `value` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_accounts.`date` = $format ".
                        "GROUP BY type ".
                        "UNION ".
                        "SELECT type, tbl_amount_wallets.`hide` AS hide, count(DISTINCT `service`) AS `service`, count(`account`) AS `account`, ROUND(SUM(IF(tbl_amount_wallets.`hide` = 0, amount*`value`, 0)),2) AS `value` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_cryptos.`date` = $format ".
                        "GROUP BY type ".
                 ") total ".
                 "$where ".
                 "GROUP BY service, account, total.`value`".
                 "$order;";
    }
    else
    {
        
    }
    
    return $query;
}