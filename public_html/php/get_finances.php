<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_finances.php
 * Used in: js\settings.js
 *
 * Created on Apr 26, 2024
 * Updated on Apr 26, 2024
 *
 * Description: Check if the user is signed in and get the finances from the databases tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetFinances();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetFinances
 *
 * Created on Apr 26, 2024
 * Updated on Apr 26, 2024
 *
 * Description: Get the fiannces from the databases tbl_finances table.
 *
 * In:  -
 * Out: -
 *
 */
function GetFinances()
{   
    $sort = filter_input(INPUT_POST, 'sort', FILTER_SANITIZE_STRING);

    
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
     
        $query = "SELECT `id`, `date`, `aid`, `income`, `fixed`, `other`, '' AS `group`, `bid`, `description`". 
                 "FROM tbl_finances ".
                 "ORDER BY `$sort`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $accounts = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $accounts;       
 
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