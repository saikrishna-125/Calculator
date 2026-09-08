let operation = {
  num1: "",
  num2: "",
  operator: "",
};

let active = "num1";

const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");

for (let button of buttons) {
  button.addEventListener("click", () => {
    char = button.textContent;

    if (isFinite(char)) {
      operation[active] += char;
      display.textContent = operation[active];
    } else if ("+-x/".includes(char)) {
      if (operation["num2"]) {
        operation["num1"] = calculate(
          operation["num1"],
          operation["num2"],
          operation["operator"],
        );
        operation["num2"] = "";
        active = "num1";
        display.textContent = operation[active];
        active = "num2";
      } else {
        active = "num2";
      }
      operation["operator"] = char;
    } else if (char === "=") {
      operation["num1"] = calculate(
        operation["num1"],
        operation["num2"],
        operation["operator"],
      );
      operation["num2"] = "";
      active = "num1";
      display.textContent = operation[active];

      active = "num2";
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
  result = 0;
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

  return result;
}

function calculate(num1, num2, operator) {
  if (num2 === "") {
    num2 = operator === "+-" ? 0 : 1;
  }

  result = operate(Number(num1), Number(num2), operator);
  result = Math.round(result * 10 ** 8) / 10 ** 8;
  return result;
}
