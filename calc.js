let numBtns = document.querySelectorAll(`[data-number]`)
let operBtn = document.querySelectorAll(`[data-operator]`)
let equalBtn = document.querySelector("#equalbtn")
let clearBtn = document.querySelector("#clear-btn")
let pointBtn = document.querySelector("#dot-button")
let previousOperand = document.querySelector('.previous-operand');
let currentOperand = document.querySelector(".current-operand");
let deleteBtn = document.querySelector("#delete");
let firstNumber = ``;
let secNumber = ``;
let currentOperation = null;
function add(num1 , num2) {
    return num1 + num2;
}
function subtract( num1 , num2) {
    return num1 - num2
}
function multiply(num1,num2) {
    return num1 * num2
}
function divide(num1, num2){
    return num1 / num2
}
function operate(num1, operators , num2){
num1 = Number(num1)
num2 = Number(num2)
    switch(operators) {
        case `+`:
            return add(num1 , num2)
        case `-`:
            return subtract( num1, num2)
        case `*`:
            return multiply( num1 ,num2)
        case `/`:
            return divide( num1 , num2)
        default:
            return null
    }
}

numBtns.forEach((button) => button.addEventListener("click" , () => appendNumbers(button.textContent)));
function appendNumbers(number){
    if(currentOperand.textContent === "0") {
        resetScreen();
    }
    currentOperand.textContent += number;
}
//function to reset screen
function resetScreen() { 
    currentOperand.textContent = ``;
}
//clear button function
clearBtn.addEventListener(`click` , clear);
function clear() { 
    currentOperand.textContent = `0`;
    previousOperand.textContent = ``;
}
operBtn.forEach((button) => button.addEventListener("click" , () => appendOperator(button.textContent)));
function appendOperator(operator) {
    if (currentOperation !== null) evaluate()
    firstNumber = currentOperand.textContent
    currentOperation = operator
    previousOperand.textContent = `${firstNumber} ${currentOperation}`
    currentOperand.textContent = ``;
    console.log(`clicked`);
}
pointBtn.addEventListener(`click` , appendPoint);
function appendPoint() {
    if(currentOperand.textContent == ``)
    currentOperand.textContent += `0`
    if (currentOperand.textContent.includes('.')) return
    currentOperand.textContent += `.`
    
}
equalBtn.addEventListener("click" , evaluate);
function evaluate() {
    if (currentOperation === null) return
    if (currentOperation == `/` && currentOperand.textContent == `0`){
    // alert(`you can't divide by 0!`)
    currentOperand.textContent = `you cant divide by 0!`
    return}
    secNumber = currentOperand.textContent
    currentOperand.textContent =operate(firstNumber, currentOperation, secNumber);
    previousOperand.textContent = `${firstNumber} ${currentOperation} ${secNumber} = `
    currentOperation = null
    
}
deleteBtn.addEventListener(`click`, deleteNumber);
function deleteNumber(){
    currentOperand.textContent = currentOperand.textContent.toString().slice(0 , -1);
}
// adding keyboard support
window.addEventListener(`keydown` , keyboardsupport)
function keyboardsupport(e) {
    if(e.key >= 0 && e.key <= 9) appendNumbers(e.key)
    if(e.key == `.`) appendPoint()
    if(e.key === `+` || e.key === `-` || e.key === `*`|| e.key === `/`) appendOperator(e.key)
    if(e.key === `=` || e.key === `Enter`) evaluate(e.key);
    if(e.key === `Backspace`) deleteNumber()
    if(e.key === `Escape`) clear()
}