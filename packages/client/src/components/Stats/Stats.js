import React from 'react'
import RevenueChart from '../RevenueChart'
import TotalComponent from './TotalComponent'
import './Stats.scss'

const Stats = () => (
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
            <TotalComponent
                className="Stats__TotalGuests"
                data={250}
                text="სტუმარი"
            />
            <TotalComponent
                className="Stats__TotalRevenue"
                data={20500}
                text="შემოსავალი"
            />
            <RevenueChart
                chartData={[
                    21050,
                    18760,
                    26000,
                    17500,
                    15000,
                    23512,
                    19000,
                    18000,
                    18450,
                    18790,
                    19200,
                    18450,
                ]}
            />
        </div>
    </div>
)

export default Stats
