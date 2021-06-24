/*
enum - collection of constansts
In typescript we have
numeric enum
String enum
and heterogeneous enum i.e combination of string and numner
*/
//numeric enum
var Courses;
(function (Courses) {
    Courses[Courses["Java"] = 0] = "Java";
    Courses[Courses["typescript"] = 1] = "typescript";
    Courses[Courses["React"] = 2] = "React";
})(Courses || (Courses = {}));
console.log("constant at 0 = " + Courses[0]);
console.log("constant at 2 = " + Courses[2]);
//string enum
var MyCourses;
(function (MyCourses) {
    MyCourses["Java"] = "Java";
    MyCourses["Typescript"] = "Typescript";
    MyCourses["React"] = "React";
})(MyCourses || (MyCourses = {}));
console.log("value of key java = " + MyCourses["Java"]);
//heterogeneous enum
var Training;
(function (Training) {
    Training[Training["Java"] = 1] = "Java";
    Training["Typescript"] = "tsc";
    Training["React"] = "react";
    Training[Training["Angular"] = 2] = "Angular";
})(Training || (Training = {}));
console.log("key of typescript = " + Training.Typescript);
console.log("key of angular = " + Training.Angular);
console.log("key of angular = " + Training[2]);
