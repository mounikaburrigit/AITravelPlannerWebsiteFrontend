import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#06b6d4", "#f59e0b", "#10b981"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xl">
      <p className="font-medium">{payload[0].name}</p>
      <p>{payload[0].value} Trips</p>
    </div>
  );
};

const TripStatusChart = ({ planning, booked, completed }) => {
  const data = [
    {
      name: "Planning",
      value: planning,
    },
    {
      name: "Booked",
      value: booked,
    },
    {
      name: "Completed",
      value: completed,
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
        <h2 className="text-xl font-bold text-slate-900">Trip Status</h2>

        <p className="text-slate-500 text-sm mt-1">
          Overview of your travel progress
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={4}
            animationDuration={1000}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TripStatusChart;
