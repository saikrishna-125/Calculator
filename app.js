const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

const body = document.querySelector("body");

// new operation object
let operation = {
  num1: "",
  num2: "",
  operator: "",
};

// active input
let active = "num1";

// initial screen
display.textContent = "_";

// keyboard access  - converts to relevant button press characters
body.addEventListener("keydown", (e) => {
  let key = e.key;

  if (key === "Backspace") {
    key = "BACK";
  }

  if (key === "*") {
    key = "x";
  }

  if (key === "Enter") {
    key = "=";
  }

  actions(key);
});

// Add event listeners for buttons
for (let button of buttons) {
  button.addEventListener("click", () => {
    let char = button.textContent;

    actions(char);
  });
}

function actions(char) {
  // input handling conditions
  if (
    "0123456789".includes(char) ||
    char === "." ||
    char === "BACK" ||
    char === "+ / -"
  ) {
    inputNumber(char);
  }
  // operator handling
  else if ("+-x/".includes(char)) {
    // operator should not be the first input (before num1)
    if (operation.num1) {
      // makes num2 as active input after reading an operator
      active = "num2";
      // if both num1 and num2 are entered and a new operator is pressed - then first calculate result
      if (operation.num2) {
        calculate();
      }
      operation.operator = char;
    }
  } else if (char === "=") {
    calculate();
    operation.operator = "=";
  } else if (char === "CLEAR") {
    reset();
    display.textContent = "_";
  }
}

function inputNumber(char) {
  // if a number is entered after pressing "=", then a new calculator should start
  if (operation.operator === "=") {
    reset();
  }

  let current = operation[active];

  // add period only if not already present
  if (char === ".") {
    // if . is first character then add 0 before it
    if (current === "") {
      current = "0.";
    }
    if (!current.includes(char)) {
      current += char;
    }
  }
  // backspace - remove last entered value, but if result is empty then change to 0
  else if (char === "BACK") {
    current = current.slice(0, -1);
    if (current === "") {
      current = "0";
    }
  }
  // toggle input symbol (+ / -)
  else if (char === "+ / -") {
    if (!current.startsWith("-")) {
      current = "-" + current;

      // if - is the only character then change to -0
      if (current === "-") {
        current = "-0";
      }
    } else {
      // remove -
      current = current.slice(1);
    }
  }
  // new number character
  else {
    // remove zero on first character
    if (current === "0") {
      // don't allow user to enter multiple zeroes
      if (char !== "0") {
        current = char;
      }
    }
    // remove zero on first character while preserving negative '-' symbol
    else if (current === "-0") {
      current = "-" + char;
    } else {
      // add char to current input number
      current += char;
    }
  }

  // update object and display
  operation[active] = current;
  display.textContent = current;
}

function calculate() {
  // if num1 is empty or only -, then num1 should be 0
  if (operation.num1 === "-" || operation.num1 === "") {
    operation.num1 = "0";
  }
  if (operation.num2 === "-") {
    operation.num2 = "0";
  }
  // should only perform operation if num2 is provided, else result is  num1
  if (operation.num2 !== "") {
    // divide by zero handler
    if (Number(operation.num2) === 0 && operation.operator === "/") {
      display.textContent = "That ain't right!";
      reset();
      return;
    }

    // calculate result and store it as num1
    operation.num1 = String(
      operate(
        Number(operation.num1),
        Number(operation.num2),
        operation.operator,
      ),
    );
  }

  // update display and reset num2
  display.textContent = operation.num1;
  operation.num2 = "";
}

function reset() {
  operation.num1 = "";
  operation.num2 = "";
  operation.operator = "";
  active = "num1";
}

function operate(num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }

  result = Math.round(result * 10 ** 4) / 10 ** 4;
  return result;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}
