<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_finances.php
 * Used in: js\dashboard.js
 *
 * Created on Sep 06, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the value totals from the databases tbl_value_accounts 
 *              and tbl_value_cryptos tables.
 * 
 * Dependenties: config.php
 *
 */
require_once '../config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetValueTotals();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetValueTotals
 *
 * Created on Sep 06, 2024
 * Updated on Oct 14, 2024
 *
 * Description: Get the value totals from the databases tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueTotals()
{   
    $date = filter_input(INPUT_POST, 'date' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // Get the settings, e.g. currency sign and the active pages (finance, stock, savings and crypto).
    $input = GetSettings();  
    if ($input['success']) 
    {
        try 
        {
            $db = OpenDatabase();
        
            // Determine the data format.
            $sign = $input['sign'];
            switch ($sign)
            {
                case "$" :
                case "£" :
                    $format = "en_US";
                    $date_format = "STR_TO_DATE('$date', '%m/%d/%Y')";
                    break;
            
                case "€"  :
                    $format = "de_DE";
                    $date_format = "STR_TO_DATE('$date', '%d-%m-%Y')";
                    break;               
            }
            
            // Determine the which value accounts are selected, based on the active pages.
            $i = 0;
            $field = "";
            $pages = ["finance","stock","savings","crypto"];
            foreach ($input['pages'] as $key=>$value)
            {
                if ($value == "true") 
                {
                    $field .= "'$pages[$key]',";
                    $i++;
                }
            }          
            // Remove the last comma.
            $field = substr_replace($field, '', -1);            
            if ($field) {
                $type = "`type` IN ($field)";
            }
            else {
                $type = "`type` = ''";
            }
                                
            $ratio = "COALESCE(IF(SUM(`ratio`) >= 50, 100, null), '&nbsp;') AS ratio";
            $value = "COALESCE(NULLIF(SUM(`value`), null), '&nbsp;') AS `value`";
            $query = "SELECT $ratio, $value ".
                     "FROM (".
                        "SELECT IF(SUM(`value`), 50, null) AS `ratio`, SUM(`value`) AS `value` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "WHERE $type AND tbl_value_accounts.`hide` = 0 AND tbl_value_accounts .`date` = $date_format ".
                        "UNION ".
                        "SELECT IF(SUM(`value`), 50, null) AS `ratio`, SUM(`amount`*`value`) AS `value` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "WHERE $type AND tbl_amount_wallets.`hide` = 0 AND tbl_value_cryptos.`date` = $date_format".
                     ") total;";            
               
            $select = $db->prepare($query);
            $select->execute();
            $totals = $select->fetchAll(PDO::FETCH_ASSOC);  

            // Debug
            //$response['query'] = $query;              
                       
            $response['data'] = $totals; 
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