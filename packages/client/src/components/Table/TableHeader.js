import React, { useState, useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Select from '../Select'
import { renderMonthAndYear, handleNext, handleBack } from '../../utils/locale'
import DashboardContext from '../Dashboard/DashboardContext'

const ROOMS_COUNT = gql`
    query {
        roomsCount
    }
`

const TableHeader = ({ current, setCurrent }) => {
    const [roomsCount, setRoomsCount] = useState()
    const startDay = new Date(new Date().setHours(0, 0, 0, 0))
    const { setPaginationData, paginationData } = useContext(DashboardContext)

    useQuery(ROOMS_COUNT, {
        onCompleted: data => {
            setRoomsCount(data.roomsCount)
        },
    })

    function createOptions() {
        const options = []
        const size = 20
        const times = Math.ceil(roomsCount / size)

        for (let i = 0; i < times; i++) {
            options.push({
                text: `${i * size + 1} - ${i * size + size}`,
                value: {
                    skip: i * size,
                    first: size,
                },
            })
        }

        return options
    }

    return (
        <div className="table-header">
            <div className="table-nav">
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
                        className="triangle triangle--left table-nav__triangle--left"
                    />
                )}
                <div className="table-nav__date">
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
                    className="triangle triangle--right table-nav__triangle--right"
                />
            </div>
            <Select
                setValue={setPaginationData}
                value={paginationData.text}
                options={createOptions()}
            />
        </div>
    )
}

export default TableHeader
