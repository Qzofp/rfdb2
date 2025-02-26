<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    get_value_dgchart.php
 * Used in: js\dashboard.js
 *
 * Created on Dec 24, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Check if the user is signed in and get the data from the database tbl_value_accounts table
 *              for the doughnut chart.
 * 
 * Dependenties: config.php
 *
 */
require_once '../config.php';
require_once '../common.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetValueDoughnutChart();
}
else {
    RedirectAjaxRequest();
}

/*
 * Function:    GetValueDoughnutChart
 *
 * Created on Dec 24, 2024
 * Updated on Jan 15, 2025
 *
 * Description: Get the data from de database tbl_value_accounts table for the doughnut chart.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueDoughnutChart()
{    
    $date   = filter_input(INPUT_POST, 'date'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
    $action = filter_input(INPUT_POST, 'action', FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    
    // Get the settings, e.g. currency sign and the active pages (finance, stock, savings and crypto).
    $input = GetInput();  
    if ($input['success']) 
    {
        $response = [];
        try 
        {
            $db = OpenDatabase();

            // Determine the data format.
            switch ($input['sign'])
            {
                case "$" :
                case "£" :
                    $date_format = "STR_TO_DATE('$date', '%m/%d/%Y')";
                    break;
            
                case "€" :
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
                    
            $query = CreateQuery($date_format, $action, $case, $field);
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
 * Updated on Feb 19, 2025
 *
 * Description: Create the query to get the rows from the tbl_value_accounts.
 *
 * In:  $date, $action, $case, $field
 * Out: $query
 *
 */
function CreateQuery($date, $action, $case, $field)
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
        $where = "WHERE `type` IN ($field) AND `hide` = 0 ";
        $order = "ORDER BY FIELD(type, $field)";
    }
    else 
    {
        $where = "WHERE `type` = '' AND `hide` = 0 ";
        $order = "";
    }
     
    switch ($action) 
    {
        case "collapse" :
            $ratio = "IFNULL(FORMAT(100 * `value` / SUM(`value`) OVER(), 2),'0') AS ratio ";
            $value = "FORMAT(SUM(`value`), 2) AS `value` ";   
            $query = "SELECT type AS id, $type, $ratio, $value ".
                     "FROM (".
                            "SELECT `type`, tbl_value_accounts.`hide` AS hide, SUM(IF(tbl_value_accounts.`hide` = 0, `value`, 0)) AS `value` ".
                            "FROM tbl_value_accounts ".
                            "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                            "WHERE tbl_value_accounts.`date` = $date ".
                            "GROUP BY `type`, tbl_value_accounts.`hide` ".
                            "UNION ".
                            "SELECT `type`, tbl_amount_wallets.`hide` AS hide, SUM(IF(tbl_amount_wallets.`hide` = 0, `amount`*`value`, 0)) AS `value` ".
                            "FROM tbl_value_cryptos ".
                            "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                            "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                            "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                            "WHERE tbl_value_cryptos.`date` = $date ".
                            "GROUP BY `type`, tbl_amount_wallets.`hide` ".
                         ") total ".
                     "$where".
                     "GROUP BY total.`type`, total.`hide`, total.`value` ".
                     "$order;";       
            break;
          
        case "expand"   :
            $key = cKEY;
            $account = "CAST(AES_DECRYPT(`account`, '$key') AS CHAR(45)) AS `type` ";
        
            $ratio  = "IFNULL(FORMAT(100 * `value` / SUM(`value`) OVER(), 2),'0') AS ratio ";
            $value  = "FORMAT(`value`, 2) AS `value` ";
            $query = "SELECT `type` AS `id`, $account, $ratio, $value ".
                     "FROM (".
                        "SELECT `type`, tbl_value_accounts.`hide` AS hide, tbl_services.`service` AS `service`, tbl_accounts.`account` AS `account`, ". 
                            "IF(tbl_value_accounts.`hide` = 0, `value`, 0) AS `value`, '-' AS `symbol` ".
                        "FROM tbl_value_accounts ".
                        "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_accounts .`date` = $date ".
                        "UNION ".
                        "SELECT `type`, tbl_amount_wallets.`hide` AS hide, tbl_services.`service` AS `service`, tbl_accounts.`account` AS `account`, ". 
                            "IF(tbl_amount_wallets.`hide` = 0, `amount`*`value`, 0) AS `value`, tbl_cryptocurrenties.`symbol` AS `symbol` ".
                        "FROM tbl_value_cryptos ".
                        "LEFT JOIN tbl_amount_wallets ON tbl_value_cryptos.`id` = tbl_amount_wallets.`vid` ".
                        "LEFT JOIN tbl_wallets ON tbl_amount_wallets.`wid` = tbl_wallets.`id` ".
                        "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                        "LEFT JOIN tbl_accounts ON tbl_wallets.`aid` = tbl_accounts.`id` ".
                        "LEFT JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                        "WHERE tbl_value_cryptos.`date` = $date ".
                     ") total ".
                     "$where".
                     "ORDER BY FIELD(`id`, 'finance', 'stock', 'savings', 'crypto'), `service`, `type`, `symbol`;";        
            break;    
        
        case "crypto" :           
            $ratio = "IFNULL(FORMAT(100 * `value` / SUM(`value`) OVER(), 2),'0') AS ratio ";
            $value = "FORMAT(`value`, 2) AS `value` "; 
            $query = "SELECT `symbol` AS `label`, `color`, $ratio, $value ".
                     "FROM tbl_value_cryptos ".
                     "LEFT JOIN tbl_cryptocurrenties ON tbl_value_cryptos.`cid` = tbl_cryptocurrenties.`id` ".
                     "WHERE tbl_value_cryptos.`date` = $date ".
                     "ORDER BY `name`;";                    
            break;    
    }
    
    return $query;
}