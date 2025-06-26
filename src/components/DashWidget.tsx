import React from 'react'
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement, BarElement, PointElement, ArcElement,
  CategoryScale, LinearScale, Tooltip, Legend
} from "chart.js";

ChartJS.register(LineElement, BarElement, PointElement, ArcElement,
  CategoryScale, LinearScale, Tooltip, Legend);

type WidgetProps = {
  title: string;
  type: "line" | "bar" | "pie" | "scatter";
  data: any;
};

const DashWidget: React.FC<WidgetProps> = ({ title, type, data}) => {
  const chart = {
    line: <Line data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />,
    bar: <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />,
    pie: <Pie data={data} options={{ responsive: true }} />,
    scatter: <Scatter data={data} options={{ responsive: true }} />,
  };

  return (
    <div className="bg-slate-100 shadow-md rounded-lg p-4 w-full">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <div className="h-40">{chart[type]}</div>
    </div>
  )
}

export default DashWidget