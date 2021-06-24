"use strict";
/*
function overloading - function with same name but with different signature
signature includes - data type of para or sequence of passing para or
number of para

In typescript while implementing function overloading it supports function
signature with either sequence of passing parameters or data type of
parameters number of arguments need to be same.
*/
function concat(x, y) {
    return x + y;
}
console.log("concat Hello with Hi" + concat("Hello", "Hi"));
console.log("concat 12 and 13 " + concat(12, 13));
//console.log("concat true and false "+concat(true,false));
