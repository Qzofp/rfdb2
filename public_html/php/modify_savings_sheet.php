<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    modify_savings_sheet.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 13, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_savings table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifySavings();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifySavings
 *
 * Created on Jul 13, 2024
 * Updated on Sep 21, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_savings table.
 *
 * In:  -
 * Out: -
 *
 */
function ModifySavings() 
{
    // Get data from ajax call.
    $date   = filter_input(INPUT_POST, 'date'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $type   = filter_input(INPUT_POST, 'type'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS); // Deposit, Withdrawel
    $sign   = filter_input(INPUT_POST, 'sign'    , FILTER_SANITIZE_SPECIAL_CHARS); 
    $amount = filter_input(INPUT_POST, 'amount'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);    
    $sid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $aid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_FULL_SPECIAL_CHARS); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddSavings($date, $type, $sign, $amount, $sid, $aid, $desc);           
            break;
            
        case "edit" :
            $response = EditSavings($id, $date, $type, $sign, $amount, $sid, $aid, $desc);
            break;
            
        case "delete" :
            $response = DeleteSavings($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddSavings
 *
 * Created on Jul 13, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Add the input to the tbl_savings table.
 *
 * In:  $date, $type, $sign, $amount, $sid, $aid, $desc
 * Out: $response
 *
 */    
function AddSavings($date, $type, $sign, $amount, $sid, $aid, $desc)
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
            
        // Convert the and amount (currency) and determine the data format.
        switch ($sign) 
        {
            case "$" :
            case "£" :
                $amtcol = "REPLACE('$amount',',','')";
                $format = "%m/%d/%Y";
                break;
            
            case "€"  :
                $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
                $format = "%d-%m-%Y";
                break;
        }        
            
        $query = "INSERT INTO tbl_savings (`date`,`aid`,`$typcol`,`description`) ".
                 "VALUES (STR_TO_DATE('$date','$format'),'$aid',$amtcol,'$desc');";    
        $select = $db->prepare($query);
        $select->execute();
                        
        $response['id']         = $db->lastInsertId(); 
        $response['date']       = $date;    
        $response['deposit']    = $deposit ? $deposit : "";
        $response['withdrawal'] = $withdrawal ? $withdrawal : "";
        $response['service']    = $sid;
        $response['account']    = $aid;
        $response['desc']       = $desc;
                            
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
 * Function:    EditSavings
 *
 * Created on Jul 13, 2024
 * Updated on Aug 09, 2024
 *
 * Description: Edit the tbl_savings table with the input.
 *
 * In:  $id, $date, $type, $sign, $amount, $sid, $aid, $desc
 * Out: $response
 *
 */    
function EditSavings($id, $date, $type, $sign, $amount, $sid, $aid, $desc)
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
                $format = "%m/%d/%Y";
                break;
            
            case "€"  :
                $amtcol = "REPLACE(REPLACE('$amount','.',''),',','.')";
                $format = "%d-%m-%Y";
                break;            
        }
        
        // Determine type (deposit or withdrawal).
        $deposit = "";
        $withdrawal = "";            
        switch ($type) 
        {
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
        }        
        
        $query = "UPDATE tbl_savings SET `date`=STR_TO_DATE('$date','$format'),`aid`='$aid',".
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
 * Function:    DeleteSavings
 *
 * Created on Jul 13, 2024
 * Updated on Aug 01, 2024
 *
 * Description: Delete the row with id in the tbl_savings table.
 *
 * In:  $id
 * Out: $response
 *
 */    
function DeleteSavings($id)
{   
    $response = [];      
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_savings WHERE `id` = $id";          
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