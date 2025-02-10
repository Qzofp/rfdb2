/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    sheet_chart.js
 * Used in: sheet.php
 *
 * Created on Feb 07, 2025
 * Updated on Feb 10, 2025
 *
 * Description: Javascript chart functions for the sheet page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    initBarChart
 *
 * Created on Feb 09, 2025
 * Updated on Feb 09, 2025
 *
 * Description: Initialize the bar chart.
 *
 * In:  s
 * Out: bar
 *
 */
function initBarChart(s) {    
    var set = JSON.parse(s[5].value);
    
    const ctx = document.getElementById('bar_chart');    
       
    var data = {
        labels: [],
        datasets: []
    };
    
    var options = {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 50,
                right: 50,
                bottom: 15
            }
        },
        scales: {
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
                    top: 20,
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
                labels: {
                    boxHeight: 7,
                    boxWidth: 18       
                }
                //onClick: null   
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
    
    var bar = new Chart(ctx, { type: 'bar', data, options });  
    
    return bar;    
}

/*
 * Function:    showYearOverviewChart
 *
 * Created on Feb 10, 2025
 * Updated on Feb 10, 2025
 *
 * Description: Initialize the bar chart.
 *
 * In:  bar, c, i
 * Out: -
 *
 */
function showYearOverviewChart(bar, c, i) {
    
    var scale = {year: "quarters", quarters: "months", months: "year"};
    var year = $("header h1 span").html();
    var n = $("#page_buttons img:first").attr("alt");        
    
    //console.log( i, year, scale[n] );
    
        let bottom = "-100%";
        if ($("#chart_slider").css("bottom") !== "0px") {
                bottom = "0";
        }
        $("#chart_slider").animate({"bottom":bottom}, 300);    

    
    
}


/*
 * Function:   testBarGraph 
 *
 * Created on Feb 07, 2025
 * Updated on Feb 10, 2025
 *
 * Description: 
 *
 * In:  
 * Out: 
 *
 */
function testBarGraph(bar, c) {
    
    var labels = c.months;
    var data = [
            {
                label: c.payment[3],
                data: [10,15,8,3,12,1,7,19,4,10,16,5],
                backgroundColor:  'rgb(74,160,44,0.8)',
                borderWidth: 1
            },
            {
                label: c.payment[4],
                data: [6,11,18,13,2,11,17,9,3,7,6,15],
                backgroundColor: 'rgb(193,27,23,0.8)',
                borderWidth: 1
            },
            {
                label: c.payment[5],
                data: [2,5,13,11,3,6,12,4,3,8,7,14],
                backgroundColor: ' rgb(135,6,3,0.8)',
                borderWidth: 1
            }            
        ];
        
    
  
    // Update the line chart.
    const tmp = {
                labels: labels,
                datasets: data
           };
            
    bar.data.labels = tmp.labels; 
    bar.data.datasets = tmp.datasets;
    bar.options.plugins.title.text = c.overview[2]; 
    bar.update();
}