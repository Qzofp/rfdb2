/*
 * Title: Rizzo's Finances Database
 * Author: Rizzo Productions
 * Version: 0.25
 *
 * File:    sheet_chart.js
 * Used in: sheet.php
 *
 * Created on Feb 07, 2025
 * Updated on Apr 13, 2025
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
 * Updated on Apr 13, 2025
 *
 * Description: Initialize the bar chart.
 *
 * In:  bar, c, i
 * Out: -
 *
 */
function showYearOverviewChart(bar, c, i) {
    
    var scale = {year: "quarters", quarters: "months", months: "year"};
    var page = c.pages[i].split("#")[1];
    var year = $("header h1 span").html();
    var n = $("#page_buttons img:first").attr("alt");     
    
    // Debug
    //console.log( page, year, scale[n] );

    var request = getAjaxRequest("sheet/get_overview_year", "page=" + page + "&year=" + year + "&scale=" + scale[n]);
    request.done(function(result) {
            
        if (result.success) {         
        
            // Debug
            //console.log( result.query );            
            
            var x, t, labels, data = [];
            var color = ["rgb(74,160,44,0.8)","rgb(193,27,23,0.8)","rgb(135,6,3,0.8)"];
            //var keys = Object.keys(result.data[0]);
            
            var keys = [];
            if (result.data[0]) {
                keys = Object.keys(result.data[0]);
            }
                            
            // Determine the x scale.
            switch (scale[n]) {
                case "months"   : x = c.months;
                                  t = c.overview[2];
                                  break;

                case "quarters" : x = c.quarters;
                                  t = c.overview[1];
                                  break;
                
                case "year"     : x = c.year;
                                  t = c.overview[0];
                                  break;                
            }
            
            // Determine the labels for the finance or the other sheets.
            if (page === "finance") {
                labels = [c.payment[3],c.payment[4],c.payment[5]];
            }
            else {
                labels = [c.investment[2],c.investment[3]];
            }
            
            //console.log (labels , color);

            // Initialize the arrays for the datasets values.
            keys.forEach((key, i) => {
                data[key] = [];
            });  
                   
            // Fill the chart datasets values.
            $.each(result.data, function (n, field) {
                $.each(field, function(key, value) {                    
                    data[key].push(value);
                });      
            });           
            
            //console.log ( data[keys[0]] );
            
            // Create the datasets.
            var datasets = [];
            keys.forEach((key, i) => {                               
                if (i < keys.length) 
                {
                    datasets[i] = {
                        label: labels[i],
                        data: data[keys[i]],
                        backgroundColor: color[i],
                        borderWidth: 1
                    };
                }      
            });                    
            
            // Update the line chart.
            const tmp = {
                labels: x,
                datasets: datasets
            };            
                   
            bar.data.labels = tmp.labels; 
            bar.data.datasets = tmp.datasets;
            bar.options.plugins.title.text = t; 
            bar.update();            
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
 * Function:    closeChartWindow
 *
 * Created on Dec 18, 2023
 * Updated on Apr 13, 2025
 *
 * Description: Close the chart window.
 *
 * In:  -
 * Out: -
 *
 */
function closeChartWindow() {
  
    // Close or open chart slider when a page button is pressed.
    $("#page_buttons").on('click', 'img', function() {   
        switch (this.alt) {
            case "months" :
            case "quarters" :
            case "year"     : // Resize sheet table if the chart slider is open.   
                if ($("#chart_slider").css("bottom") === "0px") {
                    $("#table_container").css("height", cSheetMin);
                }  
                break;
            
            case "edit" : // Close chart slider.             
                $("#chart_slider").animate({"bottom":"-100%"}, 300);
                $("#table_container").css("height", cSheetMax);  
                $("#page_buttons img:last").css('display','none'); 
                break;
                
            case "chart" : // Open or close the chart slider.
                let bottom = "-100%";
                if ($("#chart_slider").css("bottom") !== "0px") 
                {      
                    $("#table_container").css("height", cSheetMin); 
                    $("#page_buttons img:last").css('display','inline'); // Show next graph icon.
                    bottom = "0";
                }
                else {
                    $("#table_container").css("height", cSheetMax);        
                    $("#page_buttons img:last").css('display','none'); // Hide next graph icon.    
                }
                $("#chart_slider").animate({"bottom":bottom}, 300);                 
                break;       
        }
    });    
    
    // Slidemenu button is pressed. Resize sheet table if the chart slider is open. 
    $(".slidemenu input[name='slideItem']").change(function() {      
        if ($("#chart_slider").css("bottom") === "0px") {
            $("#table_container").css("height", cSheetMin);
        }                 
    });    

    // Close chart slider when the table row is pressed.
    $("#table_container").on('click', 'tbody tr', function(){        
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
        $("#table_container").css("height", cSheetMax); 
    });       
    
    // Close the chart when the yearpicker button is pressed.
    $(".picker").on('click', 'img', function() {
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
        $("#table_container").css("height", cSheetMax); 
        $("#page_buttons img:last").css('display','none');
    });
    
    // Close chart slider when the hamburger menu is pressed.
    $(".hamburger_menu").click(function(){
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
        $("#table_container").css("height", cSheetMax);
        $("#page_buttons img:last").css('display','none');
    });
    
    // Close chart slider when the close button is pressed.
    $("#chart_content .close").click(function(){
        $("#chart_slider").animate({"bottom":"-100%"}, 300);
        $("#table_container").css("height", cSheetMax);
        $("#page_buttons img:last").css('display','none');
    });
}