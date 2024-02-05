<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_user .php
 * Used in: js\settings.js
 *
 * Created on Jan 23, 2024
 * Updated on Feb 04, 2024
 *
 * Description: Check if the user is signed in and modify the user in the tbl_users table.
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
    ModifyUser();
}

/*
 * Function:    ModifyUser
 *
 * Created on Jan 23, 2024
 * Updated on Feb 03, 2024
 *
 * Description: Modify (add, edit or delete) the user in the tbl_users table if the user doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyUser() 
{
    // Get data from ajax call.
    $user   = filter_input(INPUT_POST, 'user'   , FILTER_SANITIZE_STRING);
    $hash   = filter_input(INPUT_POST, 'pass'   , FILTER_SANITIZE_STRING);
    $action = filter_input(INPUT_POST, 'action' , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'     , FILTER_SANITIZE_STRING);

    $response = [];
    
    switch ($action)
    {
        case "add" :
            $response = AddUser($user, $hash);
            break;
            
        case "edit" :
            $response = EditUser($id, $user, $hash);
            break;
            
        case "delete" :
            $response = DeleteUser($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddUser
 *
 * Created on Feb 03, 2024
 * Updated on Feb 04, 2024
 *
 * Description: Add the user in the tbl_users table if the user doesn't exists.
 *
 * In:  $user, $hash
 * Out: $response
 *
 */    
 function AddUser($user, $hash)
 {   
    $response = CheckUser($user);    
    if ($response['success'] && !$response['exists'])
    {        
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_users (`user`, `password`) VALUES ('$user', '$hash');";            
            $select = $db->prepare($query);
            $select->execute();
            
            $response['id']   = $db->lastInsertId();            
            $response['user'] = $user;
            $response['hash'] = $hash;
               
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
 * Function:    EditUser
 *
 * Created on Feb 03, 2024
 * Updated on Feb 03, 2024
 *
 * Description: Edit the user in the tbl_users table if the user doesn't exists.
 *
 * In:  $id, $user, $hash
 * Out: $response
 *
 */    
 function EditUser($id, $user, $hash)
 {   
    $response = CheckUser($user);    
    if ($response['success'] && !$response['exists'])
    {        
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "UPDATE tbl_users SET `user` = '$user', `password` = '$hash' WHERE `id` = $id";          
            $select = $db->prepare($query);
            $select->execute();
            
            $response['user'] = $user;
            $response['hash'] = $hash;
            
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
 * Function:    DeleteUser
 *
 * Created on Feb 03, 2024
 * Updated on Feb 03, 2024
 *
 * Description: Delete the user in the tbl_users table if the user doesn't exists.
 *
 * In:  $user, $hash
 * Out: $response
 *
 */    
 function DeleteUser($id)
 {   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_users WHERE `id` = $id";          
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
 * Function:    CheckUser
 *
 * Created on Feb 03, 2024
 * Updated on Feb 03, 2024
 *
 * Description: Check if the user exists in the user table.
 *
 * In:  $user
 * Out: $response
 *
 */
function CheckUser($user)
{
    $response = [];
    
    try 
    { 
        $db = OpenDatabase();
        
        // Check if user aleready exists in the tbl_users table.
        $query = "SELECT count(0) FROM tbl_users WHERE user = '$user';";        
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
