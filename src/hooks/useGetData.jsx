import { useState, useEffect } from "react";
import https from "../services/https";

export const useGetData = (path) =>{
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const getData = async() =>{
        try{
            const response = await https.get(path)
            const { data } = response?.data
            setData(data)
            setError(null)
        }
        catch(error){
            console.error("Error: ", error)
            setError(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    }, [path])

    return { data, error, loading }
}