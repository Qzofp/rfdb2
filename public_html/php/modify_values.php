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
 * Updated on Oct 11, 2024
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
 * Updated on Oct 07, 2024
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
    $action   = filter_input(INPUT_POST, 'action'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);  
    
    // Get the settings, e.g. language code ande the currency sign).
    $input = GetSettings();
    if ($input['success']) 
    {              
        switch ($action)
        {
            case "add" :
                $response = AddAccountAndCryptoValues($input, $date, $aids, $accounts, $cids, $crypto);           
                break;
            
            case "edit" :
                $response = EditAccountAndCryptoValues($input, $date, $aids, $accounts, $cids, $crypto);
                break;
            
            case "delete" :
                $response = DeleteAccountAndCryptoValues($input, $date);
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
 * Function:    AddAccountAndCryptoValues
 *
 * Created on Sep 27, 2024
 * Updated on Oct 06, 2024
 *
 * Description: Add the values to the tbl_value_accounts and/or tbl_value_cryptos tables.
 *
 * In:  $input, $date, $aids, $accounts, $cids, $crypto
 * Out: $result
 *
 */
function AddAccountAndCryptoValues($input, $date, $aids, $accounts, $cids, $crypto)
{
    $day = DateToMySql($input['sign'], $date);
    
    $pages = array_slice($input['pages'], 0, -1); // Remove the crypto page.
    if (in_array("true", $pages)) {
        $result = AddAccountValues($input['sign'], $day, $aids, $accounts);
    }
    else {
        $result['success'] = true;
    }
    
    if ($result['success'] && $input['pages'][3] == "true") // Also check if the Crypto page is enabled (true).
    {
        $result = AddCryptoValues($input['sign'], $day, $cids, $crypto);
        if ($result['success'] && !$result['exists']) {
            $result = AddWalletAmounts($day);
        }
    }      
     
    $result['date'] = $date;
    
    return $result;
}

/*
 * Function:    AddAccountValues
 *
 * Created on Oct 02, 2024
 * Updated on Oct 06, 2024
 *
 * Description: Add the values to the tbl_value_accounts table if the date doesn't exists.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function AddAccountValues($sign, $date, $ids, $values)
{
    $data = []; 
    try 
    {         
        $db = OpenDatabase();        

        $query = "INSERT INTO tbl_value_accounts (`date`, `aid`, `value`) ".
                 "SELECT `date`, `aid`, `value` ".
                 "FROM ( ";
            
        for ($i = 0; $i < count($ids); $i++) 
        {
            if ($i > 0) {
                $query .= "UNION ";
            }            
            $value = AmountToMySql($sign, $values[$i]);    
            $query .= "SELECT $date AS `date`, '$ids[$i]' AS `aid`, $value AS `value` ";
        }
                       
        $query .= ") tmp ".
                  "WHERE NOT EXISTS (".
                    "SELECT * FROM tbl_value_accounts WHERE `date` = $date LIMIT 1 ".
                  ");";
        
        $select = $db->prepare($query);
        $select->execute();
            
        // Check if the values already exists.
        $rows = $select->rowCount();   
        $data['exists'] = true; 
        if ($rows >= 1) {
            $data['exists'] = false; 
        }
            
        // Debug
        $data['rows'] = $rows;
        $data['query'] = $query;
        
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
 * Function:    AddCryptoValues
 *
 * Created on Sep 24, 2024
 * Updated on Oct 04, 2024
 *
 * Description: Add the values to the tbl_value_cryptos table if the date doesn't exists.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function AddCryptoValues($sign, $date, $ids, $values)
{
    try 
    {         
        $db = OpenDatabase();        
                             
        $query = "INSERT INTO tbl_value_cryptos (`date`, `cid`, `value`) ".
                 "SELECT `date`, `cid`, `value` ".
                 "FROM ( ";
            
        for ($i = 0; $i < count($ids); $i++) 
        {
            if ($i > 0) {
                $query .= "UNION ";
            }            
            $value = AmountToMySql($sign, $values[$i]);    
            $query .= "SELECT $date AS `date`, '$ids[$i]' AS `cid`, $value AS `value` ";
        }
                       
        $query .= ") tmp ".
                  "WHERE NOT EXISTS (".
                    "SELECT * FROM tbl_value_cryptos WHERE `date` = $date LIMIT 1 ".
                  ");";        
            
        $select = $db->prepare($query);
        $select->execute();
                
        // Check if the values already exists.
        $rows = $select->rowCount();   
        $data['exists'] = true; 
        if ($rows >= 1) {
            $data['exists'] = false; 
        }
            
        // Debug
        $data['rows'] = $rows;
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
 * Function:    AddWalletAmounts
 *
 * Created on Sep 27, 2024
 * Updated on Oct 09, 2024
 *
 * Description: Add the values to the tbl_amount_wallets table.
 *
 * In:  $date
 * Out: $data
 *
 */ 
function AddWalletAmounts($date)
{ 
    try 
    {         
        $db = OpenDatabase();        
                     
        $query = "INSERT INTO tbl_amount_wallets (`vid`, `wid`, `amount`) ".
                 "SELECT tbl_value_cryptos.`id` AS vid, tbl_wallets.`id` AS wlt_id, SUM(`amount`) as amount ".
                 "FROM tbl_crypto ".
                 "LEFT JOIN tbl_wallets ON tbl_crypto.`wid` = tbl_wallets.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "LEFT JOIN tbl_value_cryptos ON tbl_cryptocurrenties.`id` = tbl_value_cryptos.`cid` ".
                 "WHERE tbl_value_cryptos.`date` = $date AND tbl_crypto.`date` <= $date ".
                 "GROUP BY `vid`, `wlt_id`;";    
  
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
 * Function:    EditAccountAndCryptoValues
 *
 * Created on Oct 06, 2024
 * Updated on Oct 11, 2024
 *
 * Description: Edit the values to the tbl_value_accounts and/or tbl_value_cryptos tables.
 *
 * In:  $input, $date, $aids, $accounts, $cids, $crypto
 * Out: $result
 *
 */
function EditAccountAndCryptoValues($input, $date, $aids, $accounts, $cids, $crypto)
{
    $day = DateToMySql($input['sign'], $date);
    
    $pages = array_slice($input['pages'], 0, -1); // Remove the crypto page.
    if (in_array("true", $pages)) {
        $result = EditAccountValues($input['sign'], $day, $aids, $accounts);
    }
    else {
        $result['success'] = true;
    }
    
    if ($result['success'] && $input['pages'][3] == "true") // Also check if the Crypto page is enabled (true).
    {
        $result = EditCryptoValues($input['sign'], $day, $cids, $crypto);
        if ($result['success']) {
            $result = EditWalletAmounts($day);
        }
    }      
     
    $result['date'] = $date;    
    
    return $result;    
}        

/*
 * Function:    EditAccountValues
 *
 * Created on Oct 07, 2024
 * Updated on Oct 08, 2024
 *
 * Description: Edit the values of the tbl_value_accounts table.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function EditAccountValues($sign, $date, $ids, $values)
{
    $data = []; 
    try 
    {         
        $db = OpenDatabase();        

        $query = "INSERT INTO tbl_value_accounts (`id`, `date`, `aid`, `value`) VALUES ";
            
        for ($i = 0; $i < count($ids); $i++) 
        {          
            $value = AmountToMySql($sign, $values[$i]);    
            $query .= "($ids[$i], $date, `aid`, $value)";
            
            if ($i < count($ids)-1) {
                $query .= ",";
            }
            else {
                $query .= " ";
            }
        }
                       
        $query .= "ON DUPLICATE KEY UPDATE `date`=VALUES(`date`),`value`=VALUES(`value`);";
        
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
 * Function:    EditCryptoValues
 *
 * Created on Oct 08, 2024
 * Updated on Oct 08, 2024
 *
 * Description: Edit the values of the tbl_value_cryptos table.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function EditCryptoValues($sign, $date, $ids, $values)
{
    $data = []; 
    try 
    {         
        $db = OpenDatabase();        

        $query = "INSERT INTO tbl_value_cryptos (`id`, `date`, `cid`, `value`) VALUES ";
            
        for ($i = 0; $i < count($ids); $i++) 
        {          
            $value = AmountToMySql($sign, $values[$i]);    
            $query .= "($ids[$i], $date, `cid`, $value)";
            
            if ($i < count($ids)-1) {
                $query .= ",";
            }
            else {
                $query .= " ";
            }
        }
                       
        $query .= "ON DUPLICATE KEY UPDATE `date`=VALUES(`date`),`value`=VALUES(`value`);";
        
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
 * Function:    EditWalletAmounts
 *
 * Created on Oct 09, 2024
 * Updated on Oct 09, 2024
 *
 * Description: Edit the values to the tbl_amount_wallets table.
 *
 * In:  $date
 * Out: $data
 *
 */ 
function EditWalletAmounts($date)
{
    $data = [];
    try 
    {         
        $db = OpenDatabase();        
                     
        $query = "INSERT INTO tbl_amount_wallets (`id`, `vid`, `wid`, `amount`) ".
                 "SELECT tbl_amount_wallets.`id` AS id, tbl_amount_wallets.`vid` AS `vid`, tbl_amount_wallets.`wid` AS `wid`, SUM(tbl_crypto.`amount`) AS `amount` ".
                 "FROM tbl_amount_wallets ".
                 "LEFT JOIN tbl_value_cryptos ON tbl_amount_wallets.`vid` = tbl_value_cryptos.`id` ".
                 "LEFT JOIN tbl_crypto ON tbl_amount_wallets.`wid` = tbl_crypto.`wid` ".
                 "WHERE tbl_value_cryptos.`date` = $date AND tbl_crypto.`date` <= $date ".
                 "GROUP BY `vid`, `wid` ".
                 "ON DUPLICATE KEY UPDATE `amount`=VALUES(`amount`);";            
      
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
 * Function:    DeleteAccountAndCryptoValues
 *
 * Created on Oct 06, 2024
 * Updated on Oct 09, 2024
 *
 * Description: Delete the rows with the date in tbl_value_accounts, tbl_value_cryptos and tbl_amount_wallets tables.
 *
 * In:  $input, $date
 * Out: result
 *
 */ 
function DeleteAccountAndCryptoValues($input, $date)
{
    $result = [];
    try 
    {    
        $db = OpenDatabase();
                
        $day = DateToMySql($input['sign'], $date);    
    
        // Turn off safe mode.
        $query  = "SET SQL_SAFE_UPDATES = 0; "; 
    
        // Delete the rows from the tbl_value_accounts table.
        $query .= "DELETE FROM tbl_value_accounts ".
                  "WHERE tbl_value_accounts.`date` = $day; ";
    
        // Delete the rows from the tbl_value_cryptos and tbl_amount_wallets tables.
        $query .= "DELETE tbl_amount_wallets, tbl_value_cryptos ".
                  "FROM tbl_amount_wallets ".
                  "RIGHT JOIN tbl_value_cryptos ON tbl_amount_wallets.`vid` = tbl_value_cryptos.`id` ".
                  "WHERE tbl_value_cryptos.`date` = $day; ";
            
        // Turn on safe mode.
        $query .= "SET SQL_SAFE_UPDATES = 1;";             
                      
        $select = $db->prepare($query);
        $select->execute();
                    
        $result['date']    = "";       
        $result['success'] = true;  
    }
    catch (PDOException $e) 
    {    
            $result['message'] = $e->getMessage();
            $result['success'] = false;
    } 

    // Close database connection.
    $db = null;
    
    return $result;
}