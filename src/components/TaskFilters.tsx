import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export function TaskFilters() {
  return (
    <div className="space-y-4 mb-6 pb-6 border-b">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="搜索缺陷编号、处理人..."
          className="pl-10"
        />
      </div>
      
      {/* 筛选项 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 当前状态 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="当前状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="assign">待指派</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="processing">处理中</SelectItem>
            <SelectItem value="review">待审核</SelectItem>
            <SelectItem value="passed">已通过</SelectItem>
            <SelectItem value="rejected">已驳回</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 审核状态 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="审核状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部审核状态</SelectItem>
            <SelectItem value="none">未审核</SelectItem>
            <SelectItem value="auto">系统审核中</SelectItem>
            <SelectItem value="manual">人工审核中</SelectItem>
            <SelectItem value="passed">已通过</SelectItem>
            <SelectItem value="rejected">已驳回</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 处理人 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="处理人" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部处理人</SelectItem>
            <SelectItem value="zhang">张工</SelectItem>
            <SelectItem value="li">李工</SelectItem>
            <SelectItem value="wang">王工</SelectItem>
            <SelectItem value="zhao">赵工</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* 操作按钮 */}
      <div className="flex gap-2">
        <Button variant="outline">重置筛选</Button>
        <Button>应用筛选</Button>
      </div>
    </div>
  );
}
