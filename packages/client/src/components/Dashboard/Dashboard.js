import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookForm from '../BookForm'
import Table from '../Table'
import DashboardContext from './DashboardContext'
import GET_DASHBOARD_DATA from './gql'

const Dashboard = () => {
    const [current, setCurrent] = React.useState(new Date())
    const [data, setData] = React.useState([])
    const [tempBooking, setTempBooking] = React.useState()
    const [paginationData, setPaginationData] = React.useState({
        limit: 20,
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
            limit: paginationData.limit,
            skip: paginationData.skip,
        },
        onCompleted: handleCompleted,
    })

    function handleCompleted({ rooms }) {
        setData(rooms)
    }

    return (
        <div className="main">
            <DashboardContext.Provider
                value={{
                    current,
                    setCurrent,
                    data,
                    setData,
                    paginationData,
                    setPaginationData,
                    tempBooking,
                    setTempBooking,
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
