import { Card } from "./ui/card";
import { TaskFilters } from "./TaskFilters";
import { TaskList } from "./TaskList";
import { TaskDetailDialog } from "./TaskDetailDialog";
import { useState } from "react";

export interface Task {
  id: string;
  defectNumber: string;
  currentStatus: "待指派" | "待处理" | "处理中" | "待审核" | "已通过" | "已驳回";
  assignedBy: string;
  handler: string;
  deadline: string;
  reviewStatus: "未审核" | "系统审核中" | "人工审核中" | "已通过" | "已驳回";
  defectInfo: {
    type: string;
    severity: string;
    location: string;
    image: string;
    time: string;
    confidence: number;
  };
  processingInfo?: {
    beforeImages: string[];
    afterImages: string[];
    description: string;
    submittedTime?: string;
  };
}

export function ClosedLoopManagement() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <Card className="p-6">
        <h2 className="text-gray-900 mb-6">闭环管理</h2>
        
        {/* 筛选区 */}
        <TaskFilters />
        
        {/* 列表视图 */}
        <TaskList onViewDetail={setSelectedTask} />
      </Card>
      
      {/* 详情弹窗 */}
      {selectedTask && (
        <TaskDetailDialog 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </>
  );
}
