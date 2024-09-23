<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    modify_values.php
 * Used in: js\dashboard.js
 *
 * Created on Sep 16, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_value_accounts and tbl_value_cryptos tables.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
require_once 'common.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyValues();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyValues
 *
 * Created on Sep 16, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Modify the tbl_value_accounts and tbl_value_cryptos tables.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyValues()
{
    // Get data from ajax call.
    $date     = filter_input(INPUT_POST, 'date'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $aids     = filter_input(INPUT_POST, 'aids'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);
    $accounts = filter_input(INPUT_POST, 'accounts' , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);  
    $cids     = filter_input(INPUT_POST, 'cids'     , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);
    $crypto   = filter_input(INPUT_POST, 'crypto'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);      

    // Get the settings, e.g. language code ande the currency sign).
    $input = GetSettings();
    if ($input['success']) 
    {        
        $response = AddAccountValues($input['sign'], $date, $aids, $accounts);
        
        // Check if the Crypto page is enabled (true).
        if ($response['success'] && $input['pages'][3]) {
            // $response = AddCryptoValues($input['sign'], $date, $cids, $crypto);
        }
       
    }
    else 
    {
        $response['message'] = $input['message'];
        $response['success'] = false;
    }
    
    echo $json = json_encode($response);
    
    // Close database connection
    $db = null;      
}

/*
 * Function:    AddAccountValues
 *
 * Created on Sep 23, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Add the values to the tbl_value_accounts table if the date doesn't exists.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function AddAccountValues($sign, $date, $ids, $values)
{

    // Check if values date already exists.
    $day = DateToMySql($sign, $date);
    $data = CheckAccountValues($day);
    if ($data['success'] && !$data['exists'])
    {     
        try 
        {         
            $db = OpenDatabase();        
                     
            $query = "INSERT INTO tbl_value_accounts (`date`, `aid`, `value`) VALUES ";            
            for ($i = 0; $i < count($ids); $i++) 
            {
                $value = AmountToMySql($sign, $values[$i]);           
                $query .= "($day, '$ids[$i]', $value)"; 
                
                if ($i < count($ids) - 1) {
                    $query .= ","; 
                }
                else {
                    $query .= ";";                      
                }
            }
            
            $select = $db->prepare($query);
            $select->execute();    
            
            $data = $select->fetchAll(PDO::FETCH_ASSOC);            
        
    
            // Debug
            //$response['query'] = $query;
        
            $data['success'] = true;
        }
        catch (PDOException $e) 
        {    
            $data['message'] = $e->getMessage();
            $data['success'] = false;
        }   
        
        // Close database connection.
        $db = null;        
    }
   
    return $data;
}

/*
 * Function:    CheckAccountValues
 *
 * Created on Sep 23, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Check if the date exists in the tbl_value_accounts table.
 *
 * In:  $date
 * Out: $response
 *
 */
function CheckAccountValues($date)
{
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
        
        $edit = "";
        if ($id > 0) {
            $edit = "AND `id` <> $id";
        }
        
        // Check if user aleready exists in the tbl_businesses table.
        $query = "SELECT count(0) FROM `tbl_value_accounts` WHERE `date` = $date;";      
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();

        $response['exists'] = false; 
        if ($result >= 1) {
            $response['exists'] = true; 
        }

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


