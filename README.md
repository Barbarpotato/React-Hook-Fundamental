# useState Hook
### Rules of Hook
- Only call Hooks at the top level. Dont call Hooks inside loops, conditions, or nested functions
- Only call hooks from React functions. Call them from within React functional components and not just regular javascript function.

### Previous State
We will make the use case of Previous state with useState hook:
```
import { useState } from 'react'

function Hookcounter() {

    const [count, setCount] = useState(0)

    const addFive = () => {
        for (let i = 0; i < 5; i++) {
            setCount(count + 1)
        }
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <button onClick={addFive}>Increment 5 count</button>
        </div>
    )
}

export default Hookcounter
```
In this functional Component, we have 3 buttons which is add 1 count state, reducing 1 count state and add 5 count state. If you notice we are not add +5 in the addFive functions, instead we using for loop to add 1 in count state, the reason we are doing this because we want to check what is going on. <strong>What happens is, the count variable only displays 1 when pressing the increment 5 count button</strong>. That is because setCount method is reading a stale valueof the count state variable.<br/>
To overcome this, we need to use the second form of the setCount function. Instead of passing the value of the new state variable, we passing the function that has access to the old state value:
```
    ...
    ...
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
```
### useState With Object
lets make the use case:
```
export default function Hookobject() {

    const [name, setName] = useState({ firstname: '', lastname: '' })

    return (
        <div>
            <input value={name.firstname} onChange={(e) => setName({ firstname: e.target.value })}></input>
            <input value={name.lastname} onChange={(e) => setName({ lastname: e.target.value })}></input>
            <h2>firstname: {name.firstname}</h2>
            <h2>lastname: {name.lastname}</h2>
        </div>
    )
}
```
in this scenario, when we fill the first input text, we will se the firstname:h2 tag will appear the value of our name.firstname, but when we ara typing on the second input field, the name.firstname value will gone and the
lastname:h2 tag will appear. This is happened because the useState does not automatically merge and update the object.<br/>
To overcome this, we will use the spread operator(ES6). this means that the previous property will be copied to the state and added new property to the object itself.
```
    ...
    ...
    return (
        <div>
            <input value={name.firstname} onChange={(e) => setName({ ...name, firstname: e.target.value })}/>
            <input value={name.lastname} onChange={(e) => setName({ ...name, lastname: e.target.value })}/>
            <h2>firstname: {name.firstname}</h2>
            <h2>lastname: {name.lastname}</h2>
        </div>
    )
```
### useState With Array
Same like an object value, the useState cannot automatically merge and update while playing with the Array type.
We need to handle that manually using the spread operator as well:
```
export default function Hookarray() {

    const [item, setItem] = useState([])

    const addItem = () => {
        setItem([...item, {
            id: 1,
            value: 'Darmawan'
        }])
    }

    return (
        <div>
            <button onClick={addItem}>Add object in Array</button>
            {
                item.map((item) => (
                    <p>{item.value}</p>
                ))
            }
        </div>
    )
}
```
# Summary
- the useState hook lets you add state to the funcitonal components. In Classes, the state is always an object.
- With the useState hook, the state doesnt always have to be an object.
- The useState hook returns an array with 2 elements. 1st is current value and the 2nd is the setter function.
- New state value depends on the previous state value? You can pass a function to the setter function.
- When dealing with an objects or arrays, always make sure to spread your state variable.