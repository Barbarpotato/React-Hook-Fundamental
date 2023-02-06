import React from 'react'

function Button({ handleClick, type }) {

    console.log(`render button - ${type}`)

    return (
        <button onClick={handleClick}>increment {type}</button>
    )
}
export default React.memo(Button)