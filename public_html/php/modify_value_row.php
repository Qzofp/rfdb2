<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    modify_value_row.php
 * Used in: js\dashboard.js
 *
 * Created on Nov 01, 2024
 * Updated on Nov 08, 2024
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
    ModifyValueRow();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyValueRow
 *
 * Created on Nov 01, 2024
 * Updated on Nov 08, 2024
 *
 * Description: Modify the tbl_value_accounts and tbl_value_cryptos tables (hide or show the row).
 *
 * In:  -
 * Out: -
 *
 */
function ModifyValueRow()
{
    // Get data from ajax call.
    $date  = filter_input(INPUT_POST, 'date' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $tbl   = filter_input(INPUT_POST, 'tbl'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $row   = filter_input(INPUT_POST, 'row'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $shw   = filter_input(INPUT_POST, 'shw'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    $value = filter_input(INPUT_POST, 'value', FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
       
    // Get the settings, e.g. language code ande the currency sign).
    $input = GetSettings();
    if ($input['success']) 
    {              
        switch($tbl) 
        {
            case "collapse" :
                $response = EditValueCollapseRow($input, $date, $row, $shw);
                break;
            
            case "expand"   :
                $response = EditValueExpandRow($input, $row, $shw, $value);
                break;
            
            case "crypto"   :
                $response = EditCryptoValueRow($input, $row, $value);
                break;
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
 * Function:    EditValueCollapseRow
 *
 * Created on Nov 01, 2024
 * Updated on Nov 02, 2024
 *
 * Description: Modify the tbl_value_accounts table for the collapse rows (hide or show the row).
 *
 * In:  $input, $date, $type, $shw
 * Out: $result
 *
 */
function EditValueCollapseRow($input, $date, $type, $shw)
{
    $data = [];
    try 
    {         
        $db = OpenDatabase();  
        
        $day = DateToMySql($input['sign'], $date);
        $hide = ($shw == "hide") ? 1 : 0;
        
        if ($type != "crypto")
        {
            $query = "UPDATE tbl_value_accounts ".
                     "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                     "SET tbl_value_accounts.`hide` = $hide ".
                     "WHERE tbl_value_accounts.`date` = $day AND tbl_accounts.`type` = '$type';";
        }
        else 
        {
            $query = "UPDATE tbl_amount_wallets ".
                     "LEFT JOIN tbl_value_cryptos ON tbl_amount_wallets.`vid` = tbl_value_cryptos.`id` ".
                     "SET tbl_amount_wallets.`hide` = $hide ".
                     "WHERE tbl_value_cryptos.`date` = $day;";         
        }
  
        $select = $db->prepare($query);
        $select->execute();
         
        // Debug
        //$data['query'] = $query;
        
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
 * Function:    EditValueExpandRow
 *
 * Created on Nov 02, 2024
 * Updated on Nov 06, 2024
 *
 * Description: Modify the tbl_value_accounts table for the expand rows (hide or show the row).
 *
 * In:  $input, $row, $shw, $val
 * Out: $result
 *
 */
function EditValueExpandRow($input, $row, $shw, $val)
{
    $data = [];
    try 
    {         
        $db = OpenDatabase();
        
        $hide = ($shw == "hide") ? 1 : 0;
        
        // Get the id and type from the row value.
        $items = explode("_", $row);
        $id    = $items[0];
        $type  = $items[1];       
        
        if ($type != "crypto")
        {
            $value = AmountToMySql($input['sign'], $val);
            $query = "UPDATE tbl_value_accounts ".
                     "LEFT JOIN tbl_accounts ON tbl_value_accounts.`aid` = tbl_accounts.`id` ".
                     "SET tbl_value_accounts.`hide` = $hide, ".
                         "tbl_value_accounts.`value` = IF(tbl_value_accounts.`hide` = 0, $value, tbl_value_accounts.`value`) ".
                     "WHERE tbl_value_accounts.`id` = $id;";
        }
        else 
        {
            $value = AmountToMySql($input['sign'], $val);
            $query = "UPDATE tbl_amount_wallets ".
                     "LEFT JOIN tbl_value_cryptos ON tbl_amount_wallets.`vid` = tbl_value_cryptos.`id` ".
                     "SET tbl_amount_wallets.`hide` = $hide, ".
                         "tbl_amount_wallets.`amount` = IF(tbl_amount_wallets.`hide` = 0, $value, tbl_amount_wallets.`amount`) ".
                     "WHERE tbl_amount_wallets.`id` = $id;";       
        }
  
        $select = $db->prepare($query);
        $select->execute();
         
        // Debug
        //$data['query'] = $query;
        
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
 * Function:    EditCryptoValueRow
 *
 * Created on Nov 08, 2024
 * Updated on Nov 08, 2024
 *
 * Description: Modify the tbl_value_cryptos table row.
 *
 * In:  $input, $row, $val
 * Out: $result
 *
 */
function EditCryptoValueRow($input, $row, $val)
{
    $data = [];
    try 
    {         
        $db = OpenDatabase();
        
        $value = AmountToMySql($input['sign'], $val);
        $query = "UPDATE tbl_value_cryptos ".
                 "SET `value` = $value ".
                 "WHERE `id` = $row;";
 
        $select = $db->prepare($query);
        $select->execute();
         
        // Debug
        //$data['query'] = $query;
        
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