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