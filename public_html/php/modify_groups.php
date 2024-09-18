<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    modify_groups.php
 * Used in: js\settings.js
 *
 * Created on Apr 01, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_groups table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyGroup();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyGroup
 *
 * Created on Apr 01, 2024
 * Updated on Sep 18, 2024
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
    $group   = filter_input(INPUT_POST, 'group'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $rank    = filter_input(INPUT_POST, 'ranking' , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $desc    = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $action  = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $id      = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $hide    = filter_input(INPUT_POST, 'hide'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddGroup($group, $rank, $desc);
            break;
            
        case "edit" :
            $response = EditGroup($id, $hide, $group, $rank, $desc);
            break;
            
        case "delete" :
            $response = DeleteGroup($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddGroup
 *
 * Created on Apr 01, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Add the input to the tbl_groups table if the account doesn't exists.
 *
 * In:  $group, $rank, $desc
 * Out: $response
 *
 */    
 function AddGroup($group, $rank, $desc)
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
                        
            $response['id']      = $db->lastInsertId();            
            $response['group']   = $group;
            $response['ranking'] = $rank;       
            $response['desc']    = $desc;

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
 * Function:    EditGroup
 *
 * Created on Apr 02, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Edit the tbl_groups table with the input if the group doesn't exists.
 *
 * In:  $id, $hide, $group, $rank, $desc
 * Out: $response
 *
 */    
 function EditGroup($id, $hide, $group, $rank, $desc)
 {       
    $response = CheckGroup($id, $group);    
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_groups SET `hide`=$hide,`group`='$group',`description`='$desc' WHERE `id`=$id";
            
            $select = $db->prepare($query);
            $select->execute();
                            
            $response['id']      = $id;
            $response['hide']    = $hide;
            $response['group']   = $group;
            $response['ranking'] = $rank;       
            $response['desc']    = $desc;
            
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
 * Function:    CheckGroup
 *
 * Created on Apr 01, 2024
 * Updated on Aug 01, 2024
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

/*
 * Function:    DeleteGroup
 *
 * Created on Mar 22, 2024
 * Updated on Apr 05, 2024
 *
 * Description: Delete the row with id in the tbl_groups table if it doesn't exists in the tbl_businesses table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteGroup($id)
 {       
    $response = CheckGroupInBusinesses($id);
    if ($response['success'] && !$response['exists'])
    {     
        try 
        {    
            $db = OpenDatabase();
                
            $query = "DELETE FROM tbl_groups WHERE `id` = $id";          
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
    }
    
    return $response;
}

/*
 * Function:    CheckGroupInBusinesses
 *
 * Created on Mar 24, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the group exists in the tbl_businesses table.
 *
 * In:  $id
 * Out: $response
 *
 */
function CheckGroupInBusinesses($id)
{
    $response = [];  
    try 
    { 
        $db = OpenDatabase();
                
        // Check if the group exists in the tbl_businesses table.
        $query = "SELECT count(0) FROM tbl_businesses WHERE gid = $id;";        
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