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
 * Updated on Jan 24, 2024
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
 * Updated on Jan 24, 2024
 *
 * Description: Add the user data to the tbl_users table.
 *
 * In:  -
 * Out: -
 *
 */
function AddUser() 
{
    // Get data from ajax call.
    $user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
    $pass = filter_input(INPUT_POST, 'pass1', FILTER_SANITIZE_STRING);

    $response = [];

    // Change the page settings.
    try 
    {    
        $db = OpenDatabase();
    
        
        // Test
        $response['user'] = $user;
        $response['pass'] = $pass;
        //$response['pass2'] = $data[2];
        
        
/*        
        $query = "";
        for($i = 0; $i < 4; $i++) 
        { 
            if ($aPages[$i]) {
                $value = "true";
            }
            else {
                $value = "false";
            }
        
            // Update the settings table.
            $query .= "UPDATE `tbl_settings` ".
                      "SET `value` = JSON_REPLACE(`value`,'$.page','$value') ".
                      "WHERE `name` = \"$name[$i]\";";
        }
                        
        $select = $db->prepare($query);
        $select->execute();
*/
        
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