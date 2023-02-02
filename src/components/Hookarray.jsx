import React, { useState } from 'react'

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
