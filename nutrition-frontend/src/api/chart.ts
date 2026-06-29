import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,

  CategoryScale,
  LinearScale,

  BarElement,
  PointElement,
  LineElement,

  LineController,
  BarController
);