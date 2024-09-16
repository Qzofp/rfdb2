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
 * Updated on Sep 16, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_value_accounts and tbl_value_cryptos tables.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
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
 * Updated on Sep 16, 2024
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
    $date     = filter_input(INPUT_POST, 'date'     , FILTER_SANITIZE_STRING);  
    $aids     = filter_input(INPUT_POST, 'aids'     , FILTER_SANITIZE_NUMBER_INT, FILTER_REQUIRE_ARRAY);
    $accounts = filter_input(INPUT_POST, 'accounts' , FILTER_SANITIZE_STRING, FILTER_REQUIRE_ARRAY);  
    

    $response['date']  = $date;
    $response['aids']  = $aids;
    $response["accounts"] = $accounts;
    
    
    $response['success'] = true;
    
    echo $json = json_encode($response);
}






/*
 * Function:    EditSetting
 *
 * Created on Apr 21, 2024
 * Updated on Apr 21, 2024
 *
 * Description: Edit the tbl_groups table with the input if the group doesn't exists.
 *
 * In:  $name, $type, $value
 * Out: $response
 *
 */
function EditSetting($name, $type, $value)
{
    $response = [];
    try 
    { 
        $db = OpenDatabase();

        // Update the number of rows
        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.$type','$value')"
                ."WHERE `name` = \"$name\";";        
        
        $select = $db->prepare($query);
        $select->execute();           
        
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
