
<?php
/*
 * Title:   Rizzo's Finances Database 2
 * Author:  Rizzo Productions
 * Version: 0.1
 *
 * File:         sheet.html
 * Dependencies: css/common.css
 *               css/login.css 
 *               js/ext/jquery-3.7.1.min.js
 *               js/common.js
 *               js/login.js
 *
 * Created on Dec 20, 2023
 * Updated on Jan 01, 2023
 *
 * Description: Login page.
 * 
 * Links:
 * - https://www.javatpoint.com/php-mysql-login-system
 * - https://www.phpzag.com/ajax-login-script-with-php-and-jquery/
 * - https://codingstatus.com/login-with-ajax-in-php-mysql/
 */ 
session_start();
if(isset($_SESSION['user'])) {
    header("location:dashboard.php");
}
?>

<!DOCTYPE html>
<html>  
    <head>  
        <title></title>  
        <meta charset="UTF-8">        
        <link rel = "stylesheet" type = "text/css" href = "css/common.css">   
        <link rel = "stylesheet" type = "text/css" href = "css/login.css">   
        <script src="js/ext/jquery-3.7.1.min.js"></script>    
	<script src="js/common.js"></script>          
	<script src="js/login.js"></script>                    
    </head>  
    <body>  
        <div id="login_box">  
            <h1>Login</h1>  
            <form id="login" method="POST">
                <p>  
                    <img src="img/user.png" alt="user">
                    <input id="user" type="text" name="user" placeholder="" />   
                </p>  
                <p>  
                    <img src="img/key.png" alt="key">
                    <input id="pass" type="password" name="pass" placeholder="" />  
                </p>  
                <p>     
                    <button type="submit"></button>
                </p>  
            </form>  
        </div>  
        
        <!-- Login failed message. -->
        <p id="msg"></p>

        <!-- Error popup window. -->
        <div id="popup_error">
            <div id="error"> 
                <h2></h2>
                <p></p>
                <a class="close" href="javascript:void(0)">x</a>      
            </div>
        </div>          
        
        <!-- Footer -->
        <footer>                        
            <h3></h3>
        </footer>         
        
        <!-- Script -->        
        <script>
        $(document).ready(function() {
            loadLoginPage();
        });
        </script>    
    </body>     
</html>