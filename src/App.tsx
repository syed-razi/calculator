import { useState } from "react";

import NumberButton from "./NumberButton";

function App() {
  const [expression, setExpression] = useState<string>("");

  function handleClick(number: string) {
    setExpression(expression + number);
    console.log(expression + number);
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
        <button>C</button>
        <button>DEL</button>
        <button>MC</button>
        <button>M+</button>
        <button>M-</button>
        <NumberButton number="7" onClick={handleClick} />
        <NumberButton number="8" onClick={handleClick} />
        <NumberButton number="9" onClick={handleClick} />
        <button>+</button>
        <button>MR</button>
        <NumberButton number="4" onClick={handleClick} />
        <NumberButton number="5" onClick={handleClick} />
        <NumberButton number="6" onClick={handleClick} />
        <button>-</button>
        <button>%</button>
        <NumberButton number="1" onClick={handleClick} />
        <NumberButton number="2" onClick={handleClick} />
        <NumberButton number="3" onClick={handleClick} />
        <button>*</button>
        <button>Sq</button>
        <button>.</button>
        <NumberButton number="0" onClick={handleClick} />
        <button>=</button>
        <button>/</button>
        <button>^</button>
      </div>
    </div>
  );
}

export default App;
