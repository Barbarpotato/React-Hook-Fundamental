import React, { useState } from 'react'
import CounterEffect from './CounterEffect'

function ToggleMouse() {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <button onClick={() => setToggle(!toggle)}>{toggle ? 'actived' : 'disbaled'}</button>
            {toggle && <CounterEffect />}
        </div >
    )
}

export default ToggleMouse