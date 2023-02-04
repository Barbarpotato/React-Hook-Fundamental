import { useReducer, useEffect } from 'react'
import axios from 'axios'

const initialData = {
    loading: true,
    data: {},
    error: ''
}

const reducer = (_state, action) => {
    switch (action.type) {
        case 'success':
            return { loading: false, data: action.payload, error: '' }
        case 'failed':
            return { loading: false, data: {}, error: action.payload }
        default:
            return initialData
    }
}

export default function FetchData() {

    const [state, dispatch] = useReducer(reducer, initialData)

    useEffect(() => {
        setTimeout(() => {
            axios.get('https://jsonplaceholder.typicoe.com/todos/1')
                .then((res) => {
                    dispatch({ type: 'success', payload: res.data })
                })
                .catch((err) => {
                    dispatch({ type: 'failed', payload: err.message })
                })
        }, 1000)
    }, [])

    if (state.loading) {
        return (
            <>Loading...</>
        )
    }

    return (
        <div>
            <h1>Calling from API</h1>
            <p>{state.error === '' ? state.data.id : state.error}</p>
            <p>{state.error === '' ? state.data.title : state.error}</p>
        </div>
    )
}
