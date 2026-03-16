export function Footer() {
  const updateTime = new Date().toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-gray-600">
        <div className="flex items-center gap-1">
          <span>数据更新时间：</span>
          <span>{updateTime}</span>
        </div>
        <div>
          <span>系统版本号：v2.3.1</span>
        </div>
      </div>
    </footer>
  );
}
