import { useEffect, useState } from 'react'
import api from '../AxiosConfig/contacts'

export default function useFetch(url) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        setLoading(true)
        api.get(url).then(response => {
            setData(response.data)
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [url]);
    
    return { data, loading, error }

}