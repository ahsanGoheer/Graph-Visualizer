(function(){
'use strict';

angular.module("GraphPlotter",[])
.controller("GraphPlotController",GraphPlotController)
.controller("ChartController",ChartController)
.service("InputValueHandler",InputValueHandler);

GraphPlotController.$inject=["InputValueHandler"];
function GraphPlotController(InputValueHandler)
{
   var inputHandler=this;
  inputHandler.values=[];
     
   inputHandler.update_values=function()
   {
    
       inputHandler.values=InputValueHandler.updateVal(inputHandler.xvalue);
    
       console.log(inputHandler.values);
   }
}

ChartController.$inject=["InputValueHandler"];
function ChartController(InputValueHandler)
{

    var chart_handler=this;
    chart_handler.GenChart=function()
    {
        chart_handler.chartData=InputValueHandler.getChartData();
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: "Activation Values",
                datasets: [{
                    label: "Activation Functions",
                    data:chart_handler.chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 5
                }]
            },
            options: {
            
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes:[
                        {
                            type:'linear'
                        }
                    ]
                }
            }
        });   
    }
    
}


function InputValueHandler()
{
    var service =this;
    var value_list=[];
    service.updateVal=function(value)
    {
        var val={x:value,y:0}
        val=add_y(val);
        value_list.push(val);
        return value_list;
    }
    function add_y(value)
    {
        value.y=value.x;
        return value;
    }
    service.getChartData=function()
    {
        return value_list;
    }
}

})();


