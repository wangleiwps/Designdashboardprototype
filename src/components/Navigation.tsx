import { Home, ClipboardList, RefreshCw, BarChart3, Settings } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { name: "首页", icon: Home, page: "home" },
    { name: "缺陷识别记录", icon: ClipboardList, page: "records" },
    { name: "闭环管理", icon: RefreshCw, page: "management" },
    { name: "数据分析", icon: BarChart3, page: "analysis" },
    { name: "设置", icon: Settings, page: "settings" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white">DM</span>
            </div>
            <span className="text-gray-900">隧道缺陷管理系统</span>
          </div>
          
          {/* 导航菜单 */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => onPageChange(item.page)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.page
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}