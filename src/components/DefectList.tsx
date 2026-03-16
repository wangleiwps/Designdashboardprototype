import { Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { DefectRecord } from "./DefectRecords";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DefectListProps {
  onViewDetail: (defect: DefectRecord) => void;
}

export function DefectList({ onViewDetail }: DefectListProps) {
  // 模拟数据
  const defects: DefectRecord[] = [
    {
      id: "1",
      number: "DEF-2024-1115-001",
      time: "2024-11-15 14:23:15",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop",
      type: "裂缝",
      severity: "严重",
      status: "待处理",
      location: "AB区间左线321环",
      confidence: 0.95,
      uploader: "张工",
      method: "AI识别",
    },
    {
      id: "2",
      number: "DEF-2024-1115-002",
      time: "2024-11-15 13:45:32",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=150&fit=crop",
      type: "渗水",
      severity: "中等",
      status: "处理中",
      location: "BC区间右线158环",
      confidence: 0.88,
      uploader: "李工",
      method: "AI识别",
    },
    {
      id: "3",
      number: "DEF-2024-1115-003",
      time: "2024-11-15 12:10:48",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=150&fit=crop",
      type: "沉降",
      severity: "严重",
      status: "待处理",
      location: "CD区间左线445环",
      confidence: 0.92,
      uploader: "王工",
      method: "人工识别",
    },
    {
      id: "4",
      number: "DEF-2024-1115-004",
      time: "2024-11-15 11:30:22",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=200&h=150&fit=crop",
      type: "腐蚀",
      severity: "轻微",
      status: "已闭环",
      location: "AB区间右线267环",
      confidence: 0.78,
      uploader: "赵工",
      method: "AI识别",
    },
    {
      id: "5",
      number: "DEF-2024-1115-005",
      time: "2024-11-15 10:15:07",
      image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=200&h=150&fit=crop",
      type: "裂缝",
      severity: "中等",
      status: "处理中",
      location: "BC区间左线89环",
      confidence: 0.85,
      uploader: "刘工",
      method: "AI识别",
    },
  ];

  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "严重":
        return "destructive";
      case "中等":
        return "default";
      case "轻微":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待处理":
        return "bg-red-100 text-red-700";
      case "处理中":
        return "bg-yellow-100 text-yellow-700";
      case "已闭环":
        return "bg-green-100 text-green-700";
      case "误识别":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>缺陷编号</TableHead>
            <TableHead>时间</TableHead>
            <TableHead>图片缩略图</TableHead>
            <TableHead>位置</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>严重程度</TableHead>
            <TableHead>状态</TableHead>
            <TableHead>识别方式</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {defects.map((defect) => (
            <TableRow key={defect.id}>
              <TableCell>
                <span className="text-blue-600">{defect.number}</span>
              </TableCell>
              <TableCell>
                <div className="text-gray-600">
                  {defect.time.split(" ")[0]}
                  <br />
                  <span>{defect.time.split(" ")[1]}</span>
                </div>
              </TableCell>
              <TableCell>
                <ImageWithFallback
                  src={defect.image}
                  alt={defect.type}
                  className="w-20 h-14 object-cover rounded"
                />
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{defect.location}</span>
              </TableCell>
              <TableCell>{defect.type}</TableCell>
              <TableCell>
                <Badge variant={getSeverityVariant(defect.severity)}>
                  {defect.severity}
                </Badge>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(defect.status)}`}>
                  {defect.status}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{defect.method}</span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetail(defect)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  查看
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* 分页 */}
      <div className="flex items-center justify-between px-6 py-4 border-t">
        <div className="text-gray-600">
          显示 1-5 条，共 127 条记录
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            上一页
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
