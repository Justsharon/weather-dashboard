import { Pie, Line, Bar, Doughnut } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type WidgetProps = {
  title: string;
  type: "line" | "bar" | "pie" | "doughnut";
  data: any;
};

const WeatherWidget: React.FC<WidgetProps> = ({ title, type, data }) => {
  const chart = {
    line: (
      <Line
        data={data}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    ),
    bar: (
      <Bar
        data={data}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    ),
    pie: <Pie data={data} options={{ responsive: true }} />,
    doughnut: <Doughnut data={data} options={{ responsive: true }} />,
  };
  return (
    <section>
      <h3 className="font-medium text-center mb-2">{title}</h3>
      <div className="bg-slate-100 rounded shadow-lg flex justify-center p-4 ">
        <div className="h-80 w-80 flex justify-center items-center">{chart[type]}</div>
      </div>
    </section>
  );
};
export default WeatherWidget;
