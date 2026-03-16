import { Navigation } from "./components/Navigation";
import { StatsCards } from "./components/StatsCards";
import { DefectTypeChart } from "./components/DefectTypeChart";
import { SeverityChart } from "./components/SeverityChart";
import { AlertPanel } from "./components/AlertPanel";
import { Footer } from "./components/Footer";
import { DefectRecords } from "./components/DefectRecords";
import { ClosedLoopManagement } from "./components/ClosedLoopManagement";
import { DataAnalysis } from "./components/DataAnalysis";
import { SystemSettings } from "./components/SystemSettings";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {currentPage === "home" && (
          <>
            {/* 实时缺陷统计 */}
            <StatsCards />
            
            {/* 待处理任务预警 */}
            <AlertPanel />
            
            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DefectTypeChart />
              <SeverityChart />
            </div>
          </>
        )}
        
        {currentPage === "records" && <DefectRecords />}
        
        {currentPage === "management" && <ClosedLoopManagement />}
        
        {currentPage === "analysis" && <DataAnalysis />}
        
        {currentPage === "settings" && <SystemSettings />}
      </main>
      
      <Footer />
    </div>
  );
}