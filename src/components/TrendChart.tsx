import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function TrendChart() {
  const data = [
    { date: "11-01", 识别数: 45, 闭环数: 38, 处理中: 7 },
    { date: "11-02", 识别数: 52, 闭环数: 42, 处理中: 10 },
    { date: "11-03", 识别数: 48, 闭环数: 45, 处理中: 13 },
    { date: "11-04", 识别数: 61, 闭环数: 51, 处理中: 23 },
    { date: "11-05", 识别数: 55, 闭环数: 48, 处理中: 30 },
    { date: "11-06", 识别数: 58, 闭环数: 52, 处理中: 36 },
    { date: "11-07", 识别数: 50, 闭环数: 47, 处理中: 39 },
    { date: "11-08", 识别数: 63, 闭环数: 55, 处理中: 47 },
    { date: "11-09", 识别数: 57, 闭环数: 53, 处理中: 51 },
    { date: "11-10", 识别数: 60, 闭环数: 58, 处理中: 53 },
    { date: "11-11", 识别数: 54, 闭环数: 50, 处理中: 57 },
    { date: "11-12", 识别数: 59, 闭环数: 54, 处理中: 62 },
    { date: "11-13", 识别数: 62, 闭环数: 60, 处理中: 64 },
    { date: "11-14", 识别数: 56, 闭环数: 58, 处理中: 62 },
    { date: "11-15", 识别数: 65, 闭环数: 62, 处理中: 65 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>识别与处理趋势分析</CardTitle>
        <p className="text-gray-600">2024年11月 缺陷识别与闭环处理趋势</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="识别数" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="闭环数" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="处理中" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        
        {/* 统计摘要 */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
          <div className="text-center">
            <div className="text-gray-600 mb-1">本月累计识别</div>
            <div className="text-gray-900">856 个</div>
            <div className="text-green-600">↑ 12.5%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-1">本月累计闭环</div>
            <div className="text-gray-900">763 个</div>
            <div className="text-green-600">↑ 8.3%</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-1">闭环率</div>
            <div className="text-gray-900">89.1%</div>
            <div className="text-red-600">↓ 3.2%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
