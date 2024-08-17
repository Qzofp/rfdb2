<?php
/*
 * Title:   Rizzo's Finances Database 2
 * Author:  Rizzo Productions
 * Version: 0.2
 *
 * File:         dashboard.php
 * Dependencies: css/common.css
 *               css/dashboard.css
 *               js/ext/jquery-3.7.1.min.js
 *               js/config.js
 *               js/common.js 
 *               js/dashboard.js
 *
 * Created on Sep 22, 2023
 * Updated on Aug 16, 2024
 *
 * Description: Redirect to the start page.
 * 
 */ 
session_start();
$user = $_SESSION['user'];
if(!$user){
    header("location:index.php");
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Rizzo's Finances Database 2</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/common.css">     
        <link rel="stylesheet" href="css/dashboard.css">
        <script src="js/ext/jquery-3.7.1.min.js"></script>
        <script src="js/config.js"></script>       
        <script src="js/common.js"></script>        
        <script src="js/dashboard.js"></script>
    </head>
    <body>                   
        <!-- Header -->
        <header>		
            <div class="hamburger_menu">
		<input id="menu_toggle" type="checkbox" />
		<label class="menu_btn" for="menu_toggle">
                    <span></span>
		</label>                                
                <div class="menu_box">                    
                    <div class="user"><img src="img/user.png" alt="user"><span><?php echo $user; ?></span></div>
                    <hr>
                    <ul>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                        <li><a class="menu_item" href=""></a></li>
                    </ul>                    
                </div>                
            </div>		
		
            <h1></h1>
            <h2></h2>     
        </header>
              
        <!-- Navigation en content -->
        <div class="content_container">
            <!-- Left navigation bar -->
            <nav class="content_nav side"></nav>
            
            <!-- Center main content area -->
            <main class="content_main">
  
                <nav class="slidemenu">
  
                    <input type="radio" name="slideItem" value="0" id="slide6-item-0" class="slide-toggle" checked/>
                    <label for="slide6-item-0"><p></p><span>Activa</span></label>
                    <input type="radio" name="slideItem" value="1" id="slide6-item-1" class="slide-toggle"/>
                    <label for="slide6-item-1"><p></p><span>Test 1</span></label>
                    <input type="radio" name="slideItem" value="2" id="slide6-item-2" class="slide-toggle"/>
                    <label for="slide6-item-2"><p></p><span>Test 2</span></label>
                    <input type="radio" name="slideItem" id="slide6-item-3" class="slide-toggle"/>
                    <label for="slide6-item-3"><p></p><span></span></label>
                    <input type="radio" name="slideItem" id="slide6-item-4" class="slide-toggle" />
                    <label for="slide6-item-4"><p></p><span></span></label>
                    <input type="radio" name="slideItem" id="slide6-item-5" class="slide-toggle"/>
                    <label for="slide6-item-5"><p></p><span></span></label>
  
                    <div class="clear"></div>
  
                    <!-- Bar -->
                    <div class="slider">
                        <div class="bar"></div>
                    </div>

                    <!-- Show the Activa slide content -->
                    <div id="activa">

                        <!-- Test -->
                        <div class="row">
                            <div class="column left">
                            1 of 3
                            </div>
                            <div class="column right">
                            2 of 3
                            </div>
                        </div>
                        <div class="row">
                            <div class="column">
                            3 of 3
                            </div>
                        </div>                        
                                            
                    </div>   

                    <!-- Show the Test 1 slide content -->                    
                    <div id="test01">Test 1</div>   

                    <!-- Show the Test 2 slide content -->                    
                    <div id="test02">Test 2</div>   
                    
                </nav>                
                
                <!-- Error popup window. -->
                <div id="popup_error">
                    <div id="error"> 
                        <h2></h2>
                        <p></p>
                        <a class="close" href="javascript:void(0)">x</a>      
                    </div>
                </div>              
            </main>         
        
            <!-- Right side bar -->
            <aside class="side"></aside>
            
            
        </div>     
            
        <!-- Footer -->
        <footer>
            <h3></h3>
        </footer>       
                 
        <!-- Script -->
        <script>
        $(document).ready(function () {        
            loadMain(); 
        });
        </script>  
        
    </body>
</html>
