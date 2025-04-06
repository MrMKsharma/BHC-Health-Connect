
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { patients } from "@/utils/mockData";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PatientSearchProps {
  onPatientSelect: (patient: any) => void;
}

const PatientSearch: React.FC<PatientSearchProps> = ({ onPatientSelect }) => {
  const [healthId, setHealthId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!healthId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Health Card ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulating API call delay
    setTimeout(() => {
      const patient = patients.find((p) => p.id === healthId);
      
      if (patient) {
        toast({
          title: "Patient Found",
          description: `Found record for ${patient.name}`,
        });
        onPatientSelect(patient);
      } else {
        toast({
          title: "Patient Not Found",
          description: "No record found with this Health Card ID",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickSearch = (id: string) => {
    setHealthId(id);
    const patient = patients.find((p) => p.id === id);
    if (patient) {
      onPatientSelect(patient);
      toast({
        title: "Patient Found",
        description: `Loaded record for ${patient.name}`,
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Patient Search</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter Health Card ID"
              value={healthId}
              onChange={(e) => setHealthId(e.target.value.toUpperCase())}
              className="flex-grow"
            />
            <Button 
              type="button" 
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-bhc-500 hover:bg-bhc-600"
            >
              {isLoading ? "Searching..." : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Quick access demo patients:</p>
            <div className="flex flex-wrap gap-2">
              {patients.map((patient) => (
                <Button
                  key={patient.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSearch(patient.id)}
                >
                  {patient.id} ({patient.name.split(" ")[0]})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSearch;
