/*
 * Title: Rizzo's Finances Database 2
 * Author: Rizzo Productions
 * Version: 0.1
 *
 * File:         stats.js
 * Dependenties: js/chart.js
 *
 * Created on Sep 24, 2023
 * Updated on Sep 25, 2023
 *
 * Description: The stats js page which generates the charts.

 *
 */

/*
 * Function:    dummyBarChart
 *
 * Created on Sep 24, 2023
 * Updated on Sep 25, 2023
 *
 * Description: Create and show a dummy bar chart met dummy data.
 *
 * In: -
 * Out: -
 *
 */
function dummyBarChart() { 

  labels = 'Januari,Februari,Maart,April,Mei,Juni,Juli,Augustus,September,Oktober,November,December'; 
  outcome = '3121.07,4484.07,2584.46,2140.08,3533,3330.94,3428.56,2729.38,4557.77,2511.26,6289.92,5596.15';
  income  = '3333.15,3282.51,3380.93,3360.01,5713.57,3406.21,3472.71,3290.01,3731.51,3365.83,5963.46,7480.84';       

  const ctx = document.getElementById('bar_chart');          
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.split(','),
      datasets: [
      {
        label: 'uitgaven',
        data: outcome.split(','),
        backgroundColor: '#C11B17',
        borderWidth: 1
      },
      {
        label: 'inkomsten',
        data: income.split(','),
        backgroundColor: '#4AA02C',
        borderWidth: 1          
      }
     ]
    },
    options: {
      //locale: 'nl-NL',
      maintainAspectRatio: false,
      scales: {
        y: {
            beginAtZero: true,
            ticks: {
                // Include a Euro sign in the ticks
                callback: function(value) {                    
                    tick = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
                    
                    return tick;
                }
            }
        }
      },
      plugins: {
        tooltip: {
             callbacks: {
                label: function(context) {
                       let label = context.dataset.label || '';

                       if (label) {
                           label += ': ';
                       }
                       if (context.parsed.y !== null) {
                           label += new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                       }
                                            
                       return label;
                    }
                }
            },
            title: {
                display: true,
                text: 'Dummy Bar Chart'
            }            
        }
    }
  });
}

/*
 * Function:    dummyPieChart
 *
 * Created on Sep 25, 2023
 * Updated on Sep 25, 2023
 *
 * Description: Create and show a dummy bar chart met dummy data.
 *
 * In: -
 * Out: -
 *
 */
function dummyPieChart() { 
  const ctx = document.getElementById('pie_chart');  
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Financiën','Beleggen','Sparen','Crypto'],
      datasets: [
      {
        label: 'Waarde',
        data: ['38752.64','75885.52','50950.50','143987.06']
      }
     ]
    },
    options: {
      //locale: 'nl-NL',
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
             callbacks: {
                label: function(context) {
                       let label = context.dataset.label || '';

                       if (label) {
                           label += ': ';
                       }
                       if (context.parsed !== null) {
                           label += new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(context.parsed);
                       }
                                            
                       return label;
                    }
                }
            },
            title: {
                display: true,
                text: 'Dummy Pie Chart'
            }            
        }
    }
  });   
}