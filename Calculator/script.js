function App() {
  const [display, setDisplay] = React.useState(0);

  const handleNumber = (event) => {
    const number = event.target.textContent;
    if (display == 0) {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (event) => {
    const operator = event.target.textContent;
    if (/[0-9.]/.test(display[display.length - 1])) {
      setDisplay(display + operator);
    } else if(/[^0-9.]/.test(display[display.length - 2])){
        setDisplay(
            (prev) =>
              prev.split("").slice(0, prev.length -2).join("") + operator);
      
    }else {
        setDisplay(
            (prev) =>
              prev.split("").slice(0, prev.length -1).join("") + operator);
    }
  };

  const handleEqual = () => {
    setDisplay((eval(display)).toString());
  };

  const handleDecimal = () => {
    const array = display.split(/[^0-9.]/g);
    const lastElement = array[array.length - 1];
    if (!lastElement.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleAllClear = () => {
    setDisplay(0);
  };

  const handleSubtract=()=>{

  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          {display}
        </div>
        <div id="clear" className="row" onClick={handleAllClear}>
          AC
        </div>
        <div id="seven" className="number"onClick={handleNumber}>
          7
        </div>
        <div id="eight" className="number"onClick={handleNumber}>
          8
        </div>
        <div id="nine" className="number"onClick={handleNumber}>
          9
        </div>
        <div id="multiply" className="operator"onClick={handleOperator}>
          *
        </div>
        <div id="four" className="number"onClick={handleNumber}>
          4
        </div>
        <div id="five" className="number"onClick={handleNumber}>
          5
        </div>
        <div id="six" className="number"onClick={handleNumber}>
          6
        </div>
        <div id="divide" className="operator"onClick={handleOperator}>
          /
        </div>
        <div id="one" className="number"onClick={handleNumber}>
          1
        </div>
        <div id="two" className="number"onClick={handleNumber}>
          2
        </div>
        <div id="three" className="number"onClick={handleNumber}>
          3
        </div>
        <div id="add" className="operator"onClick={handleOperator}>
          +
        </div>
        <div id="zero" className="number"onClick={handleNumber}>
          0
        </div>
        <div id="decimal" className="number"onClick={handleDecimal}>
          .
        </div>
        <div id="equals" onClick={handleEqual}>
          =
        </div>
        <div id="subtract" className="operator"onClick={handleNumber}>
          -
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);
