(function(){
'use strict';

angular.module("GraphPlotter",[])
.controller("GraphPlotController",GraphPlotController)
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

function InputValueHandler()
{
    var service =this;
    var value_list=[];
    service.updateVal=function(value)
    {
        var val={x_val:value,y_val:0}
        val=add_y(val);
        value_list.push(val);
        return value_list;
    }
    function add_y(value)
    {
        value.y_val=value.x_val;
        return value;
    }
}

})();


