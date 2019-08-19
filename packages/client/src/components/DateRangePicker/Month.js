import React, { useContext } from 'react'
import DateRangePickerContext from './Context'
import Day from './Day'
import { getWeeksForMonth } from './utils'
import withLoader from '../Loader'
import DashboardContext from '../Dashboard/DashboardContext'

const Month = () => {
    const { current, roomId, dayClass } = useContext(DateRangePickerContext)
    const { bookings, loading } = useContext(DashboardContext)

    const filteredBookings = bookings.filter(
        ({ room, guest }) => room.id === roomId && guest,
    )

    const weeks = getWeeksForMonth(current.getMonth(), current.getFullYear())

    const MonthWithLoader = withLoader(() =>
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
        )),
    )

    return roomId ? (
        <MonthWithLoader isLoading={loading} />
    ) : (
        <div style={{ textAlign: 'center', padding: '30px 0' }}>
            აირჩიეთ ოთახი
        </div>
    )
}

export default Month
