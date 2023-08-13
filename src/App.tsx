function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid h-96 w-4/5 max-w-xl grid-cols-5 grid-rows-6 items-stretch justify-items-stretch rounded-md border shadow-md">
        <div className="col-span-3 self-stretch justify-self-stretch">
          <input className="h-full w-full" />
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
        <button>9</button>
        <button>8</button>
        <button>9</button>
        <button>+</button>
        <button>MR</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>-</button>
        <button>%</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>Sq</button>
        <button>.</button>
        <button>0</button>
        <button>=</button>
        <button>/</button>
        <button>^</button>
      </div>
    </div>
  );
}

export default App;
