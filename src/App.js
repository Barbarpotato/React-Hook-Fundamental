import { useState, useCallback } from "react";
import Button from "./components/Button";
import State from "./components/State";
import Title from "./components/Title";

function App() {

  const [count, setCount] = useState(10)
  const [salary, setSalary] = useState(5000)

  const handleCount = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const handleSalary = useCallback(() => {
    setSalary(salary + 5000)
  }, [salary])

  return (
    <div>
      <Title />
      <State state={count} type={'count'} />
      <Button handleClick={handleCount} type={'count'} />
      <State state={salary} type={'salary'} />
      <Button handleClick={handleSalary} type={'salary'} />
    </div>
  );
}

export default App;
