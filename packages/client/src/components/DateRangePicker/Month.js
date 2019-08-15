import React, { useContext } from 'react'
import DateRangePickerContext from './Context'
import Day from './Day'
import { getWeeksForMonth } from './utils'
import Loader from '../Loader'
import DashboardContext from '../Dashboard/DashboardContext'

const Month = () => {
    const { current, roomId, dayClass } = useContext(DateRangePickerContext)
    const { bookings, loading } = useContext(DashboardContext)

    const filteredBookings = bookings.filter(
        ({ room, guest }) => room.id === roomId && guest,
    )

    const weeks = getWeeksForMonth(current.getMonth(), current.getFullYear())

    return roomId ? (
        loading ? (
            <div className="loader-center">
                <Loader />
            </div>
        ) : (
            weeks.map((week, index) => (
                <div key={index} className="DatePicker__week">
                    {week.map((date, i) => (
                        <Day
                            dayType={dayClass(date, filteredBookings)}
                            date={date}
                            key={i}
                        />
                    ))}
                </div>
            ))
        )
    ) : (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
            აირჩიეთ ოთახი
        </div>
    )
}

export default Month
