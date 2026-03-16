import { FileSpreadsheet, FileText, Download } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ExportActions() {
  const handleExport = (type: string) => {
    // 模拟导出功能
    alert(`正在导出${type}文件...`);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={() => handleExport("Excel")}
      >
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        导出Excel
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            导出PDF报告
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport("PDF-简版")}>
            <FileText className="w-4 h-4 mr-2" />
            导出简版报告
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("PDF-完整版")}>
            <FileText className="w-4 h-4 mr-2" />
            导出完整版报告
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("PDF-汇报版")}>
            <FileText className="w-4 h-4 mr-2" />
            导出汇报版报告
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
