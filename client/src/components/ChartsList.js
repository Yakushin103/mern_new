import React from 'react'
import { Bar } from 'react-chartjs-2'

import './ChartsList.css'

export const ChartsList = ({ betsData }) => {
    if (!betsData.length) {
        return <p className="center">Данных пока нет</p>
    }

    const state = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [
            {
                label: 'Bets',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
            }
        ]
    }

    console.log('1111', betsData)

    return (
        <div className="charts-bar">
            <span>Bar this your static</span>
            <div>
                <Bar
                    data={state}
                    options={{
                        legend: {
                            display: true,
                            position: 'bottom'
                        }
                    }}
                />
            </div>
        </div>
    )
}