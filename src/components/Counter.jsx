import { useReducer, useContext } from 'react'
import { countContext } from '../App';

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

export default Counter