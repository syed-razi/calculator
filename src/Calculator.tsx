import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Button from "./Button";

export default function Calculator() {
  interface Display {
    expression: string;
    result: string;
  }
  const [expression, setExpression] = useState<string>("");
  const [history, setHistory] = useState<Display[]>([]);
  const [memory, setMemory] = useState<string[]>([]);
  const [inputMode, setInputMode] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  let hasPrev = index > 0;
  let hasNext = index < history.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setInputMode(false);
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setInputMode(false);
      setIndex(index + 1);
    }
  }

  function handleClick(expressionToken: string) {
    setInputMode(true);
    setExpression(expression + expressionToken);
  }

  function handleDelete() {
    setInputMode(true);
    setExpression(expression.slice(0, -1));
    setIndex(history.length);
  }

  function handleClear() {
    setInputMode(true);
    setExpression("");
    setIndex(history.length);
  }

  function handleClearHistory() {
    setInputMode(true);
    setExpression("");
    setHistory([]);
    setIndex(0);
  }

  function handleClearMemory() {
    setInputMode(true);
    setExpression("");
    setMemory([]);
  }

  function handleRetrieveMemory() {
    const total = memory.reduce((acc, curr) => {
      return acc + parseFloat(curr);
    }, 0);
    setInputMode(true);
    setExpression(total.toString());
  }

  function handleAddToMemory() {
    setInputMode(true);
    const newResult = evaluateExpression(expression);
    setMemory([...memory, newResult]);
    setExpression("");
  }

  function handleSubtractFromMemory() {
    setInputMode(true);
    const newResult = evaluateExpression(`(${expression}) * -1`);
    setMemory([...memory, newResult]);
    setExpression("");
  }

  function handleEquals() {
    setInputMode(false);
    const newResult = evaluateExpression(expression);
    setHistory([...history, { expression, result: newResult }]);
    setIndex(history.length);
  }

  function handleSquareRoot() {
    setExpression("√(" + expression + ")");
    setInputMode(true);
  }

  function evaluateExpression(expression: string): string {
    try {
      // Replace '^' with '**' for exponentiation
      const replacedExponentExpression = expression.replace(/\^/g, "**");

      // Replace 'sq(expression)' with 'Math.sqrt(expression)'
      const replacedSqrtExpression = replacedExponentExpression.replace(
        /√\(([^)]+)\)/g,
        "Math.sqrt($1)",
      );

      // Replace different expressions with % with correctly evaluated expressions
      const replacedBracketsPercentageExpression =
        replacedSqrtExpression.replace(
          /(\()([^()]+)(\))\s*%/g,
          (_, openBrackets, expr, closeBrackets) => {
            let result = 0;

            if (openBrackets && closeBrackets) {
              expr = `${openBrackets}${expr}${closeBrackets}`;
              expr = evaluateExpression(expr);
            }
            result = parseFloat(expr) * 0.01;

            return result.toString();
          },
        );

      const replacedCompoundPercentageExpression =
        replacedBracketsPercentageExpression.replace(
          /([\d.]+)\s*([+-])\s*([\d.]+)%\s*([*^/])\s*(\(?)([^()]+)(\)?)/g,
          (
            _,
            num1,
            addOp,
            percent,
            multOp,
            openingBracket,
            expression,
            closingBracket,
          ) => {
            let evalFirst = `${openingBracket}${expression}${closingBracket}`;
            evalFirst = evaluateExpression(percent + "%" + multOp + evalFirst);
            let num2 = parseFloat(evalFirst);

            const result =
              addOp === "+" ? parseFloat(num1) + num2 : parseFloat(num1) - num2;
            return result.toString();
          },
        );

      const replaceComplexAdditiveOperatorsPercentageExpression =
        replacedCompoundPercentageExpression.replace(
          /(\()([^()]+)(\))\s*([+-])\s*([\d.]+)%/g,
          (
            _,
            openingBracket,
            expression,
            closingBracket,
            operator,
            percent,
          ) => {
            expression = `${openingBracket}${expression}${closingBracket}`;
            let num = parseFloat(evaluateExpression(expression));
            percent = parseFloat(percent);
            const result =
              operator === "+"
                ? num + num * (percent / 100)
                : num - num * (percent / 100);
            return result.toString();
          },
        );

      const replaceAdditiveOperatorsPercentageExpression =
        replaceComplexAdditiveOperatorsPercentageExpression.replace(
          /([\d.]+)\s*([+-])\s*([\d.]+)%/g,
          (_, num, operator, percent) => {
            num = parseFloat(num);
            percent = parseFloat(percent);

            const result =
              operator === "+"
                ? num + num * (percent / 100)
                : num - num * (percent / 100);
            return result.toString();
          },
        );

      const replacePercentageExpression =
        replaceAdditiveOperatorsPercentageExpression.replace(
          /([\d.]+)%/g,
          (_, num) => {
            return (parseFloat(num) / 100).toString();
          },
        );

      const result = eval(replacePercentageExpression);

      if (typeof result !== "number") {
        throw new Error("Result is not a valid number");
      }

      return result.toString();
    } catch (error) {
      return "Error: Invalid expression";
    }
  }

  const buttonData = [
    { label: "7", onClick: () => handleClick("7") },
    { label: "8", onClick: () => handleClick("8") },
    { label: "9", onClick: () => handleClick("9") },
    { label: "/", onClick: () => handleClick("/") },
    {
      label: "DEL",
      frontColour: "bg-red-500",
      backColour: "bg-red-600",
      textColour: "text-white",
      onClick: () => handleDelete(),
    },
    {
      label: "AC",
      frontColour: "bg-red-500",
      backColour: "bg-red-600",
      textColour: "text-white",
      onClick: () => handleClear(),
    },
    { label: "CH", onClick: () => handleClearHistory() },
    { label: "4", onClick: () => handleClick("4") },
    { label: "5", onClick: () => handleClick("5") },
    { label: "6", onClick: () => handleClick("6") },
    { label: "*", onClick: () => handleClick("*") },
    { label: "%", onClick: () => handleClick("%") },
    { label: "MC", onClick: () => handleClearMemory() },
    { label: "MR", onClick: () => handleRetrieveMemory() },
    { label: "1", onClick: () => handleClick("1") },
    { label: "2", onClick: () => handleClick("2") },
    { label: "3", onClick: () => handleClick("3") },
    { label: "-", onClick: () => handleClick("-") },
    { label: "^", onClick: () => handleClick("^") },
    { label: "M+", onClick: () => handleAddToMemory() },
    { label: "M-", onClick: () => handleSubtractFromMemory() },
    { label: ".", onClick: () => handleClick(".") },
    { label: "0", onClick: () => handleClick("0") },
    {
      label: "=",
      frontColour: "bg-cyan-500",
      backColour: "bg-cyan-600",
      textColour: "text-white",
      onClick: () => handleEquals(),
    },
    { label: "+", onClick: () => handleClick("+") },
    { label: "√", onClick: () => handleSquareRoot() },
    { label: "(", onClick: () => handleClick("(") },
    { label: ")", onClick: () => handleClick(")") },
  ];

  return (
    <div className="m-12 grid h-96 w-4/5 max-w-xl grid-cols-7 rounded-2xl border bg-black p-2 shadow-md">
      <div className="col-span-6 flex items-center justify-center">
        <div className="mx-2 flex h-24 w-full flex-col items-center justify-between rounded-xl border bg-white p-2 font-mono">
          <input
            className="h-8 w-full self-start text-3xl"
            value={inputMode ? expression : history[index].expression}
            onChange={(e) => {
              setInputMode(true);
              setExpression(e.target.value);
            }}
          />
          <p className="h-8 self-end text-3xl">
            {!inputMode && history[index].result}
          </p>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <button
          onClick={handlePrevClick}
          className="my-1 w-3/4 cursor-pointer rounded-t-lg border-none bg-cyan-600 p-0 outline-offset-4"
        >
          <div className="mx-auto w-full -translate-y-2 transform rounded-t-lg bg-cyan-500 active:-translate-y-1">
            <ChevronUpIcon className="mx-auto w-10 text-white" />
          </div>
        </button>
        <button
          onClick={handleNextClick}
          className="w-3/4 cursor-pointer rounded-b-lg border-none bg-cyan-600 p-0 outline-offset-4"
        >
          <div className="mx-auto w-full -translate-y-2 transform rounded-b-lg bg-cyan-500 active:-translate-y-1">
            <ChevronDownIcon className="mx-auto w-10 text-white" />
          </div>
        </button>
      </div>
      {buttonData.map((buttonProps, index) => (
        <Button key={index} {...buttonProps} />
      ))}
    </div>
  );
}
