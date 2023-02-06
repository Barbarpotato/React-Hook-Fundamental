import React from 'react'

function State({ state, type }) {
    console.log(`render state - ${type}`)
    return (
        <h5>{state}</h5>
    )
}

export default React.memo(State)