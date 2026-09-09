const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let operation = {
  num1: "",
  num2: "",
  operator: "",
};

let snarky_msg = "That ain't right!";
let active = "num1";

let hasDecimalPoint = false;
let negative = false;

display.textContent = "0";

for (let button of buttons) {
  button.addEventListener("click", () => {
    let char = button.textContent;

    if (
      isFinite(char) ||
      (char === "." && !hasDecimalPoint) ||
      char === "Back"
    ) {
      if (operation.operator === "=") {
        reset();
      }

      if (char === "Back") {
        backspace();
      } else {
        operation[active] += char;
      }
      display.textContent =
        operation[active].length === 0 ? "0" : operation[active];

      if (char === ".") {
        hasDecimalPoint = true;
      }
    } else if ("+-x/".includes(char)) {
      if (operation.num2) {
        calculate(operation);
      }
      active = "num2";
      operation.operator = char;
      hasDecimalPoint = false;
    } else if (char === "=") {
      calculate(operation);
      operation.operator = char;
    } else if (char === "Clear") {
      reset();
      display.textContent = "0";
    }
  });
}

function calculate(operation) {
  if (Number(operation.num2) === 0 && operation.operator === "/") {
    divideByZero();
  } else {
    if (operation.num2 === "" || operation.operator === "") {
      return operation.num1;
    }

    let result = operate(
      Number(operation.num1),
      Number(operation.num2),
      operation.operator,
    );
    result = Math.round(result * 10 ** 8) / 10 ** 8;

    operation.num1 = result;
    display.textContent = operation.num1;
    operation.num2 = "";
    operation.operator = "";
    active = "num2";
    hasDecimalPoint = false;
  }
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
  console.log(result);
  return result;
}

function divideByZero() {
  reset();
  display.textContent = snarky_msg;
}

function backspace() {
  if (operation[active] !== "") {
    operation[active] = operation[active].slice(0, -1);
  }
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

function reset() {
  operation.num1 = "";
  operation.num2 = "";
  operation.operator = "";
  active = "num1";
  hasDecimalPoint = false;
}
