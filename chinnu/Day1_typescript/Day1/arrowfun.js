"use strict";
//arrow functions - lambda expressions
//it replace function call with function definition so execute faster
var sayHello = () => {
    return "Hello All!!!";
};
console.log("sayHello is " + sayHello());
var concatStr = (str1, str2) => {
    return str1.concat(str2);
};
console.log("concatStr is " + concatStr("Mumbai in ", "Maharashtra"));
