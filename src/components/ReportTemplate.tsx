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
    const pages = [
      'cover-page', 'student-info-page', 'performance-page', 'progress-page',
      'strength-page', 'improvement-page', 'communication-page', 'project-page',
      'project-screenshot-page', 'recommendations-page', 'thank-you-page'
    ];

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    let isFirstPage = true;

    for (const pageId of pages) {
      const element = document.getElementById(pageId);
      if (!element) continue;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      
      if (!isFirstPage) {
        pdf.addPage();
      }
      
      // A4 landscape dimensions: 297mm x 210mm
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
      isFirstPage = false;
    }

    pdf.save(`${data.studentName}_Session_${data.sessionNumber}_Report.pdf`);
  };

  const exportToPowerPoint = async () => {
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';
    
    // Slide 1: Cover Page
    const slide1 = pptx.addSlide();
    slide1.background = { color: '1a365d' };
    slide1.addText('ISKY TECH', {
      x: 1, y: 2, w: 8, h: 1.5,
      fontSize: 48, bold: true, color: 'FFFFFF', align: 'center'
    });
    slide1.addText('Session Progress Report', {
      x: 1, y: 3.5, w: 8, h: 1,
      fontSize: 32, bold: true, color: 'f97316', align: 'center'
    });
    slide1.addText(formatDate(data.sessionDate), {
      x: 1, y: 5, w: 8, h: 0.8,
      fontSize: 24, color: 'FFFFFF', align: 'center'
    });

    // Slide 2: Student Information
    const slide2 = pptx.addSlide();
    slide2.background = { color: 'FFFFFF' };
    slide2.addText('Student Information', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '1a365d'
    });
    slide2.addText(`Name: ${data.studentName}\nInstructor: ${data.instructorName}\nTrack: ${data.track}\nSession: ${data.sessionNumber}`, {
      x: 1, y: 2, w: 6, h: 3,
      fontSize: 24, color: '1a365d'
    });
    if (data.studentPhoto) {
      slide2.addImage({ data: data.studentPhoto, x: 7.5, y: 2, w: 1.5, h: 1.5 });
    }

    // Slide 3: Performance Assessment
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

    // Slide 4: Progress Since Last Session
    const slide4 = pptx.addSlide();
    slide4.background = { color: 'FFFFFF' };
    slide4.addText('Progress Since Last Session', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: 'f97316'
    });
    [data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).forEach((point, index) => {
      slide4.addText(`${index + 1}. ${point}`, {
        x: 1, y: 2 + (index * 1), w: 8, h: 0.8,
        fontSize: 20, color: '1a365d'
      });
    });

    // Slide 5: Strength Highlights
    const slide5 = pptx.addSlide();
    slide5.background = { color: 'FFFFFF' };
    slide5.addText('Strength Highlights', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: 'f97316'
    });
    slide5.addText(data.strengthText, {
      x: 1, y: 2, w: 8, h: 3,
      fontSize: 18, color: '1a365d'
    });

    // Slide 6: Areas of Improvement
    const slide6 = pptx.addSlide();
    slide6.background = { color: 'FFFFFF' };
    slide6.addText('Areas of Improvement', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '2563eb'
    });
    slide6.addText(`Issue: ${data.improvementIssue}\n\nSolution: ${data.improvementSolution}`, {
      x: 1, y: 2, w: 8, h: 3,
      fontSize: 18, color: '1a365d'
    });

    // Slide 7: Communication Tips
    const slide7 = pptx.addSlide();
    slide7.background = { color: 'FFFFFF' };
    slide7.addText('Communication Tips', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: 'f97316'
    });
    [data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).forEach((tip, index) => {
      slide7.addText(`${index + 1}. ${tip}`, {
        x: 1, y: 2 + (index * 0.8), w: 8, h: 0.8,
        fontSize: 20, color: '1a365d'
      });
    });

    // Slide 8: Project Information
    const slide8 = pptx.addSlide();
    slide8.background = { color: 'FFFFFF' };
    slide8.addText('Project Information', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '1a365d'
    });
    slide8.addText(`Project: ${data.projectTitle}`, {
      x: 1, y: 2, w: 8, h: 1,
      fontSize: 24, bold: true, color: '2563eb'
    });
    data.projectFeatures.filter(feature => feature.trim()).forEach((feature, index) => {
      slide8.addText(`• ${feature}`, {
        x: 1, y: 3 + (index * 0.8), w: 8, h: 0.8,
        fontSize: 18, color: '1a365d'
      });
    });

    // Slide 9: Project Screenshot (placeholder)
    const slide9 = pptx.addSlide();
    slide9.background = { color: 'FFFFFF' };
    slide9.addText('Project Screenshot', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: 'f97316'
    });
    slide9.addText('Screenshot of the project will be displayed here', {
      x: 1, y: 3, w: 8, h: 1,
      fontSize: 20, color: '1a365d', align: 'center'
    });

    // Slide 10: Parent Recommendations
    const slide10 = pptx.addSlide();
    slide10.background = { color: 'FFFFFF' };
    slide10.addText('Parent Recommendations', {
      x: 1, y: 0.5, w: 8, h: 1,
      fontSize: 36, bold: true, color: '2563eb'
    });
    slide10.addText(data.recommendations, {
      x: 1, y: 2, w: 8, h: 3,
      fontSize: 18, color: '1a365d'
    });

    // Slide 11: Thank You
    const slide11 = pptx.addSlide();
    slide11.background = { color: '1a365d' };
    slide11.addText('Thank You', {
      x: 1, y: 2.5, w: 8, h: 1.5,
      fontSize: 48, bold: true, color: 'FFFFFF', align: 'center'
    });
    slide11.addText('ISKY TECH', {
      x: 1, y: 4, w: 8, h: 1,
      fontSize: 32, bold: true, color: 'f97316', align: 'center'
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

      <div id="report-content" className="space-y-8">
      {/* Cover Page */}
      <div id="cover-page" className="w-full h-[600px] aspect-video bg-gradient-to-r from-brand-navy to-brand-blue text-white flex flex-col items-center justify-center rounded-lg">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold">ISKY TECH</h1>
        </div>
        <h2 className="text-4xl font-semibold text-brand-orange mb-4">Session Progress Report</h2>
        <p className="text-2xl opacity-90">{formatDate(data.sessionDate)}</p>
      </div>

      {/* Student Information Page */}
      <div id="student-info-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl font-bold text-brand-navy mb-8">Student Information</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <User className="h-8 w-8 text-brand-navy" />
              <div>
                <p className="text-brand-blue font-semibold text-lg">Name:</p>
                <p className="text-3xl font-bold text-brand-navy">{data.studentName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <GraduationCap className="h-8 w-8 text-brand-navy" />
              <div>
                <p className="text-brand-blue font-semibold text-lg">Instructor</p>
                <p className="text-2xl font-bold text-brand-navy">{data.instructorName}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Track</p>
                  <p className="font-bold text-brand-navy text-lg">{data.track}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Hash className="h-6 w-6 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Session Number</p>
                  <p className="font-bold text-brand-navy text-lg">{data.sessionNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-brand-blue" />
                <div>
                  <p className="text-brand-blue font-semibold">Session Date</p>
                  <p className="font-bold text-brand-navy text-lg">{formatDate(data.sessionDate)}</p>
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
                    className="h-24 w-24 rounded-full object-cover border-4 border-brand-orange"
                  />
                ) : (
                  <User className="h-16 w-16 bg-brand-orange text-white rounded-full p-3" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-brand-blue">STUDENT</h3>
              <h3 className="text-2xl font-bold text-brand-blue">INFORMATION</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Assessment Page */}
      <div id="performance-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="bg-brand-light-blue/30 rounded-lg p-6 flex flex-col items-center justify-center">
            <TrendingUp className="h-20 w-20 text-brand-blue mb-4" />
            <h3 className="text-2xl font-bold text-brand-orange text-center">STUDENT'S</h3>
            <h3 className="text-2xl font-bold text-brand-orange text-center">PERFORMANCE</h3>
            <h3 className="text-2xl font-bold text-brand-orange text-center">THIS SESSION</h3>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="text-center">
              <h4 className="text-3xl font-bold text-brand-orange mb-4">Quality Percentage</h4>
              <div className="flex justify-center mb-4">
                <CircularProgress percentage={data.qualityPercentage} />
              </div>
              <p className="text-xl font-semibold text-brand-navy">
                The student scored {data.qualityPercentage}% in today's session.
              </p>
            </div>

            <div className="space-y-4">
              {data.performanceNotes.filter(note => note.trim()).map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                    ○
                  </div>
                  <p className="text-brand-navy text-lg">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Since Last Session Page */}
      <div id="progress-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-brand-orange">PROGRESS SINCE LAST SESSION</h3>
        </div>
        
        <div className="space-y-8">
          {[data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).map((point, index) => (
            <div key={index} className="flex items-start gap-6 p-6 bg-brand-light-blue/20 rounded-lg">
              <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-brand-navy text-xl pt-4">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strength Highlights Page */}
      <div id="strength-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-brand-orange">Strength Highlights</h3>
        </div>
        
        <div className="text-center space-y-8">
          <p className="text-xl text-brand-navy leading-relaxed">{data.strengthText}</p>
          
          <div className="flex justify-center items-center gap-12 pt-8">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-brand-navy mx-auto mb-4" />
              <p className="font-bold text-brand-navy text-lg">Problem</p>
              <p className="font-bold text-brand-navy text-lg">Identification</p>
            </div>
            
            <div className="w-12 h-1 bg-brand-orange"></div>
            
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-brand-navy mx-auto mb-4" />
              <p className="font-bold text-brand-navy text-lg">Troubleshooting</p>
            </div>
            
            <div className="w-12 h-1 bg-brand-orange"></div>
            
            <div className="text-center">
              <Lightbulb className="h-16 w-16 text-brand-navy mx-auto mb-4" />
              <p className="font-bold text-brand-navy text-lg">Independent</p>
              <p className="font-bold text-brand-navy text-lg">Solution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Areas of Improvement Page */}
      <div id="improvement-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-brand-blue">Areas of Improvement</h3>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <AlertCircle className="h-8 w-8 text-brand-navy flex-shrink-0 mt-1" />
            <div>
              <p className="text-brand-navy leading-relaxed text-xl">{data.improvementIssue}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-6">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-brand-navy leading-relaxed text-xl">{data.improvementSolution}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Communication Tips Page */}
      <div id="communication-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-12">
          <h4 className="text-4xl font-bold text-brand-orange">Communication Tips</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).map((tip, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {index + 1}
              </div>
              <p className="text-brand-navy font-semibold text-lg">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Project Information Page */}
      {data.projectTitle && (
        <div id="project-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            <div className="bg-brand-light-blue/30 rounded-lg p-6 flex flex-col items-center justify-center">
              <Code className="h-20 w-20 text-brand-orange mb-4" />
              <h3 className="text-2xl font-bold text-brand-orange text-center">PROJECT</h3>
              <h3 className="text-2xl font-bold text-brand-orange text-center">INFORMATION</h3>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h4 className="text-3xl font-bold text-brand-blue mb-6">{data.projectTitle}</h4>
                <div className="space-y-4">
                  <p className="text-brand-navy text-lg">1. {data.studentName} worked on an AI-driven task using {data.projectTitle}.</p>
                  <p className="text-brand-navy text-lg">2. He implemented basic logic using AI input and generated output based on user interaction.</p>
                  <p className="text-brand-navy text-lg">3. The code was debugged and functioned properly, though with instructor support.</p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-brand-blue mb-4">Key Features Implemented:</h4>
                <div className="space-y-3">
                  {data.projectFeatures.filter(feature => feature.trim()).map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 mt-1">
                        ○
                      </div>
                      <p className="text-brand-navy text-lg">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Screenshot Page */}
      <div id="project-screenshot-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-brand-orange">Project Screenshot</h3>
        </div>
        
        <div className="flex items-center justify-center h-96 bg-brand-light-blue/20 rounded-lg">
          <div className="text-center">
            <Code className="h-24 w-24 text-brand-blue mx-auto mb-4" />
            <p className="text-2xl text-brand-navy">Project Screenshot</p>
            <p className="text-lg text-brand-navy opacity-75">Will be displayed here</p>
          </div>
        </div>
      </div>

      {/* Parent Recommendations Page */}
      <div id="recommendations-page" className="w-full h-[600px] aspect-video bg-white border-2 border-brand-light-blue rounded-lg p-8">
        <div className="text-center mb-8">
          <h3 className="text-4xl font-bold text-brand-blue">Parent Recommendations</h3>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="bg-brand-light-blue/30 rounded-lg p-8 flex flex-col items-center justify-center">
            <Users className="h-20 w-20 text-brand-blue mb-4" />
            <h4 className="text-2xl font-bold text-brand-orange text-center">FOR</h4>
            <h4 className="text-2xl font-bold text-brand-orange text-center">PARENTS</h4>
          </div>
          
          <div className="flex-1">
            <p className="text-xl text-brand-navy leading-relaxed">{data.recommendations}</p>
          </div>
        </div>
      </div>

      {/* Thank You Page */}
      <div id="thank-you-page" className="w-full h-[600px] aspect-video bg-gradient-to-r from-brand-navy to-brand-blue text-white rounded-lg flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-brand-orange rounded-lg flex items-center justify-center">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold">Thank You</h1>
        </div>
        <p className="text-3xl opacity-90 font-semibold">ISKY TECH</p>
        <p className="text-xl opacity-75 mt-2">Empowering Future Innovators</p>
      </div>

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