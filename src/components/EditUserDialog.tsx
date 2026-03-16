import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  email: string;
  phone: string;
  status: "启用" | "禁用";
}

interface EditUserDialogProps {
  user: User;
  onClose: () => void;
}

export function EditUserDialog({ user, onClose }: EditUserDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-gray-900">编辑用户</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">姓名 *</Label>
              <Input id="edit-name" defaultValue={user.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-username">用户名 *</Label>
              <Input id="edit-username" defaultValue={user.username} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-role">角色 *</Label>
              <Select defaultValue="handler">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">管理员</SelectItem>
                  <SelectItem value="reviewer">审核员</SelectItem>
                  <SelectItem value="handler">处理员</SelectItem>
                  <SelectItem value="viewer">查看员</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">邮箱</Label>
              <Input id="edit-email" type="email" defaultValue={user.email} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone">手机号 *</Label>
              <Input id="edit-phone" defaultValue={user.phone} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-status">账号状态</Label>
              <div className="flex items-center gap-2 h-10">
                <Switch id="edit-status" defaultChecked={user.status === "启用"} />
                <span className="text-gray-600">
                  {user.status === "启用" ? "启用" : "禁用"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-password">重置密码（留空则不修改）</Label>
            <Input id="edit-password" type="password" placeholder="请输入新密码" />
          </div>
        </div>

        {/* 底部 */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button>保存修改</Button>
        </div>
      </div>
    </div>
  );
}
