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
 * Updated on Sep 27, 2024
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
 * Updated on Sep 27, 2024
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
        $day = DateToMySql($input['sign'], $date);
        $response = AddAccountValues($input['sign'], $day, $aids, $accounts);
        
        // Check if the Crypto page is enabled (true).
        if ($response['success'] && $input['pages'][3] == "true") 
        {
            $response = AddCryptoValues($input['sign'], $day, $cids, $crypto);
            if ($response['success'] && !$response['exists']) {
                 AddWalletAmounts($day);
            }
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
 * Updated on Sep 27, 2024
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
    $data = CheckAccountValues($date);
    if ($data['success'] && !$data['exists'])
    {     
        try 
        {         
            $db = OpenDatabase();        
                     
            $query = "INSERT INTO tbl_value_accounts (`date`, `aid`, `value`) VALUES ";            
            for ($i = 0; $i < count($ids); $i++) 
            {
                $value = AmountToMySql($sign, $values[$i]);           
                $query .= "($date, '$ids[$i]', $value)"; 
                
                if ($i < count($ids) - 1) {
                    $query .= ","; 
                }
                else {
                    $query .= ";";                      
                }
            }
            
            $select = $db->prepare($query);
            $select->execute();
            //$select->fetchAll(PDO::FETCH_ASSOC);            
        
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
    /*
    else if (!$data['success']) 
    {
        $response['message'] = $data['message'];
        $response['success'] = false;
    }    
    */
    
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

/*
 * Function:    AddCryptoValues
 *
 * Created on Sep 24, 2024
 * Updated on Sep 27, 2024
 *
 * Description: Add the values to the tbl_value_cryptos table if the date doesn't exists.
 *
 * In:  $sign, $date, $ids, $values
 * Out: $data
 *
 */ 
function AddCryptoValues($sign, $date, $ids, $values)
{

    // Check if values date already exists.
    $data = CheckCryptoValues($date);
    if ($data['success'] && !$data['exists'])
    {     
        try 
        {         
            $db = OpenDatabase();        
                     
            $query = "INSERT INTO tbl_value_cryptos (`date`, `cid`, `value`) VALUES ";            
            for ($i = 0; $i < count($ids); $i++) 
            {
                $value = AmountToMySql($sign, $values[$i]);           
                $query .= "($date, '$ids[$i]', $value)"; 
                
                if ($i < count($ids) - 1) {
                    $query .= ","; 
                }
                else {
                    $query .= ";";                      
                }
            }
            
            $select = $db->prepare($query);
            $select->execute();
            //$select->fetchAll(PDO::FETCH_ASSOC);                
    
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
    /*
    else if (!$data['success']) 
    {
        $data['message'] = $data['message'];
        $data['success'] = false;
    }
    */      
   
    return $data;
}

/*
 * Function:    CheckCryptoValues
 *
 * Created on Sep 24, 2024
 * Updated on Sep 24, 2024
 *
 * Description: Check if the date exists in the tbl_value_cryptos table.
 *
 * In:  $date
 * Out: $response
 *
 */
function CheckCryptoValues($date)
{
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
                
        $query = "SELECT count(0) FROM `tbl_value_cryptos` WHERE `date` = $date;";      
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

/*
 * Function:    AddWalletAmounts
 *
 * Created on Sep 27, 2024
 * Updated on Sep 27, 2024
 *
 * Description: Add the values to the tbl_amount_wallets table.
 *
 * In:  $date
 * Out: $data
 *
 */ 
function AddWalletAmounts($date)
{
    $data = [];  
    try 
    {         
        $db = OpenDatabase();        
                     
        $query = "INSERT INTO tbl_amount_wallets (`vid`, `wid`, `amount`) ".
                 "SELECT tbl_value_cryptos.`id` AS vid, tbl_wallets.`id` AS wid, SUM(`amount`) as amount ".
                 "FROM tbl_crypto ".
                 "LEFT JOIN tbl_wallets ON tbl_crypto.`wid` = tbl_wallets.`id` ".
                 "LEFT JOIN tbl_cryptocurrenties ON tbl_wallets.`cid` = tbl_cryptocurrenties.`id` ".
                 "LEFT JOIN tbl_value_cryptos ON tbl_cryptocurrenties.`id` = tbl_value_cryptos.`cid` ".
                 "WHERE tbl_value_cryptos.`date` = $date AND tbl_crypto.`date` <= $date ".
                 "GROUP BY wid;";            
      
        $select = $db->prepare($query);
        $select->execute();    
            
        //$data = $select->fetchAll(PDO::FETCH_ASSOC);                
    
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
    
    return $data;
}