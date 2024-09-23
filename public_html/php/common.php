<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    common.php
 * Used in: *.php
 *
 * Created on Sep 22, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Common PHP functions.
 * Dependenties: 
 *
 */

/*
 * Function:    GetSettings
 *
 * Created on Aug 28, 2024
 * Updated on Aug 30, 2024
 *
 * Description: Get the settings from the tbl_settings table, e.g. currency sign and the active pages.
 *
 * In:  -
 * Out: $data
 *
 */
function GetSettings() 
{   
    $data = [];
    try 
    {
        $db = OpenDatabase();

        $select = $db->prepare("SELECT `name`, `value` FROM `tbl_settings`;");
        $select->execute();

        $settings = $select->fetchAll(PDO::FETCH_ASSOC);  
    
        // Get the currency sign from the tbl_settings table to determine the date format.
        foreach($settings as $row=>$link) 
        {            
            $json = json_decode($link['value']);
            switch ($link['name'])
            {
                case "settings" :
                    $sign = $json->sign;                    
                    break;
                
                case "finance" :
                    $finance = $json->page;
                    break;
                
                case "stock" :
                    $stock = $json->page;
                    break;

                case "savings" :
                    $savings = $json->page;
                    break;

                case "crypto" :
                    $crypto = $json->page;
                    break;                
                
                case "language" :
                    $code = $json->code;
                    break;                   
            }            
        }
        
        $data['sign']    = $sign;
        $data['pages']   = [$finance, $stock, $savings, $crypto];
        $data['code']    = $code;
        $data['success'] = true;
    }
    catch (PDOException $e) 
    {    
        $data['message'] = $e->getMessage();
        $data['success'] = false;
    }   
    
    // Close database connection.
    $db = null;        
    
    return $data;
}

/*
 * Function:    DateToMySql
 *
 * Created on Sep 22, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Convert the date so it can be selected or inserted in a MySQL table.
 *
 * In:  $sign, $value
 * Out: $date
 *
 */
function DateToMySql($sign, $value)
{
    switch ($sign) 
    {
        case "$" :
        case "£" :
            $date = "STR_TO_DATE('$value','%m/%d/%Y')";
            break;
            
        case "€"  :
            $date = "STR_TO_DATE('$value','%d-%m-%Y')";
            break;             
    } 
    
    return $date;
}

/*
 * Function:    AmountToMySql
 *
 * Created on Sep 22, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Convert the amount (currency) so it can be inserted in a MySQL table.
 *
 * In:  $sign, $value
 * Out: $amount
 *
 */
function AmountToMySql($sign, $value)
{
    switch ($sign) 
    {
        case "$" :
        case "£" :
            $amount = "REPLACE('$value',',','')";
            break;
            
        case "€"  :
            $amount = "REPLACE(REPLACE('$value','.',''),',','.')";
            break;             
    }    
    
    return $amount;
}

/*
 * Function:    AmountFromMySql
 *
 * Created on Sep 23, 2024
 * Updated on Sep 23, 2024
 *
 * Description: Convert the amount (currency) from a MySQL table to a readable value.
 *
 * In:  $sign
 * Out: $amount
 *
 */
function AmountFromMySql($sign)
{
    switch ($sign) 
    {
        case "$" :
        case "£" :
            $amount = "CONCAT('$sign ', FORMAT(`value`, 2, 'en_US'))";
            break;
            
        case "€"  :
            $amount = "CONCAT('$sign ', FORMAT(`value`, 2, 'de_DE'))";
            break;             
    }    
    
    return $amount;
}
