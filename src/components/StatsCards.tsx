import { Card, CardContent } from "./ui/card";
import { Eye, CheckCircle, CheckCheck } from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "今日识别数",
      value: "127",
      icon: Eye,
      color: "blue",
      trend: "+12%",
    },
    {
      title: "今日处理数",
      value: "89",
      icon: CheckCircle,
      color: "green",
      trend: "+8%",
    },
    {
      title: "今日闭环数",
      value: "76",
      icon: CheckCheck,
      color: "purple",
      trend: "+15%",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 mb-2">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-900">{stat.value}</span>
                    <span className="text-green-600">{stat.trend}</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    colorClasses[stat.color as keyof typeof colorClasses]
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
