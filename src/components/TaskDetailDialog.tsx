import { X, MapPin, AlertCircle, UserCircle, Clock, Upload, Image as ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Task } from "./ClosedLoopManagement";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface TaskDetailDialogProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetailDialog({ task, onClose }: TaskDetailDialogProps) {
  const [beforeImages, setBeforeImages] = useState<string[]>(task.processingInfo?.beforeImages || []);
  const [afterImages, setAfterImages] = useState<string[]>(task.processingInfo?.afterImages || []);
  const [description, setDescription] = useState(task.processingInfo?.description || "");

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

  const handleImageUpload = (type: "before" | "after") => {
    // 模拟上传图片
    const mockImageUrl = "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=400&h=300&fit=crop";
    if (type === "before") {
      setBeforeImages([...beforeImages, mockImageUrl]);
    } else {
      setAfterImages([...afterImages, mockImageUrl]);
    }
  };

  const removeImage = (type: "before" | "after", index: number) => {
    if (type === "before") {
      setBeforeImages(beforeImages.filter((_, i) => i !== index));
    } else {
      setAfterImages(afterImages.filter((_, i) => i !== index));
    }
  };

  const canSubmit = task.currentStatus === "待处理" || task.currentStatus === "处理中" || task.currentStatus === "已驳回";
  const isReviewing = task.currentStatus === "待审核";
  const isPassed = task.currentStatus === "已通过";
  const isRejected = task.currentStatus === "已驳回";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-gray-900 mb-1">处理任务详情</h2>
            <p className="text-blue-600">{task.defectNumber}</p>
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
          {/* 任务状态卡片 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-gray-600 mb-1">当前状态</div>
                <div className="text-gray-900">{task.currentStatus}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">指派人</div>
                <div className="text-gray-900">{task.assignedBy}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">处理人</div>
                <div className="text-gray-900">{task.handler}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">截止时间</div>
                <div className="text-gray-900">{task.deadline}</div>
              </div>
            </div>
          </div>

          {/* 缺陷原图与识别详情 */}
          <div className="space-y-4">
            <h3 className="text-gray-900">缺陷原图与识别详情</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 左侧：缺陷图片 */}
              <div className="space-y-2">
                <div className="relative rounded-lg overflow-hidden border">
                  <ImageWithFallback
                    src={task.defectInfo.image}
                    alt={task.defectInfo.type}
                    className="w-full h-64 object-cover"
                  />
                  {/* 模拟检测框 */}
                  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-red-500 bg-red-500/10">
                    <div className="absolute -top-6 left-0 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      {task.defectInfo.type} {(task.defectInfo.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧：详细信息 */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">位置</div>
                    <div className="text-gray-900">{task.defectInfo.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">缺陷类型</div>
                    <div className="text-gray-900">{task.defectInfo.type}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">⚠️</div>
                  <div>
                    <div className="text-gray-600 mb-1">严重程度</div>
                    <Badge variant={getSeverityVariant(task.defectInfo.severity)}>
                      {task.defectInfo.severity}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">📊</div>
                  <div>
                    <div className="text-gray-600 mb-1">识别置信度</div>
                    <div className="text-gray-900">
                      {(task.defectInfo.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-600 mb-1">识别时间</div>
                    <div className="text-gray-900">{task.defectInfo.time}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 处理反馈上传区域 */}
          {canSubmit && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-gray-900">处理反馈</h3>
              
              {/* 处理前照片 */}
              <div className="space-y-2">
                <label className="text-gray-900">处理前照片</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {beforeImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={img}
                        alt="处理前"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage("before", index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleImageUpload("before")}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-gray-600">上传照片</span>
                  </button>
                </div>
              </div>
              
              {/* 处理后照片 */}
              <div className="space-y-2">
                <label className="text-gray-900">处理后照片</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {afterImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={img}
                        alt="处理后"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage("after", index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleImageUpload("after")}
                    className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-gray-600">上传照片</span>
                  </button>
                </div>
              </div>
              
              {/* 修复说明 */}
              <div className="space-y-2">
                <label className="text-gray-900">修复说明</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请详细描述处理过程、使用的材料和方法..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* 已提交的处理信息（只读） */}
          {(isReviewing || isPassed || isRejected) && task.processingInfo && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">处理反馈</h3>
                {task.processingInfo.submittedTime && (
                  <span className="text-gray-600">
                    提交时间：{task.processingInfo.submittedTime}
                  </span>
                )}
              </div>
              
              {/* 处理前照片 */}
              {task.processingInfo.beforeImages.length > 0 && (
                <div className="space-y-2">
                  <label className="text-gray-900">处理前照片</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {task.processingInfo.beforeImages.map((img, index) => (
                      <ImageWithFallback
                        key={index}
                        src={img}
                        alt="处理前"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* 处理后照片 */}
              {task.processingInfo.afterImages.length > 0 && (
                <div className="space-y-2">
                  <label className="text-gray-900">处理后照片</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {task.processingInfo.afterImages.map((img, index) => (
                      <ImageWithFallback
                        key={index}
                        src={img}
                        alt="处理后"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* 修复说明 */}
              <div className="space-y-2">
                <label className="text-gray-900">修复说明</label>
                <div className="p-4 bg-gray-50 rounded-lg border text-gray-900">
                  {task.processingInfo.description}
                </div>
              </div>

              {/* 审核状态提示 */}
              {isReviewing && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-900">
                    审核状态：{task.reviewStatus}
                  </span>
                </div>
              )}

              {isPassed && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">
                    审核已通过，任务已闭环
                  </span>
                </div>
              )}

              {isRejected && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <div className="text-red-900">审核未通过，请重新处理</div>
                      <div className="text-red-700 mt-1">驳回原因：处理不够彻底，需要进一步加固</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4 border-t">
            {canSubmit && (
              <>
                <Button 
                  className="flex-1"
                  disabled={!description || afterImages.length === 0}
                >
                  提交处理（系统审核）
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  disabled={!description || afterImages.length === 0}
                >
                  提交处理（人工审核）
                </Button>
              </>
            )}
            {isReviewing && (
              <Button variant="outline" className="flex-1">
                查看审核进度
              </Button>
            )}
            {isPassed && (
              <Button variant="outline" className="flex-1">
                下载处理报告
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
