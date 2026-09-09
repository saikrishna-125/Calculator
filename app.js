const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

const body = document.querySelector("body");

let operation = {
  num1: "",
  num2: "",
  operator: "",
};

let active = "num1";

display.textContent = "_";

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

for (let button of buttons) {
  button.addEventListener("click", () => {
    let char = button.textContent;

    actions(char);
  });
}

function actions(char) {
  if (isFinite(char) || char === "." || char === "BACK" || char === "+ / -") {
    inputNumber(char);
  } else if ("+-x/".includes(char)) {
    if (operation.num1) {
      active = "num2";
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
  } else if (char === "+ / -") {
    if (!current.startsWith("-")) {
      current = "-" + current;
      if (current === "-") {
        current = "-0";
      }
    } else {
      current = current.slice(1);
    }
  } else {
    if (current === "0") {
      if (char !== "0") {
        current = char;
      }
    } else if (current === "-0") {
      current = "-" + char;
    } else {
      current += char;
    }
  }

  operation[active] = current;
  display.textContent = current;
}

function calculate() {
  if (operation.num1 === "-" || operation.num1 === "") {
    operation.num1 = "0";
  }
  if (operation.num2 === "-") {
    operation.num2 = "0";
  }
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
