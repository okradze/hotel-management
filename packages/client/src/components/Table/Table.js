import React from 'react'
import TableHeader from './TableHeader'
import DashboardContext from '../Dashboard/DashboardContext'
import withLoader from '../Loader'
import './Table.scss'

Number.prototype.pad = function(size) {
    var s = String(this)
    while (s.length < (size || 2)) {
        s = '0' + s
    }
    return s
}

const Table = () => {
    const {
        current,
        setCurrent,
        tempBooking,
        data,
        loading,
    } = React.useContext(DashboardContext)

    const daysInMonth = new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        0,
    ).getDate()

    function createHead() {
        const days = []

        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <th key={i} className="table-th">
                    {i.pad(2)}
                </th>,
            )
        }

        return (
            <>
                <th className="table-th">#</th>
                {days}
            </>
        )
    }

    function createCells(bookings, roomId) {
        const cells = []

        function checkIfHeld(currentDateString, checkIn, checkOut) {
            return currentDateString >= checkIn && currentDateString <= checkOut
        }

        function tempBookingMatch(currentDateString, tempRoomId) {
            if (
                checkIfHeld(
                    currentDateString,
                    tempBooking.checkIn,
                    tempBooking.checkOut,
                ) &&
                roomId === tempRoomId
            ) {
                return tempBooking
            }
            return undefined
        }

        for (let i = 1; i <= daysInMonth; i++) {
            // current cell date in ISO 8601
            const currentDateString = new Date(
                current.getFullYear(),
                current.getMonth(),
                i,
            ).toISOString()

            // check if this cell is held
            let booking = bookings.find(({ checkIn, checkOut }) =>
                checkIfHeld(currentDateString, checkIn, checkOut),
            )
            // if temporary booking is there
            if (!booking && tempBooking) {
                booking = tempBookingMatch(
                    currentDateString,
                    tempBooking.room.id,
                )
            }

            if (booking) {
                const { guest, color } = booking

                if (guest) {
                    cells.push(
                        <td
                            key={i}
                            style={{
                                backgroundColor: color,
                            }}
                            className="table-cell-held table-td"
                        >
                            <div className="table-guest">
                                <h3 className="table-guest__name">
                                    {guest.name}
                                </h3>
                                <p className="table-guest__phone">
                                    {guest.phone}
                                </p>
                            </div>
                        </td>,
                    )
                } else {
                    cells.push(
                        <td
                            style={{
                                backgroundColor: color,
                            }}
                            key={i}
                            className="table-td table-cell-temporary"
                        />,
                    )
                }
            } else {
                cells.push(<td key={i} className="table-td" />)
            }
        }
        return cells
    }

    function createRows() {
        const rows = []

        for (let i = 0; i < data.length; i++) {
            rows.push(
                <tr key={i}>
                    <th key={i} className="table-sidebar-th">
                        {data[i].roomNumber.pad(2)}
                    </th>
                    {createCells(data[i].bookings, data[i]._id)}
                </tr>,
            )
        }

        return rows
    }

    const TableWithLoader = withLoader(createRows)

    return (
        <div className="table-wrapper">
            <TableHeader current={current} setCurrent={setCurrent} />
            <div id="table-scroll" className="table-scroll">
                <table>
                    <thead>
                        <tr>{createHead()}</tr>
                    </thead>
                    <tbody>
                        <TableWithLoader isLoading={loading} />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
