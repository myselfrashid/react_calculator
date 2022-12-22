import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";
import { useState } from "react";


const btnVal = [
  ["C", "+-", "%", "÷"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    result: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      sign: value,
      result: !calc.result && calc.num ? calc.num : calc.result,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
  
      setCalc({
        ...calc,
        result:
          calc.num === "0" && calc.sign === "÷"
            ? "Can't divide with 0"
            : math(Number(calc.result), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      result: calc.result ? calc.result * -1 : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let result = calc.result ? parseFloat(calc.result) : 0;
  
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      result: (result /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resultClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      result: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.result} />
      <ButtonBox>
        {btnVal.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={btn === "C"
                ? resultClickHandler
                : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                      ? equalsClickHandler
                      : btn === "÷" || btn === "X" || btn === "-" || btn === "+"
                        ? signClickHandler
                        : btn === "."
                          ? commaClickHandler
                          : numClickHandler}
            ></Button>
          )
        })}
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
