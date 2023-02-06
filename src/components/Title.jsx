import React from 'react'

function Title() {
    console.log('render title')
    return (
        <div>useCallback</div>
    )
}

export default React.memo(Title)