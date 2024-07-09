<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_wallets.php
 * Used in: js\settings.js
 *
 * Created on Jul 05, 2024
 * Updated on Jul 08, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_finances table.
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    ModifyFinances();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    ModifyFinances
 *
 * Created on Jul 05, 2024
 * Updated on Jul 08, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_finances table.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyFinances() 
{
    // Get data from ajax call.
    $date   = filter_input(INPUT_POST, 'date'    , FILTER_SANITIZE_STRING);
    $aid    = filter_input(INPUT_POST, 'payment' , FILTER_SANITIZE_STRING); // Payment
    $type   = filter_input(INPUT_POST, 'type'    , FILTER_SANITIZE_STRING); // Income, xFixed or xOther
    $sign   = filter_input(INPUT_POST, 'sign'    , FILTER_SANITIZE_STRING); 
    $amount = filter_input(INPUT_POST, 'amount'  , FILTER_SANITIZE_STRING);    
    $gid    = filter_input(INPUT_POST, 'service' , FILTER_SANITIZE_STRING); // Group    
    $bid    = filter_input(INPUT_POST, 'account' , FILTER_SANITIZE_STRING); // Business  
    $desc   = filter_input(INPUT_POST, 'desc'    , FILTER_SANITIZE_STRING); 
    $action = filter_input(INPUT_POST, 'action'  , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'      , FILTER_SANITIZE_STRING);

    $response = [];    
    switch ($action)
    {
        case "add" :
            $response = AddFinances($date, $aid, $type, $sign, $amount, $gid, $bid, $desc);            
            break;
            
        case "edit" :
            $response = EditFinances($id, $date, $aid, $type, $sign, $amount, $gid, $bid, $desc);
            break;
            
        case "delete" :
            $response = DeleteFinances($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddFinances
 *
 * Created on Jul 05, 2024
 * Updated on Jul 08, 2024
 *
 * Description: Add the input to the tbl_finances table.
 *
 * In:  $date, $aid, $type, $sign, $amount, $gid, $bid, $desc
 * Out: $response
 *
 */    
function AddFinances($date, $aid, $type, $sign, $amount, $gid, $bid, $desc)
{          
    $response = AddRankings($gid, $bid);
    if ($response['success'])
    {
        try 
        {    
            $db = OpenDatabase();
            
            // Determine type (income, fixed or other).
            switch ($type) {
                case 1: $typcol = "income";
                        $income = $sign." ".$amount;
                    break;
                
                case 2: $typcol = "fixed";
                        $fixed = $sign." -".$amount;
                    break;
                
                case 3: $typcol = "other";  
                        $other = $sign." -".$amount;
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
            }        
            
            $query = "INSERT INTO tbl_finances (`date`,`aid`,`$typcol`,`bid`, `description`) ".
                     "VALUES (STR_TO_DATE('$date','%d-%m-%Y'),'$aid',$amtcol,'$bid','$desc');";        
            $select = $db->prepare($query);
            $select->execute();
                        
            $response['id']      = $db->lastInsertId(); 
            $response['date']    = $date; 
            $response['payment'] = $aid;        
            $response['income']  = $income ? $income : "";
            $response['fixed']   = $fixed ? $fixed : "";
            $response['other']   = $other ? $other : "";
            $response['service'] = $gid;
            $response['account'] = $bid;
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
 * Function:    AddRankings
 *
 * Created on Jul 08, 2024
 * Updated on Jul 08, 2024
 *
 * Description: Add group id and business id to the tbl_rankings table.
 *
 * In:  $gid, $bid
 * Out: $response
 *
 */
function AddRankings($gid, $bid)
{
    $response = [];
    
    try 
    { 
        $db = OpenDatabase();
        
        $query = "INSERT INTO tbl_rankings (`gid`,`bid`) VALUES ($gid,'$bid');"; 
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
 * Function:    EditFinances
 *
 * Created on Jul 07, 2024
 * Updated on Jul 07, 2024
 *
 * Description: Edit the tbl_finances table with the input.
 *
 * In:  $id, $date, $aid, $type, $sign, $amount, $gid, $bid, $desc
 * Out: $response
 *
 */    
function EditFinances($id, $date, $aid, $type, $sign, $amount, $gid, $bid, $desc)
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
        }
        
        // Determine type (income, fixed or other).
        switch ($type) {
            case 1: $incol = "`income`=$amtcol";
                    $fxcol = "`fixed`=null";
                    $otcol = "`other`=null";
                    $income = $sign." ".$amount;
                break;
                
            case 2: $incol = "`income`=null";
                    $fxcol = "`fixed`=$amtcol";
                    $otcol = "`other`=null";
                    $fixed = $sign." -".$amount;
                break;
                
            case 3: $incol = "`income`=null";
                    $fxcol = "`fixed`=null";
                    $otcol = "`other`=$amtcol";
                    $other = $sign." -".$amount;
                break;
        }        
        
        $query = "UPDATE tbl_finances SET `date`=STR_TO_DATE('$date','%d-%m-%Y'),`aid`='$aid',".
                 "$incol,$fxcol,$otcol,`bid`='$bid',`description`='$desc' WHERE `id`=$id";  
            
        $select = $db->prepare($query);
        $select->execute();
                            
        $response['id']      = $id;
        $response['date']    = $date; 
        $response['payment'] = $aid;        
        $response['income']  = $income ? $income : "";
        $response['fixed']   = $fixed ? $fixed : "";
        $response['other']   = $other ? $other : "";
        $response['service'] = $gid;
        $response['account'] = $bid;
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
    
    // Close database connection.
    $db = null;   
      
    return $response;
}

/*
 * Function:    DeleteFinances
 *
 * Created on Jul 08, 2024
 * Updated on Jul 08, 2024
 *
 * Description: Delete the row with id in the tbl_finances table.
 *
 * In:  $id
 * Out: $response
 *
 */    
function DeleteFinances($id)
{   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_finances WHERE `id` = $id";          
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