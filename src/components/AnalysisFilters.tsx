import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";

export function AnalysisFilters() {
  return (
    <div className="space-y-4">
      <h3 className="text-gray-900">统计时间范围</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 时间范围类型 */}
        <Select defaultValue="month">
          <SelectTrigger>
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="选择统计周期" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">按周统计</SelectItem>
            <SelectItem value="month">按月统计</SelectItem>
            <SelectItem value="quarter">按季度统计</SelectItem>
            <SelectItem value="year">按年统计</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 具体时间范围 */}
        <Select defaultValue="current">
          <SelectTrigger>
            <SelectValue placeholder="选择时间" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">本月</SelectItem>
            <SelectItem value="last">上月</SelectItem>
            <SelectItem value="last3">近3个月</SelectItem>
            <SelectItem value="last6">近6个月</SelectItem>
            <SelectItem value="last12">近12个月</SelectItem>
            <SelectItem value="custom">自定义</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 区间筛选 */}
        <Select defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="选择区间" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部区间</SelectItem>
            <SelectItem value="ab">AB区间</SelectItem>
            <SelectItem value="bc">BC区间</SelectItem>
            <SelectItem value="cd">CD区间</SelectItem>
          </SelectContent>
        </Select>
        
        {/* 应用按钮 */}
        <Button>应用筛选</Button>
      </div>
    </div>
  );
}
