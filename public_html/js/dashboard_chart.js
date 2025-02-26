/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Feb 26, 2025
 *
 * Description: Javascript chart functions for the dashboard page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    initDougnutChart
 *
 * Created on Dec 22, 2024
 * Updated on Feb 09, 2025
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
                        size: 16,
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
                                label += new Intl.NumberFormat(getLocale(s), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.dataset.data[i]) + '%';
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
 * Updated on Feb 09, 2025
 *
 * Description: Initialize the line chart.
 *
 * In:  s
 * Out: line
 *
 */
function initLineChart(s) {
    
    var set = JSON.parse(s[5].value);
    
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
        scales: {
            x: {                
                adapters: {
                    date: {
                        locale: getLanguage(s)
                    }
                },     
                type: 'time',
                time: {
                    tooltipFormat:'DD'
                    //unit: 'month'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    // Include a Euro sign in the ticks
                    callback: function(value) {                    
                        tick = new Intl.NumberFormat(getLocale(s), { style: 'currency', currency: getCurrency(s) }).format(value);             
                        return tick;
                    }
                }
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
                    size: 16,
                    family: 'arial'
                }                
            },             
            legend: {
                display: true, 
                //position: 'bottom', 
                labels: {
                    boxHeight: 7,
                    boxWidth: 18       
                },
                onClick: null   
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context) {
                                                
                        let label = context.dataset.label || '';
                        let i = context.dataIndex;

                        if (label) {
                            label += ': ';
                        }
                        if (context.dataset.data[i] !== null) {
                            label += set.sign + ' ' + new Intl.NumberFormat(getLocale(s), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(context.dataset.data[i]);
                        }
                        return label;
                    }               
                }                
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
 * Updated on Feb 26, 2025
 *
 * Description: Show the activa accounts doughnut chart.
 *
 * In:  doughnut, c, s, date, action
 * Out: -
 *
 */
function showActivaAccountsDoughnutChart(doughnut, c, s, date, action) {
    
    var request = getAjaxRequest("dashboard/get_value_dgchart", "date=" + date + "&action=" + action);
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
                
                labels.push($("<div/>").html(field.type).text()); // Decode the label (HTML entities, such as ` & etc. ).
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
 * Updated on Feb 26, 2025
 *
 * Description: Show the activa crypto doughnut chart.
 *
 * In:  doughnut, c, date, action
 * Out: -
 *
 */
function showActivaCryptoDoughnutChart(doughnut, c, date, action) {
    
    var request = getAjaxRequest("dashboard/get_value_dgchart", "date=" + date + "&action=" + action);
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
 * Function:    showLineChartTooltip
 *
 * Created on Jan 27, 2025
 * Updated on Jan 31, 2025
 *
 * Description: Show the line chart tooltip for the selected table row.
 *
 * In:  dgc, that
 * Out: -
 * 
 * Links: https://stackoverflow.com/questions/53764367/how-to-trigger-hover-programmatically-in-chartjs
 *
 */
function showLineChartTooltip(lnc, that) {
  
    // Get the value (index) of the last column of the row.
    var dsi = Number(that.find("td:last-child").html());
    var idx = Number($("#input_date input").val());
    
    // Debug
    //console.log ( dsi, idx );
      
    if (that.find("td").length > 1 && dsi > -1) 
    {                       
        //Set active element (hover)
        lnc.setActiveElements([{
            datasetIndex: dsi,
            index: idx
        }]);

        // Set active tooltip 
        lnc.tooltip.setActiveElements([{
            datasetIndex: dsi,
            index: idx
        }]);     
    }
    else 
    {
        lnc.setActiveElements([]);
        lnc.tooltip.setActiveElements([]);
    }
    
    lnc.update();
}

/*
 * Function:    showActivaAccountsLineChart
 *
 * Created on Jan 03, 2025
 * Updated on Feb 26, 2025
 *
 * Description: Show the activa value developement line chart.
 *
 * In:  line, c, s, date, action
 * Out: -
 *
 */
function ShowActivaAccountsLineChart(line, c, s, date, action) {
  
    var request = getAjaxRequest("dashboard/get_value_lnchart", "date=" + date + "&action=" + action);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            //console.log( result.query );

            //var keys = Object.keys(result.data[0]);
            var keys = [];
            if (result.data[0]) {
                keys = Object.keys(result.data[0]);
            }
        
            // Initialize the arrays for the datasets values and fill the color array.
            var data = [], color = [];
            keys.forEach((key, i) => {
                data[key] = [];
                
                // Fill the color array.
                if (i > 0) 
                {
                    let n = Number(key.split("_")[0]) + 1;
                    let set = JSON.parse(s[n].value);            
                    color[key] = set.theme.color;                   
                }
            });   
            
            // Fill the chart datasets values (finance, stock, savings and crypto).
            $.each(result.data, function (n, field) {  

                $.each(field, function(key, value) {                    

                    data[key].push(value);
                });      
            });    
                        
            // Create the datasets.
            var label, datasets = [];
            keys.forEach((key, i) => {
                                
                if (i < keys.length - 1) 
                {
                    // Decode the label (HTML entities, such as ` & etc. ).
                    label = $("<div/>").html(keys[i+1].split("_")[1]).text();                  
                    datasets[i] = {
                        label: label, //keys[i+1].split("_")[1],
                        data: data[keys[i+1]],
                        backgroundColor: color[keys[i+1]],
                        borderColor: color[keys[i+1]],
                        tension: 0.2
                    };
                }      
            });            

            // Update the line chart.
            const tmp = {
                labels: data[keys[0]],
                datasets: datasets
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

/*
 * Function:    showActivaCryptoLineChart
 *
 * Created on Jan 20, 2025
 * Updated on Feb 26, 2025
 *
 * Description: Show the activa value developement line chart.
 *
 * In:  line, c, s, date, action
 * Out: -
 *
 */
function ShowActivaCryptoLineChart(line, c, date, action) {
  
    var request = getAjaxRequest("dashboard/get_value_lnchart",  "date=" + date + "&action=" + action);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            //console.log( result.query );

            //var keys = Object.keys(result.data[0]);
            var keys = [];
            if (result.data[0]) {
                keys = Object.keys(result.data[0]);
            }
        
            // Initialize the arrays for the datasets values array.
            var data = [];
            keys.forEach((key, i) => {
                data[key] = [];
            });   
            
            // Fill the chart datasets values.
            $.each(result.data, function (n, field) {  

                $.each(field, function(key, value) {                    

                    data[key].push(value);
                });      
            });    
                        
            // Create the datasets.
            var datasets = [];
            keys.forEach((key, i) => {
                                
                if (i < keys.length - 1) 
                {
                    datasets[i] = {
                        label: keys[i+1].split("_")[1],
                        data: data[keys[i+1]],
                        backgroundColor: keys[i+1].split("_")[0],
                        borderColor: keys[i+1].split("_")[0],
                        tension: 0.2
                    };
                }      
            });            

            // Update the line chart.
            const tmp = {
                labels: data[keys[0]],
                datasets: datasets
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
