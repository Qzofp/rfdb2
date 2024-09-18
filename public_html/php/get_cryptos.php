<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_accounts.php
 * Used in: js\settings.js
 *
 * Created on May 19, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and get the cryptos from the databases tbl_cryptocurrenties table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetCryptos();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetCryptos
 *
 * Created on May 19, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the cryptos from the databases tbl_cryptocurrenties table.
 *
 * In:  -
 * Out: -
 *
 */
function GetCryptos()
{   
    $sort = filter_input(INPUT_POST, 'sort', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $response = [];
    try 
    {
        $db = OpenDatabase();
             
        $query = "SELECT `id`, `hide`, `name`, `symbol`,`website` ". 
                 "FROM tbl_cryptocurrenties ".
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