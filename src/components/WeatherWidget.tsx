import { Pie, Line, Bar, Doughnut  } from "react-chartjs-2";
import React from 'react'
import {
  Chart as ChartJS,
  LineElement, BarElement, PointElement, ArcElement,
  CategoryScale, LinearScale, Tooltip, Legend
} from "chart.js";


ChartJS.register(LineElement, BarElement, PointElement, ArcElement,
  CategoryScale, LinearScale, Tooltip, Legend);

type WidgetProps = {
    title: string;
    type: "line" | "bar" | "pie" | "doughnut";
    data: any
}

const WeatherWidget: React.FC<WidgetProps> = ({ title, type, data }) => {
     const chart = {
        line: <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />,
        bar: <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />,
        pie: <Pie data={data} options={{ responsive: true }} />,
        doughnut: <Doughnut data={data} options={{ responsive: true }} />,
      };
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-40">{chart[type]}</div>
    </div>
  );
}
export default WeatherWidget