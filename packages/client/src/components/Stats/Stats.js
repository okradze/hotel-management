import React from 'react'
import gql from 'graphql-tag'
import RevenueChart from '../RevenueChart'
import TotalComponent from './TotalComponent'
import './Stats.scss'

const ROOMS_COUNT = gql`
    query {
        roomsCount
    }
`

const GUESTS_COUNT = gql`
    query {
        guestsCount
    }
`

const Stats = () => {
    return (
        <div className="container">
            <div className="Stats">
                <div className="StatsFilter">
                    <select>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                    </select>
                </div>
                <TotalComponent text="სტუმარი" QUERY={GUESTS_COUNT} />
                <TotalComponent text="ოთახი" QUERY={ROOMS_COUNT} />
                {/* <TotalComponent
                            className="Stats__TotalRevenue"
                            text="შემოსავალი"
                        /> */}

                <div className="Stats__chart chart">
                    <header className="chart__header">
                        <h3 className="chart__heading">შემოსავალი:</h3>
                    </header>
                    <RevenueChart />
                </div>
            </div>
        </div>
    )
}

export default Stats
