"use strict";
/*
Destructuring - unpacking of elements
you can destructure arrays, functions and objects
*/
/*
rest parameter - used to aggregate variable number of arguments
*/
function sumOfNum(...x) {
    let res = 0;
    for (let val of x) {
        res = res + val;
    }
    return res;
}
console.log(sumOfNum(1, 2));
console.log(sumOfNum(1, 2, 3, 4));
console.log(sumOfNum(1, 2, 5));
/*
difference in rest and spread
... when used on L.H.S of = to operator is rest para and
when used on R.H.S of = is spread operator.
rest parameter is used to store variable number of arguments whereas
spread operator is used represent the arguments.
*/
let myarr = [6, 7, 8, 9, 2, 3];
//destructuring 1st and 2nd element if myarr
let [x, y] = myarr;
console.log("x = " + x + "y = " + y);
//destructuring 1st and 2nd element and remaining of myarr
let [z, h, ...rem] = myarr;
console.log("z = " + z + " h = " + h);
console.log("rem = " + rem);
var person = {
    pname: "Pooja",
    paddress: "Pune",
    pcontact: "9922339999"
};
//destructuring object
var { paddress, pcontact } = person;
console.log("address is " + paddress + " contact is " + pcontact);
