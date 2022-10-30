const ADD = "add";
const SUBTRACT = "subtract"
const MULTIPLY = "multiply";
const DIVIDE = "divide";

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