import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import BookForm from '../BookForm'
import Table from '../Table'
import DashboardContext from './DashboardContext'
import GET_DASHBOARD_DATA from './gql'

Number.prototype.pad = function(size) {
    var s = String(this)
    while (s.length < (size || 2)) {
        s = '0' + s
    }
    return s
}

const Dashboard = () => {
    const [current, setCurrent] = useState(new Date())
    const [bookings, setBookings] = useState([])
    const [rooms, setRooms] = useState([])

    const [tempBooking, setTempBooking] = useState()

    function mergeBookingsAndTemp() {
        if (tempBooking) {
            setBookings(prevState => [
                ...prevState.filter(booking => booking.guest),
                tempBooking,
            ])
        }
    }

    useEffect(() => {
        mergeBookingsAndTemp()
    }, [tempBooking])

    useEffect(() => {
        mergeBookingsAndTemp()
    }, [bookings])

    const { loading, refetch } = useQuery(GET_DASHBOARD_DATA, {
        variables: {
            roomsOrderBy: 'roomNumber_ASC',
            startDate: new Date(
                current.getFullYear(),
                current.getMonth(),
                1,
            ).toISOString(),
        },
        onCompleted: handleCompleted,
    })

    function handleCompleted(data) {
        setBookings(data.bookings)
        setRooms(data.rooms)
    }

    return (
        <div className="main">
            <DashboardContext.Provider
                value={{
                    current,
                    setCurrent,
                    bookings,
                    setBookings,
                    setTempBooking,
                    rooms,
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
