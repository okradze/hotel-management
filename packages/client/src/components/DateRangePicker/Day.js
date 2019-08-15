import React, { useContext } from 'react'
import DateRangePickerContext from './Context'

const Day = ({ date, dayType }) => {
    const { handleClick } = useContext(DateRangePickerContext)

    const dayClassName =
        dayType === 'disabled'
            ? 'DatePicker__day DatePicker__day--disabled'
            : dayType === 'selected'
            ? 'DatePicker__day DatePicker__day--selected'
            : 'DatePicker__day'

    return date ? (
        <div
            role="button"
            tabIndex="0"
            onClick={() => {
                if (dayType !== 'disabled') {
                    handleClick(date)
                }
            }}
            onKeyPress={e => {
                if (e.which === 13 && dayType !== 'disabled') {
                    handleClick(date)
                }
            }}
            className={dayClassName}
        >
            {date.getDate()}
        </div>
    ) : (
        <div className="DatePicker__day--empty" />
    )
}

export default Day
