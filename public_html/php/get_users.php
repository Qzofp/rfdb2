<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_users.php
 * Used in: js\settings.js
 *
 * Created on Jan 05, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and get the users from the databases tbl_users table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetUsers();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetUsers
 *
 * Created on Jan 05, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the users from the databases tbl_users table.
 *
 * In:  -
 * Out: -
 *
 */
function GetUsers()
{   
    // Get data from ajax call.
    $sort = filter_input(INPUT_POST, 'sort' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];
    try 
    {
        $db = OpenDatabase();
     
        $query = "SELECT `id`, `user`, `password`, IFNULL(DATE_FORMAT(`time`, '%d-%m-%Y %H:%i:%s'), ''),".
                                                 " IFNULL(DATE_FORMAT(`last`, '%d-%m-%Y %H:%i:%s'), '') ".
                 "FROM `tbl_users` ".
                 "ORDER BY `$sort`;";
    
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