import { useState } from "react";
import { Plus, Edit, Trash2, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AddUserDialog } from "./AddUserDialog";
import { EditUserDialog } from "./EditUserDialog";

interface User {
  id: string;
  name: string;
  username: string;
  role: "管理员" | "审核员" | "处理员" | "查看员";
  email: string;
  phone: string;
  status: "启用" | "禁用";
  lastLogin: string;
}

export function UserManagement() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const users: User[] = [
    {
      id: "1",
      name: "王主管",
      username: "wang_admin",
      role: "管理员",
      email: "wang@example.com",
      phone: "138****1234",
      status: "启用",
      lastLogin: "2024-11-15 14:23",
    },
    {
      id: "2",
      name: "李主管",
      username: "li_admin",
      role: "管理员",
      email: "li@example.com",
      phone: "139****5678",
      status: "启用",
      lastLogin: "2024-11-15 13:45",
    },
    {
      id: "3",
      name: "张工",
      username: "zhang_handler",
      role: "处理员",
      email: "zhang@example.com",
      phone: "136****9012",
      status: "启用",
      lastLogin: "2024-11-15 15:10",
    },
    {
      id: "4",
      name: "李工",
      username: "li_handler",
      role: "处理员",
      email: "li_handler@example.com",
      phone: "137****3456",
      status: "启用",
      lastLogin: "2024-11-15 14:50",
    },
    {
      id: "5",
      name: "王工",
      username: "wang_handler",
      role: "处理员",
      email: "wang_handler@example.com",
      phone: "135****7890",
      status: "启用",
      lastLogin: "2024-11-15 12:30",
    },
    {
      id: "6",
      name: "赵工",
      username: "zhao_handler",
      role: "处理员",
      email: "zhao@example.com",
      phone: "134****2345",
      status: "启用",
      lastLogin: "2024-11-15 11:20",
    },
    {
      id: "7",
      name: "刘工",
      username: "liu_handler",
      role: "处理员",
      email: "liu@example.com",
      phone: "133****6789",
      status: "禁用",
      lastLogin: "2024-11-10 09:15",
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "管理员":
        return <Badge variant="destructive">{role}</Badge>;
      case "审核员":
        return <Badge className="bg-purple-100 text-purple-700">{role}</Badge>;
      case "处理员":
        return <Badge className="bg-blue-100 text-blue-700">{role}</Badge>;
      case "查看员":
        return <Badge variant="secondary">{role}</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-900">用户列表</h3>
          <p className="text-gray-600">管理系统用户和权限配置</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>用户名</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>手机号</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>最后登录</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span className="text-gray-900">{user.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{user.username}</span>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>
                  <span className="text-gray-600">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{user.phone}</span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "启用"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-600">{user.lastLogin}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingUser(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 角色说明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-gray-900 mb-2">角色权限说明</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
          <div>• <strong>管理员</strong>：所有权限，可管理用户和系统设置</div>
          <div>• <strong>审核员</strong>：可审核处理结果，查看所有数据</div>
          <div>• <strong>处理员</strong>：可处理缺陷任务，上传反馈</div>
          <div>• <strong>查看员</strong>：仅可查看数据和报表</div>
        </div>
      </div>

      {showAddDialog && (
        <AddUserDialog onClose={() => setShowAddDialog(false)} />
      )}

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
}
