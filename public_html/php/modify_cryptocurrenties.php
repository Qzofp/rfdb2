<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_cryptocurrenties.php
 * Used in: js\settings.js
 *
 * Created on May 28, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_cryptocurrenties table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyCryptoCurrenties();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyCryptoCurrenties
 *
 * Created on May 28, 2024
 * Updated on May 29, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_cryptocurrenties table if the name doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyCryptoCurrenties() 
{
    // Get data from ajax call.
    $name    = filter_input(INPUT_POST, 'name'   , FILTER_SANITIZE_STRING);
    $symbol  = filter_input(INPUT_POST, 'symbol' , FILTER_SANITIZE_STRING); 
    $web     = filter_input(INPUT_POST, 'web'    , FILTER_SANITIZE_STRING); 
    $action  = filter_input(INPUT_POST, 'action' , FILTER_SANITIZE_STRING);
    $id      = filter_input(INPUT_POST, 'id'     , FILTER_SANITIZE_STRING);
    $hide    = filter_input(INPUT_POST, 'hide'   , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddCryptoCurrenties($name, $symbol, $web);
            break;
            
        case "edit" :
            $response = EditCryptoCurrenties($id, $hide, $name, $symbol, $web);
            break;
            
        case "delete" :
            $response = DeleteCryptoCurrenties($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddCryptoCurrenties
 *
 * Created on May 28, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Add the input to the tbl_cryptocurrenties table if the name or symbol doesn't exists.
 *
 * In:  $name, $symbol, $web
 * Out: $response
 *
 */    
 function AddCryptoCurrenties($name, $symbol, $web)
 {              
    $response = CheckCryptoCurrenties(0, $name, $symbol);
    if ($response['success'] && !$response['exists'])
    {  
        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_cryptocurrenties (`name`,`symbol`,`website`) ".
                     "VALUES ('$name', '$symbol', '$web');";          
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']     = $db->lastInsertId();            
            $response['name']   = $name;
            $response['symbol'] = $symbol;    
            $response['web']    = $web;

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
 * Function:    EditCryptoCurrenties
 *
 * Created on May 29, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Edit the tbl_cryptocurrenties table with the input if the name or symbol doesn't exists.
 *
 * In:  $id, $hide,  $name, $symbol, $web
 * Out: $response
 *
 */    
 function EditCryptoCurrenties($id, $hide, $name, $symbol, $web)
 {       
    $response = CheckCryptoCurrenties($id, $name, $symbol);
    if ($response['success'] && !$response['exists'])
    {    
        try 
        {                
            $db = OpenDatabase();
                
            $query = "UPDATE tbl_cryptocurrenties SET `hide`=$hide,`name`='$name',`symbol`='$symbol', `website`='$web' WHERE `id`=$id";
            
            $select = $db->prepare($query);
            $select->execute();
          
            $response['id']     = $id;
            $response['hide']   = $hide;
            $response['name']   = $name;
            $response['symbol'] = $symbol;       
            $response['web']    = $web;
            
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
 * Function:    CheckCryptoCurrenties
 *
 * Created on May 28, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the name or crypto exists in the tbl_cryptocurrenties table.
 *
 * In:  $id, $name, $symbol
 * Out: $response
 *
 */
function CheckCryptoCurrenties($id, $name, $symbol)
{
    $response = [];   
    try 
    { 
        $db = OpenDatabase();
        
        $edit = "";
        if ($id > 0) {
            $edit = "AND `id` <> $id";
        }
        
        // Check if user aleready exists in the tbl_accounts table.
        $query = "SELECT count(0) FROM `tbl_cryptocurrenties` ".
                 "WHERE (`name` = '$name' OR `symbol` = '$symbol') $edit;";
        
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

/*
 * Function:    DeleteCryptoCurrenties
 *
 * Created on May 29, 2024
 * Updated on May 29, 2024
 *
 * Description: Delete the row with id in the tbl_cryptocurrenties table if it doesn't exists in the tbl_wallets table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteCryptoCurrenties($id)
 {       
    $response = CheckCryptoInWallets($id);
    if ($response['success'] && !$response['exists'])
    {     
        try 
        {    
            $db = OpenDatabase();
                
            $query = "DELETE FROM tbl_cryptocurrenties WHERE `id` = $id";          
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
    }
    
    return $response;
}

/*
 * Function:    CheckCryptoInWallets
 *
 * Created on May 29, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the crypto exists in the tbl_wallets table.
 *
 * In:  $id
 * Out: $response
 *
 */
function CheckCryptoInWallets($id)
{
    $response = [];   
    try 
    { 
        $db = OpenDatabase();
                
        // Check if the group exists in the tbl_businesses table.
        $query = "SELECT count(0) FROM tbl_wallets WHERE cid = $id;";        
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