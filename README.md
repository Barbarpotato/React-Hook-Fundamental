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

### Fetching Data with useReducer
The advantage of using useReducer for fetching API data compared to useState is that useReducer provides a more centralized and structured way to manage complex state changes, making it easier to understand the flow of data in your application. useReducer also makes it easier to update state based on the previous state, which is often necessary when dealing with asynchronous data. Furthermore, useReducer can handle multiple state updates in a single render cycle, making it a more efficient way to manage state updates compared to useState.<br/><br/>
First make the reducer function and the initial state:
```
const initialData = {
    loading: true,
    data: {},
    error: ''
}

const reducer = (_state, action) => {
    switch (action.type) {
        case 'success':
            return { loading: false, data: action.payload, error: '' }
        case 'failed':
            return { loading: false, data: {}, error: action.payload }
        default:
            return initialData
    }
}
```
then using reducer function and initial state in to the useReducer function:
```
export default function FetchData() {

    const [state, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://jsonplaceholder.typicoe.com/todos/1')
                .then((res) => {
                    dispatch({ type: 'success', payload: res.data })
                })
                .catch((err) => {
                    dispatch({ type: 'failed', payload: err.message })
                })
        }, 1000)
    }, [])

    if (state.loading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div>
            <h1>Calling from API</h1>
            <p>{state.error === '' ? state.data.id : state.error}</p>
            <p>{state.error === '' ? state.data.title : state.error}</p>
        </div>
    )
}
```