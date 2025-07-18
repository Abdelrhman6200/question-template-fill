import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, MapPin, Calendar, Hash, TrendingUp, CheckCircle, AlertCircle, Lightbulb, MessageSquare, Code, Users, Download, FileText, Presentation } from "lucide-react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';

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
  studentPhoto?: string;
}

interface ReportTemplateProps {
  data: ReportData;
  onBack: () => void;
}

export function ReportTemplate({ data, onBack }: ReportTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePDFDownload = async () => {
    const pages = document.querySelectorAll('.report-page');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 297; // A4 width in mm (landscape)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save(`${data.studentName}_Session_Report.pdf`);
  };

  const handlePowerPointDownload = async () => {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';

    // Page 1: Title Page
    const slide1 = pres.addSlide();
    slide1.background = { color: '1B2951' };
    slide1.addText('ISKY TECH', { x: 1, y: 1, w: 8, h: 1, fontSize: 44, color: 'FFFFFF', bold: true, align: 'center' });
    slide1.addText('Session Progress Report', { x: 1, y: 2.5, w: 8, h: 1, fontSize: 32, color: 'FF9B47', bold: true, align: 'center' });
    slide1.addText(data.studentName, { x: 1, y: 4, w: 8, h: 1, fontSize: 28, color: 'FFFFFF', align: 'center' });
    slide1.addText(formatDate(data.sessionDate), { x: 1, y: 4.8, w: 8, h: 0.8, fontSize: 20, color: 'CCCCCC', align: 'center' });

    // Page 2: Student Information & Performance
    const slide2 = pres.addSlide();
    slide2.addText('Student Information & Performance', { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, color: '1B2951', bold: true });
    slide2.addText(`Student: ${data.studentName}`, { x: 0.5, y: 1.2, w: 4, h: 0.5, fontSize: 16, color: '333333' });
    slide2.addText(`Instructor: ${data.instructorName}`, { x: 0.5, y: 1.8, w: 4, h: 0.5, fontSize: 16, color: '333333' });
    slide2.addText(`Track: ${data.track}`, { x: 0.5, y: 2.4, w: 4, h: 0.5, fontSize: 16, color: '333333' });
    slide2.addText(`Session: ${data.sessionNumber}`, { x: 0.5, y: 3, w: 4, h: 0.5, fontSize: 16, color: '333333' });
    slide2.addText(`Quality: ${data.qualityPercentage}%`, { x: 5.5, y: 1.5, w: 3, h: 1.5, fontSize: 32, color: '0080CC', bold: true, align: 'center' });

    // Page 3: Progress Points
    const slide3 = pres.addSlide();
    slide3.addText('Progress Since Last Session', { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, color: '1B2951', bold: true });
    const progressPoints = [data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(p => p.trim());
    progressPoints.forEach((point, index) => {
      slide3.addText(`${index + 1}. ${point}`, { x: 0.5, y: 1.5 + (index * 1.2), w: 9, h: 1, fontSize: 16, color: '333333' });
    });

    // Page 4: Strengths & Areas of Improvement
    const slide4 = pres.addSlide();
    slide4.addText('Strengths & Areas of Improvement', { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, color: '1B2951', bold: true });
    slide4.addText('Strength Highlight:', { x: 0.5, y: 1.2, w: 4, h: 0.5, fontSize: 18, color: 'FF9B47', bold: true });
    slide4.addText(data.strengthText, { x: 0.5, y: 1.8, w: 4, h: 2, fontSize: 14, color: '333333' });
    slide4.addText('Area for Improvement:', { x: 5, y: 1.2, w: 4, h: 0.5, fontSize: 18, color: '0080CC', bold: true });
    slide4.addText(data.improvementIssue, { x: 5, y: 1.8, w: 4, h: 1, fontSize: 14, color: '333333' });
    slide4.addText(data.improvementSolution, { x: 5, y: 2.8, w: 4, h: 1, fontSize: 14, color: '333333' });

    // Page 5: Communication Tips & Project
    const slide5 = pres.addSlide();
    slide5.addText('Communication Tips & Project Details', { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, color: '1B2951', bold: true });
    const tips = [data.tip1, data.tip2, data.tip3].filter(t => t.trim());
    slide5.addText('Communication Tips:', { x: 0.5, y: 1.2, w: 4, h: 0.5, fontSize: 18, color: 'FF9B47', bold: true });
    tips.forEach((tip, index) => {
      slide5.addText(`• ${tip}`, { x: 0.5, y: 1.8 + (index * 0.4), w: 4, h: 0.3, fontSize: 12, color: '333333' });
    });
    
    if (data.projectTitle) {
      slide5.addText('Project:', { x: 5, y: 1.2, w: 4, h: 0.5, fontSize: 18, color: '0080CC', bold: true });
      slide5.addText(data.projectTitle, { x: 5, y: 1.8, w: 4, h: 0.5, fontSize: 14, color: '333333', bold: true });
    }

    // Page 6: Recommendations
    const slide6 = pres.addSlide();
    slide6.addText('Parent Recommendations', { x: 0.5, y: 0.3, w: 9, h: 0.8, fontSize: 28, color: '1B2951', bold: true });
    slide6.addText(data.recommendations, { x: 0.5, y: 1.5, w: 9, h: 3, fontSize: 16, color: '333333' });

    pres.writeFile({ fileName: `${data.studentName}_Session_Report.pptx` });
  };

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen py-8">
      {/* Page 1: Title Page */}
      <div className="report-page bg-gradient-to-br from-brand-navy to-brand-blue text-white">
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold">ISKY TECH</h1>
          </div>
          <h2 className="text-4xl font-semibold text-brand-orange">Session Progress Report</h2>
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold">{data.studentName}</h3>
            <p className="text-xl opacity-90">{formatDate(data.sessionDate)}</p>
          </div>
        </div>
      </div>

      {/* Page 2: Student Information & Performance */}
      <div className="report-page">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Student Information & Performance</h2>
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {data.studentPhoto ? (
                <img 
                  src={data.studentPhoto} 
                  alt="Student" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-brand-light-blue"
                />
              ) : (
                <User className="w-20 h-20 p-4 bg-brand-light-blue text-brand-navy rounded-full" />
              )}
              <div>
                <p className="text-lg font-semibold text-brand-blue">Student Name</p>
                <p className="text-2xl font-bold text-brand-navy">{data.studentName}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <GraduationCap className="h-8 w-8 text-brand-navy" />
                <div>
                  <p className="text-brand-blue font-semibold">Instructor</p>
                  <p className="text-xl font-bold text-brand-navy">{data.instructorName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <MapPin className="h-8 w-8 text-brand-navy" />
                <div>
                  <p className="text-brand-blue font-semibold">Track</p>
                  <p className="text-xl font-bold text-brand-navy">{data.track}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Hash className="h-8 w-8 text-brand-navy" />
                <div>
                  <p className="text-brand-blue font-semibold">Session Number</p>
                  <p className="text-xl font-bold text-brand-navy">{data.sessionNumber}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-center mb-6">
              <TrendingUp className="h-16 w-16 text-brand-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-orange">Performance Quality</h3>
            </div>
            <div className="w-40 h-40 bg-brand-blue rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-white">{data.qualityPercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3: Progress Since Last Session */}
      <div className="report-page">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Progress Since Last Session</h2>
        <div className="space-y-8 flex-1 flex flex-col justify-center">
          {[data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).map((point, index) => (
            <div key={index} className="flex items-start gap-6 p-6 bg-brand-light-blue/20 rounded-xl">
              <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-brand-navy text-lg pt-2">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page 4: Strengths & Areas of Improvement */}
      <div className="report-page">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Strengths & Areas of Improvement</h2>
        <div className="grid grid-cols-2 gap-8 h-full">
          <div className="bg-brand-light-blue/30 p-6 rounded-xl">
            <div className="text-center mb-6">
              <CheckCircle className="h-12 w-12 text-brand-navy mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-brand-orange">Strength Highlight</h3>
            </div>
            <p className="text-brand-navy text-lg leading-relaxed">{data.strengthText}</p>
          </div>
          
          <div className="bg-brand-light-blue/20 p-6 rounded-xl">
            <div className="text-center mb-6">
              <AlertCircle className="h-12 w-12 text-brand-blue mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-brand-blue">Area for Improvement</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-brand-navy flex-shrink-0 mt-0.5" />
                <p className="text-brand-navy">{data.improvementIssue}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-brand-navy flex-shrink-0 mt-0.5" />
                <p className="text-brand-navy">{data.improvementSolution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: Communication Tips & Project */}
      <div className="report-page">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Communication Tips & Project Details</h2>
        <div className="grid grid-cols-2 gap-8 h-full">
          <div>
            <div className="text-center mb-6">
              <MessageSquare className="h-12 w-12 text-brand-orange mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-brand-orange">Communication Tips</h3>
            </div>
            <div className="space-y-4">
              {[data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-brand-navy text-lg pt-1">{tip}</p>
                </div>
              ))}
            </div>
          </div>
          
          {data.projectTitle && (
            <div>
              <div className="text-center mb-6">
                <Code className="h-12 w-12 text-brand-blue mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-brand-blue">Project</h3>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-brand-navy">{data.projectTitle}</h4>
                <div className="space-y-2">
                  {data.projectFeatures.filter(feature => feature.trim()).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        •
                      </div>
                      <p className="text-brand-navy">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Page 6: Parent Recommendations */}
      <div className="report-page">
        <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Parent Recommendations</h2>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center mb-8">
            <Users className="h-16 w-16 text-brand-orange mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-brand-orange">Supporting Learning at Home</h3>
          </div>
          <div className="bg-brand-light-blue/20 p-8 rounded-xl max-w-4xl">
            <p className="text-brand-navy text-lg leading-relaxed text-center">{data.recommendations}</p>
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-navy">ISKY TECH</h3>
                <p className="text-brand-blue font-semibold">EMPOWERING INNOVATORS</p>
              </div>
            </div>
            <p className="text-brand-orange font-semibold">"Thank you for your trust in our educational program."</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4 print:hidden py-8">
        <div className="flex justify-center gap-4">
          <Button
            onClick={handlePDFDownload}
            className="bg-brand-blue hover:bg-brand-navy text-white px-8 py-3 text-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
          <Button
            onClick={handlePowerPointDownload}
            className="bg-brand-orange hover:bg-brand-navy text-white px-8 py-3 text-lg"
          >
            <Presentation className="mr-2 h-5 w-5" />
            Download PowerPoint
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-3 text-lg"
          >
            Create New Report
          </Button>
        </div>
      </div>
    </div>
  );
}