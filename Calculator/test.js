/*const handleOperator = (event) => {
    const operator = event.target.textContent;

    if (/[0-9.]/.test(display[display.length-1])) {
        
          setDisplay(display + operator);
        } else {
          setDisplay((prev) =>
      prev
        .split("")
        .slice(0, prev.lenght - 1)
        .join("") + operator
    );
        }
      }


  */

let string="12+3+4+5+6+7*8";
console.log(string.split(/[^0-9.]/g));

/*
const handleOperator = (string) => {
    const operator = "+";

    if (/[0-9.]/.test(string[string.length-1])) {
        
          return(string + operator);
        } else {
          return (string.split("").slice(0, string.length - 1).join("") + operator)
        }
      }

console.log(handleOperator(string))
*/