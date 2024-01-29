<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_pages.php
 * Used in: js\settings.js
 *
 * Created on Jan 23, 2024
 * Updated on Jan 27, 2024
 *
 * Description: Check if the user is signed in and add the user data to the tbl_users table.
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
    AddUser();
}

/*
 * Function:    ChangePages
 *
 * Created on Jan 23, 2024
 * Updated on Jan 27, 2024
 *
 * Description: Add the user data to the tbl_users table if the user doesn exists.
 *
 * In:  -
 * Out: -
 *
 */
function AddUser() 
{
    // Get data from ajax call.
    $user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
    $hash = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_STRING);

    $response = [];

    // Change the page settings.
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
        else 
        {            
            $query = "INSERT INTO tbl_users (`user`, `password`) VALUES ('$user', '$hash');";
            
            $select = $db->prepare($query);
            $select->execute();
            
            $response['user'] = $user;
            $response['hash'] = $hash;
        }
        
        $response['success'] = true;  
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    } 

    echo $json = json_encode($response);

    // Close database connection.
    $db = null;    
}