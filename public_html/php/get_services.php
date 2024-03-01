<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    get_services.php
 * Used in: js\settings.js
 *
 * Created on Feb 10, 2024
 * Updated on Feb 28, 2024
 *
 * Description: Check if the user is signed in and get the services from the databases tbl_services table.
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
    GetServices();
}

/*
 * Function:    GetServices
 *
 * Created on Feb 10, 2024
 * Updated on Feb 28, 2024
 *
 * Description: Get the services from the databases tbl_services table.
 *
 * In:  -
 * Out: -
 *
 */
function GetServices()
{   
    $sort = filter_input(INPUT_POST, 'sort' , FILTER_SANITIZE_STRING);

    $response = [];

    try 
    {
        $db = OpenDatabase();
     
        // Get the finance, stock, savings and crypto pages (true | false) from the settings table.
        $query = "SELECT `name`, JSON_UNQUOTE(JSON_EXTRACT(`value`, '$.page')) AS `page` FROM `tbl_settings` ".
                 "WHERE `id` IN (2,3,4,5)";
                
        $select = $db->prepare($query);
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
        
        $pages = "";
        foreach($settings as $row=>$link) 
        {
            if ($link['page'] == "true") {
                $pages .= ",`" . $link['name'] . "`";
            }
        }

        $query = "SELECT `id`,`hide`,`service`$pages,`website`".
                 "FROM `tbl_services` ".
                 "ORDER BY `$sort`;";
    
        $select = $db->prepare($query);
        $select->execute();

        $users = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $users;       
 
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