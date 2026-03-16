import { useState } from "react";
import { Plus, Edit, Trash2, Palette } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AddDefectTypeDialog } from "./AddDefectTypeDialog";

interface DefectType {
  id: string;
  name: string;
  color: string;
  description: string;
  count: number;
}

export function DefectTypeManagement() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const defectTypes: DefectType[] = [
    { id: "1", name: "裂缝", color: "#3b82f6", description: "混凝土或衬砌结构出现的裂纹", count: 342 },
    { id: "2", name: "渗水", color: "#06b6d4", description: "隧道内出现的渗水、漏水现象", count: 215 },
    { id: "3", name: "沉降", color: "#8b5cf6", description: "地基或结构沉降变形", count: 156 },
    { id: "4", name: "腐蚀", color: "#f59e0b", description: "钢筋或金属件的腐蚀锈蚀", count: 98 },
    { id: "5", name: "剥落", color: "#ef4444", description: "混凝土表面剥落脱落", count: 67 },
    { id: "6", name: "错台", color: "#ec4899", description: "接缝处出现高低差", count: 45 },
    { id: "7", name: "其他", color: "#6b7280", description: "其他类型缺陷", count: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">缺陷分类管理</h3>
          <p className="text-gray-600">管理缺陷类型和颜色标签</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加类型
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>缺陷类型</TableHead>
              <TableHead>颜色标签</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>识别数量</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {defectTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell>
                  <span className="text-gray-900">{type.name}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span className="text-gray-600">{type.color}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{type.description}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-900">{type.count} 个</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Palette className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" disabled={type.count > 0}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 提示信息 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-gray-900 mb-2">使用说明</h4>
        <div className="text-gray-600 space-y-1">
          <div>• 颜色标签将用于图表展示和缺陷标注</div>
          <div>• 已有识别记录的类型无法删除，只能禁用</div>
          <div>• 建议使用高对比度颜色以便区分</div>
        </div>
      </div>

      {showAddDialog && (
        <AddDefectTypeDialog onClose={() => setShowAddDialog(false)} />
      )}
    </div>
  );
}
