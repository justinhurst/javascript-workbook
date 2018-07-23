//1. Write a JavaScript program to display the current day and time.
// display current date https://www.w3schools.com/js/js_dates.asp
// new Date()
const getCurrentDate=()=>{
  return new Date()
}
getCurrentDate();

//2. Write a JavaScript program to convert a number to a string
// https://www.w3schools.com/jsref/jsref_tostring_number.asp
// num.toString()
const numToString=(num)=>{
  return num.toString()
}
numToString(100);

//3. Write a JavaScript program to convert a string to the number.
// https://www.w3schools.com/jsref/jsref_number.asp
// Number(), parseInt()
const stringToNum=(str)=>{
  return Number(str)
}
stringToNum('999');

//4. Write a JavaScript program that takes in different datatypes and prints out whether they are a:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// typeof
const whatVarType=(val)=>{
  return typeof val
}
whatVarType(true);

//5. Write a JavaScript program that adds 2 numbers together.
const addTwoNums=(num1,num2)=>{
  return num1 + num2
}
addTwoNums(12,13);

//6. Write a JavaScript program that runs only when 2 things are true.
const firstCheck = 'yes';
const secondCheck = true;
const thirdCheck = undefined;
const fourthCheck = false;

const checkIfTwoAreTrue=(check1,check2)=>{
  if( check1 && check2){
    return true
  }
}
checkIfTwoAreTrue(firstCheck,secondCheck);

//7. Write a JavaScript program that runs when 1 of 2 things are true.
const atLeastOneTrue=(check1, check2)=>{
  if( check1 || check2 ){
    return true
  }
}
atLeastOneTrue(secondCheck,thirdCheck);

//8. Write a JavaScript program that runs when both things are not true.
const neitherAreTrue=(check1,check2)=>{
  if( !check1 && !check2 ){
    return true
  }
}
neitherAreTrue(thirdCheck,fourthCheck);