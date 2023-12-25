<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    change_scale.php
 * Used in: js\sheet.js
 *
 * Created on Nov 15, 2023
 * Updated on Dec 24, 2023
 *
 * Description: Check if the user is signed in and change the scale in the tbl_settings table.
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
    ChangeScale();
}

/*
 * Function:    ChangeScale
 *
 * Created on Dec 24, 2023
 * Updated on Dec 24, 2023
 *
 * Description: change the scale in the tbl_settings table.
 *
 * In:  -
 * Out: -
 *
 */
function ChangeScale()
{
    // Get data from ajax call.
    $name  = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $scale = filter_input(INPUT_POST, 'scale', FILTER_SANITIZE_STRING);

    $response = [];

    // Change the scale setting.
    try 
    {
        $db = OpenDatabase();

        $query = "UPDATE `tbl_settings`"
                ."SET `value` = JSON_REPLACE(`value`,'$.scale','$scale')"
                ."WHERE `name` = \"$name\";";
  
        $select = $db->prepare($query);
        $select->execute();    
    
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