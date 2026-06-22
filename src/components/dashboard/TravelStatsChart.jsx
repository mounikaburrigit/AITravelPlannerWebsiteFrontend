import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl">
      <p className="font-medium">{payload[0].payload.name}</p>

      <p>{payload[0].value}</p>
    </div>
  );
};

const TravelStatsChart = ({
  totalTrips,
  favoriteTrips,
  itineraryCount,
  hotelCount,
}) => {
  const data = [
    {
      name: "Trips",
      value: totalTrips,
    },
    {
      name: "Favorites",
      value: favoriteTrips,
    },
    {
      name: "AI Plans",
      value: itineraryCount,
    },
    {
      name: "Hotels",
      value: hotelCount,
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-4xl
      p-6
      shadow-sm
      border
      border-slate-100
      "
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">Travel Statistics</h2>

        <p className="text-slate-500 text-sm mt-1">
          Activity summary across all trips
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />

          <YAxis tickLine={false} axisLine={false} />

          <Tooltip content={<CustomTooltip />} />

          <Bar
            dataKey="value"
            radius={[10, 10, 0, 0]}
            fill="#06b6d4"
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TravelStatsChart;
