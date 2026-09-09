let operation = {
  num1: "",
  num2: "",
  operator: "",
};

let snarky_msg = "That ain't right!";
let active = "num1";

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

display.textContent = "0";

for (let button of buttons) {
  button.addEventListener("click", () => {
    let char = button.textContent;

    if (isFinite(char)) {
      operation[active] += char;
      display.textContent = operation[active];
    } else if ("+-x/".includes(char)) {
      if (operation.num2) {
        if (Number(operation.num2) === 0 && operation.operator === "/") {
          operation.num1 = "";
          operation.num2 = "";
          operation.operator = "";
          active = "num1";
          display.textContent = snarky_msg;
        } else {
          operation.num1 = calculate(operation);
          display.textContent = operation.num1;
          operation.num2 = "";
          active = "num2";
        }
      }
      active = "num2";
      operation.operator = char;
    } else if (char === "=") {
      if (Number(operation.num2) === 0 && operation.operator === "/") {
        operation.num1 = "";
        operation.num2 = "";
        operation.operator = "";
        active = "num1";
        display.textContent = snarky_msg;
      } else {
        operation.num1 = calculate(operation);
        active = "num1";
        display.textContent = operation[active];
        operation.num2 = "";
        operation.operator = "";
        active = "num2";
      }
    } else if (char === "Clear") {
      operation.num1 = "";
      operation.num2 = "";
      operation.operator = "";
      active = "num1";
      display.textContent = "0";
    }
  });
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

function calculate(operation) {
  if (operation.num2 === "" || operation.operator === "") {
    return operation.num1;
  }

  let result = operate(
    Number(operation.num1),
    Number(operation.num2),
    operation.operator,
  );
  result = Math.round(result * 10 ** 8) / 10 ** 8;
  return result;
}
