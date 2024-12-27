/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Dec 27, 2024
 *
 * Description: Javascript chartfunctions for the dashboard page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    initDougnutChart
 *
 * Created on Dec 22, 2024
 * Updated on Dec 27, 2024
 *
 * Description: Initialize the doughnut chart.
 *
 * In:  s
 * Out: doughnut
 *
 */
function initDougnutChart(s) {
    
    const ctx = document.getElementById('doughnut');
    
    var data = {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            hoverOffset: 4
        }]
    };
    
    var options = {
            plugins: {
                title: {
                    display: true,
                    align: 'start',
                    text: ''
                },                
               tooltip: {
                    callbacks: {
                        label: function(context) {
                                                
                            let label = context.dataset.label || '';
                            let i = context.dataIndex;

                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.data[i] !== null) {
                                label +=  new Intl.NumberFormat(getLocale(s), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.dataset.data[i]) + '%';
                            }
                            return label;
                        }               
                    }
                }              
            }
        };
    
    var doughnut = new Chart(ctx, { type: 'doughnut', data, options });
     
    return doughnut;
}

/*
 * Function:    showActivaAccountsDoughnutChart
 *
 * Created on Dec 25, 2024
 * Updated on Dec 27, 2024
 *
 * Description: Show the activa accounts doughnut chart.
 *
 * In:  doughnut, c, s, date, action
 * Out: -
 *
 */
function showActivaAccountsDoughnutChart(doughnut, c, s, date, action) {
    
    var request = getAjaxRequest("get_value_accounts_dgchart", "date=" + date + "&action=" + action);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            //console.log( result.query );
            
            var set, labels = [], data = [], value = [], color = [];
            $.each(result.data, function (n, field) {  
                
                // Get the theme colors.
                switch (field.id) {
                    case "finance" :  set = JSON.parse(s[1].value);
                                      break;
                                        
                    case "stock" :    set = JSON.parse(s[2].value);
                                      break;
                                        
                    case "savings" :  set = JSON.parse(s[3].value);
                                      break;
                                    
                    case "crypto" :   set = JSON.parse(s[4].value);
                                      break;
                }
                
                labels.push(field.type);
                color.push(set.theme.color);
                data.push(field.ratio);
                value.push(field.value);                         
            });       
                                      
            // Update the doughnut chart.
            var tmp = {
                labels: labels,
                datasets: [{
                    label: c.accounts[5],
                    data: data,
                    backgroundColor: color,
                    hoverOffset: 4
                }]
            };
            
            doughnut.data.labels = tmp.labels; 
            doughnut.data.datasets = tmp.datasets;
            doughnut.options.plugins.title.text = c.labels[1];
            doughnut.update();            
        }
        else {
            showDatabaseError(result);         
        }
    });
    
    request.fail(function(jqXHR, textStatus) {
        showAjaxError(jqXHR, textStatus);
    });  
    
    closeErrorMessage();
}
