import { useState } from 'react'

export default function Hookobject() {

    const [name, setName] = useState({ firstname: '', lastname: '' })

    return (
        <div>
            <input value={name.firstname} onChange={(e) => setName({ ...name, firstname: e.target.value })}></input>
            <input value={name.lastname} onChange={(e) => setName({ ...name, lastname: e.target.value })}></input>
            <h2>firstname: {name.firstname}</h2>
            <h2>lastname: {name.lastname}</h2>
        </div>
    )
}
