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
   inputHandler.radios = document.querySelectorAll(".act-class");
   inputHandler.activation='relu';

   inputHandler.update_values=function()
   {
       disable_controls(inputHandler.radios);
       console.log(inputHandler.radios);
       console.log(inputHandler.activation);
       InputValueHandler.setActivation(inputHandler.activation);
       inputHandler.values=InputValueHandler.updateVal(inputHandler.xvalue);
       console.log(inputHandler.values);
   }

   function disable_controls(controls)
   {
       for(var i=0;i<controls.length;i++)
       {
           controls[i].disabled=true;
       }
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
    var act_function='';
    service.setActivation=function(activation)
    {
        act_function=activation;
    }
    service.updateVal=function(value)
    {
       
        if(value!=undefined)
        {
            var val={x:parseFloat(value),y:0}
            val=add_y(val);
            value_list.push(val);
        }
        else
        {
            
            var val={x:0,y:0}
            val=add_y(val);
            value_list.push(val);
        }
        
        return value_list;
    }
    function add_y(value)
    {
        value.y=apply_function(value.x);
        return value;
    }
    function apply_function(value)
    {
        if(act_function==='relu')
        {
           if(value>0)
           {
               return value;
           }
           else
           {
               return 0;
           }
        }
        else if(act_function==='tanh')
        {
            return tanh(value);
        }
        else if(act_function==='sigmoid')
        {
            return sigmoid(value);
        }
        return 0;
    }

    function tanh(x)
    {
        
        
        return (Math.exp(x)-Math.exp(-x))/(Math.exp(x)+Math.exp(-x));
    }
    function sigmoid(x)
    {
       
        return Math.exp(x)/(Math.exp(x)+1);
    }
    service.getChartData=function()
    {
        return value_list;
    }
}

})();


