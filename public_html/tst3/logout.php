
<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    logout.php
 * Used in: 
 *
 * Created on Dec 23, 2023
 * Updated on Dec 23, 2023
 *
 * Description: The logout page.
 * Dependenties: 
 *
 */
session_start();
unset($_SESSION['user']);

if(session_destroy()) {
    header("Location: index.html");
}
