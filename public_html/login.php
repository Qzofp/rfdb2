<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    login.php
 * Used in: js\login.js
 *
 * Created on Dec 22, 2023
 * Updated on Jan 24, 2024
 *
 * Description: Check the credentails in the database en return the login results (success of failed).
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'php/config.php';

// Get data from ajax call.
$user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
$pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_STRING);

$response = [];

try 
{
    $db = OpenDatabase();

    $query = "SELECT count(*) FROM tbl_users WHERE `user` = '$user' AND `password` = '$pass';";
    
    $select = $db->prepare($query);
    $select->execute();

    $login = $select->fetchColumn();  
    if ($login == 1) 
    {
        session_start();
        $_SESSION['user'] = $user;
        $response['login'] = true;
    }
    else     {
        $response['login'] = false;        
    }
        
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
