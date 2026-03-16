import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AddUserDialogProps {
  onClose: () => void;
}

export function AddUserDialog({ onClose }: AddUserDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-gray-900">添加用户</h3>
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
              <Label htmlFor="name">姓名 *</Label>
              <Input id="name" placeholder="请输入姓名" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">用户名 *</Label>
              <Input id="username" placeholder="请输入用户名" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码 *</Label>
              <Input id="password" type="password" placeholder="请输入密码" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">角色 *</Label>
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
              <Label htmlFor="email">邮箱</Label>
              <Input id="email" type="email" placeholder="请输入邮箱" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">手机号 *</Label>
              <Input id="phone" placeholder="请输入手机号" />
            </div>
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
