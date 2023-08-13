import { useState } from "react";

import ExpressionButton from "./ExpressionButton";

function App() {
  const [expression, setExpression] = useState<string>("");

  function handleClick(expressionToken: string) {
    setExpression(expression + expressionToken);
    console.log(expression + expressionToken);
  }

  function evaluateExpression(expression: string): string {
    try {
      // Replace '^' with '**' for exponentiation
      const cleanedExpression = expression.replace(/\^/g, "**");

      const result = eval(cleanedExpression);

      return result.toString();
    } catch (error) {
      return "Error: Invalid expression";
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-96 w-4/5 max-w-xl grid-cols-5 grid-rows-6 items-stretch justify-items-stretch rounded-md border shadow-md">
        <div className="col-span-3 self-stretch justify-self-stretch">
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
        <button>CH</button>
        <button onClick={() => setExpression("")}>C</button>
        <button onClick={() => setExpression(expression.slice(0, -1))}>
          DEL
        </button>
        <button>MC</button>
        <button>M+</button>
        <button>M-</button>
        <ExpressionButton expressionToken="7" onClick={handleClick} />
        <ExpressionButton expressionToken="8" onClick={handleClick} />
        <ExpressionButton expressionToken="9" onClick={handleClick} />
        <ExpressionButton expressionToken="+" onClick={handleClick} />
        <button>MR</button>
        <ExpressionButton expressionToken="4" onClick={handleClick} />
        <ExpressionButton expressionToken="5" onClick={handleClick} />
        <ExpressionButton expressionToken="6" onClick={handleClick} />
        <ExpressionButton expressionToken="-" onClick={handleClick} />
        <button>%</button>
        <ExpressionButton expressionToken="1" onClick={handleClick} />
        <ExpressionButton expressionToken="2" onClick={handleClick} />
        <ExpressionButton expressionToken="3" onClick={handleClick} />
        <ExpressionButton expressionToken="*" onClick={handleClick} />
        <button>Sq</button>
        <ExpressionButton expressionToken="." onClick={handleClick} />
        <ExpressionButton expressionToken="0" onClick={handleClick} />
        <button onClick={() => setExpression(evaluateExpression(expression))}>
          =
        </button>
        <ExpressionButton expressionToken="/" onClick={handleClick} />
        <ExpressionButton expressionToken="^" onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
