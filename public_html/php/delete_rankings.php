<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    delete_rankings.php
 * Used in: js\index.js
 *
 * Created on Jul 22, 2024
 * Updated on Jul 22, 2024
 *
 * Description: Check if the user is signed in and delete old tbl_rankings table entries.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    DeleteRankings();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    DeleteRankings
 *
 * Created on Jul 22, 2024
 * Updated on Jul 22, 2024
 *
 * Description: Delete rankings olde then n months from the tbl_ranking table.
 *
 * In:  -
 * Out: $response
 *
 */    
function DeleteRankings()
{   
    // Get data from ajax call.
    $n = filter_input(INPUT_POST, 'n', FILTER_SANITIZE_STRING);

    $response = [];        
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_rankings WHERE `timestamp` <= DATE_SUB(CURDATE(), INTERVAL $n MONTH);";         
        $select = $db->prepare($query);
        $select->execute();
                    
        $response['success'] = true;  
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    } 

    // Close database connection.
    $db = null;   
      
    echo $json = json_encode($response);
}