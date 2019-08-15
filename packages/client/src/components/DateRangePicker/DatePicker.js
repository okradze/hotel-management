import React from 'react'
import Month from './Month'
import { weekdays } from '../../utils/locale'

const DatePicker = () => (
    <div className="DatePicker">
        <div className="DatePicker__weekdays">
            {weekdays.map((weekday, index) => (
                <div key={index} className="DatePicker__weekday">
                    {weekday}
                </div>
            ))}
        </div>
        <Month />
    </div>
)

export default DatePicker
