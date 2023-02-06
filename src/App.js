import { useMemo, useState } from "react";
function App() {

  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const handleCounterOne = () => {
    setCounterOne((prevState) => prevState + 1)
  }

  const handleCounterTwo = () => {
    setCounterTwo((prevState) => prevState + 1)
  }

  const ExpensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    let num = 1
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  }, [counterOne])

  return (
    <div>
      <div>
        <button onClick={handleCounterOne}> Counter One - {counterOne} - {ExpensiveCalculation}</button>
      </div>
      <div>
        <button onClick={handleCounterTwo}>counterTwo - {counterTwo}</button>
      </div>
    </div>
  );
}

export default App;
