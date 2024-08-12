<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_select_finances.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 27, 2024
 * Updated on Aug 12, 2024
 *
 * Description: Check if the user is signed in and get the select menus for the finances sheet popup.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetSelectMenu();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetSelectMenu
 *
 * Created on Jul 27, 2024
 * Updated on Jul 28, 2024
 *
 * Description: Get the select menus for the finances sheet popup.
 *
 * In:  -
 * Out: -
 *
 */
function GetSelectMenu()
{   
    $id   = filter_input(INPUT_POST, 'id'  , FILTER_SANITIZE_STRING);
    $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING);
    $rank = filter_input(INPUT_POST, 'rank', FILTER_SANITIZE_STRING);
    
    $response = [];  
    switch($type) 
    {   
        case "account" :
            $response = GetAccountMenu();
            break;
        
        case "group" :
            $response = GetGroupMenu($rank);
            break;        
        
        case "business" :
            $response = GetBusinessMenu($id, $rank);
            break;
    }
    
    echo $json = json_encode($response); 
}


/*
 * Function:    GetAccountMenu
 *
 * Created on Jul 27, 2024
 * Updated on Aug 12, 2024
 *
 * Description: Get the select account menu from the databases tbl_accounts table.
 *
 * In:  -
 * Out: $response
 *
 */
function GetAccountMenu()
{
    $response = [];  
    try 
    {
        $db = OpenDatabase();
        $key = cKEY;
        
        $account = "CAST(AES_DECRYPT(tbl_accounts.`account`,'$key') AS CHAR(45))"; 
        $query = "SELECT tbl_accounts.`id` AS id,$account AS account ". 
                 "FROM tbl_accounts  ".
                 "INNER JOIN tbl_services ON tbl_accounts.`sid` = tbl_services.`id` ".
                 "WHERE tbl_accounts.`hide` = 0 AND tbl_accounts.`type` = 'finance' ".
                 "ORDER BY `account`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $menu = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $menu;  
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    }    

    // Close database connection
    $db = null;
    
    return $response;    
}

/*
 * Function:    GetGroupMenu
 *
 * Created on Jul 28, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select group menu from the databases tbl_groups table.
 *
 * In:  $rank
 * Out: $response
 *
 */
function GetGroupMenu($rank)
{
    $response = [];    
    try 
    {
        $db = OpenDatabase();
        
        $ranking = "";
        if ($rank == "true") {
            $ranking = "ranking DESC,";
        }
        
        $query = "SELECT tbl_groups.`id`, `group`, count(0) AS ranking ". 
                 "FROM `tbl_groups` ".
                 "LEFT JOIN tbl_rankings ON tbl_groups.`id` = tbl_rankings.`gid` ".
                 "WHERE hide = 0 ".
                 "GROUP BY tbl_groups.`id`, tbl_groups.`group` ".
                 "ORDER BY $ranking `group`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $menu = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $menu;  
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    }    

    // Close database connection
    $db = null;
    
    return $response;    
}

/*
 * Function:    GetBusinessMenu
 *
 * Created on Jul 28, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the select business menu from the databases tbl_businesses table.
 *
 * In:  $id, $rank
 * Out: $response
 *
 */
function GetBusinessMenu($id, $rank)
{
    $response = [];
    try 
    {
        $db = OpenDatabase();
        
        $ranking = "";
        if ($rank == "true") {
            $ranking = "ranking DESC,";
        }        
           
        $query = "SELECT tbl_businesses.`id` AS id, tbl_businesses.`business`, count(0) AS ranking ". 
                 "FROM `tbl_businesses` ".
                 "LEFT JOIN `tbl_groups` ON tbl_groups.`id` = tbl_businesses.`gid` ".
                 "LEFT JOIN tbl_rankings ON tbl_businesses.`id` = tbl_rankings.`bid` ".
                 "WHERE tbl_groups.`hide` = 0 AND tbl_businesses.`hide` = 0 AND tbl_groups.`id` = $id ".
                 "GROUP BY tbl_businesses.`business`, tbl_businesses.`id` ".
                 "ORDER BY tbl_groups.`group`, $ranking tbl_businesses.`business`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $menu = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $menu;  
        $response['success'] = true;
    }
    catch (PDOException $e) 
    {    
        // debug
        //$response['query'] = $query;
        
        $response['message'] = $e->getMessage();
        $response['success'] = false;  
    }    

    // Close database connection
    $db = null;
    
    return $response;    
}