import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Chart.js komponentlarini va plaginlarni ro‘yxatdan o‘tkazish
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const FinanceChart = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const total = income + expense;

  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true, // Tooltipni yoqish
      },
      legend: {
        position: 'bottom', // Legenda pastda chiqadi
        labels: {
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        color: '#fff', // Yozuvlar rangi
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value, context) => {
          const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value}$\n(${percentage}%)`;
        },
      },
    },
    cutout: '70%', // Markazini ochiq qoldirish
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <h5>Finance Chart</h5>
      </div>
      <div className="card-body">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default FinanceChart;
