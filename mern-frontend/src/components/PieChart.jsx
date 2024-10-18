import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Handle empty or undefined data
  if (!data || !data.length) {
    return <p>No data to display in the chart.</p>;
  }

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Number of Items by Category',
        data: data.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Items Distribution by Category</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;