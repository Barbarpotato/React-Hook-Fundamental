import React from 'react'
import { useContext } from 'react'
import { countContext, nameContext } from '../App'

function ComponentF() {

    const count = useContext(countContext)
    const name = useContext(nameContext)
    return (
        <div>
            <h1>this is from the Component F {count}, and my name is {name}</h1>
        </div>
    )
}

export default ComponentF