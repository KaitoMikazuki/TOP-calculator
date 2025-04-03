// OPERATIONS +-
// three variables for each operand
// operate function
// html (buttons including clear)
// MDAS 

let x;
let y;
let operation;
let inputVariableY = false;

function main (){
    // sets are used to validate user input 
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


    // This series of ifs are used to validate userInput first before proceeding
    if (operations.has(userInput)){
        if (inputVariableY == true){
            operate()
        }
        operation = userInput;
    }

    else if(actions.has(userInput)){
        processUserAction(userInput);
    }

    else if(numbers.has(Number(userInput))){
        processNumberEntered(userInput)
    }
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


function processNumberEntered (number){
    // Times 10 shifts the digit to the left place value
    if (operation != ""){
        y += (x * 10) + number;
    }
    else{
        x += (x * 10) + number;
    }
}

function processUserAction(action){
    switch (action){
        case "=":
            processEquation(action);
            break;
        case "AC":
            
            break;
        case "+/-":
                    
            break;
        case "%":
                        
            break;    
        case ".":
                            
            break;                     
    }
}


function updateDisplay()

// Arithmethic operations from this point on
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
