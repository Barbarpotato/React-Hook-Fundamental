import Counter from "./components/Counter";
import { useReducer, createContext } from "react";
import FetchData from "./components/FetchData";

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

      <FetchData />
    </div>
  );
}

export default App;
