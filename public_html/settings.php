<?php
/*
 * Title:   Rizzo's Finances Database 2
 * Author:  Rizzo Productions
 * Version: 0.1
 *
 * File:         settings.php
 * Dependencies: css/common.css
 *               css/settings.css
 *               css/ext/air-datepicker.css
 *               css/ext/nice-select2.css
 *               js/ext/jquery-3.7.1.min.js
 *               js/ext/air-datepicker.js
 *               js/ext/nice-select2.js
 *               js/ext/sha256.js
 *               js/config.js
 *               js/common.js 
 *               js/settings_general.js
 *               js/settings_finances.js
 *               js/settings.js
 *
 * Created on Oct 29, 2023
 * Updated on Mar 08, 2024
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
        <link rel="stylesheet" href="css/ext/air-datepicker.css">  
        
        <link rel="stylesheet" href="css/ext/nice-select2.css">
        
        <script src="js/ext/jquery-3.7.1.min.js"></script>  
        <script src="js/ext/air-datepicker.js"></script> 
        
        <script src="js/ext/nice-select2.js"></script>   
        
        <script src="js/ext/sha256.js"></script>        
        <script src="js/config.js"></script> 
        <script src="js/common.js"></script>    
        <script src="js/settings_general.js"></script>     
        <script src="js/settings_finances.js"></script>            
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
                    <img src="" alt=""/>
                    <img src="" alt=""/>                    
		</div>                
                
                <!-- Display the settings in the slide. -->
                <div id="settings">
                    <u></u><br/>
                    <span></span>
                </div>    
                        
                <!-- Test 
                 <select id="example" placeholder="">
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                </select>
                -->
                
                <!-- Table label -->
                <div id="label"><span></span></div>
                
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
                            
                <!-- Settings popup window for language and pages. -->
                <div id="popup_container"> 
                    <div id="popup_content"> 
                        <h2></h2>                        
                        <form method="POST">                           
                            <ul></ul>                    
                            <table class="popup_table_setting"></table>
                            
                            <!-- This table is needed for the datepicker. -->
                            <table class="popup_table_finance">
                                <tr>
                                    <td><input class="shw" type="image" name="submit" src="" /></td>                                  
                                    <td><input id="date" type="text" name="date" placeholder="" value="" /></td>                                   
                                    <td>
                                        <select id="serv" placeholder="">
                                            <option value="AF">Afghanistan</option>
                                            <option value="AX">Åland Islands</option>
                                            <option value="AL">Albania</option>
                                            <option value="DZ">Algeria</option>
                                            <option value="AS">American Samoa</option>
                                            <option value="AD">Andorra</option>
                                            <option value="AO">Angola</option>
                                            <option value="AI">Anguilla</option>
                                            <option value="AQ">Antarctica</option>
                                        </select>
                                    </td>      
                                    <td><input id="acct" type="text" name="account" placeholder="" value="" /></td>
                                    <td><input id="desc" type="text" name="desc" placeholder="" value="" /></td>
                                    <td><input class="btn" type="image" name="submit" src="" /></td>                 
                                </tr>
                                <tr>
                                    <td class="msg" colspan="5">&nbsp;<td>
                                </tr>
                            </table>
                            
                            <a class="close" href="javascript:void(0)">x</a>   
                            <div class="choice">
                                <input class="ok" type="image" name="submit" src="img/ok.png" alt="ok" />
                                <input class="close" type="image" name="cancel" src="img/cancel.png" alt="cancel" />                         
                            </div>                        
                       </form>
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
