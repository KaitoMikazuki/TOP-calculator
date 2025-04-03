// OPERATIONS +-
// three variables for each operand
// operate function
// html (buttons including clear)
// MDAS 

let x;
let y;
let operation;
let operationSelected = false;

// Used to validate user input 
function main (){
    let numbers = new Set([0,1,2,3,4,5,6,7,8,9]);
    let operations = new Set(["+","-","x","÷"]);
    let actions = new Set (["=","AC","+/-","%","."]);

    document.querySelector(".calc-keyboard").addEventListener("click", getUserInput)

    
}



function getUserInput(event){
    if (event.target.tagName === "DIV"){
        return 
    }

    userInput = event.target.textContent;
    console.log(`${userInput} pressed`)
    

    if (operations.has(userInput)){
        operationSelected = true;
        operation = userInput;
    }

    else if(actions.has(userInput)){
        
    }

    else if(numbers.has(Number(userInput))){
        // If an operator has not been pressed yet, blablabla
    }


}

function allowInputVariableY (){
    
}

function operate(x,operation,y){
    switch(operation){
        case "+":
            add(x,y);
            break;
        case "-":
            subtract(x,y);
            break;
        case "x":
            multiplication(x,y);
            break;
        case "÷":
            divide(x,y);
            break;
    }
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
