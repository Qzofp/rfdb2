<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_stocks_sheet.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 12, 2024
 * Updated on Jul 22, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_stocks table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyStocks();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyStocks
 *
 * Created on Jul 12, 2024
 * Updated on Jul 12, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_stocks table.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyStocks() 
{
    // Get data from ajax call.
    $date   = filter_input(INPUT_POST, 'date'    , FILTER_SANITIZE_STRING);
    $type   = filter_input(INPUT_POST, 'type'    , FILTER_SANITIZE_STRING); // Deposit, Withdrawel
    $sign   = filter_input(INPUT_POST, 'sign'    , FILTER_SANITIZE_STRING); 
    $amount = filter_input(INPUT_POST, 'amount'  , FILTER_SANITIZE_STRING);    
    $sid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_STRING); 
    $aid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_STRING); 
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddStocks($date, $type, $sign, $amount, $sid, $aid, $desc);           
            break;
            
        case "edit" :
            $response = EditStocks($id, $date, $type, $sign, $amount, $sid, $aid, $desc);
            break;
            
        case "delete" :
            $response = DeleteStocks($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddStocks
 *
 * Created on Jul 12, 2024
 * Updated on Jul 16, 2024
 *
 * Description: Add the input to the tbl_stocks table.
 *
 * In:  $date, $type, $sign, $amount, $sid, $aid, $desc
 * Out: $response
 *
 */    
function AddStocks($date, $type, $sign, $amount, $sid, $aid, $desc)
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
                break;
            
            case "€"  :
                $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
               break;
                
            default :
                break;
        }        
            
        $query = "INSERT INTO tbl_stocks (`date`,`aid`,`$typcol`,`description`) ".
                 "VALUES (STR_TO_DATE('$date','%d-%m-%Y'),'$aid',$amtcol,'$desc');";        
        $select = $db->prepare($query);
        $select->execute();
                        
        $response['id']         = $db->lastInsertId(); 
        $response['date']       = $date;    
        $response['deposit']    = $deposit ? $deposit : "";
        $response['withdrawal'] = $withdrawal ? $withdrawal : "";
        $response['service']    = $sid;
        $response['account']    = $aid;
        $response['desc']       = $desc;
            
        // debug
        //$response['query'] = $query;                    
           
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
 * Function:    EditStocks
 *
 * Created on Jul 12, 2024
 * Updated on Jul 12, 2024
 *
 * Description: Edit the tbl_stocks table with the input.
 *
 * In:  $id, $date, $type, $sign, $amount, $sid, $aid, $desc
 * Out: $response
 *
 */    
function EditStocks($id, $date, $type, $sign, $amount, $sid, $aid, $desc)
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
                break;
            
            case "€"  :
                $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
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
        
        $query = "UPDATE tbl_stocks SET `date`=STR_TO_DATE('$date','%d-%m-%Y'),`aid`='$aid',".
                 "$depcol,$witcol,`description`='$desc' WHERE `id`=$id"; 
            
        $select = $db->prepare($query);
        $select->execute();
                            
        $response['id']         = $id;
        $response['date']       = $date;        
        $response['deposit']    = $deposit ? $deposit : "";
        $response['withdrawal'] = $withdrawal ? $withdrawal : "";
        $response['service']    = $sid;
        $response['account']    = $aid;
        $response['desc']       = $desc;
            
        // debug
        //$response['query'] = $query;                
            
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
 * Function:    DeleteStocks
 *
 * Created on Jul 12, 2024
 * Updated on Jul 12, 2024
 *
 * Description: Delete the row with id in the tbl_stocks table.
 *
 * In:  $id
 * Out: $response
 *
 */    
function DeleteStocks($id)
{   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_stocks WHERE `id` = $id";          
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