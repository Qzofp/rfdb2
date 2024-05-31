<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_wallets.php
 * Used in: js\settings.js
 *
 * Created on May 31, 2024
 * Updated on May 31, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_wallets table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyWallets();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyWallets
 *
 * Created on May 31, 2024
 * Updated on May 31, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_wallets table if the wallet doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyWallets() 
{
    // Get data from ajax call.
    $sid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_STRING);
    $aid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_STRING);    
    $cid    = filter_input(INPUT_POST, 'crypto'  , FILTER_SANITIZE_STRING); 
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);
    $hide   = filter_input(INPUT_POST, 'hide'    , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddWallet($sid, $aid, $cid, $desc);
            break;
            
        case "edit" :
            //$response = EditBusinesses($id, $hide, $group, $business, $rank, $website);
            break;
            
        case "delete" :
            //$response = DeleteBusinesses($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddWallet
 *
 * Created on May 31, 2024
 * Updated on May 31, 2024
 *
 * Description: Add the input to the tbl_wallet table if the wallet doesn't exists.
 *
 * In:  $sid, $aid, $cid, $desc
 * Out: $response
 *
 */    
 function AddWallet($sid, $aid, $cid, $desc)
 {          
    $response = CheckWallet(0, $aid, $cid);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_wallets (`aid`,`cid`,`description`) ".
                     "VALUES ('$aid','$cid','$desc');";        
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']      = $db->lastInsertId(); 
            $response['service'] = $sid;            
            $response['account'] = $aid;
            $response['crypto']  = $cid;  
            $response['desc']    = $desc;
            
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
 * Function:    CheckWallet
 *
 * Created on May 31, 2024
 * Updated on May 31, 2024
 *
 * Description: Check if the wallet (aid and cid) exists in the tbl_wallet table.
 *
 * In:  $id, $aid, $cid
 * Out: $response
 *
 */
function CheckWallet($id, $aid, $cid)
{
    $response = [];
    
    try 
    { 
        $db = OpenDatabase();
        
        $edit = "";
        if ($id > 0) {
            $edit = "AND `id` <> $id";
        }
        
        // Check if the wallet already exists in the tbl_wallets table.
        $query = "SELECT count(0) FROM `tbl_wallets` WHERE `aid` = '$aid' AND `cid` = '$cid' $edit;";     
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