<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_value_accounts_dgchart.php
 * Used in: js\dashboard.js
 *
 * Created on Dec 24, 2024
 * Updated on Dec 24, 2024
 *
 * Description: Check if the user is signed in and get the data from the database tbl_value_accounts table
 *              for the doughnut chart.
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
 * Created on Dec 24, 2024
 * Updated on Dec 24, 2024
 *
 * Description: Get the data from de database tbl_value_accounts table for the doughnut chart.
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
