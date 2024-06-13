import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState<string>("0");
  const [expression, setExpression] = useState<string>("0");

  const buttonPressed = (btn: string) => {
    switch (btn) {
      case "AC":
        setInput("0");
        setExpression("0");
        break;
      case "+/-":
        setInput((prev) => {
          if (prev[0] === "-") {
            return prev.slice(1);
          } else {
            return "-" + prev;
          }
        });
        setExpression((prev) => {
          if (prev[0] === "-") {
            return prev.slice(1);
          } else {
            return "-" + prev;
          }
        });
        break;
      case "%":
        setInput((prev) => {
          return (parseFloat(prev) / 100).toString();
        });
        setExpression((prev) => {
          return (parseFloat(prev) / 100).toString();
        });
        break;
      case "/":
      case "*":
      case "+":
      case "-":
        setInput(btn);
        setExpression((prev) => {
          if (prev.endsWith("*") || prev.endsWith("+") || prev.endsWith("/")) {
            if (btn === "-") {
              return prev + btn;
            } else {
              return prev.slice(0,-1) + btn;
            }
          } else {
            return prev + btn;
          }
        });
        break;
      case "=":
        const operators = expression.match(/([+\-*/]){2,}/g)
        let updatedExpression = expression;
        if (operators && operators[0].length > 2) {
          const lastOperator = operators[0].slice(-1);
          const lastOperatorIndex = expression.lastIndexOf(lastOperator);
          const firstPart = expression.substring(0, lastOperatorIndex).replace(/[+\-*/]/g, "");
          const lastPart = expression.substring(lastOperatorIndex);
          updatedExpression = firstPart + lastPart;
          setExpression(updatedExpression);
        }
        setInput(() => eval(updatedExpression));
        setExpression((prev) => "(" + prev + ")");
        break;
      case ".":
        setInput((prev) => {
          if (String(prev).includes(".")) {
            return prev;
          } else {
            return prev + ".";
          }
        });
        setExpression((prev) => {
          if (prev.endsWith(")")) {
            setInput("0.")
            return "0.";
          } else if (prev.endsWith(".")) {
            return prev;
          } else {
            return prev + ".";
          }
        });
        break;
      default:
        setInput((prev) => {
          if (["0","*","+","-","/"].includes(prev)) {
            return btn;
          } else {
            return prev + btn;
          }
        });
        setExpression((prev) => {
          if (prev === "0") {
            return btn;
          } else {
            return prev + btn;
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div id="calculator">
          <div id="display">{input}</div>
          <div className="buttons">
            <button className="special" id="clear" onClick={() => buttonPressed("AC")}>
              AC
            </button>
            <button className="special" id="transpose" onClick={() => buttonPressed("+/-")}>
              +/-
            </button>
            <button className="special" id="percentage" onClick={() => buttonPressed("%")}>
              %
            </button>
            <button className="operator" id="divide" onClick={() => buttonPressed("/")}>
              /
            </button>
            <button className="number" id="seven" onClick={() => buttonPressed("7")}>
              7
            </button>
            <button className="number" id="eight" onClick={() => buttonPressed("8")}>
              8
            </button>
            <button className="number" id="nine" onClick={() => buttonPressed("9")}>
              9
            </button>
            <button className="operator" id="multiply" onClick={() => buttonPressed("*")}>
              *
            </button>
            <button className="number" id="four" onClick={() => buttonPressed("4")}>
              4
            </button>
            <button className="number" id="five" onClick={() => buttonPressed("5")}>
              5
            </button>
            <button className="number" id="six" onClick={() => buttonPressed("6")}>
              6
            </button>
            <button className="operator" id="subtract" onClick={() => buttonPressed("-")}>
              -
            </button>
            <button className="number" id="one" onClick={() => buttonPressed("1")}>
              1
            </button>
            <button className="number" id="two" onClick={() => buttonPressed("2")}>
              2
            </button>
            <button className="number" id="three" onClick={() => buttonPressed("3")}>
              3
            </button>
            <button className="operator" id="add" onClick={() => buttonPressed("+")}>
              +
            </button>
            <button className="number" id="zero" onClick={() => buttonPressed("0")}>
              0
            </button>
            <button className="number" id="decimal" onClick={() => buttonPressed(".")}>
              .
            </button>
            <button className="operator" id="equals" onClick={() => buttonPressed("=")}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
