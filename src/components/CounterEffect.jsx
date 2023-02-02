import { useState, useEffect } from 'react'

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
