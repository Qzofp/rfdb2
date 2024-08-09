<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_accounts.php
 * Used in: js\settings.js
 *
 * Created on Mar 19, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_accounts table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyAccount();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyAccount
 *
 * Created on Mar 19, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_accounts table if the account doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyAccount() 
{
    // Get data from ajax call.
    $date    = filter_input(INPUT_POST, 'date'    , FILTER_SANITIZE_STRING);
    $serv    = filter_input(INPUT_POST, 'serv'    , FILTER_SANITIZE_STRING);
    $type    = filter_input(INPUT_POST, 'type'    , FILTER_SANITIZE_STRING);    
    $account = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_STRING); 
    $desc    = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action  = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id      = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);
    $hide    = filter_input(INPUT_POST, 'hide'    , FILTER_SANITIZE_STRING);
    
    $response = GetDateFormat();    
    if ($response['success'])
    {    
        $format = $response['format'];       
        switch ($action)
        {
            case "add" :
                $response = AddAccount($date, $format, $serv, $type, $account, $desc);
                break;
            
            case "edit" :
                $response = EditAccount($id, $hide, $date, $format, $serv, $type, $account, $desc);
                break;
            
            case "delete" :
                $response = DeleteAccount($id, $type);
                break;                
        } 
    }
    
    echo $json = json_encode($response);
} 

/*
 * Function:    GetDateFormat
 *
 * Created on Aug 09, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Get the currency sign from the tbl_settings table and determine the date format.
 *
 * In:  -
 * Out: $format
 *
 */   
function GetDateFormat()
{
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
             
        // Check if user aleready exists in the tbl_accounts table.
        $query = "SELECT JSON_UNQUOTE(JSON_EXTRACT(`value` , '$.sign')) AS `sign` ".
                 "FROM `tbl_settings` ".
                 "WHERE `name` = 'settings';";      
        
        $select = $db->prepare($query);
        $select->execute();        
        $results = $select->fetchAll(PDO::FETCH_ASSOC);  
        foreach($results as $row=>$link) {
            $sign = $link['sign'];
        }  
        
        // Determine the date format based on the currency sign.
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $format = "%m/%d/%Y";
                break;
            
            case "€"  :
                $format = "%d-%m-%Y";
                break;               
        }         
        
        $response['format'] = $format;
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
 * Function:    AddAccount
 *
 * Created on Mar 19, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Add the input to the tbl_accounts table if the account doesn't exists.
 *
 * In:  $date, $format, $serv, $type, $account, $desc
 * Out: $response
 *
 */    
 function AddAccount($date, $format, $serv, $type, $account, $desc)
 {          
    $aTypes   = ["","finance","stock","savings","crypto"];
    
    $response = CheckAccount(0, $account);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
            
            $query = "INSERT INTO tbl_accounts (`account`,`date`,`sid`,`type`,`description`) ".
                     "VALUES ('$account',CONCAT(STR_TO_DATE('$date','$format'),' ',CURTIME()),'$serv','$aTypes[$type]','$desc');";            
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']    = $db->lastInsertId();            
            $response['date']  = $date;
            $response['serv']  = $serv;
            $response['acct']  = $account;
            $response['desc']  = $desc;
            
            $response['success'] = true;  
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
    }

    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    EditAccount
 *
 * Created on Mar 23, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Edit the tbl_accounts table with the input if the service doesn't exists.
 *
 * In:  $id, $hide, $date, $format, $serv, $type, $account, $desc
 * Out: $response
 *
 */    
 function EditAccount($id, $hide, $date, $format, $serv, $type, $account, $desc)
 {   
    $aTypes   = ["","finance","stock","savings","crypto"];    
    
    $response = CheckAccount($id, $account);    
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_accounts SET `hide`=$hide,`account`='$account',`date`=CONCAT(STR_TO_DATE('$date','$format'),' ',CURTIME()),".
                     "`sid`='$serv',`type`='$aTypes[$type]',`description`='$desc' WHERE `id`=$id";  
            
            $select = $db->prepare($query);
            $select->execute();          
                    
            $response['id']   = $id;
            $response['hide'] = $hide;
            $response['date'] = $date;
            $response['serv'] = $serv;
            $response['acct'] = $account;
            $response['desc'] = $desc;
            
            $response['success'] = true;  
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
    }
    
    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    DeleteAccount
 *
 * Created on Mar 22, 2024
 * Updated on Jul 25, 2024
 *
 * Description: Delete the row with id in the tbl_accounts table.
 *
 * In:  $id, $type
 * Out: $response
 *
 */    
 function DeleteAccount($id, $type)
 {     
    $response = CheckAccountInSheets($id, $type);  
    if ($response['success'] && !$response['exists'])
    {      
        try 
        {    
            $db = OpenDatabase();
                
            $query = "DELETE FROM tbl_accounts WHERE `id` = $id";          
            $select = $db->prepare($query);
            $select->execute();
                    
            $response['success'] = true;  
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        }
    }
    
    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    CheckAccount
 *
 * Created on Mar 19, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Check if the account exists in the tbl_account table.
 *
 * In:  $id, $account
 * Out: $response
 *
 */
function CheckAccount($id, $account)
{
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
        
        $edit = "";
        if ($id > 0) {
            $edit = "AND `id` <> $id";
        }
        
        // Check if user aleready exists in the tbl_accounts table.
        $query = "SELECT count(0) FROM `tbl_accounts` WHERE `account` = '$account' $edit;";        
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();

        $response['exists'] = false; 
        if ($result == 1) {
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
 * Function:    CheckAccountInSheets
 *
 * Created on Jul 24, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the account exists in the sheets tables (tbl_finances, tbl_stocks, tbl_savings and tbl_wallets).
 *
 * In:  $id, $type
 * Out: $response
 *
 */
function CheckAccountInSheets($id, $type)
{  
    $response = [];
    $aTables   = ["","tbl_finances","tbl_stocks","tbl_savings","tbl_wallets"];  
    
    try 
    { 
        $db = OpenDatabase();
                
        // Check if user already exists in the tbl_accounts table.
        $query = "SELECT count(0) FROM `$aTables[$type]` WHERE `aid` = $id;";       
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();
        
        $response['exists'] = false; 
        if ($result > 0) {
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