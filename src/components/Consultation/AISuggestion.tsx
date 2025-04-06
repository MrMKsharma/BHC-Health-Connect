
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { aiSuggestions, doctors } from "@/utils/mockData";
import { AlertTriangle, CheckCircle, Video, Edit2, Save, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AISuggestionProps {
  symptoms: string[];
  onInitiateCall: () => void;
}

const AISuggestion: React.FC<AISuggestionProps> = ({ symptoms, onInitiateCall }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSuggestion, setEditedSuggestion] = useState<any>(null);
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newTest, setNewTest] = useState("");

  // Get a matching AI suggestion or fallback to a default
  const getAISuggestion = () => {
    const symptomKey = symptoms.slice(0, 3).join(",").toLowerCase();
    
    // Try to find exact match
    for (const key in aiSuggestions) {
      if (key.includes(symptomKey) || symptomKey.includes(key)) {
        return aiSuggestions[key as keyof typeof aiSuggestions];
      }
    }
    
    // Default suggestion if no match
    return {
      possibleDiagnoses: ["Unspecified condition", "Requires specialist evaluation"],
      riskLevel: "Medium",
      recommendedTests: ["Physical Examination", "Basic Blood Work"],
      recommendedSpecialist: "General Physician"
    };
  };

  const suggestion = editedSuggestion || getAISuggestion();

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false);
      toast({
        title: "Changes Saved",
        description: "AI analysis results have been updated.",
      });
    } else {
      setEditedSuggestion(suggestion);
      setIsEditing(true);
    }
  };

  const handleAddDiagnosis = () => {
    if (newDiagnosis.trim()) {
      setEditedSuggestion({
        ...editedSuggestion,
        possibleDiagnoses: [...editedSuggestion.possibleDiagnoses, newDiagnosis.trim()]
      });
      setNewDiagnosis("");
    }
  };

  const handleRemoveDiagnosis = (index: number) => {
    setEditedSuggestion({
      ...editedSuggestion,
      possibleDiagnoses: editedSuggestion.possibleDiagnoses.filter((_: any, i: number) => i !== index)
    });
  };

  const handleAddTest = () => {
    if (newTest.trim()) {
      setEditedSuggestion({
        ...editedSuggestion,
        recommendedTests: [...editedSuggestion.recommendedTests, newTest.trim()]
      });
      setNewTest("");
    }
  };

  const handleRemoveTest = (index: number) => {
    setEditedSuggestion({
      ...editedSuggestion,
      recommendedTests: editedSuggestion.recommendedTests.filter((_: any, i: number) => i !== index)
    });
  };

  const handleRiskLevelChange = (level: string) => {
    setEditedSuggestion({
      ...editedSuggestion,
      riskLevel: level
    });
  };

  const handleSpecialistChange = (specialist: string) => {
    setEditedSuggestion({
      ...editedSuggestion,
      recommendedSpecialist: specialist
    });
  };
  
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-600 border-red-200 bg-red-50";
      case "Medium":
        return "text-amber-600 border-amber-200 bg-amber-50";
      default:
        return "text-green-600 border-green-200 bg-green-50";
    }
  };

  const handleCallSpecialist = () => {
    toast({
      title: "Connecting to Specialist",
      description: "Please wait while we connect you to the specialist",
    });
    onInitiateCall();
  };
  
  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">AI Analysis Results</CardTitle>
            <CardDescription>Based on reported symptoms</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <Badge
                    key={level}
                    variant={suggestion.riskLevel === level ? "default" : "outline"}
                    className={`cursor-pointer ${suggestion.riskLevel === level ? "bg-bhc-500" : getRiskBadgeColor(level)}`}
                    onClick={() => handleRiskLevelChange(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            ) : (
              <Badge
                variant="outline"
                className={`px-3 py-1 ${getRiskBadgeColor(suggestion.riskLevel)}`}
              >
                {suggestion.riskLevel === "High" ? (
                  <AlertTriangle size={14} className="mr-1" />
                ) : suggestion.riskLevel === "Low" ? (
                  <CheckCircle size={14} className="mr-1" />
                ) : null}
                {suggestion.riskLevel} Risk
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditToggle}
              className="h-8 px-2"
            >
              {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Possible Diagnoses</h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {suggestion.possibleDiagnoses.map((diagnosis, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {diagnosis}
                  {isEditing && (
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveDiagnosis(index)}
                    />
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newDiagnosis}
                  onChange={(e) => setNewDiagnosis(e.target.value)}
                  placeholder="Add new diagnosis"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddDiagnosis}
                  className="h-10"
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Recommended Tests</h3>
          <div className="space-y-2">
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {suggestion.recommendedTests.map((test, index) => (
                <li key={index} className="flex items-center justify-between">
                  {test}
                  {isEditing && (
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTest(index)}
                    />
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <div className="flex gap-2 mt-2">
                <Input
                  value={newTest}
                  onChange={(e) => setNewTest(e.target.value)}
                  placeholder="Add new test"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddTest}
                  className="h-10"
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Specialist Referral</h3>
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <select
                value={suggestion.recommendedSpecialist}
                onChange={(e) => handleSpecialistChange(e.target.value)}
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="General Physician">General Physician</option>
                <option value="Pulmonologist">Pulmonologist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
              </select>
            </div>
          ) : (
            <p className="text-sm text-gray-700 mb-1">
              This case should be referred to a <strong>{suggestion.recommendedSpecialist}</strong>
            </p>
          )}
          <p className="text-xs text-gray-500 mb-4">
            {suggestion.riskLevel === "High" 
              ? "Urgent consultation recommended" 
              : "Consultation recommended at your earliest convenience"}
          </p>

          <Button 
            onClick={handleCallSpecialist} 
            className="w-full bg-bhc-500 hover:bg-bhc-600"
          >
            <Video className="w-4 h-4 mr-2" />
            Connect with {suggestion.recommendedSpecialist}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestion;
