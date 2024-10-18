import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
  // Handle empty or undefined data
  if (!data || !data.length) {
    return <p>No data to display in the chart.</p>;
  }

  const priceRanges = [
    '0 - 100',
    '101 - 200',
    '201 - 300',
    '301 - 400',
    '401 - 500',
    '501 - 600',
    '601 - 700',
    '701 - 800',
    '801 - 900',
    '901 and above',
  ];

  const itemCounts = new Array(priceRanges.length).fill(0);

  data.forEach(item => {
    const price = item.price;
    if (price <= 100) itemCounts[0]++;
    else if (price <= 200) itemCounts[1]++;
    // ... (continue logic for other ranges)
    else itemCounts[9]++; // Handle prices above 900
  });

  const chartData = {
    labels: priceRanges,
    datasets: [
      {
        label: 'Number of Items in Price Ranges',
        data: itemCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Items Distribution by Price Range</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;