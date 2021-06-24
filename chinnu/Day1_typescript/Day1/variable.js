"use strict";
var num1 = 100;
let num2 = 34;
console.log("num1 = " + num1);
console.log("num2 = " + num2);
function checkAccess() {
    var x = 9;
    {
        let y = 2;
        console.log("in block x= " + x + " y = " + y);
    }
    console.log("outside block x= " + x + " y = " + y);
}
checkAccess();
//it has block level scope
const mydata = "Hello";
//mydata="something";
const person = {
    name: "Ajay",
    address: 'Pune'
};
person.address = "Mumbai";
person = {};
