# useMemo
The React useMemo Hook returns a memoized value. Think of memoization as caching a value so that it does not need to be recalculated. The useMemo Hook only runs when one of its dependencies update. This can improve performance.

### Example Case
```
function App() {

  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)

  const handleCounterOne = () => {
    setCounterOne((prevState) => prevState + 1)
  }

  const handleCounterTwo = () => {
    setCounterTwo((prevState) => prevState + 1)
  }

  const ExpensiveCalculation = () => {
    let data = 0
    for (let i = 0; i < 2000000000000000; i++) {
      data = 1
    }
    return data
  }

  return (
    <div>
      <div>
        <p>{ExpensiveCalculation()} for Counter one</p>
        <button onClick={handleCounterOne}> Counter One - {counterOne}</button>
      </div>
      <div>
        <button onClick={handleCounterTwo}>counterTwo - {counterTwo}</button>
      </div>
    </div>
  );
}
```
In this example, we have an expensive function that runs on every render. When clicking a button, you will notice the delay execution. To fix this performance issue, we can use the useMemo Hook to memoize the expensiveCalculation function. This will cause the function to only run when needed. We can wrap the expensive function call with useMemo:
```
  const ExpensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    let num = 1
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  }, [counterOne])
```
with this implementation, because we added counterOne as it dependency, whenever we update the counterTwo state it will use the memoized value and not doing the recalculation unless the counterOne state updated.