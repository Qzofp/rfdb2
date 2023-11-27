<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_language.php
 * Used in: js\settings.js
 *
 * Created on Nov 18, 2023
 * Updated on Nov 18, 2023
 *
 * Description: Get the language from the tbl_settings table.
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'config.php';

$response = [];

// Change the scale setting.
try 
{
    $db = OpenDatabase();

    $query = "SELECT JSON_EXTRACT(`value`, '$.language') AS language FROM `tbl_settings` WHERE `name` = \"language\";"; 
                      
    $select = $db->prepare($query);
    $select->execute();    
    
    $data = $select->fetchAll(PDO::FETCH_ASSOC);  
    $response['data'] = $data;
    
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