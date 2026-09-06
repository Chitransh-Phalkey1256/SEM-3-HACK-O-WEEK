// main.js
// Simple JavaScript program that stores and processes student examination
// results using let/const, arrow functions, template literals,
// destructuring, spread/rest parameters, and modules.

// 8. Import functions from the separate resultUtils.js module.
import { calculateTotal, calculateAverage, calculateResult } from "./resultUtils.js";

// 1 & 2. Declare student information using let/const and store it in an object.
const student = {
  name: "Aarav Sharma",
  rollNumber: "SIT2025B29",
  marks: [78, 85, 92], // Maths, Science, English
};

let { name, rollNumber, marks } = student; // 3. Destructuring

// 4 & 5. Arrow function + rest parameter to calculate total/average of any
// number of marks.
let total = calculateTotal(...marks);
let average = calculateAverage(...marks);
let result = calculateResult(average);

// 7. Template literals to display the result.
console.log(`----- Student Result -----`);
console.log(`Name        : ${name}`);
console.log(`Roll Number : ${rollNumber}`);
console.log(`Subjects    : ${marks.length}`);
console.log(`Total Marks : ${total}`);
console.log(`Average     : ${average.toFixed(2)}`);
console.log(`Result      : ${result}`);

// 6. Spread operator to add another subject's marks (creates a NEW array,
// original "marks" array is not mutated).
const newSubjectMark = 88; // Computer Science
const updatedMarks = [...marks, newSubjectMark];

// Spread operator to create an updated student record (new object,
// original "student" object is not mutated).
const updatedStudent = {
  ...student,
  marks: updatedMarks,
};

const updatedTotal = calculateTotal(...updatedStudent.marks);
const updatedAverage = calculateAverage(...updatedStudent.marks);
const updatedResult = calculateResult(updatedAverage);

console.log(`\n----- Updated Student Record (after adding a subject) -----`);
console.log(`Name        : ${updatedStudent.name}`);
console.log(`Roll Number : ${updatedStudent.rollNumber}`);
console.log(`Subjects    : ${updatedStudent.marks.length}`);
console.log(`Marks List  : ${updatedStudent.marks.join(", ")}`);
console.log(`Total Marks : ${updatedTotal}`);
console.log(`Average     : ${updatedAverage.toFixed(2)}`);
console.log(`Result      : ${updatedResult}`);
