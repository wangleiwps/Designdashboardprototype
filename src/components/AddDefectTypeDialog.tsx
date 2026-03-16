import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface AddDefectTypeDialogProps {
  onClose: () => void;
}

export function AddDefectTypeDialog({ onClose }: AddDefectTypeDialogProps) {
  const presetColors = [
    "#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b",
    "#ef4444", "#ec4899", "#10b981", "#6366f1",
    "#84cc16", "#f97316", "#14b8a6", "#a855f7"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-gray-900">添加缺陷类型</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type-name">类型名称 *</Label>
            <Input id="type-name" placeholder="例如：裂缝、渗水等" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-color">颜色标签 *</Label>
            <div className="flex items-center gap-3">
              <Input
                id="type-color"
                type="color"
                defaultValue="#3b82f6"
                className="w-20 h-10"
              />
              <Input
                placeholder="#3b82f6"
                defaultValue="#3b82f6"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>预设颜色</Label>
            <div className="grid grid-cols-12 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="w-full h-10 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-description">描述</Label>
            <Textarea
              id="type-description"
              placeholder="请描述该类型缺陷的特征..."
              rows={3}
            />
          </div>
        </div>

        {/* 底部 */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button>确定添加</Button>
        </div>
      </div>
    </div>
  );
}
