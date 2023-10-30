<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_constants.php
 * Used in: js\config.js
 *
 * Created on Oct 15, 2023
 * Updated on Oct 16, 2023
 *
 * Description: Get the constants from de database tblConfig table.
 * Dependenties: config.php
 *
 */
header("Content-Type:application/json");
require_once 'config.php';

$response = [];

try 
{
    $db = OpenDatabase();

    $select = $db->prepare("SELECT `name`, `value` FROM `tblConfig`");
    $select->execute();

    $data = $select->fetchAll(PDO::FETCH_ASSOC);
  
    $response['data']    = $data;
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