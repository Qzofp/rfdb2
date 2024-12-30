/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Dec 30, 2024
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
 * Updated on Dec 30, 2024
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
 * Updated on Dec 30, 2024
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
            
            var set, labels = [], data = [], value = [], color = ["#ff8c00","#00008b"]; // Get colors from tbl_cryptocurrenties table.
            $.each(result.data, function (n, field) {  

                labels.push(field.label);
                //color.push(set.theme.color);
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
 * Updated on Dec 29, 2024
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
  
    //Get the value (index) of the last column of the row.
    var idx = Number(that.find("td:last-child").html());
    
    if (that.find("td").length > 1 && idx > -1) 
    {                       
        //Set active element (hover)
        dgc.setActiveElements([{
            datasetIndex: 0,
            index: idx
        }]);

        //Set active tooltip 
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
