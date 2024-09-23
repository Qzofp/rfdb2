<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_value_accounts.php
 * Used in: js\dashboard.js
 *
 * Created on Sep 06, 2024
 * Updated on Sep 22, 2024
 *
 * Description: Check if the user is signed in and get the data from de database tbl_value_cryptos table.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetValueCryptos();
}
else {
    RedirectAjaxRequest();
}
 
/*
 * Function:    GetValueCryptos
 *
 * Created on Sep 06, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the data from de database tbl_value_cryptos table.
 *
 * In:  -
 * Out: -
 *
 */
function GetValueCryptos()
{    
    $date  = filter_input(INPUT_POST, 'date' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
    
    // Get the settings, e.g. language code ande the currency sign).
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
            
            $value = "CONCAT('$sign ', FORMAT(`value`, 2, '$format')) AS `value` "; 
            $query = "SELECT tbl_value_cryptos.`id` AS `id`, `name`, `symbol`, $value ".
                     "FROM tbl_value_cryptos ".
                     "LEFT JOIN tbl_cryptocurrenties ON tbl_value_cryptos.`cid` = tbl_cryptocurrenties.`id` ".
                     "WHERE tbl_value_cryptos.`date` = $date_format ".
                     "ORDER BY `name`;";
            
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC); 
                    
            // Debug
            //$response['query']   = $query;  
            
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
