import { X, UserCircle, BrainCircuit, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { DefectRecord } from "./DefectRecords";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DefectDetailDialogProps {
  defect: DefectRecord;
  onClose: () => void;
}

export function DefectDetailDialog({ defect, onClose }: DefectDetailDialogProps) {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "严重":
        return "destructive";
      case "中等":
        return "default";
      case "轻微":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-gray-900 mb-1">缺陷详情</h2>
            <p className="text-blue-600">{defect.number}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 内容 */}
        <div className="p-6 space-y-6">
          {/* 大图展示 */}
          <div className="space-y-2">
            <h3 className="text-gray-900">缺陷图像</h3>
            <div className="relative rounded-lg overflow-hidden border">
              <ImageWithFallback
                src={defect.image}
                alt={defect.type}
                className="w-full h-96 object-cover"
              />
              {/* 模拟检测框 */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-red-500 bg-red-500/10">
                <div className="absolute -top-6 left-0 bg-red-500 text-white px-2 py-1 rounded text-xs">
                  {defect.type} {(defect.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          
          {/* 详细信息 */}
          <div className="grid grid-cols-2 gap-6">
            {/* 左列 */}
            <div className="space-y-4">
              <h3 className="text-gray-900">基本信息</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">位置</div>
                    <div className="text-gray-900">{defect.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">缺陷类型</div>
                    <div className="text-gray-900">{defect.type}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">⚠️</div>
                  <div>
                    <div className="text-gray-600 mb-1">严重程度</div>
                    <Badge variant={getSeverityVariant(defect.severity)}>
                      {defect.severity}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">📊</div>
                  <div>
                    <div className="text-gray-600 mb-1">识别置信度</div>
                    <div className="text-gray-900">
                      {(defect.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右列 */}
            <div className="space-y-4">
              <h3 className="text-gray-900">识别信息</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BrainCircuit className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">识别方式</div>
                    <div className="text-gray-900">{defect.method}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <UserCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">上传者</div>
                    <div className="text-gray-900">{defect.uploader}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">⏰</div>
                  <div>
                    <div className="text-gray-600 mb-1">识别时间</div>
                    <div className="text-gray-900">{defect.time}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">📋</div>
                  <div>
                    <div className="text-gray-600 mb-1">当前状态</div>
                    <div className="text-gray-900">{defect.status}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4 border-t">
            {defect.status === "待处理" && (
              <>
                <Button className="flex-1">
                  指派处理
                </Button>
                <Button variant="outline" className="flex-1">
                  标记为误识别
                </Button>
              </>
            )}
            {defect.status === "处理中" && (
              <Button className="flex-1">
                查看处理进度
              </Button>
            )}
            {defect.status === "已闭环" && (
              <Button variant="outline" className="flex-1">
                查看处理报告
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
