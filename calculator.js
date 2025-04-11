// state of clearness
// inputvariable y indicates that both x and y are ready, all other numbers inputted will be for y

// Global variables !
let x = null;
let y = null;
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
    [x,y,operation,inputVariableY,result, negativeMode, decimalMode] = [null,null,"",false,null,false, false]
    displayNumber(0);
    unhighlightPreviousOperation();
}

// These two functions deal with UX, highlighting selected operation and availability of "=" button
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

// Takes in x, y, and operation
function operate(){

    x = Number(x);
    y = Number(y);

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


// Validates user input into 3 categories, operations, actions, and numbers.
function getUserInput(event){
    if (event.target.tagName === "DIV"){
        return 
    }
    userInput = event.target;
    console.log(`${userInput.id} pressed`)


    if (operations.has(userInput.id)){
        processOperationEntered(userInput.id)
    }

    else if(actions.has(userInput.id)){
        processActionEntered(userInput.id);
    }

    else if(numbers.has(Number(userInput.textContent))){
        processNumberEntered(Number(userInput.textContent))
    }
    console.log(`x: ${x} y:${y}`)
}


// The following are the helper functions that process the user's input
function processOperationEntered(userInput){
    // second condition ensures division by 0 will be computed into NaN instead of skipping the operation
    if (inputVariableY === true && y !== null){
        operate()
        x = result 
        y = null
    }
    else {
        inputVariableY = true;
    }

    operation = userInput;
    highlightSelectedOperation(operation);
    negativeMode = false;
}


function processNumberEntered (number){
    // If a number is entered immediately after computation
    if (result != null && operation == ""){
        clearAll();
    }
    else if(negativeMode === true){
        number *= -1
    }

    // Checks if the SECOND variable (y) is a decimal to determine how the number will be inputted
    if (inputVariableY == true){
        if (decimalMode === true){
            y += number;
        }
        else {
            y = (y * 10) + number;
        }
        displayNumber(y);
        document.querySelector("#equal").classList.remove("disallow-equal") // Signals that "=" button can be used
    }

    // Checks if the FIRST variable (x) is a decimal to determine how the number will be inputted
    else{
        if (decimalMode == true){
            x += number;
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
            decimalMode = false;
            x = result ? result: x;
            y = null;
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
            if (inputVariableY === true && y !== null){
                y /= 100;
                decimalMode = y % 100 === 1 ? false: true;
                y = decimalMode === true ? String(y): y; 
                displayNumber(y)
            }          
            else{
                x /= 100;
                decimalMode = x % 1 === 0 ? false: true;
                displayNumber(x);
            }
            break;    
        case "decimal":
            if ((inputVariableY === true && String(y).includes(".")) || (inputVariableY === false && String(x).includes(".")) ){
                break;
            }

            decimalMode = true;
            if (inputVariableY){
                if (y === null){
                    y = 0;
                }
                y = String(y) + ".";
                displayNumber(y);
            }
            else{
                if (x === null){
                    x = 0;
                }
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
