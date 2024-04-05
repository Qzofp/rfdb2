<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_groups.php
 * Used in: js\settings.js
 *
 * Created on Mar 29, 2024
 * Updated on Apr 05, 2024
 *
 * Description: Check if the user is signed in and get the groups from the databases tbl_groupss table.
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
    GetGroups();
}

/*
 * Function:    GetGroups
 *
 * Created on Mar 29, 2024
 * Updated on Apr 05, 2024
 *
 * Description: Get the gropus from the databases tbl_groups table.
 *
 * In:  -
 * Out: -
 *
 */
function GetGroups()
{   
    $hide = filter_input(INPUT_POST, 'hide', FILTER_SANITIZE_STRING);
    $rank = filter_input(INPUT_POST, 'rank', FILTER_SANITIZE_STRING);
            
    $response = [];
    
    try 
    {
        $db = OpenDatabase();
     
        $where = "";
        if ($hide == "true") {
            $where = "WHERE hide = 0 ";
        }        
        
        $ranking = "";
        if ($rank == "true") {
            $ranking = "ranking DESC,";
        }
              
        $query = "SELECT tbl_groups.`id`, tbl_groups.`hide`, tbl_groups.`group`, count(0) AS ranking, tbl_groups.`description` ".
                 "FROM `tbl_groups` LEFT JOIN tbl_rankings ON tbl_groups.`id` = tbl_rankings.`gid` ".
                 "$where".
                 "GROUP BY tbl_groups.`id`, tbl_groups.`group` ".
                 "ORDER BY $ranking `group`;";
    
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