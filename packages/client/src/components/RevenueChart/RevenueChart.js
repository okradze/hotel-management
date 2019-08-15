import React from 'react'
import { Line } from 'react-chartjs-2'
import { months } from '../../utils/locale'

const RevenueChart = ({ chartData }) => {
    const data = {
        labels: months,
        datasets: [
            {
                label: 'შემოსავალი',
                data: chartData,
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

    return (
        <Line
            id="revenue-chart"
            data={getChartData}
            height={100}
            options={{
                responsive: true,
                legend: {
                    position: 'bottom',
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
                                fontSize: 16,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontSize: 16,
                            },
                        },
                    ],
                },
            }}
        />
    )
}

export default RevenueChart
