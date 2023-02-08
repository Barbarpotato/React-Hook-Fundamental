import { useRef, useEffect, useState } from "react";

function App() {

  const [timer, setTimer] = useState(0)
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prevValue => prevValue + 1)
    }, 1000)
    return () => {
      clearInterval(intervalRef)
    }
  }, [])

  return (
    <div>
      <h1>timer - {timer}</h1>
      <button onClick={clearInterval(intervalRef)}>Stop</button>
    </div>
  );
}

export default App;
