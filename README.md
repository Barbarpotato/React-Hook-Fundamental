# useRef Hook
### Accessing DOM element
useRef can be used to access a DOM element directly:
```
function App() {

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
}
```

### Store Mutable Value
Example Case:
```
function App() {

  const [timer, setTimer] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevValue => prevValue + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      <h1>timer - {timer}</h1>
      <button onClick={clearInterval(interval)}>Stop</button>
    </div>
  );
}
```
in this example, we creating the interval that increasing the timer state 1 each 1000 miliseconds when the componentWillMount. the interval will be clear if the componentWillUnmount. but in this case, we want to clear the interval on the button click, so we dont need to unmount the component to removed the interval. but the problem appear. it says: interval is not defined. To solve this issuse, useRef come to rescue:
```
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
```
useRef can hold the mutable value. Whenever the value on ref changes it wont cause the re-render. It also remember stored data even after other state variable causing re-render of this component