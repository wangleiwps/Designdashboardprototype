import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

export function AlertPanel() {
  const alerts = [
    { id: 1, title: "严重裂缝待处理", location: "AB区间左线321环", time: "2小时前", severity: "严重" },
    { id: 2, title: "渗水问题待确认", location: "BC区间右线158环", time: "4小时前", severity: "中等" },
    { id: 3, title: "沉降监测异常", location: "CD区间左线445环", time: "6小时前", severity: "严重" },
  ];

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          待处理任务预警
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-white p-4 rounded-lg border border-red-100 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{alert.title}</span>
                  <Badge variant={alert.severity === "严重" ? "destructive" : "default"}>
                    {alert.severity}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span>📍 {alert.location}</span>
                  <span>⏱️ {alert.time}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                立即处理
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}