// resultUtils.js
// Module containing helper functions for calculating total, average,
// and result status of a student based on marks.

// 4. Arrow function using rest parameter (...marks) so it can accept
//    any number of subject marks.
export const calculateTotal = (...marks) => {
  return marks.reduce((sum, mark) => sum + mark, 0);
};

// Arrow function that reuses calculateTotal to find the average.
export const calculateAverage = (...marks) => {
  const total = calculateTotal(...marks);
  return total / marks.length;
};

// Arrow function that decides Pass/Fail based on average marks.
export const calculateResult = (average) => {
  return average >= 40 ? "Pass" : "Fail";
};
