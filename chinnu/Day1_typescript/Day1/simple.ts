var data:number = 20;
console.log("data = "+data);

var firstName:string = "Kirti";
var lastName:string = "Sharma";

var fullname: string = firstName+" "+lastName;

//template string - preferred to contact data 
//more convinient and readable format

var flname : string = `Hello fullname is ${firstName} ${lastName}`;

console.log("fullname with + = "+fullname);
console.log("flname template string = "+flname);

function display() : void
{
    console.log("display function")
}
/*
never data type is used with function in 2 cases only
either the function is not going to end its execution i.e it contain
infinite loop or if function is throwing an error and not handling same.
*/
function show():never
{
    while(true)
    {
        console.log("in execution");
    }
}
function showError():never
{
    throw new Error("some error");
}

var myvalues : any;
myvalues = 90;
console.log("myvalues with 90 = "+myvalues);
myvalues = "Hello";
console.log("myvalues with hello = "+myvalues);

//object
var obj = {
    pname : 'Amey',
    paddress : 'Pune'
}

console.log("name is "+obj.pname + " address is "+obj.paddress);

//array in typescript

var arr = [1,2,3];
var arr1:number[] = [4,5,6];
var arr2 : Array<number> = [6,7,8];
console.log(arr);
console.log(arr1);
console.log(arr2);

var arr3 : any[] = [1,"x",4.5,true];







