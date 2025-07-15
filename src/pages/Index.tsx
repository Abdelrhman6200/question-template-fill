import { useState } from "react";
import { ReportForm } from "@/components/ReportForm";
import { ReportTemplate } from "@/components/ReportTemplate";

interface ReportData {
  studentName: string;
  instructorName: string;
  track: string;
  sessionNumber: string;
  sessionDate: string;
  qualityPercentage: number;
  performanceNotes: string[];
  progressPoint1: string;
  progressPoint2: string;
  progressPoint3: string;
  strengthText: string;
  improvementIssue: string;
  improvementSolution: string;
  tip1: string;
  tip2: string;
  tip3: string;
  projectTitle: string;
  projectFeatures: string[];
  recommendations: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<"form" | "report">("form");
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleGenerateReport = (data: ReportData) => {
    setReportData(data);
    setCurrentView("report");
  };

  const handleBackToForm = () => {
    setCurrentView("form");
    setReportData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light-blue/10 to-background">
      {currentView === "form" ? (
        <ReportForm onGenerateReport={handleGenerateReport} />
      ) : (
        reportData && (
          <ReportTemplate data={reportData} onBack={handleBackToForm} />
        )
      )}
    </div>
  );
};

export default Index;
