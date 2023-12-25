<?php
/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:    welcome.php
 * Used in: js\login.js
 *
 * Created on Dec 22, 2023
 * Updated on Dec 22, 2023
 *
 * Description: Test page for the login.
 * Dependenties: 
 *
 */
session_start();
$user = $_SESSION['user'];
if(!$user){
    header("location:index.html");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Welcome to Dashboard</title>  
</head>
<body>
<h1>Welcome to Dashboard</h1>

<h3><?php echo $user; ?></h3>

</body>
</html>
