//named function
function showMessage(message:string)
{
    console.log("message is "+message);
}

showMessage("Welcome to Typescript");

//function with parameters that returns
function sum(x:number,y:number)
{
    return x+y;
}
console.log("sum of 12 4 is "+sum(12,4));

//function expression syntax
var calculate = function(x:number,y:number)
{
    return x*y;
}
console.log("multiply 9 8 "+calculate(9,8));

//anonymous function - function without name and always used as
//callback functions mostly in event handling IIFE - 
//immediately invoked function expression
(function(str:string){
    console.log("length = "+ str.length);
})("Typescript");

function add(x:number,y:number)
{
    return x+y;
}

function operate(x:number,y:number,doAdd:any)
{
    return doAdd(x,y);   //calling another function
}
var res1 = operate(4,5,add);//passing function add as an argument to operate
//in operate doAdd is a reference to add
console.log("res1 operate before = "+res1);
//instead of defining add seperately can i define it when invoke operate

var res = operate(6,7,function(x:number,y:number){
    return x+y;
})
console.log("res operate after = "+res);

