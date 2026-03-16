import { Search, Calendar, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export function SearchFilters() {
  return (
    <div className="space-y-4 mb-6 pb-6 border-b">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="搜索缺陷编号、位置..."
          className="pl-10"
        />
      </div>
      
      {/* 筛选项 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 时间范围 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="时间范围" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部时间</SelectItem>
            <SelectItem value="today">今天</SelectItem>
            <SelectItem value="week">近7天</SelectItem>
            <SelectItem value="month">近30天</SelectItem>
            <SelectItem value="custom">自定义</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 缺陷类型 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="缺陷类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部类型</SelectItem>
            <SelectItem value="crack">裂缝</SelectItem>
            <SelectItem value="water">渗水</SelectItem>
            <SelectItem value="settle">沉降</SelectItem>
            <SelectItem value="corrosion">腐蚀</SelectItem>
            <SelectItem value="other">其他</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 状态 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="pending">待处理</SelectItem>
            <SelectItem value="processing">处理中</SelectItem>
            <SelectItem value="closed">已闭环</SelectItem>
            <SelectItem value="false">误识别</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 识别方式 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="识别方式" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部方式</SelectItem>
            <SelectItem value="ai">AI识别</SelectItem>
            <SelectItem value="manual">人工识别</SelectItem>
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
