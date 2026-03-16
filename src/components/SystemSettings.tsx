import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { UserManagement } from "./UserManagement";
import { DefectTypeManagement } from "./DefectTypeManagement";
import { ThresholdSettings } from "./ThresholdSettings";
import { NotificationSettings } from "./NotificationSettings";
import { Users, Tags, Sliders, Bell } from "lucide-react";

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-gray-900">系统设置</h2>
      
      <Card className="p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              用户管理
            </TabsTrigger>
            <TabsTrigger value="types" className="flex items-center gap-2">
              <Tags className="w-4 h-4" />
              缺陷分类
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              阈值设置
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              通知配置
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="types">
            <DefectTypeManagement />
          </TabsContent>
          
          <TabsContent value="thresholds">
            <ThresholdSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
