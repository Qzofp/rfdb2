<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_groups.php
 * Used in: js\settings.js
 *
 * Created on Apr 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_groups table.
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
    ModifyGroup();
}

/*
 * Function:    ModifyGroup
 *
 * Created on Apr 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_groups table if the account doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyGroup() 
{
    // Get data from ajax call.
    $group   = filter_input(INPUT_POST, 'group'   , FILTER_SANITIZE_STRING);
    $desc    = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action  = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id      = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);
    $hide    = filter_input(INPUT_POST, 'hide'    , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddGroup($group, $desc);
            break;
            
        case "edit" :
            //$response = EditAccount($id, $hide, $date, $serv, $type, $account, $desc);
            break;
            
        case "delete" :
            //$response = DeleteAccount($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddGroup
 *
 * Created on Apr 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Add the input to the tbl_groups table if the account doesn't exists.
 *
 * In:  $group, $desc
 * Out: $response
 *
 */    
 function AddGroup($group, $desc)
 {              
    $response = CheckGroup(0, $group);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_groups (`group`,`description`) ".
                     "VALUES ('$group', '$desc');";          
            $select = $db->prepare($query);
            $select->execute();
            
            // debug
            //$response['query'] = $query;
                        
            $response['id']    = $db->lastInsertId();            
            $response['group'] = $group;
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
 * Updated on Mar 23, 2024
 *
 * Description: Edit the tbl_accounts table with the input if the service doesn't exists.
 *
 * In:  $id, $hide, $date, $serv, $type, $account, $desc
 * Out: $response
 *
 */    
 function EditAccount($id, $hide, $date, $serv, $type, $account, $desc)
 {   
    $aTypes   = ["","finance","stock","savings","crypto"];    
    
    $response = CheckAccount($id, $account);    
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_accounts SET `hide`=$hide,`account`='$account',`date`=CONCAT(STR_TO_DATE('$date','%d-%m-%Y'),' ',CURTIME()),".
                            "`serviceid`='$serv',`type`='$aTypes[$type]',`description`='$desc' WHERE `id`=$id";  
            
            $select = $db->prepare($query);
            $select->execute();
            
            // debug
            // $response['query'] = $query;            
                    
            $response['id']   = $db->lastInsertId();
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
 * Updated on Mar 22, 2024
 *
 * Description: Delete the row with id in the tbl_accounts table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteAccount($id)
 {   
    $response = [];  
       
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

    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    CheckGroup
 *
 * Created on Apr 01, 2024
 * Updated on Apr 01, 2024
 *
 * Description: Check if the group exists in the tbl_groups table.
 *
 * In:  $id, $group
 * Out: $response
 *
 */
function CheckGroup($id, $group)
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
        $query = "SELECT count(0) FROM `tbl_groups` WHERE `group` = '$group' $edit;";        
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