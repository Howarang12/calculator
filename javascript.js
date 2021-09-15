let numberButtons = document.querySelectorAll(".number");
let operationButtons = document.querySelectorAll(".operation");
let equalButton = document.querySelector(".equal");
let deleteButton = document.querySelector("#delete");
let clearButton = document.querySelector("#clear");
let previousOperandText = document.querySelector(".previous-operand")
let currentOperandText = document.querySelector(".current-operand")

//store input as strings
let previousOperand ="";
let currentOperand= "";
let result;
let operator = "";




function clear(){
    previousOperand ="";
    currentOperand= "";
    result = "";
    operator = "";
    previousOperandText.innerText =  "";
    currentOperandText.innerText = "";
    updateDisplay();
}

function del(){
    currentOperand = currentOperand.slice(0,-1);
    updateDisplay();
}

function operate(){
    //convert input to numbers
    const a = parseFloat(previousOperand);
    const b = parseFloat(currentOperand);

    if(isNaN(a) || isNaN(b)) return;
    if (operator == '÷' && currentOperand == "0"){
       alert("You can't divide by 0")
       return
    }
    switch(operator){
        case "+":
            result = a+b;
            break;
        case "-":
            result = a-b;
            break;
        case "x":
            result = a*b;
             break;
        case "÷":
            result = a/b;
             break;
        default:
            return;
    }
    currentOperand = result;
    operator = "";
    previousOperand = "";
    updateDisplay();
}
// split number into integers and decimals to format integers with commas
function formatNumbers(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    if (isNaN(integerDigits)){
        integerDisplay = '';
    } else{
        integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0})
        }
    if (decimalDigits != null){
        return `${integerDisplay}.${decimalDigits}`
    } else{
        return integerDisplay;
    }
    }

function updateDisplay(){
    currentOperandText.innerText = formatNumbers(currentOperand);
    if (operator != ""){
    previousOperandText.innerText = formatNumbers(previousOperand) + operator;
    }
    else{
        previousOperandText.innerText = "";
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === "." && currentOperand.includes(".")) return;
        currentOperand+= button.innerText;
        updateDisplay();
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand === "") return;
        if (operator != ""){
            operate()
        }
        operator = button.innerText;
        previousOperand = currentOperand;
        currentOperand = "";
        updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    operate();
})

clearButton.addEventListener('click', button => {
    clear()
});

deleteButton.addEventListener('click', button => {
    del();
})


