import React, { useState, useContext } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import DateRangePickerContext from './Context'
import DatePicker from './DatePicker'
import { renderInfo } from './utils'
import { renderMonthAndYear, handleBack, handleNext } from '../../utils/locale'
import './DatePicker.scss'

const DateRangePicker = ({
    roomId,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    current,
    setCurrent,
    runAfterDatePick,
}) => {
    const startDay = new Date(new Date().setHours(0, 0, 0, 0))

    const [isOpen, setIsOpen] = useState(false)
    const [choosingStartDate, setChoosingStartDate] = useState(true)

    function dayClass(date, bookings) {
        if (date < startDay) {
            return 'disabled'
        }
        const dateString = date.toISOString()

        const isHeld = bookings.some(
            ({ checkIn, checkOut }) =>
                dateString >= checkIn && dateString <= checkOut,
        )

        if (isHeld) {
            return 'disabled'
        }

        if (date >= startDate && date <= endDate) {
            return 'selected'
        }

        return ''
    }

    function handleClick(date) {
        if (choosingStartDate) {
            setStartDate(date)
            setEndDate(date)
            setCurrent(date)

            setChoosingStartDate(false)
            return
        }
        if (!choosingStartDate) {
            if (date < startDate) {
                setStartDate(date)
            } else {
                setIsOpen(false)
                setChoosingStartDate(true)
            }
            setEndDate(date)

            if (runAfterDatePick) runAfterDatePick(startDate, date, roomId)
        }
    }

    return (
        <DateRangePickerContext.Provider
            value={{
                current,
                dayClass,
                handleClick,
                roomId,
            }}
        >
            <div className="DateRangePicker">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setIsOpen(false)
                    }}
                >
                    <div
                        className="DateRangePicker__info"
                        tabIndex="0"
                        role="button"
                        onKeyPress={e => {
                            if (e.which === 13) {
                                setIsOpen(!isOpen)
                            }
                        }}
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                    >
                        {renderInfo(startDate)} - {renderInfo(endDate)}
                    </div>
                    {isOpen && (
                        <div className="DateRangePicker__wrapper">
                            <div className="DateRangePicker__header">
                                {current >=
                                    new Date(
                                        startDay.getFullYear(),
                                        startDay.getMonth() + 1,
                                        1,
                                    ) && (
                                    <span
                                        tabIndex="0"
                                        role="button"
                                        onClick={() =>
                                            handleBack(current, setCurrent)
                                        }
                                        onKeyPress={e => {
                                            if (e.which === 13) {
                                                handleBack(current, setCurrent)
                                            }
                                        }}
                                        className="triangle triangle--left"
                                    />
                                )}

                                <div className="DatePicker__title">
                                    {renderMonthAndYear(current)}
                                </div>

                                <span
                                    tabIndex="0"
                                    role="button"
                                    onClick={() =>
                                        handleNext(current, setCurrent)
                                    }
                                    onKeyPress={e => {
                                        if (e.which === 13) {
                                            handleNext(current, setCurrent)
                                        }
                                    }}
                                    className="triangle triangle--right"
                                />
                            </div>
                            <div className="DatePicker-wrapper">
                                <DatePicker />
                            </div>
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </DateRangePickerContext.Provider>
    )
}

export default DateRangePicker
