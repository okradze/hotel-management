import React, { useState, useContext } from 'react'
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
    const { setPaginationData, paginationData } = useContext(DashboardContext)

    useQuery(ROOMS_COUNT, {
        onCompleted: data => {
            setRoomsCount(data.roomsCount)
        },
    })

    function createOptions() {
        const options = []
        const limit = paginationData.limit
        const times = Math.ceil(roomsCount / limit)

        for (let i = 0; i < times; i++) {
            options.push({
                text: `${i * limit + 1} - ${i * limit + limit}`,
                value: {
                    skip: i * limit,
                    limit,
                },
            })
        }

        return options
    }

    return (
        <div className="table-header">
            <div className="table-nav">
                <div className="table-nav__left">
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
                </div>

                <div className="table-nav__date">
                    {renderMonthAndYear(current)}
                </div>
                <div className="table-nav__right">
                    <Select
                        setValue={(text, value) =>
                            setPaginationData({ ...value, text })
                        }
                        value={paginationData.text}
                        options={createOptions()}
                    />
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
            </div>
        </div>
    )
}

export default TableHeader
