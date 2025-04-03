// OPERATIONS +-
// three variables for each operand
// operate function
// html (buttons including clear)
// MDAS 

let x;
let operation;
let y;

// Used to validate user input 
let numbers = new Set([0,1,2,3,4,5,6,7,8,9]);
let operations = new Set(["+","-","x","÷"]);
let actions = new Set (["=","AC","+/-","%","."]);


document.querySelector(".calc-keyboard").addEventListener("click", getUserInput)

function getUserInput(event){
    userInput = event.target.textContent;
    console.log(userInput)
    console.log(numbers.has(Number(userInput)));

    if (operations.has(userInput)){
        // be careful when they press the operator again
    }
    else if(actions.has(userInput)){

    }
    else if(numbers.has(Number(userInput))){
        firstArgument = true ? x = userInput: y = userInput;
    }


}

function operate(x,operation,y){

}

function add(x,y){
    return x + y;
}

function subtract(x,y){
    return x - y
}

function multiplication(x,y){
    return x*y
}

function divide(x,y){
    return x/y
}
