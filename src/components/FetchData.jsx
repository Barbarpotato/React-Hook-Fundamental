import { useState, useEffect } from 'react'
import axios from 'axios'

function FetchData() {

    const [data, setData] = useState({})

    const [id, setId] = useState(1)

    const [isFetch, setIsFetch] = useState(false)

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [isFetch])

    return (
        <div>
            <input value={id} onChange={e => setId(e.target.value)} />
            <button onClick={() => setIsFetch(!isFetch)}> fetch data</button>
            {<h1>{data.title}</h1>}
        </div>
    )
}

export default FetchData