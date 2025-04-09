// state of clearness
// inputvariable y indicates that both x and y are ready, all other numbers inputted will be for y


let x = 0;
let y = 0;
let operation = "";
let inputVariableY = false;
let result = null;

// sets are used to validate user input 
let numbers = new Set([0,1,2,3,4,5,6,7,8,9]);
let operations = new Set(["+","-","x","÷"]);
let actions = new Set (["=","AC","+/-","%","."]);

document.querySelector(".calc-keyboard").addEventListener("click", getUserInput)

    
function clearAll(){
    // Resets all variables
    [x,y,operation,inputVariableY,result] = [0,0,"",false,null]
    displayNumber(0);
}

function highlightSelectedOperation(operation){
    curr = document.querySelectorAll(".highlighted-operation-button")
    console.log(curr)
    if (curr.length > 1 ){
        curr.classList.remove(".highlighted-operation-button")
    }
    ya = document.querySelector(`#${operation}`)
    console.log(ya)
    console.log(operation)
    .classList.add(".highlighted-operation-button")
}


function displayNumber(num){
    document.querySelector(".display-text").textContent = num;
}


function getUserInput(event){
    if (event.target.tagName === "DIV"){
        return 
    }

    userInput = event.target.textContent;
    console.log(`${userInput} pressed`)

    // This series of ifs are used to validate userInput first before proceeding
    if (operations.has(userInput)){
        processOperationEntered(userInput)
    }

    else if(actions.has(userInput)){
        processActionEntered(userInput);
    }

    else if(numbers.has(Number(userInput))){
        processNumberEntered(Number(userInput))
        console.log(`x: ${x} y:${y}`)
    }
}


function operate(x,operation,y){

    switch(operation){
        case "+":
            result = add(x,y);
            break;
        case "-":
            result = subtract(x,y);
            break;
        case "x":
            result = multiplication(x,y);
            break;
        case "÷":
            result = divide(x,y);
            break;
    }
    return
    
    operation = "";
    y = 0;
    console.log(result)

    // If an operation was pressed instead of equal, proceed to the y variable 
    if (nextOperation = ""){
        inputVariableY = false;
    }
    else{
        x = result;
        operation = nextOperation;
    }

}

function prepareForNextOperation(nextOperation){

}

function processOperationEntered(userInput){
    if (inputVariableY == true && y){
        operate(x, operation, y)
        x = result 
        y = 0
        displayNumber(result)
    }
    else {
        operation = userInput;
        inputVariableY = true;
    }
    highlightSelectedOperation(operation);
}


function processNumberEntered (number){
    if (result != null && operation == ""){
        clearAll();
    }

    // Times 10 shifts the digit to the left place value
    if (inputVariableY == true){
        y = (y * 10) + number;
        displayNumber(y);
    }
    else{
        x = (x * 10) + number;
        displayNumber(x);
    }
}

function processActionEntered(action){
    switch (action){
        case "=":
            if (inputVariableY == true && operation){
                operate(x,operation,y)
                displayNumber(result)
            }   
            operation = ""
            break;
        case "AC":
            clearAll();
            break;
        case "+/-":
              
            break;
        case "%":
                        
            break;    
        case ".":
                            
            break;                     
    }
}


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
