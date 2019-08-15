import React, { useContext } from 'react'
import Loader from '../Loader'
import './Table.scss'
import { renderMonthAndYear, handleNext, handleBack } from '../../utils/locale'
import DashboardContext from '../Dashboard/DashboardContext'

const Table = () => {
    const startDay = new Date(new Date().setHours(0, 0, 0, 0))
    const { current, setCurrent, bookings, rooms, loading } = useContext(
        DashboardContext,
    )

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

    function createCells(roomId) {
        const cells = []

        for (let i = 1; i <= daysInMonth; i++) {
            // current cell date in ISO 8601
            const currentDateString = new Date(
                current.getFullYear(),
                current.getMonth(),
                i,
            ).toISOString()

            const guestIndex = bookings.findIndex(
                ({ checkIn, checkOut, room }) =>
                    currentDateString >= checkIn &&
                    currentDateString <= checkOut &&
                    roomId === room.id,
            )

            if (guestIndex > -1) {
                const { guest, color } = bookings[guestIndex]

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

        for (let i = 0; i < rooms.length; i++) {
            rows.push(
                <tr key={i}>
                    <th key={i} className="table-sidebar-th">
                        {Number.parseInt(rooms[i].roomNumber, 10).pad(2)}
                    </th>
                    {createCells(rooms[i].id)}
                </tr>,
            )
        }

        return rows
    }

    return (
        <div className="table-wrapper">
            <div className="table-header">
                {current >=
                    new Date(
                        startDay.getFullYear(),
                        startDay.getMonth() + 1,
                        1,
                    ) && (
                    <span
                        tabIndex="0"
                        role="button"
                        onKeyPress={e => {
                            if (e.which === 13) {
                                handleBack(current, setCurrent)
                            }
                        }}
                        onClick={() => handleBack(current, setCurrent)}
                        className="triangle triangle--left table-header__triangle--left"
                    />
                )}
                <div className="table-header__date">
                    {renderMonthAndYear(current)}
                </div>
                <span
                    tabIndex="0"
                    role="button"
                    onKeyPress={e => {
                        if (e.which === 13) {
                            handleNext(current, setCurrent)
                        }
                    }}
                    onClick={() => handleNext(current, setCurrent)}
                    className="triangle triangle--right table-header__triangle--right"
                />
            </div>
            <div id="table-scroll" className="table-scroll">
                <table>
                    <thead>
                        <tr>{createHead()}</tr>
                    </thead>
                    <tbody>{createRows()}</tbody>
                </table>
                {loading && (
                    <div className="loader-center">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table
