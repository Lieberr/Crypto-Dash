const API_URL = import.meta.env.VITE_COIN_API_URL;

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const CoinChart = ({ coinID }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinID) return;

    const fetchPrices = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/${coinID}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();

        const prices = data.prices.map(([timestamp, price]) => ({
          x: timestamp,
          y: price
        }));

        setChartData({
          datasets: [
            {
              label: "Price (USD)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3
            }
          ]
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinID]);

  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (!chartData) {
    return <p>No chart data available</p>;
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <Line
      style={{height: '400px'}}
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              mode: "index",
              intersect: false
            }
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day"
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7
              }
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`
              }
            }
          }
        }}
      />
    </div>
  );
};

export default CoinChart;
