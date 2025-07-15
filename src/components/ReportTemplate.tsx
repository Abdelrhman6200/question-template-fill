import { Card } from "@/components/ui/card";
import { User, GraduationCap, MapPin, Calendar, Hash, BarChart3, CheckCircle, AlertCircle, MessageSquare, Code, Users } from "lucide-react";

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

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-1 bg-brand-navy">
      {/* Slide 1: Title Page */}
      <div className="bg-white rounded-lg p-12 text-center relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* Background decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-orange">
            <path d="M50,10 L90,90 L10,90 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue">
            <circle cx="50" cy="50" r="40" fill="currentColor"/>
          </svg>
        </div>
        
        {/* ISKY TECH Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center relative">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <div className="w-6 h-6 bg-brand-navy rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-brand-blue">ISKY TECH</h1>
        </div>
        
        <h2 className="text-4xl font-bold text-brand-orange mb-6">Session Progress Report</h2>
        <p className="text-2xl text-gray-600">{formatDate(data.sessionDate)}</p>
      </div>

      {/* Slide 2: Student Information */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* ISKY TECH Logo - Left side */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-vertical">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="writing-mode-vertical text-brand-navy font-bold text-lg tracking-widest">
              ISKY TECH
            </div>
          </div>
        </div>

        <div className="ml-20 grid grid-cols-2 gap-8 h-full">
          {/* Left Column - Student Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <User className="h-8 w-8 text-black" />
              <div>
                <p className="text-brand-blue font-semibold text-lg">Name:</p>
                <p className="text-2xl font-bold text-black">{data.studentName}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <GraduationCap className="h-8 w-8 text-black" />
              <div>
                <p className="text-brand-blue font-semibold text-lg">Instructor</p>
                <p className="text-2xl font-bold text-black">{data.instructorName}</p>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-dashed border-gray-300">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-black" />
                  <div>
                    <p className="text-brand-blue font-semibold">Track</p>
                    <p className="text-xl font-bold text-black">{data.track}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Hash className="h-6 w-6 text-black" />
                  <div>
                    <p className="text-brand-blue font-semibold">Session Number</p>
                    <p className="text-xl font-bold text-black">{data.sessionNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-black" />
                  <div>
                    <p className="text-brand-blue font-semibold">Session Date</p>
                    <p className="text-xl font-bold text-black">{formatDate(data.sessionDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Student Information Badge */}
          <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-xl flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-brand-blue text-center">STUDENT</h3>
            <h3 className="text-3xl font-bold text-brand-blue text-center">INFORMATION</h3>
          </div>
        </div>
      </div>

      {/* Slide 3: Student Performance */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* ISKY TECH Logo - Right side */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="writing-mode-vertical text-brand-navy font-bold text-lg tracking-widest">
              ISKY TECH
            </div>
          </div>
        </div>

        <div className="mr-20 grid grid-cols-2 gap-8 h-full">
          {/* Left Column - Title */}
          <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-xl flex flex-col items-center justify-center p-8">
            <BarChart3 className="h-20 w-20 text-brand-blue mb-6" />
            <h3 className="text-3xl font-bold text-brand-orange text-center leading-tight">STUDENT'S</h3>
            <h3 className="text-3xl font-bold text-brand-orange text-center leading-tight">PERFORMANCE</h3>
            <h3 className="text-3xl font-bold text-brand-orange text-center leading-tight">THIS SESSION</h3>
          </div>

          {/* Right Column - Performance Details */}
          <div className="space-y-6">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-brand-orange mb-6">Quality Percentage</h4>
              
              {/* Circular Progress */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--brand-blue))"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - data.qualityPercentage / 100)}`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-black">{data.qualityPercentage}%</span>
                  </div>
                </div>
              </div>
              
              <p className="text-lg font-semibold text-black mb-6">
                The student scored {data.qualityPercentage}% in today's session.
              </p>
            </div>

            <div className="space-y-3">
              {data.performanceNotes.filter(note => note.trim()).map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-black leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide 4: Progress Since Last Session */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* ISKY TECH Logo - Right side */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="writing-mode-vertical text-brand-navy font-bold text-lg tracking-widest">
              ISKY TECH
            </div>
          </div>
        </div>

        <div className="mr-20">
          {/* Progress bar visualization */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-brand-navy rounded-full px-8 py-4 relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg"></div>
                <div className="ml-16 mr-4 h-4 bg-brand-orange rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[data.progressPoint1, data.progressPoint2, data.progressPoint3].filter(point => point.trim()).map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-black text-lg pt-2 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <h3 className="text-3xl font-bold text-brand-orange">PROGRESS SINCE LAST SESSION</h3>
          </div>
        </div>
      </div>

      {/* Slide 5: Strength Highlight */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* ISKY TECH Logo - Bottom right */}
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="text-brand-navy font-bold text-sm">
              ISKY<br/>TECH
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-lg p-2 mb-8">
          <h3 className="text-3xl font-bold text-brand-orange text-center py-4">Strength Highlight</h3>
        </div>
        
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xl font-bold text-black leading-relaxed">Maintains strong focus and follows through with coding instructions when supported.</p>
            <p className="text-xl font-bold text-black leading-relaxed">His code was structured correctly and produced the expected result.</p>
            <p className="text-xl font-bold text-black leading-relaxed">Showed enthusiasm once he got back into the flow of the session.</p>
          </div>
          
          <div className="flex justify-center items-center gap-8 pt-8">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-black mx-auto mb-3" />
              <p className="font-bold text-black text-lg">Problem</p>
              <p className="font-bold text-black text-lg">Identification</p>
            </div>
            
            <div className="w-12 h-0.5 bg-brand-orange"></div>
            
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-black mx-auto mb-3" />
              <p className="font-bold text-black text-lg">Troubleshooting</p>
            </div>
            
            <div className="w-12 h-0.5 bg-brand-orange"></div>
            
            <div className="text-center">
              <div className="h-16 w-16 mx-auto mb-3 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-16 w-16 text-black">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p className="font-bold text-black text-lg">Independent</p>
              <p className="font-bold text-black text-lg">Solution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6: Areas of Improvement */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-lg p-2 mb-8">
          <h3 className="text-3xl font-bold text-brand-blue text-center py-4">Areas of improvement</h3>
        </div>
        
        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <p className="text-black text-lg leading-relaxed">{data.improvementIssue}</p>
          </div>
          
          <div className="flex items-start gap-4">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <p className="text-black text-lg leading-relaxed">{data.improvementSolution}</p>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-gray-300 pt-8">
          <h4 className="text-2xl font-bold text-brand-orange text-center mb-8">Communication Tips:</h4>
          
          <div className="grid grid-cols-3 gap-8">
            {[data.tip1, data.tip2, data.tip3].filter(tip => tip.trim()).map((tip, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-black font-semibold leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide 7: Project Details */}
      {data.projectTitle && (
        <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {/* ISKY TECH Logo - Top right */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2">
              <div className="text-brand-navy font-bold text-lg text-right">
                ISKY<br/>TECH
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-brand-navy rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 h-full">
            {/* Left Column - Project Screenshot */}
            <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-xl flex flex-col items-center justify-center p-8">
              <Code className="h-20 w-20 text-brand-orange mb-6" />
              <h3 className="text-3xl font-bold text-brand-orange text-center leading-tight">PROJECT</h3>
              <h3 className="text-3xl font-bold text-brand-orange text-center leading-tight">SCREENSHOT</h3>
            </div>

            {/* Right Column - Project Details */}
            <div className="space-y-6 pt-4">
              <div>
                <h4 className="text-2xl font-bold text-brand-blue mb-4">{data.projectTitle}:</h4>
                <div className="space-y-3">
                  <p className="text-black">1. {data.studentName} worked on an AI-driven task using {data.projectTitle}.</p>
                  <p className="text-black">2. He implemented basic logic using AI input and generated output based on user interaction.</p>
                  <p className="text-black">3. The code was debugged and functioned properly, though with instructor support.</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-6">
                <h4 className="text-xl font-bold text-brand-blue mb-4">Key Features Implemented:</h4>
                <div className="space-y-2">
                  {data.projectFeatures.filter(feature => feature.trim()).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-brand-blue rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-black">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide 8: Parent Recommendations */}
      <div className="bg-white rounded-lg p-8 relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* ISKY TECH Logo - Left side */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                <div className="w-4 h-4 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="writing-mode-vertical text-brand-navy font-bold text-lg tracking-widest">
              ISKY TECH
            </div>
          </div>
        </div>

        <div className="ml-20 grid grid-cols-2 gap-8 h-full">
          {/* Left Column - Content */}
          <div className="flex items-center">
            <div className="space-y-4">
              <p className="text-lg text-black leading-relaxed font-semibold">{data.studentName} is progressing well, but he would benefit from more consistent review outside of class.</p>
              <p className="text-lg text-black leading-relaxed font-semibold">We recommend encouraging him to revisit session materials, complete homework on time, and summarize what he did in each session — even in simple words.</p>
              <p className="text-lg text-black leading-relaxed font-semibold">These habits will help improve his confidence and retention through regular review and follow-up at home.</p>
            </div>
          </div>
          
          {/* Right Column - Badge */}
          <div className="bg-gradient-to-br from-brand-light-blue to-blue-200 rounded-xl flex flex-col items-center justify-center p-8">
            <div className="space-y-4 text-center">
              <div className="flex justify-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-orange">RECOMMENDATION</h3>
                <h3 className="text-2xl font-bold text-brand-orange">PARENT</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 9: Thank You */}
      <div className="bg-white rounded-lg p-8 text-center relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {/* Background decorative elements */}
        <div className="absolute top-4 right-4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue">
            <path d="M50,10 L90,90 L10,90 Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-orange">
            <circle cx="50" cy="50" r="40" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <p className="text-3xl font-semibold text-brand-blue leading-relaxed">
            "Thank you for your trust in our<br/>educational program."
          </p>
          
          <div className="border-t-2 border-dashed border-gray-300 w-full max-w-md"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-orange rounded-lg flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                <div className="w-6 h-6 bg-brand-navy rounded-sm"></div>
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-brand-orange">ISKY</h3>
              <h3 className="text-3xl font-bold text-brand-blue">TECH</h3>
              <p className="text-sm text-gray-600 font-semibold">EMPOWERING INNOVATORS</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-bold text-black">Report Prepared by</p>
            <p className="text-lg font-bold text-black">Quality Control Team</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center py-8">
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