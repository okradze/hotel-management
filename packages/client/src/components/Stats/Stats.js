import React, { useContext } from 'react'
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
                <TotalComponent text="სტუმარი" QUERY={GUESTS_COUNT} />
                <TotalComponent text="ოთახი" QUERY={ROOMS_COUNT} />
                <RevenueChart />
            </div>
        </div>
    )
}

export default Stats
