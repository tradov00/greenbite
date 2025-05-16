"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const macronutrientData = [
  { name: "Protein", value: 30 },
  { name: "Carbs", value: 50 },
  { name: "Fats", value: 20 },
];

const macronutrientColors = [
  "#15803d", // brand.green
  "#ea580c", // brand.orange
  "#1F5C3B", // brand.darkgreen
];

const stepsData = [
  { day: "Mon", steps: 4000 },
  { day: "Tue", steps: 6000 },
  { day: "Wed", steps: 7000 },
  { day: "Thu", steps: 5000 },
  { day: "Fri", steps: 8000 },
  { day: "Sat", steps: 9000 },
  { day: "Sun", steps: 7500 },
];

const waterData = [
  { day: "Mon", liters: 1.2 },
  { day: "Tue", liters: 1.8 },
  { day: "Wed", liters: 2.0 },
  { day: "Thu", liters: 1.5 },
  { day: "Fri", liters: 2.2 },
  { day: "Sat", liters: 2.0 },
  { day: "Sun", liters: 1.7 },
];

export default function Goals() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-tahoma font-bold text-black text-center mb-10">
        Your Health Goals
      </h1>

      {/* Macronutrient Pie Chart */}
      <div className="mb-16 bg-white shadow-lg p-6 rounded-2xl">
        <h2 className="text-2xl font-bold font-roboto text-orange-600 mb-6 text-center">
          Macronutrient Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={macronutrientData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {macronutrientData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={macronutrientColors[index % macronutrientColors.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Steps Bar Chart */}
      <div className="mb-16 bg-white shadow-lg p-6 rounded-2xl">
        <h2 className="text-2xl font-bold font-roboto text-green-700 mb-6 text-center">
          Steps This Week
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stepsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="steps" fill="#15803d" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Water Intake Line Chart */}
      <div className="bg-white shadow-lg p-6 rounded-2xl">
        <h2 className="text-2xl font-bold font-roboto text-blue-600 mb-6 text-center">
          Water Intake (liters)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={waterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="liters"
              stroke="#0077B6" // brand.waterblue
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
