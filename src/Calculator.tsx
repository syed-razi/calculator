import { useState } from "react";
import ExpressionButton from "./ExpressionButton";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

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
    setExpression(expressionToken);
    setInputMode(true);
    setExpression(expression + expressionToken);
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

  return (
    <div className="m-12 grid h-96 w-4/5 max-w-xl grid-cols-7 grid-rows-5 rounded-md border shadow-md">
      <div className="col-span-6 self-stretch justify-self-stretch">
        <input
          className="h-full w-full"
          value={inputMode ? expression : history[index].expression}
          onChange={(e) => {
            setInputMode(true);
            setExpression(e.target.value);
          }}
        />
        <p>{!inputMode && history[index].result}</p>
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
      <ExpressionButton expressionToken="7" onClick={handleClick} />
      <ExpressionButton expressionToken="8" onClick={handleClick} />
      <ExpressionButton expressionToken="9" onClick={handleClick} />
      <ExpressionButton expressionToken="/" onClick={handleClick} />
      <button
        onClick={() => {
          setInputMode(true);
          setExpression(expression.slice(0, -1));
          setIndex(history.length);
        }}
      >
        DEL
      </button>
      <button
        onClick={() => {
          setInputMode(true);
          setExpression("");
          setIndex(history.length);
        }}
      >
        C
      </button>
      <button
        onClick={() => {
          setInputMode(true);
          setExpression("");
          setHistory([]);
          setIndex(0);
        }}
      >
        CH
      </button>
      <ExpressionButton expressionToken="4" onClick={handleClick} />
      <ExpressionButton expressionToken="5" onClick={handleClick} />
      <ExpressionButton expressionToken="6" onClick={handleClick} />
      <ExpressionButton expressionToken="*" onClick={handleClick} />
      <ExpressionButton expressionToken="%" onClick={handleClick} />
      <button
        onClick={() => {
          setInputMode(true);
          setExpression("");
          setMemory([]);
        }}
      >
        MC
      </button>
      <button
        onClick={() => {
          const total = memory.reduce((acc, curr) => {
            return acc + parseFloat(curr);
          }, 0);
          setInputMode(true);
          setExpression(total.toString());
        }}
      >
        MR
      </button>
      <ExpressionButton expressionToken="1" onClick={handleClick} />
      <ExpressionButton expressionToken="2" onClick={handleClick} />
      <ExpressionButton expressionToken="3" onClick={handleClick} />
      <ExpressionButton expressionToken="-" onClick={handleClick} />
      <ExpressionButton expressionToken="^" onClick={handleClick} />
      <button
        onClick={() => {
          setInputMode(true);
          const newResult = evaluateExpression(expression);
          setMemory([...memory, newResult]);
          setExpression("");
        }}
      >
        M+
      </button>
      <button
        onClick={() => {
          setInputMode(true);
          const newResult = evaluateExpression(`(${expression}) * -1`);
          setMemory([...memory, newResult]);
          setExpression("");
        }}
      >
        M-
      </button>
      <ExpressionButton expressionToken="." onClick={handleClick} />
      <ExpressionButton expressionToken="0" onClick={handleClick} />
      <button
        onClick={() => {
          setInputMode(false);
          const newResult = evaluateExpression(expression);
          setHistory([...history, { expression, result: newResult }]);
          setIndex(history.length);
        }}
      >
        =
      </button>
      <ExpressionButton expressionToken="+" onClick={handleClick} />
      <button
        onClick={() => {
          setExpression("√(" + expression + ")");
          setInputMode(true);
        }}
      >
        √
      </button>
      <ExpressionButton expressionToken="&#40;" onClick={handleClick} />
      <ExpressionButton expressionToken="&#41;" onClick={handleClick} />
    </div>
  );
}
