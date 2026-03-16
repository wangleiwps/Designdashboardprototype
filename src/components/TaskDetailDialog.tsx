import { AlertCircle, CheckCircle2, Clock, MapPin, Upload, X, XCircle } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Task } from "./ClosedLoopManagement";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface TaskDetailDialogProps {
  task: Task;
  onClose: () => void;
}

interface DetectionItem {
  defect_type: string;
  confidence: number;
}

interface PredictResponse {
  detections?: DetectionItem[];
  result_image_base64?: string;
  error?: string;
}

export function TaskDetailDialog({ task, onClose }: TaskDetailDialogProps) {
  const [beforeImages, setBeforeImages] = useState<string[]>(task.processingInfo?.beforeImages || []);
  const [afterImages, setAfterImages] = useState<string[]>(task.processingInfo?.afterImages || []);
  const [description, setDescription] = useState(task.processingInfo?.description || "");
  const [detectedType, setDetectedType] = useState(task.defectInfo.type);
  const [detectedConfidence, setDetectedConfidence] = useState(task.defectInfo.confidence);
  const [predictError, setPredictError] = useState("");
  const [isPredicting, setIsPredicting] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const openUploadDialog = () => {
    inputRef.current?.click();
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsPredicting(true);
    setPredictError("");

    try {
      const [originImage, response] = await Promise.all([
        fileToDataUrl(file),
        (async () => {
          const formData = new FormData();
          formData.append("image", file);
          return fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: formData,
          });
        })(),
      ]);

      const result = (await response.json()) as PredictResponse;
      if (!response.ok) {
        throw new Error(result.error || "识别失败");
      }

      const detections = Array.isArray(result.detections) ? result.detections : [];
      const resultImage = result.result_image_base64
        ? `data:image/jpeg;base64,${result.result_image_base64}`
        : originImage;

      setBeforeImages([originImage]);
      setAfterImages([resultImage]);

      if (detections.length > 0) {
        setDetectedType(detections.map((item) => item.defect_type).join(" / "));
        setDetectedConfidence(Math.max(...detections.map((item) => Number(item.confidence) || 0)));
        setDescription(
          detections
            .map((item) => `${item.defect_type} ${(Number(item.confidence) * 100).toFixed(1)}%`)
            .join("；"),
        );
      } else {
        setDetectedType("未识别到缺陷");
        setDetectedConfidence(0);
        setDescription("未识别到缺陷");
      }
    } catch (error) {
      setPredictError(error instanceof Error ? error.message : "识别失败");
    } finally {
      setIsPredicting(false);
      event.target.value = "";
    }
  };

  const removeImage = (type: "before" | "after", index: number) => {
    if (type === "before") {
      setBeforeImages(beforeImages.filter((_, i) => i !== index));
    } else {
      setAfterImages(afterImages.filter((_, i) => i !== index));
    }
  };

  const canSubmit =
    task.currentStatus === "待处理" ||
    task.currentStatus === "处理中" ||
    task.currentStatus === "已驳回";
  const isReviewing = task.currentStatus === "待审核";
  const isPassed = task.currentStatus === "已通过";
  const isRejected = task.currentStatus === "已驳回";
  const readonlyBeforeImages = task.processingInfo?.beforeImages || [];
  const readonlyAfterImages = task.processingInfo?.afterImages || [];
  const displayOriginalImage = beforeImages[0] || task.defectInfo.image;
  const displayResultImage = afterImages[0] || task.defectInfo.image;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div>
            <h2 className="text-gray-900 mb-1">处理任务详情</h2>
            <p className="text-blue-600">{task.defectNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={openUploadDialog}
              disabled={isPredicting}
            >
              <Upload className="w-4 h-4" />
              {isPredicting ? "加载中..." : "上传图片"}
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
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

          <div className="space-y-4">
            <h3 className="text-gray-900">缺陷原图与识别详情</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="space-y-2">
                  <div className="text-gray-600">原图</div>
                  <div className="relative rounded-lg overflow-hidden border">
                    <ImageWithFallback
                      src={displayOriginalImage}
                      alt="原图"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-600">识别结果图</div>
                  <div className="relative rounded-lg overflow-hidden border">
                    <ImageWithFallback
                      src={displayResultImage}
                      alt="识别结果图"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>

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
                    <div className="text-gray-900">{detectedType}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">!</div>
                  <div>
                    <div className="text-gray-600 mb-1">严重程度</div>
                    <Badge variant={getSeverityVariant(task.defectInfo.severity)}>
                      {task.defectInfo.severity}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-400 mt-0.5">%</div>
                  <div>
                    <div className="text-gray-600 mb-1">识别置信度</div>
                    <div className="text-gray-900">{(detectedConfidence * 100).toFixed(1)}%</div>
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

          {canSubmit && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-gray-900">处理反馈</h3>
              </div>

              <div className="space-y-2">
                <label className="text-gray-900">上传图片区域</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {beforeImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={img}
                        alt="原图"
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
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-900">识别结果图区域</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {afterImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <ImageWithFallback
                        src={img}
                        alt="识别结果图"
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
                </div>
              </div>

              {predictError && <div className="text-sm text-red-600">{predictError}</div>}

              <div className="space-y-2">
                <label className="text-gray-900">识别结果说明</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="识别结果会自动填充到这里"
                  rows={4}
                />
              </div>
            </div>
          )}

          {(isReviewing || isPassed || isRejected) && task.processingInfo && (
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">处理反馈</h3>
                {task.processingInfo.submittedTime && (
                  <span className="text-gray-600">提交时间：{task.processingInfo.submittedTime}</span>
                )}
              </div>

              {readonlyBeforeImages.length > 0 && (
                <div className="space-y-2">
                  <label className="text-gray-900">处理前照片</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {readonlyBeforeImages.map((img, index) => (
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

              {readonlyAfterImages.length > 0 && (
                <div className="space-y-2">
                  <label className="text-gray-900">处理后照片</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {readonlyAfterImages.map((img, index) => (
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

              <div className="space-y-2">
                <label className="text-gray-900">修复说明</label>
                <div className="p-4 bg-gray-50 rounded-lg border text-gray-900">
                  {task.processingInfo.description}
                </div>
              </div>

              {isReviewing && (
                <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-900">审核状态：{task.reviewStatus}</span>
                </div>
              )}

              {isPassed && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-900">审核已通过，任务已闭环</span>
                </div>
              )}

              {isRejected && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <div className="flex-1">
                      <div className="text-red-900">审核未通过，请重新处理</div>
                      <div className="text-red-700 mt-1">当前结果未达到要求，需要继续处理。</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t">
            {canSubmit && (
              <>
                <Button className="flex-1" disabled={!description || afterImages.length === 0}>
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
