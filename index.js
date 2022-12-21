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
  return +operand1 + +operand2;
}
const subtract = (operand1, operand2)=>{
  return +operand1 - +operand2;
}
const multiply = (operand1, operand2)=>{
  return +operand1 * +operand2;
}
const divide = (operand1, operand2)=>{
  return +operand1 / +operand2;
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

function handleFormatOfNumber(number){
  if(number % 1 !== 0){
    let value = number.toString()
    const periodIndex = value.indexOf('.');
    if((value.length - periodIndex >= 3) && (value[value.length-2] === value[value.length-3])){
      number = number.toFixed(4)
    }
    return +number;
  }
  return number;
}

function updateScreen(){  
  display.textContent = displayValue;
}

function periodFunc(checkOperand){

  if(checkOperand === 'operand1'){
    if(operand1 === null){
      displayValue = operand1 = "0."
    }
    else if(operand1.indexOf('.') === -1){
      displayValue += '.' 
      operand1 += "."
    }
  }
  else if(checkOperand === 'operand2'){
    if(operand2 === null || operand2 === ""){
      displayValue += '0.' 
      operand2 = "0."
    }
    else if(operand2.indexOf('.') === -1){
      displayValue += '.'
      operand2 += "."
    }
  }
}

function clear(){
  displayValue = "";
  operationType = ""
  operand1 = null;
  operand2 = null;
}

function handleButtonClick(event){
  let {btn} = event.target.dataset;
  const type = isNaN(+btn) ? "operation" : "number";
  btn = btn === "00" ? "." : btn;
//To skończyłem, jeszcze została mi do napisania instrukcja obslugąja '.' w operandzie 1 i operandzie 2 
  switch (type){
    case "number":

    //Prevent before multi zeros

    if(operand1 !== null && operationType && operand2 === "0" && btn === "0") return;
    if(operand1 === "0" && operationType === "" && operand2 === null && btn === "0") return;


      if(operationType === "=") clear();

      if(operationType === ""){
        if(btn === ".") periodFunc('operand1')
        else{
          (operand1 === null || operand1 === "0") ? displayValue = operand1 = btn : displayValue = operand1 += btn;
        }
      }

      else if(operand1!== null && operationType){
         if(btn === ".") periodFunc('operand2')
        else{
           displayValue += btn; 
           (operand2 === null || operand2 === "0") ? operand2 = btn : operand2 += btn;

        }
      }
      break;

    case "operation":
      if(btn === 'clear'){
        clear();
      } 
      else if(btn === 'undo'){
        displayValue = String(displayValue).replace(/(\d|\.|\s.\s)$/g, "")
        if(operand1 !== null && operationType !== "" && operand2 !== null && operand2 !== ""){
          operand2 = operand2.slice(0,operand2.length-1);
        } else if(operand1 !== null && operationType !== "" && operationType !== "=") operationType = "";
        else if(operand1 !== null && operand1 !== "") {
          console.log('indo')
          operand1 = String(operand1).replace(/(\d|\.)$/g, "")
        } 
      }
      else if(btn === 'equal'){
        if(operand1 !== null && operand2 !== null && operationType){
        const result = operate(operationType,operand1,operand2);
        displayValue = handleFormatOfNumber(result)
        operationType = "="
        operand1 = handleFormatOfNumber(result);
        operand2 = null;
        }
      }
      //All both numbers are set and client click function button
      else if (operand1 !== null && operand2 !== null && operationType){
        const result = operate(operationType,operand1,operand2);
        operand1 = handleFormatOfNumber(result);
        operand2 = null;
        operationType = btn;
        displayValue = operand1 + " " + signs[btn] + " ";
      }
      //When operand2 is not set, click on operation button change the operation
      else if(operand1 !== null && operationType && operand2 === null){
        operationType = btn;
        displayValue = operand1 + " " + signs[btn] + " ";
      }

      //Prevent from clicking functional button without setting first operand
      else if(operand1 === null && displayValue === "") return;


      //Setting operation type when first operand is set
      else if(!operationType) {
        operationType = btn;
        operand1 = +operand1
        displayValue = operand1 + " " + signs[btn] + " ";
      }
      //Changing the operation type
      else{
        console.log('in')
        operationType = btn;
        displayValue = +operand1 + " " + signs[btn] + " ";
      }
      break;
  }

  if(displayValue === Infinity || operand1 === Infinity){
    alert("Divide by 0 is not allowed.\nThat's probably a missclick.\n\nTry to avoid it in future :) ")
    clear();
  } 


  updateScreen()
  
}

buttons.forEach(btn=> btn.addEventListener('click', handleButtonClick));