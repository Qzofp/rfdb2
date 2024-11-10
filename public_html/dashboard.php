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
 * Updated on Nov 10, 2024
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
        <link rel="stylesheet" href="css/ext/air-datepicker.css">   
        <link rel="stylesheet" href="css/dashboard.css">
        <script src="js/ext/jquery-3.7.1.min.js"></script>
        <script src="js/ext/air-datepicker.js"></script> 
        <script src="js/config.js"></script>       
        <script src="js/common.js"></script>  
        <script src="js/dashboard_edit.js"></script>          
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
                    <label for="slide6-item-0"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="1" id="slide6-item-1" class="slide-toggle"/>
                    <label for="slide6-item-1"><p></p><span></span></label>
                    <input type="radio" name="slideItem" value="2" id="slide6-item-2" class="slide-toggle"/>
                    <label for="slide6-item-2"><p></p><span></span></label>
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
                
                </nav>      
                
                <!-- Show the Activa slide content -->
                <div id ="activa_main">
                    <div class="flex_container">
                        <div class="flex_top">
                            
                            <!-- The list, add (edit) and crypto or account buttons -->
                            <div id="page_buttons">
                                <img src="img/list.png" alt="list"/>
                                <img src="img/add.png" alt="add"/>
                                <img src="img/crypto.png" alt="crypto"/>
                                <img src="img/expand.png" alt="expand"/>
                                <img src="img/pencil.png" alt="edit"/>
                            </div>                            
                            
                            <!-- Display the balance under the slides. -->
                            <div id="input_date">
                                <u></u><br/>
                                <span></span>
                            </div>                               
                            
                            <!-- Table label -->
                            <div class="label"><span>Value Accounts</span></div>
                            
                            <!-- Settings table -->
                            <div id="table_container">
                                <table>
                                    <thead>                        
                                    </thead>
                                    <tbody>                       
                                    </tbody>                    
                                    <tfoot>                       
                                    </tfoot>
                                </table>
                            </div>                              
                            
                        </div>                     
                        <div class="flex_top">
                            <!-- Donut label -->
                            <div class="label"><span>Donut Graph</span></div>   
                        </div>
                    </div>
                    <div class="flex_container">
                        <div class="flex_bottom">
                            <!-- Graph label -->
                            <div class="label"><span>Value Development</span></div>                               
                        </div>
                    </div>                                        
                </div>


                <!-- Show the Test 1 slide content -->                    
                <div id="test01">Test 1</div>   

                <!-- Show the Test 2 slide content -->                    
                <div id="test02">Test 2</div>                   
                                
                <!-- Dashboard popup window. -->
                <div id="popup_container"> 
                    <div id="popup_content"> 
                        <h2></h2>                        
                        <form method="POST">   
                            
                            <!-- Popup for the activa slide -->
                            <div class="popup_activa_slide">
                                
                                <!-- Popup for the activa list value accounts -->
                                <table class="popup_table_list">
                                    <thead>
                                        <tr>                              
                                            <th colspan="3"></th>
                                            <th><select id="list_dates" placeholder=""></select></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                                     
                                <!-- Popup for the activa input (is needed for the datepicker). -->
                                <table class="popup_table_values">
                                    <thead>
                                        <tr>                              
                                            <th colspan="2"></th>
                                            <th><input id="date" type="text" name="date" placeholder="" value="" /></th>
                                            <th><input class="btn" type="image" name="submit" src="img/del.png" alt="del"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                                
                                <!-- Popup for the tbl_collapse and tbl_expand tables -->
                                <table class="popup_table_accounts">
                                    <tr>
                                    </tr>
                                </table>                            
                                              
                                <!-- Popup for the tbl_crypto table -->
                                <table class="popup_table_crypto">
                                    <tr>      
                                    </tr>
                                </table>                   
                            </div>

                            <!-- Popup for the other slide tables -->                 
                           
                            
                            
                            
                            <!-- Message field -->
                            <div class="msg"></div> 
                            
                            <a class="close" href="javascript:void(0)">x</a>   
                            <div class="choice">
                                <input class="ok" type="image" name="submit" src="img/ok.png" alt="ok" />
                                <input class="close" type="image" name="cancel" src="img/cancel.png" alt="cancel" />                         
                            </div>                        
                       </form>
                    </div>
                </div>
                
                <!-- Loading spinner -->
                <div id="loading"></div>    
                
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
