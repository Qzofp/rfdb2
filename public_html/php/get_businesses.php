<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_businesses.php
 * Used in: js\settings.js
 *
 * Created on Apr 05, 2024
 * Updated on Jun 07, 2024
 *
 * Description: Check if the user is signed in and get the businesses from the databases tbl_businesses table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetBusinesses();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetBusinesses
 *
 * Created on Apr 05, 2024
 * Updated on Apr 05, 2024
 *
 * Description: Get the businesses from the databases tbl_businesses table.
 *
 * In:  -
 * Out: -
 *
 */
function GetBusinesses()
{   
    $gid  = filter_input(INPUT_POST, 'gid', FILTER_SANITIZE_STRING);
    $rank = filter_input(INPUT_POST, 'rank', FILTER_SANITIZE_STRING);
            
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
         
        if ($gid > 0) {
            $id = "tbl_businesses.`id`";
            $group = "AND tbl_groups.`id` = $gid "; 
        }
        else {
            $id = "CONCAT(tbl_businesses.`id`,'_',tbl_groups.`id`)";
            $group = "";
        }
        
        $ranking = "";
        if ($rank == "true") {
            $ranking = "ranking DESC,";
        }
        
        $query = "SELECT $id AS id, tbl_businesses.`hide`, tbl_groups.`group`, tbl_businesses.`business`, count(0) AS ranking, tbl_businesses.`website` ".
                 "FROM `tbl_businesses` ".
                 "LEFT JOIN `tbl_groups` ON tbl_groups.`id` = tbl_businesses.`gid` ".
                 "LEFT JOIN tbl_rankings ON tbl_businesses.`id` = tbl_rankings.`bid` ". 
                 "WHERE tbl_groups.`hide` = 0 $group".
                 "GROUP BY tbl_businesses.`business`, tbl_businesses.`id` ".
                 "ORDER BY tbl_groups.`group`,$ranking tbl_businesses.`business`"; 
    
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