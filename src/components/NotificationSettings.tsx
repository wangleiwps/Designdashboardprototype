import { Save, Mail, MessageSquare, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-gray-900">通知配置</h3>
        <p className="text-gray-600">设置短信和邮箱提醒通知</p>
      </div>

      {/* 短信通知设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <CardTitle>短信通知设置</CardTitle>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>短信服务商</Label>
              <Input defaultValue="阿里云短信" disabled />
            </div>
            <div className="space-y-2">
              <Label>API密钥</Label>
              <Input type="password" defaultValue="••••••••••••" />
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <Label>通知场景</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">新缺陷识别</div>
                  <div className="text-gray-600">识别到新缺陷时通知相关人员</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">任务指派</div>
                  <div className="text-gray-600">任务被指派时通知处理人</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">超时预警</div>
                  <div className="text-gray-600">任务即将超时时发送预警</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">审核结果</div>
                  <div className="text-gray-600">审核通过或驳回时通知处理人</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Label>短信模板</Label>
            <Textarea
              defaultValue="【隧道缺陷管理】您有新的缺陷处理任务，位置：{location}，类型：{type}，截止时间：{deadline}。请及时处理。"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* 邮件通知设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              <CardTitle>邮件通知设置</CardTitle>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>SMTP服务器</Label>
              <Input defaultValue="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label>端口</Label>
              <Input type="number" defaultValue="465" />
            </div>
            <div className="space-y-2">
              <Label>发件邮箱</Label>
              <Input type="email" defaultValue="system@example.com" />
            </div>
            <div className="space-y-2">
              <Label>授权码</Label>
              <Input type="password" defaultValue="••••••••••••" />
            </div>
          </div>

          <div className="space-y-3 border-t pt-4">
            <Label>通知场景</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">日报/周报</div>
                  <div className="text-gray-600">定期发送统计报表</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">严重缺陷预警</div>
                  <div className="text-gray-600">识别到严重缺陷时发送邮件</div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">闭环完成通知</div>
                  <div className="text-gray-600">缺陷处理闭环完成时通知</div>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">系统异常告警</div>
                  <div className="text-gray-600">系统出现异常时发送告警邮件</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t pt-4">
            <Label>收件人列表（多个邮箱用逗号分隔）</Label>
            <Textarea
              placeholder="admin@example.com, manager@example.com"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* 系统内通知 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-600" />
              <CardTitle>系统内通知</CardTitle>
            </div>
            <Switch defaultChecked />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-900">浏览器桌面通知</div>
                <div className="text-gray-600">在浏览器中显示桌面通知</div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-900">声音提示</div>
                <div className="text-gray-600">收到新通知时播放提示音</div>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-gray-900">消息保留时间</div>
                <div className="text-gray-600">系统消息的保留天数</div>
              </div>
              <Input type="number" defaultValue="30" className="w-24" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">测试通知</Button>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          保存设置
        </Button>
      </div>
    </div>
  );
}
