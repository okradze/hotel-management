import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookForm from '../BookForm'
import Table from '../Table'
import DashboardContext from './DashboardContext'
import GET_DASHBOARD_DATA from './gql'

const Dashboard = () => {
    const [current, setCurrent] = useState(new Date())
    const [data, setData] = useState([])
    const [tempBooking, setTempBooking] = useState()
    const [paginationData, setPaginationData] = useState({
        first: 20,
        skip: 0,
        text: '1 - 20',
    })

    const { loading, refetch } = useQuery(GET_DASHBOARD_DATA, {
        variables: {
            startDate: new Date(
                current.getFullYear(),
                current.getMonth(),
                1,
            ).toISOString(),
            first: paginationData.first,
            skip: paginationData.skip,
        },
        onCompleted: handleCompleted,
    })

    function handleCompleted({ dashboardData }) {
        setData(dashboardData)
    }

    return (
        <div className="main">
            <DashboardContext.Provider
                value={{
                    current,
                    setCurrent,
                    paginationData,
                    setPaginationData,
                    tempBooking,
                    setTempBooking,
                    data,
                    loading,
                }}
            >
                <BookForm refetchDashboardData={refetch} />
                <Table />
            </DashboardContext.Provider>
        </div>
    )
}

export default Dashboard
