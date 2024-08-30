<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_entry_date.php
 * Used in: js\dashboard.js
 *
 * Created on Aug 26, 2024
 * Updated on Aug 28, 2024
 *
 * Description: Check if the user is signed in and get the date from de database tbl_value_accounts table.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if(isset($_SESSION['user'])) {
    GetEntryDate();
}
else {
    RedirectAjaxRequest();
}
 
/*
 * Function:    GetEntryDate
 *
 * Created on Aug 26, 2024
 * Updated on Aug 28, 2024
 *
 * Description: Get the date from de database tbl_value_accounts table.
 *
 * In:  -
 * Out: -
 *
 */
function GetEntryDate()
{    
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_STRING);       
    
    // Get the currency sign to determine the date format
    $response = GetCurrencySign();
    if ($response['success']) 
    {
        try 
        {
            $db = OpenDatabase();

            // Determine the data format.
            switch ($response['sign'])
            {
                case "$" :
                case "£" :
                    $format = "%m/%d/%Y";
                    break;
            
                case "€"  :
                    $format = "%d-%m-%Y";
                    break;               
            }          
            
            $query = "SELECT DATE_FORMAT(MAX(`date`),'$format') AS `date` ".
                     "FROM tbl_value_accounts;";     
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC); 
            
            
            // Remove sign from the response array.
            unset($response['sign']);
            
            // Debug
            //$response['query']   = $query;
            
            $response['date']    = $date ? $date : array_values($data[0])[0];
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
 * Function:    GetCurrencySign
 *
 * Created on Aug 26, 2024
 * Updated on Aug 26, 2024
 *
 * Description: Get the currency sign from de database tbl_settings table.
 *
 * In:  -
 * Out: $response
 *
 */
function GetCurrencySign() 
{   
    $response = [];
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare('SELECT `name`, `value` FROM `tbl_settings`;');
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
    
        // Get the currency sign from the tbl_settings table to determine the date format.
        foreach($settings as $row=>$link) 
        {
            if ($link['name'] == "settings") 
            {
                $json = json_decode($link['value']);
                $sign = $json->sign;
            }
        }
        
        $response['sign']    = $sign;
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    }   
    
    // Close database connection.
    $db = null;        
    
    return $response;    
}
