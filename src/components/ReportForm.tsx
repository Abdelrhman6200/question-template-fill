import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FileText, Upload } from "lucide-react";

interface ReportData {
  // Student Information
  studentName: string;
  studentPhoto?: string;
  instructorName: string;
  track: string;
  sessionNumber: string;
  sessionDate: string;
  
  // Performance
  qualityPercentage: number;
  performanceNotes: string[];
  
  // Progress Points
  progressPoint1: string;
  progressPoint2: string;
  progressPoint3: string;
  
  // Strengths
  strengthText: string;
  
  // Areas of Improvement
  improvementIssue: string;
  improvementSolution: string;
  
  // Communication Tips
  tip1: string;
  tip2: string;
  tip3: string;
  
  // Project Details
  projectTitle: string;
  projectFeatures: string[];
  
  // Parent Recommendations
  recommendations: string;
}

interface ReportFormProps {
  onGenerateReport: (data: ReportData) => void;
}

export function ReportForm({ onGenerateReport }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportData>({
    studentName: "",
    studentPhoto: "",
    instructorName: "",
    track: "",
    sessionNumber: "",
    sessionDate: "",
    qualityPercentage: 80,
    performanceNotes: ["", "", ""],
    progressPoint1: "",
    progressPoint2: "",
    progressPoint3: "",
    strengthText: "",
    improvementIssue: "",
    improvementSolution: "",
    tip1: "",
    tip2: "",
    tip3: "",
    projectTitle: "",
    projectFeatures: ["", "", ""],
    recommendations: "",
  });

  const handleInputChange = (field: keyof ReportData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field: "performanceNotes" | "projectFeatures", index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, studentPhoto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-brand-blue" />
          <h1 className="text-3xl font-bold text-brand-navy">ISKY TECH Report Generator</h1>
        </div>
        <p className="text-muted-foreground">Fill out the questionnaire to generate a professional session progress report</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Student Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                placeholder="e.g., Salem Mohamed"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentPhoto">Student Photo (Optional)</Label>
              <Input
                id="studentPhoto"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue file:text-white hover:file:bg-brand-navy"
              />
              {formData.studentPhoto && (
                <div className="mt-2">
                  <img 
                    src={formData.studentPhoto} 
                    alt="Student preview" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-brand-light-blue"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructorName">Instructor Name</Label>
              <Input
                id="instructorName"
                value={formData.instructorName}
                onChange={(e) => handleInputChange("instructorName", e.target.value)}
                placeholder="e.g., Rahma Gaber"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="track">Track</Label>
              <Input
                id="track"
                value={formData.track}
                onChange={(e) => handleInputChange("track", e.target.value)}
                placeholder="e.g., AI Using Pictoblox"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionNumber">Session Number</Label>
              <Input
                id="sessionNumber"
                type="number"
                value={formData.sessionNumber}
                onChange={(e) => handleInputChange("sessionNumber", e.target.value)}
                placeholder="e.g., 2"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="sessionDate">Session Date</Label>
              <Input
                id="sessionDate"
                type="date"
                value={formData.sessionDate}
                onChange={(e) => handleInputChange("sessionDate", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Performance Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <Label>Quality Percentage: {formData.qualityPercentage}%</Label>
              <Slider
                value={[formData.qualityPercentage]}
                onValueChange={(value) => handleInputChange("qualityPercentage", value[0])}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
            <div className="space-y-4">
              <Label>Performance Notes (3 bullet points)</Label>
              {formData.performanceNotes.map((note, index) => (
                <Textarea
                  key={index}
                  value={note}
                  onChange={(e) => handleArrayInputChange("performanceNotes", index, e.target.value)}
                  placeholder={`Performance note ${index + 1}...`}
                  className="min-h-[80px]"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Points */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Progress Since Last Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="progressPoint1">Progress Point 1</Label>
              <Textarea
                id="progressPoint1"
                value={formData.progressPoint1}
                onChange={(e) => handleInputChange("progressPoint1", e.target.value)}
                placeholder="First progress observation..."
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progressPoint2">Progress Point 2</Label>
              <Textarea
                id="progressPoint2"
                value={formData.progressPoint2}
                onChange={(e) => handleInputChange("progressPoint2", e.target.value)}
                placeholder="Second progress observation..."
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progressPoint3">Progress Point 3</Label>
              <Textarea
                id="progressPoint3"
                value={formData.progressPoint3}
                onChange={(e) => handleInputChange("progressPoint3", e.target.value)}
                placeholder="Third progress observation..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Strength Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="strengthText">Main Strength Description</Label>
              <Textarea
                id="strengthText"
                value={formData.strengthText}
                onChange={(e) => handleInputChange("strengthText", e.target.value)}
                placeholder="Describe the student's main strengths and abilities..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Areas of Improvement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Areas of Improvement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="improvementIssue">Issue Identified</Label>
              <Textarea
                id="improvementIssue"
                value={formData.improvementIssue}
                onChange={(e) => handleInputChange("improvementIssue", e.target.value)}
                placeholder="Describe the main area that needs improvement..."
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="improvementSolution">Recommended Solution</Label>
              <Textarea
                id="improvementSolution"
                value={formData.improvementSolution}
                onChange={(e) => handleInputChange("improvementSolution", e.target.value)}
                placeholder="Describe the recommended approach to improve..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Communication Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tip1">Communication Tip 1</Label>
              <Input
                id="tip1"
                value={formData.tip1}
                onChange={(e) => handleInputChange("tip1", e.target.value)}
                placeholder="First communication tip..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tip2">Communication Tip 2</Label>
              <Input
                id="tip2"
                value={formData.tip2}
                onChange={(e) => handleInputChange("tip2", e.target.value)}
                placeholder="Second communication tip..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tip3">Communication Tip 3</Label>
              <Input
                id="tip3"
                value={formData.tip3}
                onChange={(e) => handleInputChange("tip3", e.target.value)}
                placeholder="Third communication tip..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectTitle">Project Title</Label>
              <Input
                id="projectTitle"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                placeholder="e.g., AI Task in PictoBlox"
              />
            </div>
            <div className="space-y-4">
              <Label>Key Features Implemented (3 features)</Label>
              {formData.projectFeatures.map((feature, index) => (
                <Input
                  key={index}
                  value={feature}
                  onChange={(e) => handleArrayInputChange("projectFeatures", index, e.target.value)}
                  placeholder={`Feature ${index + 1}...`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Parent Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-navy">Parent Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="recommendations">Recommendations for Home</Label>
              <Textarea
                id="recommendations"
                value={formData.recommendations}
                onChange={(e) => handleInputChange("recommendations", e.target.value)}
                placeholder="Provide recommendations for parents to support the student's learning at home..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            className="bg-brand-blue hover:bg-brand-navy text-white px-8 py-3 text-lg"
          >
            <Upload className="mr-2 h-5 w-5" />
            Generate Report
          </Button>
        </div>
      </form>
    </div>
  );
}