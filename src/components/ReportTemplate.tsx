import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, GraduationCap, MapPin, Calendar, Hash, TrendingUp, CheckCircle, AlertCircle, Lightbulb, MessageSquare, Code, Users, Download } from "lucide-react";

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

  const handleDownload = () => {
    window.print();
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
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gradient-to-br from-brand-light-blue/20 to-background print:max-w-none print:p-2 print:space-y-3">
      {/* Header */}
      <div className="text-center space-y-4 bg-gradient-to-r from-brand-navy to-brand-blue text-white p-8 rounded-lg print:p-3 print:space-y-1">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center print:w-6 print:h-6">
            <GraduationCap className="h-8 w-8 text-white print:h-4 print:w-4" />
          </div>
          <h1 className="text-4xl font-bold print:text-lg">ISKY TECH</h1>
        </div>
        <h2 className="text-3xl font-semibold text-brand-orange print:text-base">Session Progress Report</h2>
        <p className="text-xl opacity-90 print:text-sm">{formatDate(data.sessionDate)}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print:gap-2">
        {/* Student Information */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-2">
            <div className="space-y-4 print:space-y-2">
              <div className="flex items-center gap-4 print:gap-2">
                <User className="h-6 w-6 text-brand-navy print:h-4 print:w-4" />
                <div>
                  <p className="text-brand-blue font-semibold print:text-xs">Name:</p>
                  <p className="text-lg font-bold text-brand-navy print:text-sm">{data.studentName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 print:gap-2">
                <GraduationCap className="h-6 w-6 text-brand-navy print:h-4 print:w-4" />
                <div>
                  <p className="text-brand-blue font-semibold print:text-xs">Instructor</p>
                  <p className="text-lg font-bold text-brand-navy print:text-sm">{data.instructorName}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-200 print:pt-1 print:space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  <p className="text-xs text-brand-blue font-semibold">Track: <span className="text-brand-navy">{data.track}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-brand-blue" />
                  <p className="text-xs text-brand-blue font-semibold">Session: <span className="text-brand-navy">{data.sessionNumber}</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-brand-blue" />
                  <p className="text-xs text-brand-blue font-semibold">Date: <span className="text-brand-navy">{formatDate(data.sessionDate)}</span></p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-brand-light-blue/30 rounded-lg p-4 print:p-2">
              <div className="text-center">
                <User className="h-8 w-8 bg-brand-orange text-white rounded-full p-1 mx-auto mb-2 print:h-6 print:w-6 print:mb-1" />
                <h3 className="text-sm font-bold text-brand-blue print:text-xs">STUDENT INFO</h3>
              </div>
            </div>
          </div>
        </Card>

        {/* Performance Section */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-2">
            <div className="bg-brand-light-blue/30 rounded-lg p-4 flex flex-col items-center justify-center print:p-2">
              <TrendingUp className="h-12 w-12 text-brand-blue mb-2 print:h-6 print:w-6 print:mb-1" />
              <h3 className="text-sm font-bold text-brand-orange text-center print:text-xs">PERFORMANCE</h3>
            </div>

            <div className="space-y-4 print:space-y-2">
              <div className="text-center">
                <h4 className="text-lg font-bold text-brand-orange mb-2 print:text-sm print:mb-1">Quality: {data.qualityPercentage}%</h4>
                <div className="flex justify-center">
                  <div className="relative w-16 h-16 print:w-12 print:h-12">
                    <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold print:w-12 print:h-12 print:text-xs">
                      {data.qualityPercentage}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 print:space-y-1">
                {data.performanceNotes.filter(note => note.trim()).slice(0, 2).map((note, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ○
                    </div>
                    <p className="text-brand-navy text-xs">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 print:gap-2">
        {/* Progress Section */}
        <Card className="xl:col-span-2 p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="text-center mb-4 print:mb-2">
            <h3 className="text-xl font-bold text-brand-orange print:text-sm">PROGRESS SINCE LAST SESSION</h3>
          </div>
          
          <div className="space-y-3 print:space-y-1">
            {[data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-brand-light-blue/20 rounded-lg print:gap-2 print:p-2">
                <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 print:w-6 print:h-6 print:text-xs">
                  {index + 1}
                </div>
                <p className="text-brand-navy text-sm pt-1 print:text-xs print:pt-0">{point}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Strength Highlights */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="text-center mb-4 print:mb-2">
            <h3 className="text-xl font-bold text-brand-orange print:text-sm">Strength Highlight</h3>
          </div>
          
          <div className="text-center space-y-4 print:space-y-2">
            <p className="text-sm text-brand-navy leading-relaxed print:text-xs">{data.strengthText}</p>
            
            <div className="flex justify-center items-center gap-4 print:gap-2">
              <div className="text-center">
                <AlertCircle className="h-8 w-8 text-brand-navy mx-auto mb-1 print:h-6 print:w-6" />
                <p className="font-bold text-brand-navy text-xs print:text-xs">Problem</p>
              </div>
              
              <div className="w-4 h-0.5 bg-brand-orange print:w-2"></div>
              
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-brand-navy mx-auto mb-1 print:h-6 print:w-6" />
                <p className="font-bold text-brand-navy text-xs print:text-xs">Solution</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print:gap-2">
        {/* Areas of Improvement */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="text-center mb-4 print:mb-2">
            <h3 className="text-xl font-bold text-brand-blue print:text-sm">Areas of improvement</h3>
          </div>
          
          <div className="space-y-4 print:space-y-2">
            <div className="flex items-start gap-3 print:gap-2">
              <AlertCircle className="h-5 w-5 text-brand-navy flex-shrink-0 mt-0.5 print:h-4 print:w-4" />
              <p className="text-brand-navy text-sm print:text-xs">{data.improvementIssue}</p>
            </div>
            
            <div className="flex items-start gap-3 print:gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5 print:h-4 print:w-4" />
              <p className="text-brand-navy text-sm print:text-xs">{data.improvementSolution}</p>
            </div>
          </div>
        </Card>

        {/* Communication Tips */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="text-center mb-4 print:mb-2">
            <h3 className="text-xl font-bold text-brand-orange print:text-sm">Communication Tips</h3>
          </div>
          
          <div className="space-y-3 print:space-y-1">
            {[data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).map((tip, index) => (
              <div key={index} className="flex items-start gap-3 print:gap-2">
                <div className="w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 print:w-5 print:h-5 print:text-xs">
                  {index + 1}
                </div>
                <p className="text-brand-navy text-sm pt-0.5 print:text-xs print:pt-0">{tip}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print:gap-2">
        {/* Project Section */}
        {data.projectTitle && (
          <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
            <div className="space-y-4 print:space-y-2">
              <div className="text-center">
                <Code className="h-8 w-8 text-brand-orange mx-auto mb-2 print:h-6 print:w-6 print:mb-1" />
                <h3 className="text-lg font-bold text-brand-orange print:text-sm">PROJECT</h3>
              </div>

              <div>
                <h4 className="text-lg font-bold text-brand-blue mb-2 print:text-sm print:mb-1">{data.projectTitle}</h4>
                <div className="space-y-2 print:space-y-1">
                  <p className="text-brand-navy text-sm print:text-xs">1. {data.studentName} worked on {data.projectTitle}.</p>
                  <p className="text-brand-navy text-sm print:text-xs">2. Implemented basic logic with AI input/output.</p>
                  <p className="text-brand-navy text-sm print:text-xs">3. Code debugged with instructor support.</p>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-brand-blue mb-2 print:text-xs print:mb-1">Key Features:</h4>
                <div className="space-y-1">
                  {data.projectFeatures.filter(feature => feature.trim()).slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        ○
                      </div>
                      <p className="text-brand-navy text-sm print:text-xs">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Parent Recommendations */}
        <Card className="p-8 bg-white border-2 border-brand-light-blue print:p-3">
          <div className="space-y-4 print:space-y-2">
            <div className="text-center">
              <Users className="h-8 w-8 text-brand-orange mx-auto mb-2 print:h-6 print:w-6 print:mb-1" />
              <h3 className="text-lg font-bold text-brand-orange print:text-sm">PARENT RECOMMENDATION</h3>
            </div>
            <p className="text-sm text-brand-navy leading-relaxed print:text-xs">{data.recommendations}</p>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <Card className="p-6 bg-gradient-to-r from-brand-navy to-brand-blue text-white text-center print:p-3">
        <div className="space-y-3 print:space-y-2">
          <p className="text-lg font-semibold text-brand-orange print:text-sm">
            "Thank you for your trust in our educational program."
          </p>
          
          <div className="flex items-center justify-center gap-3 print:gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center print:w-6 print:h-6">
              <GraduationCap className="h-6 w-6 text-white print:h-4 print:w-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold print:text-sm">ISKY TECH</h3>
              <p className="text-xs opacity-80">EMPOWERING INNOVATORS</p>
            </div>
          </div>
          
          <div className="pt-2 border-t border-white/20 print:pt-1">
            <p className="text-sm font-semibold print:text-xs">Report Prepared by Quality Control Team</p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4 print:hidden">
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleDownload}
            className="bg-brand-blue hover:bg-brand-navy text-white px-8 py-3 text-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Report
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