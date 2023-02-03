# useReducer Hook
useReducer is a hook  that is used for state management.
```

const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case "Increment":
            return { count: state.count + 1 }
        case "Decrement":
            return { count: state.count - 1 }
        default:
            return state
    }
}

function Counter() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
        </div>
    );
}
```
In this example, useReducer is called with two arguments: the reducer function and the initialState. The hook returns an array with two elements: the current state, and a dispatch function.

The dispatch function is used to update the state by sending actions to the reducer function. In this example, the reducer function handles two actions: "increment" and "decrement".

The component can access the current state using state. In this example, the component displays the count value from the state, and provides two buttons to increment or decrement the count by dispatching the corresponding actions.

### Complex state action
We can create more property in dispacth first argument which is an object. it is not only type we can passed in the property, but we can actually added another property as we like:
```
const initialState = { count: 0 }

const reducer = (state, action) => {
    switch (action.type) {
        case "Increment":
            return { count: state.count + action.value }
        case "Decrement":
            return { count: state.count - action.value }
        default:
            return state
    }
}

function Counter() {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "Decrement", value: 1 })}>-</button>
            <button onClick={() => dispatch({ type: "Increment", value: 1 })}>+</button>
            <button onClick={() => dispatch({ type: "Decrement", value: 5 })}>-5</button>
            <button onClick={() => dispatch({ type: "Increment", value: 5 })}>+5</button>
        </div>
    );
}
```
### useReducer with useContext
we can use useReducer state to the nested component with a help of useContext, so the unnecessary component that not using the state is not going to pass in. here is the example in the App.js
```
const initialState = {
  count: 1
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    default:
      return initialState
  }
}

export const countContext = createContext()

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const contextValue = {
    stateCount: state.count,
    dispatchCount: dispatch
  }

  return (
    <div>
      <countContext.Provider value={contextValue}>
        <Counter />
      </countContext.Provider>
    </div>
  );
}

```
and the other component that needs the reducer state:
```
function Counter() {

    const { stateCount, dispatchCount } = useContext(countContext)

    return (
        <div>
            <p>Count: {stateCount}</p>
            <button onClick={() => dispatchCount({ type: 'increment' })}>+</button>
            <button onClick={() => dispatchCount({ type: 'decrement' })}>-</button>
        </div>
    );
}
```