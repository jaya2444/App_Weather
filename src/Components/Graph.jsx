import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Graph = ({ forecastData }) => {
  if (!forecastData) {
    return <p>No data available</p>;
  }

  const labels = forecastData.list.map((item) => {
    const date = new Date(item.dt * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecastData.list.map((item) => item.main.temp),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        yAxisID: 'temperature',
      },
      {
        label: 'Humidity (%)',
        data: forecastData.list.map((item) => item.main.humidity),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        yAxisID: 'humidity',
      },
      {
        label: 'Rainfall (mm)',
        data: forecastData.list.map((item) => item.rain ? item.rain['3h'] : 0),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: false,
        yAxisID: 'rainfall',
      },
    ],
  };

  const options = {
    scales: {
      temperature: {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      humidity: {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Humidity (%)',
        },
      },
      rainfall: {
        type: 'linear',
        position: 'right',
        ticks: {
          beginAtZero: true,
        },
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Rainfall (mm)',
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <div className="graph">
  
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
