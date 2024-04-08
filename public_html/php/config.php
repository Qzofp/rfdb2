<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    config.php
 * Used in: *.php
 *
 * Created on Oct 14, 2023
 * Updated on Apr 07, 2024
 *
 * Description: .
 * Dependenties: -
 *
 */
 
///////////////////////////////////////////     Config Main     //////////////////////////////////////////////

// Define database constants
define("cHOST",  "127.0.0.1");
define("cUSER",  "rfdb2_dbo");
define("cPASS",  "Put your password here!");
define("cDBASE", "rfdb2");
//define("cDBASE", "rfdb2_empty");

/*
 * Function:    OpenDatabase
 *
 * Created on Oct 15, 2023
 * Updated on Oct 15, 2023
 *
 * Description: Open a database connection.
 *
 * In:  -
 * Out: -
 *
 */
function OpenDatabase():PDO
{    
    $db = sprintf("mysql:host=%s;dbname=%s;charset=utf8", cHOST, cDBASE);   
    $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
    return new PDO($db, cUSER, cPASS, $options);
}
