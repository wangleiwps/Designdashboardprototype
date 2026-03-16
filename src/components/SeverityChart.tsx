import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function SeverityChart() {
  const data = [
    { name: "轻微", 本月: 65, 上月: 58 },
    { name: "中等", 本月: 42, 上月: 48 },
    { name: "严重", 本月: 20, 上月: 15 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>缺陷严重程度统计</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="本月" fill="#3b82f6" />
            <Bar dataKey="上月" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
