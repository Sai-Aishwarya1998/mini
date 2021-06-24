"use strict";
var arrnum = [1, 2, 3, 4, 5];
//using in
for (let i in arrnum) {
    console.log("using in " + arrnum[i]);
}
//using of
for (let val of arrnum) {
    console.log("using of " + val);
}
//spread operator - it helps you to spread data to destination
console.log("using spread ");
console.log(...arrnum); //spread operator
//mixed array
let arrstr = [1, "Hello", "Hi", 2, 3, 4, "Welcome"];
console.log("mixed array");
console.log(...arrstr);
