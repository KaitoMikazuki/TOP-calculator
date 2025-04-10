// state of clearness
// inputvariable y indicates that both x and y are ready, all other numbers inputted will be for y

// Global variables !
let x = 0;
let y = 0;
let operation = "";
let inputVariableY = false;
let result = null;
let negativeMode = false;
let decimalMode = false;

// sets are used to validate user input 
let numbers = new Set([0,1,2,3,4,5,6,7,8,9]);
let operations = new Set(["add","subtract","multiply","divide"]);
let actions = new Set (["equal","AC","changeSymbol","percent","decimal"]);

document.querySelector(".calc-keyboard").addEventListener("click", getUserInput)

    
function clearAll(){
    // Resets all variables
    [x,y,operation,inputVariableY,result, negativeMode] = [0,0,"",false,null, false]
    displayNumber(0);
    unhighlightPreviousOperation();
}

// These two functions deal with UX of highlighting active operations and availability of equals
function highlightSelectedOperation(selectedOperation){
    unhighlightPreviousOperation();
    document.querySelector(`#${selectedOperation}`).classList.add("highlighted-operation");
    console.log(operation);
}

function unhighlightPreviousOperation(){
    document.querySelector(".highlighted-operation")?.classList.remove("highlighted-operation");
    document.querySelector("#equal").classList.add("disallow-equal")
}


function displayNumber(number){
    document.querySelector(".display-text").textContent = number;
}


function operate(x,operation,y){
    switch(operation){
        case "add":
            result = add(x,y);
            break;
        case "subtract":
            result = subtract(x,y);
            break;
        case "multiply":
            result = multiplication(x,y);
            break;
        case "divide":
            result = divide(x,y);
            break;
    }
    displayNumber(result);
}


function getUserInput(event){
    if (event.target.tagName === "DIV"){
        return 
    }

    userInput = event.target;
    console.log(`${userInput.id} pressed`)

    // This series of ifs are used to validate userInput first before proceeding
    if (operations.has(userInput.id)){
        processOperationEntered(userInput.id)
    }

    else if(actions.has(userInput.id)){
        processActionEntered(userInput.id);
    }

    else if(numbers.has(Number(userInput.textContent))){
        processNumberEntered(Number(userInput.textContent))
        console.log(`x: ${x} y:${y}`)
    }
}


// The following are function that process the user's input

function processOperationEntered(userInput){
    if ((inputVariableY === true && y !== 0) || (operation === "divide" && y === 0)){
        operate(x, operation, y)
        x = result 
        y = 0
    }
    else {
        inputVariableY = true;
    }

    operation = userInput;
    highlightSelectedOperation(operation);
    negativeMode = false;
}


function processNumberEntered (number){
    if (result != null && operation == ""){
        clearAll();
    }
    else if(negativeMode === true){
        number *= -1
    }

    // Checks if the second variable is decimal or not to determine how to input
    else if (inputVariableY == true){
        if (decimalMode === true){
            y = Number(String(y) + number);
        }
        else {
            y = (y * 10) + number;
        }
        displayNumber(y);
        document.querySelector("#equal").classList.remove("disallow-equal")
    }

    // Checks if the first variable is decimal or not to determine how to input
    else{
        if (decimalMode == true){
            x = Number(String(x) + number);
        }
        else{
            x = (x * 10) + number;
        }
        displayNumber(x);
    }
}

function processActionEntered(action){
    switch (action){
        case "equal":
            if (inputVariableY == true && operation){
                operate(x,operation,y)
            }   
            unhighlightPreviousOperation();
            operation = "";
            inputVariableY = false;
            negativeMode = false;
            x = result;
            y = 0;
            break;

        case "AC":
            clearAll();
            break;

        // times -1 will change symbol
        case "changeSymbol":
            if (inputVariableY == true && y !== 0){
                y *= -1;
                displayNumber(y)
            }
            else if (inputVariableY == false && x !== 0){
                x *= -1
                displayNumber(x)
            } 
            negativeMode = !negativeMode
            break;

        case "percent":
            if (inputVariableY === true && y !== 0){
                y /= 100;
                decimalMode = y % 100 === 1 ? false: true;
                displayNumber(y)
            }          
            else{
                x /= 100;
                decimalMode = x % 1 === 0 ? false: true;
                displayNumber(x);
            }
            break;    
        case "decimal":
            decimalMode = true;
            if (inputVariableY){
                y = String(y) + ".";
                displayNumber(y);
            }
            else{
                x = String(x) + ".";
                displayNumber(x);
            }
            break;                     
    }
}


// Arithmethic operations from this point on
function add(x,y){
    return x + y
}

function subtract(x,y){
    return x - y
}

function multiplication(x,y){
    return x*y
}

function divide(x,y){
    if (y == 0){
        return NaN
    }
    return x/y
}
