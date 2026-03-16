import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";

export function TimeStatistics() {
  const closedLoopData = [
    { range: "0-24h", count: 342, color: "#10b981" },
    { range: "24-48h", count: 256, color: "#3b82f6" },
    { range: "48-72h", count: 128, color: "#f59e0b" },
    { range: "72h+", count: 37, color: "#ef4444" },
  ];

  const responseData = [
    { range: "0-2h", count: 412, color: "#10b981" },
    { range: "2-4h", count: 289, color: "#3b82f6" },
    { range: "4-8h", count: 123, color: "#f59e0b" },
    { range: "8h+", count: 32, color: "#ef4444" },
  ];

  return (
    <>
      {/* 平均闭环时间统计 */}
      <Card>
        <CardHeader>
          <CardTitle>平均闭环时间统计</CardTitle>
          <p className="text-gray-600">从识别到闭环完成的时间分布</p>
        </CardHeader>
        <CardContent>
          {/* 关键指标 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-gray-600">平均闭环时间</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900">32.5 小时</span>
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  -8.2%
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-gray-600">24h内闭环率</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900">44.8%</span>
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +5.3%
                </span>
              </div>
            </div>
          </div>
          
          {/* 柱状图 */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={closedLoopData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="缺陷数量">
                {closedLoopData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* 统计明细 */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {closedLoopData.map((item) => (
              <div key={item.range} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">{item.range}</div>
                <div className="text-gray-900">{item.count} 个</div>
                <div className="text-gray-600">
                  {((item.count / closedLoopData.reduce((sum, d) => sum + d.count, 0)) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 任务响应时间统计 */}
      <Card>
        <CardHeader>
          <CardTitle>任务响应时间统计</CardTitle>
          <p className="text-gray-600">从识别到开始处理的响应时间分布</p>
        </CardHeader>
        <CardContent>
          {/* 关键指标 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-gray-600">平均响应时间</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900">3.2 小时</span>
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  -12.5%
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-gray-600">2h内响应率</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-gray-900">48.1%</span>
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +7.8%
                </span>
              </div>
            </div>
          </div>
          
          {/* 柱状图 */}
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={responseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="任务数量">
                {responseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          {/* 统计明细 */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {responseData.map((item) => (
              <div key={item.range} className="text-center p-2 bg-gray-50 rounded">
                <div className="text-gray-600 mb-1">{item.range}</div>
                <div className="text-gray-900">{item.count} 个</div>
                <div className="text-gray-600">
                  {((item.count / responseData.reduce((sum, d) => sum + d.count, 0)) * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
