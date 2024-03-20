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
 * Updated on Mar 20, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_accounts table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
$user = $_SESSION['user'];
if(!$user) 
{
    header("location:info.php");
}
else 
{
    header("Content-Type:application/json"); 
    ModifyAccount();
}

/*
 * Function:    ModifyAccount
 *
 * Created on Mar 19, 2024
 * Updated on Mar 19, 2024
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

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddAccount($date, $serv, $type, $account, $desc);
            break;
            
        case "edit" :
            //$response = EditService($id, $hide, $srv, $web, $aNames, $aOptions);
            break;
            
        case "delete" :
            //$response = DeleteService($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddAccount
 *
 * Created on Mar 19, 2024
 * Updated on Mar 19, 2024
 *
 * Description: Add the input to the tbl_accounts table if the account doesn't exists.
 *
 * In:  $date, $serv, $type, $account, $desc
 * Out: $response
 *
 */    
 function AddAccount($date, $serv, $type, $account, $desc)
 {          
    $aTypes   = ["","finance","stock","savings","crypto"];
    
    $response = CheckAccount(0, $account);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_accounts (`account`,`date`,`serviceid`,`type`,`description`) ".
                     "VALUES ('$account',CONCAT(STR_TO_DATE('$date','%d-%m-%Y'),' ',CURTIME()),'$serv','$aTypes[$type]','$desc');";            
            $select = $db->prepare($query);
            $select->execute();
            
            // debug
            $response['query'] = $query;
                        
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
 * Function:    EditService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 24, 2024
 *
 * Description: Edit the tbl_services table with the input if the service doesn't exists.
 *
 * In:  $id, $hide, $srv, $web, $aNames, $aOptions
 * Out: $response
 *
 */    
 function EditService($id, $hide, $srv, $web, $aNames, $aOptions)
 {   
    $options    = "";
    $opt_values = "";
    
    
    $response = CheckService($id, $srv);    
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {    
            list($options, $opt_values) = CreateUpdateNamesAndValues($aNames, $aOptions);
            
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_services SET `hide`=$hide, `service`='$srv',`website`='$web'$options WHERE `id`=$id";        
            $select = $db->prepare($query);
            $select->execute();
            
            $response['id']   = $db->lastInsertId();
            $response['hide'] = $hide;       
            $response['srv']  = $srv;
            $response['web']  = $web;
            $response['opt']  = $opt_values;
            
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
 * Function:    DeleteService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Delete the service in the tbl_users table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteService($id)
 {   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_services WHERE `id` = $id";          
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

/*
 * Function:    CheckAccount
 *
 * Created on Mar 19, 2024
 * Updated on Mar 19, 2024
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