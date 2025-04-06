
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { aiSuggestions, doctors } from "@/utils/mockData";
import { AlertTriangle, CheckCircle, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AISuggestionProps {
  symptoms: string[];
  onInitiateCall: () => void;
}

const AISuggestion: React.FC<AISuggestionProps> = ({ symptoms, onInitiateCall }) => {
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

  const suggestion = getAISuggestion();
  
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
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Possible Diagnoses</h3>
          <div className="flex flex-wrap gap-2">
            {suggestion.possibleDiagnoses.map((diagnosis, index) => (
              <Badge key={index} variant="secondary">
                {diagnosis}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Recommended Tests</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {suggestion.recommendedTests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Specialist Referral</h3>
          <p className="text-sm text-gray-700 mb-1">
            This case should be referred to a <strong>{suggestion.recommendedSpecialist}</strong>
          </p>
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
