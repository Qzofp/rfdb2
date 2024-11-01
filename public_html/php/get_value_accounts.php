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
 * Updated on Nov 01, 2024
 *
 * Description: Check if the user is signed in and get the data from de database tbl_value_accounts table.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
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
 * Updated on Oct 07, 2024
 *
 * Description: Get the data from de database tbl_value_accounts table.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueAccounts()
{    
    $date   = filter_input(INPUT_POST, 'date'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
    $action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    
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
                    $format = "en_US";
                    $date_format = "STR_TO_DATE('$date', '%m/%d/%Y')";
                    break;
            
                case "€" :
                    $format = "de_DE";
                    $date_format = "STR_TO_DATE('$date', '%d-%m-%Y')";
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
                    
            $query = CreateQuery($input['sign'], $format, $date_format, $action, $case, $field);
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
 * Function:    CreateQuery
 *
 * Created on Aug 30, 2024
 * Updated on Nov 01, 2024
 *
 * Description: Create the query to get the rows from the tbl_value_accounts.
 *
 * In:  $sign, $format, $date, $action, $case, $field
 * Out: $query
 *
 */
function CreateQuery($sign, $format, $date, $action, $case, $field)
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
        $where = "WHERE `type` IN ($field) ";
        $order = "ORDER BY FIELD(type, $field)";
    }
    else 
    {
        $where = "WHERE `type` = '' ";
        $order = "";
    }
     
    switch ($action) 
    {
        case "collapse" :
            $ratio = "IFNULL(CONCAT(FORMAT(100 * `value` / SUM(`value`) OVER(), 2, '$format'),'%'),'-') AS ratio ";
            $value = "CONCAT('$sign ', FORMAT(SUM(`value`), 2, '$format')) AS `value` ";        
            $query = "SELECT type AS id, $type, `hide`, `service` AS services, `account` AS accounts, '-' AS number, $ratio, $value ".
                     "FROM (".
                            "SELECT `type`, tbl_value_accounts.`hide` AS hide, count(DISTINCT `service`) AS `service`, count(`account`) AS `account`, SUM(IF(tbl_value_accounts.`hide` = 0, `value`, 0)) AS `value` ".
                            "FROM tbl_value_accounts ".
                            "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                            "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                            "WHERE tbl_value_accounts.`date` = $date ".
                            "GROUP BY `type`, tbl_value_accounts.`hide` ".
                            "UNION ".
                            "SELECT `type`, tbl_amount_wallets.`hide` AS hide, count(DISTINCT `service`) AS `service`, count(`account`) AS `account`, SUM(IF(tbl_amount_wallets.`hide` = 0, `amount`*`value`, 0)) AS `value` ".
                            "FROM tbl_value_cryptos ".
                            "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                            "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                            "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                            "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                            "WHERE tbl_value_cryptos.`date` = $date ".
                            "GROUP BY `type`, tbl_amount_wallets.`hide` ".
                         ") total ".
                     "$where".
                     "GROUP BY total.`type`, total.`hide`, service, account, total.`value` ".
                     "$order;";       
            break;
        
        case "expand"   :
            $key = cKEY;
            $account = "CAST(AES_DECRYPT(`account`, '$key') AS CHAR(45)) AS `account` ";
        
            $ratio  = "IFNULL(CONCAT(FORMAT(100 * `value` / SUM(`value`) OVER(), 2, '$format'), '%'),'-') AS ratio ";
            $value  = "CONCAT('$sign ', FORMAT(`value`, 2, '$format')) AS `value` ";
            $amount = "CONCAT(FORMAT(`amount`,8,'$format'), ' ', `symbol`) AS `amount` ";
      
            $query = "SELECT CONCAT(`id`, '_', `type`), $type, `hide`, `service`, $account, `amount`, $ratio, $value ".
                     "FROM (".
                        "SELECT tbl_value_accounts.`id` AS `id`, tbl_value_accounts.`hide` AS hide, `type`, tbl_services.`service` AS service, tbl_accounts.`account` AS `account`, '-' AS `amount`, IF(tbl_value_accounts.`hide` = 0, `value`, 0) AS `value` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_accounts .`date` = $date ".
                        "UNION ".
                        "SELECT tbl_amount_wallets.`id` AS `id`, tbl_amount_wallets.`hide` AS hide, `type`, tbl_services.`service` AS `service`, tbl_accounts.`account` AS `account`, $amount, IF(tbl_amount_wallets.`hide` = 0, `amount`*`value`, 0) AS `value` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_cryptos.`date` = $date ".
                     ") total ".
                     "$where".
                     "ORDER BY FIELD(`type`, 'finance', 'stock', 'savings', 'crypto'), `service`, `account`;";        
            break;
        
        case "add"      :
            $key = cKEY;
            $account = "CAST(AES_DECRYPT(`account`, '$key') AS CHAR(45)) AS `account` ";
            
            $query = "SELECT `id`, $type, `type` AS `kind`, `service`, `account` ".
                     "FROM (".
                        "SELECT tbl_accounts.`id` AS id, type, tbl_services.`service` AS `service`, $account ".
                        "FROM tbl_accounts ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE `type` NOT IN ('crypto') AND tbl_accounts.`hide` = 0 ".
                        "UNION ".
                        "SELECT `id`, 'crypto' AS `type`, `symbol`, CAST(`name` AS CHAR(45)) AS `name` ".
                        "FROM tbl_cryptocurrenties ".
                        "WHERE tbl_cryptocurrenties.`hide` = 0 ".
                     ") total ".
                     "$where".
                     "ORDER BY FIELD(type, 'finance', 'stock', 'savings', 'crypto'), `service`, `account`;";
            break;
        
        case "edit"      :
            $key = cKEY;
            $account = "CAST(AES_DECRYPT(`account`, '$key') AS CHAR(45)) AS `account` ";
            $value = "FORMAT(`value`, 2, '$format') AS `value` "; 
            
            $query = "SELECT `id`, $type, `type` AS `kind`, `service`, `account`, $value ".
                     "FROM (".
                        "SELECT tbl_value_accounts.`id` AS id, type, tbl_services.`service` AS `service`, $account, tbl_value_accounts.`value` AS `value` ".
                        "FROM tbl_accounts ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "LEFT JOIN tbl_value_accounts ON tbl_accounts.`id` = tbl_value_accounts.`aid` ".
                        "WHERE `type` NOT IN ('crypto') AND tbl_accounts.`hide` = 0  AND tbl_value_accounts.`date` = $date ".
                        "UNION ".
                        "SELECT tbl_value_cryptos.`id` AS `id`, 'crypto' AS `type`, `symbol`, CAST(`name` AS CHAR(45)) AS `name`, tbl_value_cryptos.`value` AS `value` ".
                        "FROM tbl_cryptocurrenties ".
                        "LEFT JOIN tbl_value_cryptos ON tbl_cryptocurrenties.`id` = tbl_value_cryptos.`cid` ".
                        "WHERE tbl_cryptocurrenties.`hide` = 0 AND tbl_value_cryptos.`date` = $date ".
                     ") total ".
                     "$where".
                     "ORDER BY FIELD(type, 'finance', 'stock', 'savings', 'crypto'), `service`, `account`;";
            break;        
    }
    
    return $query;
}