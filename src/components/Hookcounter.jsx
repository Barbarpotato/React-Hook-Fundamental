import { useState } from 'react'

export default function Hookcounter() {

    const [count, setCount] = useState(2)

    const addFive = () => {
        for (let i = 0; i < 5; i++) {
            setCount((prevCount) => prevCount + 1)
        }
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount((prevCount) => prevCount + 1)}>Increment</button>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>Decrement</button>
            <button onClick={addFive}>Increment 5 count</button>
        </div>
    )
}
