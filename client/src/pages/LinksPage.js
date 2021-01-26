import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useHttp } from '../hooks/http.hooks'
import { AuthContext } from '../context/AuthContext.js'
import { Loader } from '../components/Loader'
import { ChartsList } from '../components/ChartsList'
import Chart from 'chart.js'

export const LinksPage = () => {
    
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)
    const [betsData, setBetsData] = useState([])

    const fetchData = useCallback(async () => {
        try {
            const fetchedData = await request('/api/categoryDate/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setBetsData(fetchedData)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            { !loading && <ChartsList betsData={betsData} />}
        </>
    )
}