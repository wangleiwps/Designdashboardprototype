import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export function DefectTypeChart() {
  const data = [
    { name: "裂缝", value: 45, color: "#3b82f6" },
    { name: "渗水", value: 28, color: "#06b6d4" },
    { name: "沉降", value: 18, color: "#8b5cf6" },
    { name: "腐蚀", value: 12, color: "#f59e0b" },
    { name: "其他", value: 24, color: "#6b7280" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>缺陷类型分布</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
