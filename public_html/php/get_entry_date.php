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
 * Updated on Jan 29, 2025
 *
 * Description: Check if the user is signed in and get the date from de database tbl_value_accounts table.
 * 
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
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
 * Updated on Jan 29, 2025
 *
 * Description: Get the entry date and the date row number.
 *
 * In:  -
 * Out: -
 *
 */
function GetEntryDate()
{    
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
       
    $response = DetermineDate($date);
    if ($response['success'])
    {
        try 
        {
            $db = OpenDatabase();

            $date_format = MySqlToDate($response['sign'], "date");   
            $query = "SELECT ROW_NUMBER() OVER() AS `number`, $date_format AS `tmp` ".
                     "FROM tbl_value_accounts ".
                     "GROUP BY `date` ".
                     "ORDER BY `date`;";     
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC); 
            
            $number = 0;
            foreach ($data as $key=>$row)
            {
                if ($row['tmp'] == $response['date']) {
                    $number = $row['number'];
                }
            }
            
            
            // Remove not needed data from the response array.
            unset($response['sign']);
            unset($response['pages']);
            unset($response['code']);
            //unset($response['data']);
            
            // Debug
            //$response['query']   = $query;
 
            $response['number']  = $number-1;
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
 * Function:    DetermineDate
 *
 * Created on Jan 29, 2025
 * Updated on Jan 29, 2025
 *
 * Description: Determine the date. If it's empty get the max date from the database tbl_value_accounts table.
 *
 * In:  $date
 * Out: $response
 *
 */
function DetermineDate($date)
{
    // Get the settings, e.g. currency sign and the active pages (finance, stock, savings and crypto).
    $response = GetSettings();
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
              
            $query = "SELECT DATE_FORMAT(MAX(`date`),'$format')AS `date` ".
                     "FROM tbl_value_accounts;";     
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC); 
            
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
    
    return $response;
}
