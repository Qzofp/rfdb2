/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Dec 23, 2024
 *
 * Description: Javascript chartfunctions for the dashboard page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    initDougnutChart(
 *
 * Created on Dec 22, 2024
 * Updated on Dec 23, 2024
 *
 * Description: Initialize the doughnut chart.
 *
 * In:  c
 * Out: doughnut
 *
 */
function initDougnutChart(c) {
    
    const ctx = document.getElementById('doughnut');
    
    var data = {
        labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    
    var options = {
            plugins: {
                title: {
                    display: true,
                    align: 'start',
                    text: c.labels[1]
                }
            }
        };
    
    
    var doughnut = new Chart(ctx, { type: 'doughnut', data, options });
     
    return doughnut;
}

/*
 * Function:    testChart
 *
 * Created on Dec 02, 2024
 * Updated on Dec 21, 2024
 *
 * Description: Shows a test chart.
 *
 * In:  -
 * Out: -
 *
 */
function testChart(title) {
   
    const ctx = document.getElementById('doughnut');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    align: 'start',
                    text: title
                }
            },
            scales: {
                y: {
                beginAtZero: true
                }
            }
        }
    });  
}