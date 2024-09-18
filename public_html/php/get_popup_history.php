<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    get_popup_history.php
 * Used in: js\sheet_edit.js
 *
 * Created on Jul 31, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the popup history (radio button and description).
 * Dependenties: config.php
 *
 */
require_once 'config.php';
session_start();
header("Content-Type:application/json");
if (isset($_SESSION['user'])) {
    GetPopupHistory();
}
else {
    RedirectAjaxRequest(); 
}

/*
 * Function:    GetPopupHistory
 *
 * Created on Jul 31, 2024
 * Updated on Sep 18, 2024
 *
 * Description: Get the popup history (radio button and description).
 *
 * In:  -
 * Out: -
 *
 */
function GetPopupHistory()
{   
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $id   = filter_input(INPUT_POST, 'id'  , FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $response = [];    
    switch ($name)
    {
        case "finance" :
            $response = GetPopupFinancesHistory($id);          
            break;
            
        case "stock" :
            $response = "";
            break;
            
        case "savings" :
            $response = "";
            break;  
        
        case "crypto" :
            $response = "";
            break;           
    }     
    
    echo $json = json_encode($response);
}

/*
 * Function:    GetPopupFinancesHistory
 *
 * Created on Jul 31, 2024
 * Updated on Jul 31, 2024
 *
 * Description: Get the popup finances history (radio button and description).
 *
 * In:  $id
 * Out: $response
 *
 */
function GetPopupFinancesHistory($id)
{
    $response = [];
    try 
    {
        $db = OpenDatabase();
        
        $query = "SELECT rad_history, desc_history ".
                 "FROM `tbl_businesses` ".
                 "WHERE id = $id";
    
        $select = $db->prepare($query);
        $select->execute();

        $history = $select->fetchAll(PDO::FETCH_ASSOC);  
        $response['data'] = $history;       
 
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