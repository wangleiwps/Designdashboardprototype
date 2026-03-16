import { Card } from "./ui/card";
import { SearchFilters } from "./SearchFilters";
import { DefectList } from "./DefectList";
import { DefectDetailDialog } from "./DefectDetailDialog";
import { useState } from "react";

export interface DefectRecord {
  id: string;
  number: string;
  time: string;
  image: string;
  type: string;
  severity: "轻微" | "中等" | "严重";
  status: "待处理" | "处理中" | "已闭环" | "误识别";
  location: string;
  confidence: number;
  uploader: string;
  method: "AI识别" | "人工识别";
}

export function DefectRecords() {
  const [selectedDefect, setSelectedDefect] = useState<DefectRecord | null>(null);

  return (
    <>
      <Card className="p-6">
        <h2 className="text-gray-900 mb-6">缺陷识别记录</h2>
        
        {/* 搜索筛选区 */}
        <SearchFilters />
        
        {/* 列表视图 */}
        <DefectList onViewDetail={setSelectedDefect} />
      </Card>
      
      {/* 详情弹窗 */}
      {selectedDefect && (
        <DefectDetailDialog 
          defect={selectedDefect} 
          onClose={() => setSelectedDefect(null)} 
        />
      )}
    </>
  );
}
