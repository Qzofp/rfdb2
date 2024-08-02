<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_crypto_sheet.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 21, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_crypto table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyCrypto();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyCrypto
 *
 * Created on Jul 21, 2024
 * Updated on Jul 22, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_crypto table.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyCrypto() 
{
    // Get data from ajax call.
    $date   = filter_input(INPUT_POST, 'date'    , FILTER_SANITIZE_STRING);
    $type   = filter_input(INPUT_POST, 'type'    , FILTER_SANITIZE_STRING); // Deposit, Withdrawel
    $sign   = filter_input(INPUT_POST, 'sign'    , FILTER_SANITIZE_STRING); 
    $amount = filter_input(INPUT_POST, 'amount'  , FILTER_SANITIZE_STRING);    
    $sid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_STRING); 
    $aid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_STRING);
    $number = filter_input(INPUT_POST, 'number'  , FILTER_SANITIZE_STRING);
    $cid    = filter_input(INPUT_POST, 'crypto'  , FILTER_SANITIZE_STRING);
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddCrypto($date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc);           
            break;
            
        case "edit" :
            $response = EditCrypto($id, $date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc);
            break;
            
        case "delete" :
            $response = DeleteCrypto($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddCrypto
 *
 * Created on Jul 21, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Add the input to the tbl_crypto table.
 *
 * In:  $date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc
 * Out: $response
 *
 */    
function AddCrypto($date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc)
{          
    $response = GetWalletId($aid, $cid);
    if ($response['success'] && $response['id'] > 0)
    {              
        try 
        {    
            $db = OpenDatabase();
            
            // Determine type (deposit or withdrawal).
            $deposit = "";
            $withdrawal = "";   
            switch ($type) {
                case 1: $typcol = "deposit";
                    $deposit = $sign." ".$amount;
                    break;
                
                case 2: $typcol = "withdrawal";
                    $withdrawal = $sign." -".$amount;
                    break;
                
                default :
                    break;                
            }
            
            // Convert the and amount (currency).
            switch ($sign) 
            {
                case "$" :
                case "£" :
                    $amtcol = "REPLACE('$amount',',','')";
                    $numcol = "REPLACE('$number',',','')";                    
                    break;
            
                case "€"  :
                    $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
                    $numcol = "REPLACE(REPLACE('$number','.',''),',','.')";
                    break;
                
                default :
                    break;
            }        
           
            $wid = $response['id'];
            $query = "INSERT INTO tbl_crypto (`date`,`wid`,`$typcol`,`amount`,`description`) ".
                     "VALUES (STR_TO_DATE('$date','%d-%m-%Y'),'$wid',$amtcol,$numcol,'$desc');";       
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']         = $db->lastInsertId(); 
            $response['date']       = $date;    
            $response['deposit']    = $deposit ? $deposit : "";
            $response['withdrawal'] = $withdrawal ? $withdrawal : "";
            $response['service']    = $sid;
            $response['account']    = $aid;
            $response['number']     = $number;            
            $response['crypto']     = $cid;              
            $response['desc']       = $desc;
                           
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
 * Function:    EditCrypto
 *
 * Created on Jul 22, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Edit the tbl_crypto table with the input.
 *
 * In:  $id, $date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc
 * Out: $response
 *
 */    
function EditCrypto($id, $date, $type, $sign, $amount, $sid, $aid, $number, $cid, $desc)
{
    $response = GetWalletId($aid, $cid);
    if ($response['success'] && $response['id'] > 0)
    {      
        try 
        {                
            $db = OpenDatabase();
            
            // Convert the and amount (currency).
            switch ($sign) 
            {
                case "$" :
                case "£" :
                    $amtcol = "REPLACE('$amount',',','')";
                    $numcol = "REPLACE('$number',',','')";  
                    break;
            
                case "€"  :
                    $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
                    $numcol = "REPLACE(REPLACE('$number','.',''),',','.')";
                    break;
                
                default :
                    break;            
            }
        
            // Determine type (deposit or withdrawal).
            $deposit = "";
            $withdrawal = "";            
            switch ($type) {
                case 1: 
                    $depcol = "`deposit`=$amtcol";
                    $witcol = "`withdrawal`=null";
                    $deposit = $sign." ".$amount;
                    break;
                
                case 2: 
                    $depcol = "`deposit`=null";
                    $witcol = "`withdrawal`=$amtcol";
                    $withdrawal = $sign." -".$amount;
                    break;
                                      
                default :
                    break;            
            }        
        
            $wid = $response['id'];
            $query = "UPDATE tbl_crypto SET `date`=STR_TO_DATE('$date','%d-%m-%Y'),`wid`=$wid,".
                     "$depcol,$witcol,`amount`=$numcol,  `description`='$desc' WHERE `id`=$id";
            
            $select = $db->prepare($query);
            $select->execute();
                            
            $response['id']         = $id;
            $response['date']       = $date;        
            $response['deposit']    = $deposit ? $deposit : "";
            $response['withdrawal'] = $withdrawal ? $withdrawal : "";
            $response['service']    = $sid;
            $response['account']    = $aid;
            $response['number']     = $number;            
            $response['crypto']     = $cid;               
            $response['desc']       = $desc;
                        
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
 * Function:    GetWalletId
 *
 * Created on Jul 21, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Get the wallet id from tbl_wallets table.
 *
 * In:  $aid, $cid
 * Out: $response
 *
 */ 
function GetWalletId($aid, $cid)
{
    $response = [];    
    try 
    { 
        $db = OpenDatabase();
                
        // Get the wallet id.
        $query = "SELECT id FROM `tbl_wallets` WHERE `aid` = $aid AND `cid` = $cid;";        
        $select = $db->prepare($query);
        $select->execute();        
        $result = $select->fetchColumn();

        $response['id'] = $result;
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
 * Function:    DeleteCrypto
 *
 * Created on Jul 22, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Delete the row with id in the tbl_crypto table.
 *
 * In:  $id
 * Out: $response
 *
 */    
function DeleteCrypto($id)
{   
    $response = [];     
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_crypto WHERE `id` = $id";          
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