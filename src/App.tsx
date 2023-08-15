import { useEffect, useState } from "react";
import { auth } from "./firebase";

import ExpressionButton from "./ExpressionButton";
import SignUp from "./SignUp";

function App() {
  const [expression, setExpression] = useState<string>("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log("User is signed in");
        setEmail(user.email);
        // ...
      } else {
        // User is signed out
        console.log("User is signed out");
        setEmail("");
      }
    });
  }, []);

  function handleClick(expressionToken: string) {
    setExpression(expression + expressionToken);
    console.log(expression + expressionToken);
  }

  function evaluateExpression(expression: string): string {
    try {
      // Replace '^' with '**' for exponentiation
      const replacedExponentExpression = expression.replace(/\^/g, "**");

      // Replace 'sq(expression)' with 'Math.sqrt(expression)'
      const replacedSqrtExpression = replacedExponentExpression.replace(
        /sq\(([^)]+)\)/g,
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
    <div className="flex h-screen w-screen flex-col items-center justify-start">
      <div className="flex h-16 w-screen items-center justify-end border-b shadow-md">
        {email ? (
          <>
            <p>{`Welcome back ${email}!`}</p>
            <button
              className="mx-4 rounded-2xl bg-blue-500 px-8 py-2 text-sm text-white shadow-md shadow-blue-500/50 outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
              type="button"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <SignUp />
        )}
      </div>
      <div className="mt-32 grid h-96 w-4/5 max-w-xl grid-cols-7 grid-rows-5 rounded-md border shadow-md lg:mt-48">
        <div className="col-span-6 self-stretch justify-self-stretch">
          <input
            className="h-full w-full"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </div>
        <div className="flex h-full w-full flex-col">
          <button className="h-1/2">Up</button>
          <button className="h-1/2">Down</button>
        </div>
        <ExpressionButton expressionToken="7" onClick={handleClick} />
        <ExpressionButton expressionToken="8" onClick={handleClick} />
        <ExpressionButton expressionToken="9" onClick={handleClick} />
        <ExpressionButton expressionToken="/" onClick={handleClick} />
        <button onClick={() => setExpression(expression.slice(0, -1))}>
          DEL
        </button>
        <button onClick={() => setExpression("")}>C</button>
        <button>CH</button>
        <ExpressionButton expressionToken="4" onClick={handleClick} />
        <ExpressionButton expressionToken="5" onClick={handleClick} />
        <ExpressionButton expressionToken="6" onClick={handleClick} />
        <ExpressionButton expressionToken="*" onClick={handleClick} />
        <ExpressionButton expressionToken="%" onClick={handleClick} />
        <button>MC</button>
        <button>MR</button>
        <ExpressionButton expressionToken="1" onClick={handleClick} />
        <ExpressionButton expressionToken="2" onClick={handleClick} />
        <ExpressionButton expressionToken="3" onClick={handleClick} />
        <ExpressionButton expressionToken="-" onClick={handleClick} />
        <ExpressionButton expressionToken="^" onClick={handleClick} />
        <button>M+</button>
        <button>M-</button>
        <ExpressionButton expressionToken="." onClick={handleClick} />
        <ExpressionButton expressionToken="0" onClick={handleClick} />
        <button onClick={() => setExpression(evaluateExpression(expression))}>
          =
        </button>
        <ExpressionButton expressionToken="+" onClick={handleClick} />
        <button>Sq</button>
        <ExpressionButton expressionToken="&#40;" onClick={handleClick} />
        <ExpressionButton expressionToken="&#41;" onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
