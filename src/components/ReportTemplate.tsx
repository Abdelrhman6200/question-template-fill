import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, MapPin, Calendar, Hash, TrendingUp, CheckCircle, AlertCircle, Lightbulb, MessageSquare, Code, Users, Download, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PptxGenJS from "pptxgenjs";

interface ReportData {
  studentName: string;
  studentPhoto?: string;
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

  const exportToPDF = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data.studentName}_Session_${data.sessionNumber}_Report.pdf`);
  };

  const exportToPowerPoint = async () => {
    const pptx = new PptxGenJS();
    
    // Slide 1: Header
    const slide1 = pptx.addSlide();
    slide1.background = { color: '1a365d' };
    
    slide1.addText('ISKY TECH', {
      x: 1, y: 2, w: 8, h: 1.5,
      fontSize: 48, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    
    slide1.addText('Session Progress Report', {
      x: 1, y: 3.5, w: 8, h: 1,
      fontSize: 32, bold: true, color: 'f97316',
      align: 'center'
    });
    
    slide1.addText(formatDate(data.sessionDate), {
      x: 1, y: 5, w: 8, h: 0.8,
      fontSize: 24, color: 'FFFFFF',
      align: 'center'
    });

    // Slide 2: Student Information
    const slide2 = pptx.addSlide();
    slide2.background = { color: 'FFFFFF' };
    
    slide2.addText('Student Information', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '1a365d'
    });
    
    slide2.addText(`Name: ${data.studentName}`, {
      x: 1, y: 2, w: 8, h: 0.8,
      fontSize: 24, color: '1a365d'
    });
    
    slide2.addText(`Instructor: ${data.instructorName}`, {
      x: 1, y: 2.8, w: 8, h: 0.8,
      fontSize: 24, color: '1a365d'
    });
    
    slide2.addText(`Track: ${data.track}`, {
      x: 1, y: 3.6, w: 8, h: 0.8,
      fontSize: 24, color: '1a365d'
    });
    
    slide2.addText(`Session: ${data.sessionNumber}`, {
      x: 1, y: 4.4, w: 8, h: 0.8,
      fontSize: 24, color: '1a365d'
    });

    if (data.studentPhoto) {
      slide2.addImage({
        data: data.studentPhoto,
        x: 7, y: 2, w: 1.5, h: 1.5
      });
    }

    // Slide 3: Performance
    const slide3 = pptx.addSlide();
    slide3.background = { color: 'FFFFFF' };
    
    slide3.addText('Performance Assessment', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '1a365d'
    });
    
    slide3.addText(`Quality: ${data.qualityPercentage}%`, {
      x: 1, y: 2, w: 8, h: 1,
      fontSize: 32, bold: true, color: '2563eb'
    });
    
    data.performanceNotes.filter(note => note.trim()).forEach((note, index) => {
      slide3.addText(`• ${note}`, {
        x: 1, y: 3 + (index * 0.8), w: 8, h: 0.8,
        fontSize: 18, color: '1a365d'
      });
    });

    pptx.writeFile({ fileName: `${data.studentName}_Session_${data.sessionNumber}_Report.pptx` });
  };

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-brand-blue transition-all duration-300 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-brand-navy">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-brand-light-blue/20 to-background">
      {/* Export Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={exportToPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3"
        >
          <FileText className="mr-2 h-5 w-5" />
          Export as PDF
        </Button>
        <Button
          onClick={exportToPowerPoint}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3"
        >
          <Download className="mr-2 h-5 w-5" />
          Export as PowerPoint
        </Button>
      </div>

      <div id="report-content">
      {/* Header */}
      <div className="text-center space-y-4 bg-gradient-to-r from-brand-navy to-brand-blue text-white p-8 rounded-lg">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold">ISKY TECH</h1>
        </div>
        <h2 className="text-3xl font-semibold text-brand-orange">Session Progress Report</h2>
        <p className="text-xl opacity-90">{formatDate(data.sessionDate)}</p>
      </div>

      {/* Student Information */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <User className="h-6 w-6 text-brand-navy" />
              <div>
                <p className="text-brand-blue font-semibold">Name:</p>
                <p className="text-2xl font-bold text-brand-navy">{data.studentName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <GraduationCap className="h-6 w-6 text-brand-navy" />
              <div>
                <p className="text-brand-blue font-semibold">Instructor</p>
                <p className="text-xl font-bold text-brand-navy">{data.instructorName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Track</p>
                  <p className="font-bold text-brand-navy">{data.track}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Session Number</p>
                  <p className="font-bold text-brand-navy">{data.sessionNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Session Date</p>
                  <p className="font-bold text-brand-navy">{formatDate(data.sessionDate)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-brand-light-blue/30 rounded-lg p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {data.studentPhoto ? (
                  <img 
                    src={data.studentPhoto} 
                    alt="Student" 
                    className="h-20 w-20 rounded-full object-cover border-4 border-brand-orange"
                  />
                ) : (
                  <User className="h-12 w-12 bg-brand-orange text-white rounded-full p-2" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-brand-blue">STUDENT</h3>
              <h3 className="text-2xl font-bold text-brand-blue">INFORMATION</h3>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Section */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-brand-light-blue/30 rounded-lg p-6 flex flex-col items-center justify-center">
            <TrendingUp className="h-16 w-16 text-brand-blue mb-4" />
            <h3 className="text-2xl font-bold text-brand-orange text-center">STUDENT'S</h3>
            <h3 className="text-2xl font-bold text-brand-orange text-center">PERFORMANCE</h3>
            <h3 className="text-2xl font-bold text-brand-orange text-center">THIS SESSION</h3>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-brand-orange mb-4">Quality Percentage</h4>
              <div className="flex justify-center mb-4">
                <CircularProgress percentage={data.qualityPercentage} />
              </div>
              <p className="text-lg font-semibold text-brand-navy">
                The student scored {data.qualityPercentage}% in today's session.
              </p>
            </div>

            <div className="space-y-4">
              {data.performanceNotes.filter(note => note.trim()).map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    ○
                  </div>
                  <p className="text-brand-navy">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Section */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-brand-orange">PROGRESS SINCE LAST SESSION</h3>
        </div>
        
        <div className="space-y-6">
          {[data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).map((point, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-brand-light-blue/20 rounded-lg">
              <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-brand-navy text-lg pt-2">{point}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Strength Highlights */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-brand-orange">Strength Highlight</h3>
        </div>
        
        <div className="text-center space-y-6">
          <p className="text-lg text-brand-navy leading-relaxed">{data.strengthText}</p>
          
          <div className="flex justify-center items-center gap-8 pt-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-brand-navy mx-auto mb-2" />
              <p className="font-bold text-brand-navy">Problem</p>
              <p className="font-bold text-brand-navy">Identification</p>
            </div>
            
            <div className="w-8 h-0.5 bg-brand-orange"></div>
            
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-brand-navy mx-auto mb-2" />
              <p className="font-bold text-brand-navy">Troubleshooting</p>
            </div>
            
            <div className="w-8 h-0.5 bg-brand-orange"></div>
            
            <div className="text-center">
              <Lightbulb className="h-12 w-12 text-brand-navy mx-auto mb-2" />
              <p className="font-bold text-brand-navy">Independent</p>
              <p className="font-bold text-brand-navy">Solution</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Areas of Improvement */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-brand-blue">Areas of improvement</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-brand-navy flex-shrink-0 mt-1" />
            <div>
              <p className="text-brand-navy leading-relaxed">{data.improvementIssue}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-brand-navy leading-relaxed">{data.improvementSolution}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h4 className="text-2xl font-bold text-brand-orange text-center mb-6">Communication Tips:</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).map((tip, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-brand-navy font-semibold">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Project Section */}
      {data.projectTitle && (
        <Card className="p-8 bg-white border-2 border-brand-light-blue">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-brand-light-blue/30 rounded-lg p-6 flex flex-col items-center justify-center">
              <Code className="h-16 w-16 text-brand-orange mb-4" />
              <h3 className="text-2xl font-bold text-brand-orange text-center">PROJECT</h3>
              <h3 className="text-2xl font-bold text-brand-orange text-center">SCREENSHOT</h3>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-brand-blue mb-4">{data.projectTitle}:</h4>
                <div className="space-y-3">
                  <p className="text-brand-navy">1. {data.studentName} worked on an AI-driven task using {data.projectTitle}.</p>
                  <p className="text-brand-navy">2. He implemented basic logic using AI input and generated output based on user interaction.</p>
                  <p className="text-brand-navy">3. The code was debugged and functioned properly, though with instructor support.</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-brand-blue mb-4">Key Features Implemented:</h4>
                <div className="space-y-2">
                  {data.projectFeatures.filter(feature => feature.trim()).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                        ○
                      </div>
                      <p className="text-brand-navy">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Parent Recommendations */}
      <Card className="p-8 bg-white border-2 border-brand-light-blue">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-lg text-brand-navy leading-relaxed">{data.recommendations}</p>
          </div>
          
          <div className="bg-brand-light-blue/30 rounded-lg p-6 flex flex-col items-center justify-center">
            <Users className="h-16 w-16 text-brand-orange mb-4" />
            <h3 className="text-2xl font-bold text-brand-orange text-center">PARENT</h3>
            <h3 className="text-2xl font-bold text-brand-orange text-center">RECOMMENDATION</h3>
          </div>
        </div>
      </Card>

      {/* Footer */}
      <Card className="p-8 bg-gradient-to-r from-brand-navy to-brand-blue text-white text-center">
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-brand-orange">
            "Thank you for your trust in our educational program."
          </p>
          
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">ISKY TECH</h3>
              <p className="text-sm opacity-80">EMPOWERING INNOVATORS</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/20">
            <p className="text-lg font-semibold">Report Prepared by</p>
            <p className="text-brand-orange font-bold">Quality Control Team</p>
          </div>
        </div>
      </Card>

      </div>

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-brand-orange hover:bg-brand-navy text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
        >
          Create New Report
        </button>
      </div>
    </div>
  );
}