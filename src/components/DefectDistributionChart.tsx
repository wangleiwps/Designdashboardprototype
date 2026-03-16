import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function DefectDistributionChart() {
  const barData = [
    { type: "裂缝", 本月: 342, 上月: 298 },
    { type: "渗水", 本月: 215, 上月: 234 },
    { type: "沉降", 本月: 156, 上月: 142 },
    { type: "腐蚀", 本月: 98, 上月: 112 },
    { type: "其他", 本月: 45, 上月: 38 },
  ];

  const pieData = [
    { name: "裂缝", value: 342, color: "#3b82f6", percent: 39.9 },
    { name: "渗水", value: 215, color: "#06b6d4", percent: 25.1 },
    { name: "沉降", value: 156, color: "#8b5cf6", percent: 18.2 },
    { name: "腐蚀", value: 98, color: "#f59e0b", percent: 11.4 },
    { name: "其他", value: 45, color: "#6b7280", percent: 5.3 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>缺陷类型分布统计</CardTitle>
        <p className="text-gray-600">各类型缺陷数量对比与占比分析</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 柱状图 */}
          <div>
            <h4 className="text-gray-900 mb-4">月度对比</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="本月" fill="#3b82f6" />
                <Bar dataKey="上月" fill="#94a3b8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* 饼图 */}
          <div>
            <h4 className="text-gray-900 mb-4">本月占比</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${percent}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* 详细统计表格 */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-gray-900 mb-4">详细统计</h4>
          <div className="grid grid-cols-5 gap-4">
            {pieData.map((item) => (
              <div key={item.name} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-4 h-4 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }}></div>
                <div className="text-gray-600 mb-1">{item.name}</div>
                <div className="text-gray-900">{item.value} 个</div>
                <div className="text-gray-600">{item.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
