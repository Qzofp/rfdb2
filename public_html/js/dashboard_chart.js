/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Jan 10, 2025
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
 * Updated on Dec 31, 2024
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
                    text: '',
                    /*color: 'black',*/
                    font: {
                        size: 14,
                        family: 'arial'
                    }                
                },  
                legend: {
                    display: true, 
                    position: 'left', 
                    labels: {
                        boxWidth: 20       
                    },
                    onClick: null              
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
 * Function:    initLineChart
 *
 * Created on Jan 03, 2025
 * Updated on Jan 05, 2025
 *
 * Description: Initialize the line chart.
 *
 * In:  s
 * Out: line
 *
 */
function initLineChart(s) {
 
    const ctx = document.getElementById('line_chart');    
       
    var data = {
        labels: [],
        datasets: []
    };
    
    var options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 40,
                right: 40
            }
        },
        plugins: {
            title: {
                display: true,
                align: 'start',
                padding: {
                    top: 5,
                    bottom: 0
                },
                text: '',
                font: {
                    size: 14,
                    family: 'arial'
                }                
            },             
            legend: {
                display: true
            },
            tooltip: {
                enabled: true
          }
        }
    };
    
    var line = new Chart(ctx, { type: 'line', data, options });  
    
    return line;    
}

/*
 * Function:    showActivaAccountsDoughnutChart
 *
 * Created on Dec 25, 2024
 * Updated on Dec 30, 2024
 *
 * Description: Show the activa accounts doughnut chart.
 *
 * In:  doughnut, c, s, date, action
 * Out: -
 *
 */
function showActivaAccountsDoughnutChart(doughnut, c, s, date, action) {
    
    var request = getAjaxRequest("get_value_dgchart", "date=" + date + "&action=" + action);
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

/*
 * Function:    showActivaCryptoDoughnutChart
 *
 * Created on Dec 30, 2024
 * Updated on Dec 31, 2024
 *
 * Description: Show the activa crypto doughnut chart.
 *
 * In:  doughnut, c, date, action
 * Out: -
 *
 */
function showActivaCryptoDoughnutChart(doughnut, c, date, action) {
    
    var request = getAjaxRequest("get_value_dgchart", "date=" + date + "&action=" + action);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            //console.log( result.query );
            
            var labels = [], data = [], value = [], color = []; // Get colors from tbl_cryptocurrenties table.
            $.each(result.data, function (n, field) {  

                labels.push(field.label);
                color.push(field.color);
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
            doughnut.options.plugins.title.text = c.labels[4];
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

/*
 * Function:    showDoughnutChartTooltip
 *
 * Created on Dec 28, 2024
 * Updated on Jan 08, 2025
 *
 * Description: Show the doughnut chart tooltip for the selected table row.
 *
 * In:  dgc, that
 * Out: -
 * 
 * Links: https://stackoverflow.com/questions/53764367/how-to-trigger-hover-programmatically-in-chartjs
 *
 */
function showDoughnutChartTooltip(dgc, that) {
  
    // Get the value (index) of the last column of the row.
    var idx = Number(that.find("td:last-child").html());
    
    if (that.find("td").length > 1 && idx > -1) 
    {                       
        //Set active element (hover)
        dgc.setActiveElements([{
            datasetIndex: 0,
            index: idx
        }]);

        // Set active tooltip 
        dgc.tooltip.setActiveElements([{
            datasetIndex: 0,
            index: idx
        }]);     
    }
    else 
    {
        dgc.setActiveElements([]);
        dgc.tooltip.setActiveElements([]);
    }
    
    dgc.update();
}

/*
 * Function:    showActivaAccountsLineChart
 *
 * Created on Jan 03, 2025
 * Updated on Jan 10, 2025
 *
 * Description: Show the activa value developement line chart.
 *
 * In:  line, c, s, date, action
 * Out: -
 *
 */
function ShowActivaAccountsLineChart(line, c, s, action) {
  
    var request = getAjaxRequest("get_value_lnchart", "&action=" + action);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            // console.log( result.query );
                       
            var date = [], finance = [], stock = [], savings = [], crypto = [];
            var keys = Object.keys(result.data[0]);
            
            // Fill the chart datasets values (finance, stock, savings and crypto).
            $.each(result.data, function (n, field) {  

                $.each(field, function(key, value){                    
                    
                    switch (key) {                    
                        case keys[0]: date.push(value);
                            break;                        
                        
                        case keys[1]: finance.push(value);
                            break;
                            
                        case keys[2]: stock.push(value);
                            break;
                        
                        case keys[3]: savings.push(value);
                            break;
                            
                        case keys[4]: crypto.push(value);
                            break;                       
                    };              
                });      
            });             
     
            // Update the line chart.
            const tmp = {
            labels: date,
            datasets: [{
                    label: keys[1],
                    data: finance,
                    tension: 0.2
                },
                {
                    label: keys[2],
                    data: stock,
                    tension: 0.2
                },
                {
                    label: keys[3],
                    data: savings,
                    tension: 0.2
                },
                {
                    label: keys[4],
                    data: crypto,
                    tension: 0.2
                }     
            ]
        };
            
        line.data.labels = tmp.labels; 
        line.data.datasets = tmp.datasets;
        line.options.plugins.title.text = c.labels[2];    
        line.update();                   
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
