// ====================================
// ============ FIND ==================
// Find an object within an array
var objArray = [
  { id: 0, name: 'Object 0', otherProp: '321' },
  { id: 1, name: 'O1', otherProp: '648' },
  { id: 2, name: 'Another Object', otherProp: '850' },
  { id: 3, name: 'Almost There', otherProp: '046' },
  { id: 4, name: 'Last Obj', otherProp: '984' }
];

// Vanilla JS
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }
  return null;
}
//Then you can pass the array you want to lookup, the property you’re looking for and its value. In our case we would use it like this:
var obj = findObjectByKey(objArray, 'id', 3);

// ES6
var obj = objArray.find(function (findObj) { return findObj.id === 3; });
var obj = objArray.find(findObj => { findObj.id === 3; });


let fruits = ["apple", "pear", "coconut", "watermelon", "banana", "orange", "pineapple"];

let result = fruits.filter(fruit => fruit.length > 6);

// ======================================
// ============ FILTER ==================
// Example 1: Given an array of strings, filter the items with length > 6
let fruits = ["apple", "pear", "coconut", "watermelon", "banana", "orange", "pineapple"];
let result = fruits.filter(fruit => fruit.length > 6);
// result => ["coconut", "watermelon", "pineapple"]

// Example 2: Given an array of numbers, return only the even numbers
let numbers = [2, 5, 1, -1, 0, 6, 7, 8, 9, -4];
let even = numbers.filter(n => n % 2 == 0);
// even => [2, 0, 6, 8, -4]

// Example 3: Given a list of objects
let students = [
  { name: 'john', subject: 'physics', score: 50 },
  { name: 'richard', subject: 'physics', score: 90 },
  { name: 'dave', subject: 'physics', score: 98 },
  { name: 'andrew', subject: 'math', score: 85 },
  { name: 'matt', subject: 'math', score: 67 },
  { name: 'mary', subject: 'physics', score: 69 },
  { name: 'janice', subject: 'math', score: 98 },
  { name: 'elisa', subject: 'physics', score: 69 },
  { name: 'johnny', subject: 'biology', score: 89 }
];

// Find all students that did a math exam and had a score of 70 or more
let res = students.filter(student => student.subject == 'math' && student.score >= 70);

// As above but with external function to maybe add more filters
function filterBySubjectAndScore(student) {
  return student.subject == 'math' && student.score >= 70;
}
let res = students.filter(filterBySubjectAndScore);

// Filter by different subjects and scores
function filterBySubjectAndScore(arr, subject, score) {
  function customFilter(student) {
    return student.subject == subject && student.score >= score;
  }
  return arr.filter(customFilter);
}
let res = filterBySubjectAndScore(students, 'math', 70);

// Prevent code from generating errors in case the function is called without the proper parameters being passed, we can check for the parameters before actually filtering our array. We can also allow our users to filter only by subject or only by score
function filterBySubjectAndScore(arr, subject, score) {
  // if the array parameter isn't present or it is an invalid argument, return
  if (!arr || typeof arr != 'object') return;
  // if neither subject or score params are present, return the array as it is
  if ((typeof subject == 'undefined' || subject == null) && (typeof score == 'undefined' || score == null)) return arr;
  function customFilter(student) {
    // if only subject is present, filter only by subject, 
    // if only score is present, filter only by score, otherwise, filter by both params
    if (typeof score == 'undefined' || score == null) {
      return student.subject == subject
    } else if (!subject) {
      return student.score >= score;
    } else {
      return student.subject == subject && student.score >= score;
    }
  }
  return arr.filter(customFilter);
}
// filter students with score equal or greater than 85
let res = filterBySubjectAndScore(students, null, 85);