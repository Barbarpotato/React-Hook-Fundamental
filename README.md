# useCallback Hook
### What is useCallback?
useCallback is a hook that will return a memoized version of the callback function that only changes if the one of the dependencies has changed 
### Why need useCallback?
it is useful when passing the callback function to optimized child components that rely on reference equality to prevent unnecessary renders.

### Case Example
For our case, we have a bunch of nested component in a single parent component. When we are trying to updating one component in parent component, all the components inside this parent component will be re-rendered. This is not going to be a problem while we implementing it with a simple logic. But what about the big project that contains a lof of component in parent component? it will cause the performance issues since we just updating one component in parent component, but the other nested component will be unnecessary re-rendered as well.<br/><br/>
To solve this problem, we can use <strong>memo</strong>. <strong>memo</strong> is a higher order component that will prevent a functional component from being re-rendered if its prop or state do not change:
```
import React from 'react'

function State({ state, type }) {
    console.log(`render state - ${type}`)
    return (
        <h5>{state}</h5>
    )
}

export default React.memo(State)
```

The salaryButton is still re-rendered, even we use memo, it is because the handleSalary function is created each time parent component re-renders. so the Memo sees that prop has changed and will not prevent the re-render, same like the handleCount function. it will created again each time the parent component re-render.<br/><br/>
To prevent this we can use <strong>useCallback</strong>. When we use this, the useCallback will return a new function if the dependencies has changed. If it is not changed, then it wont return a new function, which it wont be created again until the dependencies changed. The function that not created again will remain as a same prop/state for useMemo, so the useMemo can prevent the re-render for some specific component:
```
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
```