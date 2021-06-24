/*
enum - collection of constansts
In typescript we have
numeric enum
String enum
and heterogeneous enum i.e combination of string and numner
*/

//numeric enum
enum Courses
{
    Java,typescript,React
}
console.log("constant at 0 = "+Courses[0]);
console.log("constant at 2 = "+Courses[2]);

//string enum
enum MyCourses
{
    Java = "Java",
    Typescript = "Typescript",
    React = "React"
}
console.log("value of key java = "+MyCourses["Java"]);

//heterogeneous enum
enum Training
{
    Java = 1,
    Typescript = "tsc",
    React = 'react',
    Angular = 2
}

console.log("key of typescript = "+Training.Typescript);
console.log("key of angular = "+Training.Angular);
console.log("key of angular = "+Training[2]);



