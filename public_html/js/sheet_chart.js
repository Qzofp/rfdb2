/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    sheet_chart.js
 * Used in: sheet.php
 *
 * Created on Feb 07, 2025
 * Updated on Feb 07, 2025
 *
 * Description: Javascript chart functions for the sheet page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    
 *
 * Created on Feb 07, 2025
 * Updated on Feb 07, 2025
 *
 * Description: 
 *
 * In:  
 * Out: 
 *
 */
function testBarGraph(c)
{
    const labels = c.months;
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [10,15,8,3,12,1,7,19,4,10,16,5]
                //borderColor: Utils.CHART_COLORS.red,
                //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5)
            },
            {
                label: 'Dataset 2',
                data: [6,11,18,13,2,11,17,9,3,7,6,15]
                //borderColor: Utils.CHART_COLORS.blue,
                //backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5)
            }
        ]
    };    
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            //responsive: true,
            layout: {
                padding: {
                    left: 50,
                    right: 50,
                    bottom: 15
                }    
            },
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Bar Chart'
                }
            }
        }
    };    
    
    const ctx = document.getElementById('bar_chart');
    var bar = new Chart(ctx, config );
    
    
}