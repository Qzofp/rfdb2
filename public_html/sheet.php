<?php
/*
 * Title:   Rizzo's Finances Database 2
 * Author:  Rizzo Productions
 * Version: 0.1
 *
 * File:         sheet.php
 * Dependencies: css/common.css
 *               css/ext/yearpicker.css
 *               css/ext/air-datepicker.css
 *               css/sheet.css 
 *               js/ext/jquery-3.7.1.min.js
 *               js/ext/yearpicker.js
 *               js/ext/air-datepicker.js
 *               js/config.js
 *               js/common.js
 *               js/sheet.js
 *
 * Created on Oct 28, 2023
 * Updated on Mar 06, 2024
 *
 * Description: Sheet framework test page.
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
        <link rel="stylesheet" href="css/ext/yearpicker.css">	
        <link rel="stylesheet" href="css/ext/air-datepicker.css">         
        <link rel="stylesheet" href="css/sheet.css">
        <script src="js/ext/jquery-3.7.1.min.js"></script>      
	<script src="js/ext/yearpicker.js"></script>  
        <script src="js/ext/air-datepicker.js"></script>           
        <script src="js/config.js"></script>  
        <script src="js/common.js"></script>   
        <script src="js/sheet.js"></script>
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
            <div class="picker">
                <img class="yearpicker" src="img/years.png" alt="years"/>
            </div> 
        </header>
              
        <!-- Navigation en content -->
        <div class="content_container">
            <!-- Left navigation bar -->
            <nav class="content_nav side"></nav>
            
            <!-- Center main content area -->
            <main class="content_main">
  		        
		<!-- Slide menu with 6 items max -->
                <nav id="slide6" class="slidemenu">

                    <input type="radio" name="slideItem" value="0" id="slide6-item-0" class="slide-toggle"/>
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
  
                    <div class="slider">
                        <div class="bar"></div>
                    </div>
					
                </nav>  				
							
		<!-- Slide menu with 12 items max -->	
                <nav id="slide12" class="slidemenu">

                    <input type="radio" name="slideItem" value="0" id="slide12-item-0" class="slide-toggle"/>
                    <label for="slide12-item-0"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="1" id="slide12-item-1" class="slide-toggle"/>
                    <label for="slide12-item-1"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="2" id="slide12-item-2" class="slide-toggle"/>
                    <label for="slide12-item-2"><p></p><span></span></label>  
                    <input type="radio" name="slideItem" value="3" id="slide12-item-3" class="slide-toggle"/>
                    <label for="slide12-item-3"><p></p><span></span></label>  
                    <input type="radio" name="slideItem" value="4" id="slide12-item-4" class="slide-toggle" />
                    <label for="slide12-item-4"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="5" id="slide12-item-5" class="slide-toggle"/>
                    <label for="slide12-item-5"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="6" id="slide12-item-6" class="slide-toggle"/>
                    <label for="slide12-item-6"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="7" id="slide12-item-7" class="slide-toggle"/>
                    <label for="slide12-item-7"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="8" id="slide12-item-8" class="slide-toggle"/>
                    <label for="slide12-item-8"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="9" id="slide12-item-9" class="slide-toggle"/>
                    <label for="slide12-item-9"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="10" id="slide12-item-10" class="slide-toggle"/>
                    <label for="slide12-item-10"><p></p><span></span></label> 
                    <input type="radio" name="slideItem" value="11" id="slide12-item-11" class="slide-toggle"/>
                    <label for="slide12-item-11"><p></p><span></span></label>                                        
                   
                    <div class="clear"></div>
  
                    <div class="slider">
                        <div class="bar"></div>
                    </div>
  
                </nav>                
                
                <!-- Scale (months, quarters, year), add and chart image buttons -->
		<div id="page_buttons">
                    <img src="img/quarters.png" alt="quarters"/>
                    <img src="img/edit.png" alt="edit"/>
                    <img src="img/chart.png" alt="chart"/>
		</div>
            
                <!-- Date Test, show the date that will be used to get the table data. -->
                <div id="tst_date"></div>
                
                <!-- Test datepicker -->
                <input id="date" type="text" name="serv" placeholder="" value="" />
                
                <!-- Chart slider  -->
                <div id="chart_slider">
                    <div id="chart_content" >
                        <a class="close" href="javascript:void(0)">x</a>   
                        <h1>Chart Content</h1>
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
        $(document).ready(function() {
            loadSheet();
        });
        </script>    
        
    </body>
</html>
