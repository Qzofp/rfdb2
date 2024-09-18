<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_groups.php
 * Used in: js\settings.js
 *
 * Created on Mar 29, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Check if the user is signed in and get the groups from the databases tbl_groupss table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetGroups();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetGroups
 *
 * Created on Mar 29, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the groups from the databases tbl_groups table.
 *
 * In:  -
 * Out: -
 *
 */
function GetGroups()
{               
    $response = [];    
    try 
    {
        $db = OpenDatabase();
                
        $query = "SELECT tbl_groups.`id`, tbl_groups.`hide`, tbl_groups.`group`, count(0) AS ranking, tbl_groups.`description` ".
                 "FROM `tbl_groups` LEFT JOIN tbl_rankings ON tbl_groups.`id` = tbl_rankings.`gid` ".
                 "GROUP BY tbl_groups.`id`, tbl_groups.`group` ".
                 "ORDER BY ranking DESC, `group`;";
    
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