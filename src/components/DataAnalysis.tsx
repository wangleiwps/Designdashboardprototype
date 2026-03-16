import { Card } from "./ui/card";
import { AnalysisFilters } from "./AnalysisFilters";
import { TrendChart } from "./TrendChart";
import { DefectDistributionChart } from "./DefectDistributionChart";
import { TimeStatistics } from "./TimeStatistics";
import { ExportActions } from "./ExportActions";

export function DataAnalysis() {
  return (
    <div className="space-y-6">
      {/* 页面标题和导出操作 */}
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">数据分析</h2>
        <ExportActions />
      </div>
      
      {/* 筛选器 */}
      <Card className="p-6">
        <AnalysisFilters />
      </Card>
      
      {/* 趋势折线图 */}
      <TrendChart />
      
      {/* 缺陷类型分布 */}
      <DefectDistributionChart />
      
      {/* 时间统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeStatistics />
      </div>
    </div>
  );
}
