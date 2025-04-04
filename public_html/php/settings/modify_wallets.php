<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    modify_wallets.php
 * Used in: js\settings_finances.js
 *
 * Created on May 31, 2024
 * Updated on Mar 31, 2025
 *
 * Description: Check if the user is signed in and modify the tbl_wallets table.
 * Dependenties: config.php
 *
 */
require_once '../config.php';
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
 * Updated on Mar 31, 2025
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
    $sid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $aid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
    $cid    = filter_input(INPUT_POST, 'crypto'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $color  = filter_input(INPUT_POST, 'color'   , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $hide   = filter_input(INPUT_POST, 'hide'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddWallet($sid, $aid, $cid, $color, $desc);
            break;
            
        case "edit" :
            $response = EditWallet($id, $hide, $sid, $aid, $cid, $color, $desc);
            break;
            
        case "delete" :
            $response = DeleteWallet($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddWallet
 *
 * Created on May 31, 2024
 * Updated on Mar 31, 2025
 *
 * Description: Add the input to the tbl_wallet table if the wallet doesn't exists.
 *
 * In:  $sid, $aid, $cid, $color, $desc
 * Out: $response
 *
 */    
 function AddWallet($sid, $aid, $cid, $color, $desc)
 {          
    $response = CheckWallet(0, $aid, $cid);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_wallets (`aid`,`cid`,`color`,`description`) ".
                     "VALUES ('$aid','$cid','$color','$desc');";      
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']      = $db->lastInsertId(); 
            $response['service'] = $sid;            
            $response['account'] = $aid;
            $response['crypto']  = $cid;  
            $response['color']   = "<span style=\"color:$color;\">&#9608;&nbsp;</span>$color";
            $response['desc']    = $desc;
            
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
 * Function:    EditWallet
 *
 * Created on Jun 01, 2024
 * Updated on Mar 31, 2025
 *
 * Description: Edit the tbl_wallet table with the input if the wallet doesn't exists.
 *
 * In:  $id, $hide, $sid, $aid, $cid, $color, $desc
 * Out: $response
 *
 */    
 function EditWallet($id, $hide, $sid, $aid, $cid, $color, $desc)
 {   
    $response = CheckWallet($id, $aid, $cid);    
    if ($response['success'] && !$response['exists'])
    {             
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_wallets SET `hide`=$hide,`aid`='$aid',`cid`='$cid',".
                     "`color`='$color', `description`='$desc' WHERE `id`=$id";  
            
            $select = $db->prepare($query);
            $select->execute();
                            
            $response['id']      = $id;
            $response['hide']    = $hide;
            $response['service'] = $sid;            
            $response['account'] = $aid;
            $response['crypto']  = $cid; 
            $response['color']   = "<span style=\"color:$color;\">&#9608;&nbsp;</span>$color";
            $response['desc']    = $desc;
                          
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
 * Updated on Aug 01, 2024
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
 * Function:    DeleteWallet
 *
 * Created on Jun 01, 2024
 * Updated on Jun 01, 2024
 *
 * Description: Delete the row with id in the tbl_wallet table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteWallet($id)
 {   
    $response = CheckWalletInCrypto($id);
    if ($response['success'] && !$response['exists'])
    { 
        try 
        {    
            $db = OpenDatabase();
                
            $query = "DELETE FROM tbl_wallets WHERE `id` = $id";          
            $select = $db->prepare($query);
            $select->execute();
                    
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
 * Function:    CheckWalletInCrypto
 *
 * Created on Jul 25, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the wallet exists in the tbl_crypto table.
 *
 * In:  $id
 * Out: $response
 *
 */
function CheckWalletInCrypto($id)
{  
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
                
        // Check if the business exists in the tbl_finances table.
        $query = "SELECT count(0) FROM tbl_crypto WHERE wid = $id;";        
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();

        $response['exists'] = false; 
        if ($result > 0) {
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