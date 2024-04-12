<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_businesses.php
 * Used in: js\settings.js
 *
 * Created on Apr 06, 2024
 * Updated on Apr 12, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_businesses table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyBusinesses();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyBusinesses
 *
 * Created on Apr 06, 2024
 * Updated on Apr 07, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_businesses table if the account doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyBusinesses() 
{
    // Get data from ajax call.
    $group    = filter_input(INPUT_POST, 'group'    , FILTER_SANITIZE_STRING);
    $business = filter_input(INPUT_POST, 'business' , FILTER_SANITIZE_STRING);    
    $rank     = filter_input(INPUT_POST, 'ranking'  , FILTER_SANITIZE_STRING); 
    $website  = filter_input(INPUT_POST, 'website'  , FILTER_SANITIZE_STRING); 
    $action   = filter_input(INPUT_POST, 'action'   , FILTER_SANITIZE_STRING);
    $id       = filter_input(INPUT_POST, 'id'       , FILTER_SANITIZE_STRING);
    $hide     = filter_input(INPUT_POST, 'hide'     , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddBusinesses($group, $business, $rank, $website);
            break;
            
        case "edit" :
            $response = EditBusinesses($id, $hide, $group, $business, $rank, $website);
            break;
            
        case "delete" :
            $response = DeleteBusinesses($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddBusinesses
 *
 * Created on Apr 06, 2024
 * Updated on Apr 07, 2024
 *
 * Description: Add the input to the tbl_businesses table if the group and businesses doesn't exists.
 *
 * In:  $group, $business, $rank, $website
 * Out: $response
 *
 */    
 function AddBusinesses($group, $business, $rank, $website)
 {          
    $response = CheckBusinesses(0, $group, $business);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_businesses (`business`,`gid`,`website`) ".
                     "VALUES ('$business','$group','$website');";           
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']       = $db->lastInsertId(); 
            $response['group']    = $group;
            $response['business'] = $business;
            $response['ranking']  = $rank;       
            $response['website']  = $website;

            // debug
            //$response['query'] = $query;                    
            
            $response['success'] = true;  
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
    }

    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    EditBusinesses
 *
 * Created on Apr 07, 2024
 * Updated on Apr 07, 2024
 *
 * Description: Edit the tbl_businesses table with the input if the group and business doesn't exists.
 *
 * In:  $id, $hide, $group, $business, $rank, $website
 * Out: $response
 *
 */    
 function EditBusinesses($id, $hide, $group, $business, $rank, $website)
 {   
    $response = CheckBusinesses($id, $group, $business); 
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_businesses SET `hide`=$hide,`business`='$business',`gid`='$group',".
                     "`website`='$website' WHERE `id`=$id";  
            
            $select = $db->prepare($query);
            $select->execute();
                            
            $response['id']       = $id;
            $response['hide']     = $hide;
            $response['group']    = $group;
            $response['business'] = $business;
            $response['ranking']  = $rank;       
            $response['website']  = $website;
            
            // debug
            //$response['query'] = $query;                
            
            $response['success'] = true;  
        }
        catch (PDOException $e) 
        {    
            $response['message'] = $e->getMessage();
            $response['success'] = false;
        } 
    }
    
    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    CheckBusinesses
 *
 * Created on Apr 06, 2024
 * Updated on Apr 06, 2024
 *
 * Description: Check if the group and business exists in the tbl_businesses table.
 *
 * In:  $id, $group, $business
 * Out: $response
 *
 */
function CheckBusinesses($id, $group, $business)
{
    $response = [];
    
    try 
    { 
        $db = OpenDatabase();
        
        $edit = "";
        if ($id > 0) {
            $edit = "AND `id` <> $id";
        }
        
        // Check if user aleready exists in the tbl_businesses table.
        $query = "SELECT count(0) FROM `tbl_businesses` WHERE `gid` = '$group' AND `business` = '$business' $edit;";      
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();

        $response['exists'] = false; 
        if ($result == 1) {
            $response['exists'] = true; 
        }  

        $response['success'] = true;         
    }    
    catch (PDOException $e) 
    {    
        $response['message'] = $e->getMessage();
        $response['success'] = false;
    } 
    
    // Close database connection.
    $db = null;        
    
    return $response;
}

/*
 * Function:    DeleteBusinesses
 *
 * Created on Apr 07, 2024
 * Updated on Apr 07, 2024
 *
 * Description: Delete the row with id in the tbl_businesses table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteBusinesses($id)
 {   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_businesses WHERE `id` = $id";          
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
      
    return $response;
}