import { Eye, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Task } from "./ClosedLoopManagement";

interface TaskListProps {
  onViewDetail: (task: Task) => void;
}

export function TaskList({ onViewDetail }: TaskListProps) {
  // 模拟数据
  const tasks: Task[] = [
    {
      id: "1",
      defectNumber: "DEF-2024-1115-001",
      currentStatus: "待处理",
      assignedBy: "王主管",
      handler: "张工",
      deadline: "2024-11-16 18:00",
      reviewStatus: "未审核",
      defectInfo: {
        type: "裂缝",
        severity: "严重",
        location: "AB区间左线321环",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
        time: "2024-11-15 14:23:15",
        confidence: 0.95,
      },
    },
    {
      id: "2",
      defectNumber: "DEF-2024-1115-002",
      currentStatus: "处理中",
      assignedBy: "王主管",
      handler: "李工",
      deadline: "2024-11-17 18:00",
      reviewStatus: "未审核",
      defectInfo: {
        type: "渗水",
        severity: "中等",
        location: "BC区间右线158环",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
        time: "2024-11-15 13:45:32",
        confidence: 0.88,
      },
      processingInfo: {
        beforeImages: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop"],
        afterImages: [],
        description: "正在进行防水处理...",
      },
    },
    {
      id: "3",
      defectNumber: "DEF-2024-1115-003",
      currentStatus: "待审核",
      assignedBy: "李主管",
      handler: "王工",
      deadline: "2024-11-16 18:00",
      reviewStatus: "系统审核中",
      defectInfo: {
        type: "沉降",
        severity: "严重",
        location: "CD区间左线445环",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
        time: "2024-11-15 12:10:48",
        confidence: 0.92,
      },
      processingInfo: {
        beforeImages: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop"],
        afterImages: ["https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400&h=300&fit=crop"],
        description: "已完成加固处理，沉降问题已解决",
        submittedTime: "2024-11-15 16:30:00",
      },
    },
    {
      id: "4",
      defectNumber: "DEF-2024-1114-015",
      currentStatus: "已通过",
      assignedBy: "王主管",
      handler: "赵工",
      deadline: "2024-11-15 18:00",
      reviewStatus: "已通过",
      defectInfo: {
        type: "腐蚀",
        severity: "轻微",
        location: "AB区间右线267环",
        image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop",
        time: "2024-11-14 11:30:22",
        confidence: 0.78,
      },
      processingInfo: {
        beforeImages: ["https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop"],
        afterImages: ["https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop"],
        description: "已完成防腐处理并涂装保护层",
        submittedTime: "2024-11-14 17:00:00",
      },
    },
    {
      id: "5",
      defectNumber: "DEF-2024-1114-012",
      currentStatus: "已驳回",
      assignedBy: "李主管",
      handler: "刘工",
      deadline: "2024-11-15 18:00",
      reviewStatus: "已驳回",
      defectInfo: {
        type: "裂缝",
        severity: "中等",
        location: "BC区间左线89环",
        image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop",
        time: "2024-11-14 10:15:07",
        confidence: 0.85,
      },
      processingInfo: {
        beforeImages: ["https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop"],
        afterImages: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop"],
        description: "已填补裂缝",
        submittedTime: "2024-11-14 16:00:00",
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "待指派":
        return "bg-gray-100 text-gray-700";
      case "待处理":
        return "bg-orange-100 text-orange-700";
      case "处理中":
        return "bg-blue-100 text-blue-700";
      case "待审核":
        return "bg-yellow-100 text-yellow-700";
      case "已通过":
        return "bg-green-100 text-green-700";
      case "已驳回":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case "未审核":
        return "bg-gray-100 text-gray-700";
      case "系统审核中":
        return "bg-blue-100 text-blue-700";
      case "人工审核中":
        return "bg-purple-100 text-purple-700";
      case "已通过":
        return "bg-green-100 text-green-700";
      case "已驳回":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>缺陷编号</TableHead>
            <TableHead>当前状态</TableHead>
            <TableHead>指派人</TableHead>
            <TableHead>处理人</TableHead>
            <TableHead>处理截止时间</TableHead>
            <TableHead>审核状态</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <span className="text-blue-600">{task.defectNumber}</span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.currentStatus)}`}>
                  {task.currentStatus}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-600">{task.assignedBy}</span>
              </TableCell>
              <TableCell>
                <span className="text-gray-900">{task.handler}</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {isOverdue(task.deadline) && task.currentStatus !== "已通过" && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <div>
                    <div className={task.currentStatus === "待处理" && isOverdue(task.deadline) ? "text-red-600" : "text-gray-600"}>
                      {task.deadline.split(" ")[0]}
                    </div>
                    <div className="text-gray-500">
                      {task.deadline.split(" ")[1]}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-xs ${getReviewStatusColor(task.reviewStatus)}`}>
                  {task.reviewStatus}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetail(task)}
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
          显示 1-5 条，共 89 条记录
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
