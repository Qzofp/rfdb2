<?php
/*
 * Title:   Rizzo's Finances Database 2
 * Author:  Rizzo Productions
 * Version: 0.1
 *
 * File:         settings.php
 * Dependencies: css/common.css
 *               css/settings.css
 *               js/ext/jquery-3.7.1.min.js
 *               js/config.js
 *               js/common.js 
 *               js/settings.js
 *
 * Created on Oct 29, 2023
 * Updated on Jan 06, 2024
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
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="css/common.css">        
        <link rel="stylesheet" href="css/settings.css">
        <script src="js/ext/jquery-3.7.1.min.js"></script> 
        <script src="js/config.js"></script> 
        <script src="js/common.js"></script>        
        <script src="js/settings.js"></script> 
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
                    <label for="slide6-item-0"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="1" id="slide6-item-1" class="slide-toggle"/>
                    <label for="slide6-item-1"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="2" id="slide6-item-2" class="slide-toggle"/>
                    <label for="slide6-item-2"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="3" id="slide6-item-3" class="slide-toggle"/>
                    <label for="slide6-item-3"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="4" id="slide6-item-4" class="slide-toggle" />
                    <label for="slide6-item-4"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="5" id="slide6-item-5" class="slide-toggle"/>
                    <label for="slide6-item-5"><p></p><span></span></label>
  
                    <div class="clear"></div>
  
                    <!-- Bar -->
                    <div class="slider">
                        <div class="bar"></div>
                    </div>
  
                </nav>                

                <!-- Language and pages buttons -->
		<div id="page_buttons">
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>
                    <img src="" alt=""/>                    
		</div>                
                
                <!-- Display the settings in the slide. -->
                <div id="settings">
                    <u></u><br/>
                    <span></span>
                </div>                
                
                <!-- Test. -->
                <!-- <div id="test"></div> -->
                
                <!-- Table label -->
                <div id="label"><span></span></div>
                
                <!-- Settings table -->
                <div id="tbl_settings">
                    <table>
                        <thead>                        
                        </thead>
                        <tbody>                       
                        </tbody>                    
                        <tfoot>                       
                        </tfoot>
                    </table>
                </div>    
                            
                <!-- Settings popup window. -->
                <div id="popup_container"> 
                    <div id="popup_content"> 
                        <h2></h2>                                                
                        <ul></ul>
                        <a class="close" href="javascript:void(0)">x</a>   
                        <div class="choice">
                            <img src="img/ok.png" alt="ok"/>
                            <img class="close" src="img/cancel.png" alt="cancel"/>
                        </div>  
                    </div>                    
                </div>                
                              
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
            loadSettings();
        });
        </script>  
        
    </body>
</html>
