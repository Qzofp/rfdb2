/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.2
 *
 * File:    dashboard_chart.js
 * Used in: dashboard.php
 *
 * Created on Dec 02, 2024
 * Updated on Dec 02, 2024
 *
 * Description: Javascript chartfunctions for the dashboard page.
 * Dependenties: js/ext/chart-4.4.7.js
 *
 */

//////////////////////////////////////////      Main Functions     ///////////////////////////////////////////

/*
 * Function:    testChart
 *
 * Created on Dec 02, 2024
 * Updated on Dec 02, 2024
 *
 * Description: Shows a test chart.
 *
 * In:  -
 * Out: -
 *
 */
function testChart() {
    
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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });    
}