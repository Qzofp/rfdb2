<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_users.php
 * Used in: js\settings.js
 *
 * Created on Jan 05, 2024
 * Updated on Jan 28, 2024
 *
 * Description: Check if the user is signed in and get the users from the databases tbl_users table.
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
    GetUsers();
}

/*
 * Function:    GetUsers
 *
 * Created on Jan 05, 2024
 * Updated on Jan 28, 2024
 *
 * Description: Get the users from the databases tbl_users table.
 *
 * In:  -
 * Out: -
 *
 */
function GetUsers()
{   
    $response = [];

    // Get the settings.
    try 
    {
        $db = OpenDatabase();
     
        $query = "SELECT `id`, `user`, `password`, IFNULL(DATE_FORMAT(`time`, '%d-%m-%Y %H:%i:%s'), ''),".
                                                 " IFNULL(DATE_FORMAT(`last`, '%d-%m-%Y %H:%i:%s'), '') ".
                 "FROM `tbl_users` ".
                 "ORDER BY `user`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $users = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $users;       
 
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    }    

    echo $json = json_encode($response);

    // Close database connection
    $db = null;
}