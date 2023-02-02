# useEffect Hook
### Introduction
- The effect Hook lets you perform side effects in functional component
- It is a close replacement for componentDidMount, componentDidUpdate and componenWillUnmount 

### useEffect after render
```
export default function counterEffect() {

    const [count, setCount] = useState(0)

    useEffect(() => {
        document.title = `clicked ${count} times`
    })

    return (
        <div>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Clicked {count} times</button>
        </div>
    )
}
```
When we specify useEffect, we are basically requesting react to execute the function that is pass as a argument every time component render. <strong>useEffect runs every render of the component. the useEffect run both after the first render and after every update for default setting</strong>.

### Conditionally Run Effects
In some cases, applying the effect after every render might create a performance problem. So we need the way to conditionally run an effect from a functional component.
```
 const [count, setCount] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        document.title = `clicked ${count} times`
        console.log('updating document title')
    })

    return (
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={() => setCount(prevCount => prevCount + 1)}>Clicked {count} times</button>
        </div>
    )
```
In above code, what we really want is to run the effect hook when the count state is change, but above code not doing the exact same way. the above code keep run the effect hook even we updating the other state e.g name state.<br/><br/>
To make the effect hook only run if the count state is update, we can implement the conditionally run effect:
```
    ...
    ...
      useEffect(() => {
        document.title = `clicked ${count} times`
        console.log('updating document title')
    }, [count])
    ...
    ...
```
### Run Effects Only Once
```
 const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    useEffect(() => {
        console.log('useEffect called!')
        window.addEventListener('mousemove', (e) => {
            setX(e.clientX)
            setY(e.clientY)
        })
    })

    return (
        <div>
            <h1>Coordinates: X - {x} Y - {y} </h1>
        </div>
    )
```
Above scenario tells that we want to track the mouse move coordinate when user clicking it, by using the event listener. But the performance of this code was bad, because it will always running the effect hook every time the x and y state was updated causing re-rendering. What we really want to do is running the event listener once after component mount. then when the state has updated, it wont called the effect hook again. So the code will be:
```
    ...
    ...
    useEffect(() => {
        console.log('useEffect called!')
        window.addEventListener('mousemove', (e) => {
            setX(e.clientX)
            setY(e.clientY)
        })
    }, [])
    ...
    ...
```
### useEffect Cleanup
This cleanup is similiar with the old school React class component named componentWillUnmount, where it allows us to tidy up our code before our component unmounts. Cleanup function helps developers clean effects that prevent unwanted behaviors and optimizes application performance.<br/><br/>
For the example:
```
  function ToggleMouse() {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <button onClick={() => setToggle(!toggle)}>{toggle ? 'actived' : 'disbaled'}</button>
            {toggle && <CounterEffect />}
        </div >
    )
}
```
We created new Component named ToggleMouse, where we have one button that can make the mouse event component rendered(previous case) if the toggle state was true. after the mouse event component rendering, the effect hook will running and activated the event listener, but when this mouse event component unmounted(clicking the toggle button once again, will cause the toggle state become false and removing the mouse event component) the event listener still running in the background (will cause memory leak, if the code was consuming much data). To prevent this, we use the cleanup:
```
export default function CounterEffect() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)

    const handleMouseEvent = (e) => {
        console.log('Mouse Event')
        setX(e.clientX)
        setY(e.clientY)
    }

    useEffect(() => {
        console.log('useEffect called!')
        window.addEventListener('mousemove', handleMouseEvent)
        return () => {
            console.log('Component Unmounted!')
            window.removeEventListener('mousemove', handleMouseEvent)
        }
    }, [])

    return (
        <div>
            <h1>Coordinates: X - {x} Y - {y} </h1>
        </div>
    )
}
```
The clean up can cancel the subcriptions (when the component fetch some some data but the user already unmounted the component before our promise resolved.) and removing the event listener when the component unmounted.

### Fetching data with useEffect
```
function FetchData() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            {data.map(item => (
                <h1>{item.title}</h1>
            ))}
        </div>
    )
}
```
