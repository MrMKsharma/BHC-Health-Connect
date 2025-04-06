
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { commonSymptoms, aiSuggestions } from "@/utils/mockData";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SymptomsFormProps {
  onSymptomSubmit: (symptoms: string[], notes: string) => void;
}

const SymptomsForm: React.FC<SymptomsFormProps> = ({ onSymptomSubmit }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredSymptoms = commonSymptoms.filter(
    (symptom) => 
      !selectedSymptoms.includes(symptom) && 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSymptom = (symptom: string) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchTerm("");
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleSubmit = () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one symptom",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onSymptomSubmit(selectedSymptoms, notes);
      setIsSubmitting(false);
      toast({
        title: "Symptoms Submitted",
        description: "AI is analyzing the patient's symptoms",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Patient Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="symptoms">Select Symptoms</Label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to search symptoms"
                className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {searchTerm && (
                <div className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg w-full mt-1 max-h-60 overflow-y-auto">
                  {filteredSymptoms.length > 0 ? (
                    filteredSymptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => addSymptom(symptom)}
                      >
                        <Plus size={16} className="mr-2 text-bhc-500" />
                        {symptom}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-500">No symptoms found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label>Selected Symptoms</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedSymptoms.length > 0 ? (
                selectedSymptoms.map((symptom) => (
                  <Badge
                    key={symptom}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 flex items-center"
                  >
                    {symptom}
                    <button
                      type="button"
                      onClick={() => removeSymptom(symptom)}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">No symptoms selected</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any additional information about the patient's condition"
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="w-full bg-bhc-500 hover:bg-bhc-600"
        >
          {isSubmitting ? "Analyzing..." : "Submit Symptoms for Analysis"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SymptomsForm;
