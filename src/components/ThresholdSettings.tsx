import { Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Slider } from "./ui/slider";

export function ThresholdSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-900">阈值设置</h3>
        <p className="text-gray-600">设置严重程度判断标准和处理时限</p>
      </div>

      {/* 严重程度判断标准 */}
      <Card>
        <CardHeader>
          <CardTitle>严重程度判断标准</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 裂缝 */}
          <div className="space-y-4">
            <h4 className="text-gray-900">裂缝</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>轻微（宽度 mm）</Label>
                <Input type="number" defaultValue="0.2" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>中等（宽度 mm）</Label>
                <Input type="number" defaultValue="0.5" step="0.1" />
              </div>
              <div className="space-y-2">
                <Label>严重（宽度 mm）</Label>
                <Input type="number" defaultValue="1.0" step="0.1" />
              </div>
            </div>
          </div>

          {/* 渗水 */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="text-gray-900">渗水</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>轻微（面积 cm²）</Label>
                <Input type="number" defaultValue="100" />
              </div>
              <div className="space-y-2">
                <Label>中等（面积 cm²）</Label>
                <Input type="number" defaultValue="500" />
              </div>
              <div className="space-y-2">
                <Label>严重（面积 cm²）</Label>
                <Input type="number" defaultValue="1000" />
              </div>
            </div>
          </div>

          {/* 沉降 */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="text-gray-900">沉降</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>轻微（差值 mm）</Label>
                <Input type="number" defaultValue="5" />
              </div>
              <div className="space-y-2">
                <Label>中等（差值 mm）</Label>
                <Input type="number" defaultValue="15" />
              </div>
              <div className="space-y-2">
                <Label>严重（差值 mm）</Label>
                <Input type="number" defaultValue="30" />
              </div>
            </div>
          </div>

          {/* AI识别置信度阈值 */}
          <div className="space-y-4 border-t pt-4">
            <h4 className="text-gray-900">AI识别置信度阈值</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>最低置信度要求</Label>
                  <span className="text-gray-900">75%</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} />
                <p className="text-gray-600">低于此阈值的识别结果将标记为"待人工确认"</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 处理时限设置 */}
      <Card>
        <CardHeader>
          <CardTitle>处理时限设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>轻微缺陷（小时）</Label>
              <Input type="number" defaultValue="72" />
              <p className="text-gray-600">默认 3 天</p>
            </div>
            <div className="space-y-2">
              <Label>中等缺陷（小时）</Label>
              <Input type="number" defaultValue="48" />
              <p className="text-gray-600">默认 2 天</p>
            </div>
            <div className="space-y-2">
              <Label>严重缺陷（小时）</Label>
              <Input type="number" defaultValue="24" />
              <p className="text-gray-600">默认 1 天</p>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Label>超时预警提前时间（小时）</Label>
            <Input type="number" defaultValue="4" />
            <p className="text-gray-600">在截止时间前多久开始预警提醒</p>
          </div>
        </CardContent>
      </Card>

      {/* 审核设置 */}
      <Card>
        <CardHeader>
          <CardTitle>审核设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>自动审核通过条件</Label>
            <div className="space-y-2 pl-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-images" defaultChecked />
                <Label htmlFor="auto-images" className="cursor-pointer">
                  已上传处理前后对比照片
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-description" defaultChecked />
                <Label htmlFor="auto-description" className="cursor-pointer">
                  已填写处理说明（≥20字）
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="auto-severity" />
                <Label htmlFor="auto-severity" className="cursor-pointer">
                  轻微缺陷可自动审核通过
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>
    </div>
  );
}
