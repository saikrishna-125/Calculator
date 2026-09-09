const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

let operation = {
  num1: "0",
  num2: "",
  operator: "",
};

let active = "num1";

display.textContent = operation[active];

for (let button of buttons) {
  button.addEventListener("click", () => {
    let char = button.textContent;

    if (isFinite(char) || char === "." || char === "BACK") {
      inputNumber(char);
    } else if ("+-x/".includes(char)) {
      active = "num2";
      if (operation.num2) {
        calculate();
      }
      operation.operator = char;
    } else if (char === "=") {
      calculate();
      operation.operator = "=";
    } else if (char === "CLEAR") {
      reset();
      display.textContent = operation.num1;
    }
  });
}

function inputNumber(char) {
  if (operation.operator === "=") {
    reset();
  }
  current = operation[active];

  if (char === ".") {
    if (current === "") {
      current = "0.";
    }
    if (!current.includes(char)) {
      current += char;
    }
  } else if (char === "BACK") {
    current = current.slice(0, -1);
    if (current === "") {
      current = "0";
    }
  } else {
    if (current === "0") {
      if (char !== "0") {
        current = char;
      }
    } else {
      current += char;
    }
  }

  operation[active] = current;
  display.textContent = current;
}

function calculate() {
  if (operation.num2 !== "") {
    if (Number(operation.num2) === 0 && operation.operator === "/") {
      display.textContent = "That ain't right!";
      reset();
      return;
    }
    operation.num1 = String(
      operate(
        Number(operation.num1),
        Number(operation.num2),
        operation.operator,
      ),
    );
  }
  display.textContent = operation.num1;
  operation.num2 = "";
}

function reset() {
  operation.num1 = "0";
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
