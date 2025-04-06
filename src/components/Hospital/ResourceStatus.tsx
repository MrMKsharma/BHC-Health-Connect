
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/utils/mockData";
import { Check, Building2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResourceStatusProps {
  onReserve?: (hospital: string) => void;
}

const ResourceStatus: React.FC<ResourceStatusProps> = ({ onReserve }) => {
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [reserved, setReserved] = useState(false);

  const handleReserve = () => {
    if (selectedHospital === null) {
      toast({
        title: "Error",
        description: "Please select a hospital first",
        variant: "destructive",
      });
      return;
    }

    const hospital = hospitals.find(h => h.id === selectedHospital);
    if (!hospital) return;

    setReserved(true);
    toast({
      title: "Bed Reserved",
      description: `Successfully reserved a bed at ${hospital.name}`,
    });
    
    if (onReserve) {
      onReserve(hospital.name);
    }
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case "Adequate":
        return "text-green-600 border-green-200 bg-green-50";
      case "Low":
        return "text-amber-600 border-amber-200 bg-amber-50";
      default:
        return "text-red-600 border-red-200 bg-red-50";
    }
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg">Hospital Resources</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id}
              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                selectedHospital === hospital.id
                  ? "border-bhc-500 bg-bhc-50"
                  : "hover:bg-gray-50"
              } ${reserved && selectedHospital === hospital.id ? "opacity-50" : ""}`}
              onClick={() => !reserved && setSelectedHospital(hospital.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-bhc-500 mr-2" />
                  <div>
                    <p className="font-medium">{hospital.name}</p>
                    <p className="text-sm text-gray-500">{hospital.location}</p>
                  </div>
                </div>
                {reserved && selectedHospital === hospital.id && (
                  <Badge className="bg-success hover:bg-success/80">
                    <Check size={12} className="mr-1" />
                    Reserved
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-gray-500">Beds</p>
                  <p className="font-medium">
                    {hospital.availableBeds}/{hospital.totalBeds}
                  </p>
                </div>
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-gray-500">Oxygen</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(hospital.oxygenLevel)}`}
                  >
                    {hospital.oxygenLevel}
                  </Badge>
                </div>
                <div className="border rounded p-2 text-center">
                  <p className="text-xs text-gray-500">ICU</p>
                  <p className="font-medium">{hospital.icuAvailable}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleReserve}
          className="w-full mt-4 bg-bhc-500 hover:bg-bhc-600"
          disabled={selectedHospital === null || reserved}
        >
          {reserved ? "Bed Reserved" : "Reserve Bed"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResourceStatus;
