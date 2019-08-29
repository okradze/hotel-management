import React from 'react'
import gql from 'graphql-tag'
import { Line } from 'react-chartjs-2'
import { useQuery } from '@apollo/react-hooks'
import Select from '../Select'
import { Context as AuthContext } from '../../context/AuthContext'

const GET_REVENUE_DATA = gql`
    query RevenueData($startDate: Int!) {
        revenueData(startDate: $startDate)
    }
`

const RevenueChart = () => {
    const [chartData, setChartData] = React.useState()
    const { user } = React.useContext(AuthContext)
    const [startDate, setStartDate] = React.useState({
        value: new Date().getFullYear(),
        text: new Date().getFullYear(),
    })

    useQuery(GET_REVENUE_DATA, {
        variables: {
            startDate: startDate.value,
        },
        onCompleted: handleCompleted,
    })

    function handleCompleted(data) {
        setChartData(data.revenueData)
    }

    const data = {
        labels: [
            'იან',
            'თებ',
            'მარ',
            'აპრ',
            'მაი',
            'ივნ',
            'ივლ',
            'აგვ',
            'სექ',
            'ოქტ',
            'ნოე',
            'დეკ',
        ],
        datasets: [
            {
                label: 'შემოსავალი',
                data: chartData || [
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                ],
                pointBorderWidth: 1,
                pointRadius: 4,
            },
        ],
    }
    function getChartData(canvas) {
        if (data.datasets) {
            const ctx = canvas.getContext('2d')
            const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
            gradientStroke.addColorStop(0, 'rgba(128, 182, 244, 1)')
            gradientStroke.addColorStop(1, 'rgba(244, 144, 128, 1')

            const gradientFill = ctx.createLinearGradient(500, 0, 100, 0)
            gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0.6)')
            gradientFill.addColorStop(1, 'rgba(244, 144, 128, 0.6)')

            data.datasets[0].backgroundColor = gradientFill
            data.datasets[0].borderColor = gradientStroke
            data.datasets[0].pointBackgroundColor = gradientStroke
            data.datasets[0].pointBorderColor = gradientStroke
            data.datasets[0].pointHoverBackgroundColor = gradientStroke
            data.datasets[0].pointHoverBorderColor = gradientStroke
        }

        return data
    }

    function createOptions() {
        const options = []
        const startYear = new Date(user.createdAt).getFullYear()
        const currentYear = new Date().getFullYear()

        for (let i = startYear; i <= currentYear; i++) {
            if (i !== startDate.value) {
                options.push({
                    value: i,
                    text: i,
                })
            }
        }

        return options
    }

    return (
        <div className="Stats__chart chart">
            <header className="chart__header">
                <h3 className="chart__heading">შემოსავალი:</h3>
                <Select
                    value={startDate.text}
                    setValue={(text, value) => setStartDate({ text, value })}
                    options={createOptions()}
                />
            </header>
            <Line
                id="revenue-chart"
                data={getChartData}
                options={{
                    legend: {
                        display: false,
                    },
                    animation: {
                        easing: 'easeInOutBack',
                        duration: 800,
                    },
                    tooltips: {
                        titleFontSize: 16,
                        bodyFontSize: 16,
                    },
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: '#777',
                                    beginAtZero: false,
                                    maxTicksLimit: 6,
                                    padding: 10,
                                    fontSize: 15,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                gridLines: {
                                    color: 'rgba(255,255,255,0.1)',
                                },
                                ticks: {
                                    fontColor: '#777',
                                    fontSize: 15,
                                    padding: 10,
                                },
                            },
                        ],
                    },
                }}
            />
        </div>
    )
}

export default RevenueChart
