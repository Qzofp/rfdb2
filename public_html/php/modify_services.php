<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    modify_services.php
 * Used in: js\settings.js
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Check if the user is signed in and modify the tbl_services table.
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
    ModifyService();
}

/*
 * Function:    ModifyServices
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Modify (add, edit or delete) the tbl_services table if the service doesn't exists.
 *
 * In:  -
 * Out: -
 *
 */
function ModifyService() 
{
    // Get data from ajax call.
    $srv    = filter_input(INPUT_POST, 'srv'    , FILTER_SANITIZE_STRING);
    $web    = filter_input(INPUT_POST, 'web'    , FILTER_SANITIZE_STRING);
    $opt    = filter_input(INPUT_POST, 'opt'    , FILTER_SANITIZE_STRING);    
    $action = filter_input(INPUT_POST, 'action' , FILTER_SANITIZE_STRING);
    $id     = filter_input(INPUT_POST, 'id'     , FILTER_SANITIZE_STRING);

    $aNames   = ["finance","stock","savings","crypto"];
    $aOptions = json_decode($opt);
    $response = [];
    
    switch ($action)
    {
        case "add" :
            $response = AddService($srv, $web, $aNames, $aOptions);
            break;
            
        case "edit" :
            $response = EditService($id, $srv, $web, $aNames, $aOptions);
            break;
            
        case "delete" :
            $response = DeleteService($id);
            break;                
    }    
    
    echo $json = json_encode($response);
}    
    
/*
 * Function:    AddService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Add the input to the tbl_services table if the service doesn't exists.
 *
 * In:  $srv, $web, $aNames, $aOptions
 * Out: $response
 *
 */    
 function AddService($srv, $web, $aNames, $aOptions)
 {   
    $options    = "";
    $opt_values = "";
       
    $response = CheckService($srv);   
    if ($response['success'] && !$response['exists'])
    {  
        list($options, $opt_values) = CreateInsertNamesAndValues($aNames, $aOptions);

        try 
        {    
            $db = OpenDatabase();
                 
            $query = "INSERT INTO tbl_services (`service`,`website`$options) VALUES ('$srv','$web'$opt_values);";            
            $select = $db->prepare($query);
            $select->execute();
            
            $response['id']  = $db->lastInsertId();            
            $response['srv'] = $srv;
            $response['web'] = $web;
            $response['opt'] = ltrim(str_replace("'", "", $opt_values),",");

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
 * Function:    EditService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Edit the tbl_services table with the input if the service doesn't exists.
 *
 * In:  $id, $srv, $web, $aNames, $aOptions
 * Out: $response
 *
 */    
 function EditService($id, $srv, $web, $aNames, $aOptions)
 {   
    $options    = "";
    $opt_values = "";
           
    try 
    {    
        list($options, $opt_values) = CreateUpdateNamesAndValues($aNames, $aOptions);
            
        $db = OpenDatabase();
                
        $query = "UPDATE tbl_services SET `service`='$srv',`website`='$web'$options WHERE `id`=$id";          
        $select = $db->prepare($query);
        $select->execute();
            
        $response['id']  = $db->lastInsertId();            
        $response['srv'] = $srv;
        $response['web'] = $web;
        $response['opt'] = $opt_values;
            
        // Debug
        $response['query'] = $query;
            
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
 * Function:    DeleteService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Delete the service in the tbl_users table.
 *
 * In:  $id
 * Out: $response
 *
 */    
 function DeleteService($id)
 {   
    $response = [];  
       
    try 
    {    
        $db = OpenDatabase();
                
        $query = "DELETE FROM tbl_services WHERE `id` = $id";          
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

/*
 * Function:    CheckService
 *
 * Created on Feb 20, 2024
 * Updated on Feb 20, 2024
 *
 * Description: Check if the service exists in the tbl_services table.
 *
 * In:  $srv
 * Out: $response
 *
 */
function CheckService($srv)
{
    $response = [];
    
    try 
    { 
        $db = OpenDatabase();
        
        // Check if user aleready exists in the tbl_users table.
        $query = "SELECT count(0) FROM `tbl_services` WHERE `service` = '$srv';";        
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
 * Function:    CreateInsertNamesAndValues
 *
 * Created on Feb 20, 2024
 * Updated on Feb 20, 2024
 *
 * Description: Create the names and values for the finance, stock, savings and/or crypto columns for the INSERT.
 *
 * In:  $aNames, $aValues
 * Out: $names, values
 *
 */  
function CreateInsertNamesAndValues($aNames, $aValues)
{
    $names  = "";
    $values = "";    
    $check  = false;
    
    for($i = 0; $i < 4; $i++) 
    {
        if (isset($aValues[$i]))
        {
            $names .= "`$aNames[$i]`,";                
            if ($aValues[$i]) {
                $values .= "'&#9745;',";
            }
            else {
                $values .= "'&#9744;',";
            }
            
            $check = true;
        }
    }

    if ($check)
    {
        $names = ",".$names;           
        $names = rtrim($names, ",");
            
        $values = ",".$values;
        $values = rtrim($values, ",");
    }    
        
    return array($names, $values);
}     

/*
 * Function:    CreateUpdateNamesAndValues
 *
 * Created on Feb 21, 2024
 * Updated on Feb 21, 2024
 *
 * Description: Create the names and values for the finance, stock, savings and/or crypto columns for the UPDATE.
 *
 * In:  $aNames, $aValues
 * Out: $names, values
 *
 */  
function CreateUpdateNamesAndValues($aNames, $aValues) 
{
    $names  = "";
    $values = "";    
    $check  = false;

    for($i = 0; $i < 4; $i++) 
    {
        if (isset($aValues[$i]))
        {
            $names .= "`$aNames[$i]`=";         
            if ($aValues[$i]) 
            {
                $names .= "'&#9745;',";
                $values .= "&#9745;,";
            }
            else 
            {
                $names .= "'&#9744;',";
                $values .= "&#9744;,";         
            }
            
            $check = true;
        }
    }    
    
    if ($check)
    {        
        $names = ",".$names;
        $names = rtrim($names, ",");
        $values = rtrim($values, ",");
    }     
    
    return array($names, $values); 
}