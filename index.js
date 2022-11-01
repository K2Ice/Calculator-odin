const ADD = "add";
const SUBTRACT = "subtract"
const MULTIPLY = "multiply";
const DIVIDE = "divide";

const signs = {
  "add" : "+",
  "subtract" : "-",
  "multiply" : "*",
  "divide" : "/"
}

const display = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll('button')

let displayValue = "";
let operationType = ""
let operand1 = null;
let operand2 = null;

const add = (operand1, operand2)=>{
  //prevent from adding two strings
  operand1 = +operand1;
  operand2 = +operand2;

  return operand1 + operand2;
}
const subtract = (operand1, operand2)=>{
  return operand1 - operand2;
}
const multiply = (operand1, operand2)=>{
  return operand1 * operand2;
}
const divide = (operand1, operand2)=>{
  (operand1 === 1 && operand2 === 0)
  return operand1 / operand2;
}

const operate = (type, operand1, operand2) =>{
  switch(type){
    case ADD:
      return add(operand1, operand2);
    case SUBTRACT:
      return subtract(operand1, operand2)
    case MULTIPLY:
      return multiply(operand1, operand2)
    case DIVIDE:
      return divide(operand1, operand2)
    default:
      throw new Error('No such type of function: '  + type)      
  }
}

function updateScreen(){
  display.textContent = displayValue;
}

function clear(){
  displayValue = "";
  operationType = ""
  operand1 = null;
  operand2 = null;
}

function handleButtonClick(event){
  const {btn} = event.target.dataset;
  const type = isNaN(+btn) ? "operation" : "number";

  console.log(type)

  switch (type){
    case "number":
      if(operationType === "=") clear();
      displayValue += btn;
      if(operand1!== null && operationType){
        operand2 += +btn
      }
      break;
    case "operation":
      if(btn === 'clear') clear();
      else if(btn === 'equal'){
        if(operand1 !== null && operand2 !== null && operationType){
        displayValue = operate(operationType,operand1,operand2)
        operationType = "="
        operand1 = displayValue;
        operand2 = null;
        }
      }
      else if (operand1 !== null && operand2 !== null && operationType){
        operand1 = operate(operationType,operand1,operand2 )
        operand2 = null;
        operationType = btn;
        displayValue = operand1 + " " + signs[btn] + " ";
      }
      else if(operand1 !== null && operationType && operand2 === null){
        operationType = btn;
        displayValue = operand1 + " " + signs[btn] + " ";
      }
      else if(operand1 === null && displayValue === "") return;
      else if(!operand1 && !operationType) {
        operationType = btn;
        operand1 = +displayValue
        displayValue += " " + signs[btn] + " ";
      }else{
        console.log('in')
        operationType = btn;
        displayValue = +operand1 + " " + signs[btn] + " ";
      }
      break;
  }

  if(displayValue === Infinity || operand1 === Infinity) clear();

  updateScreen()
  
}

buttons.forEach(btn=> btn.addEventListener('click', handleButtonClick));