
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Ambulance, MapPin } from "lucide-react";
import { ambulances } from "@/utils/mockData";
import { toast } from "@/hooks/use-toast";

interface AmbulanceTrackerProps {
  onAssignAmbulance?: () => void;
}

const AmbulanceTracker: React.FC<AmbulanceTrackerProps> = ({ onAssignAmbulance }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState<string | null>(null);
  const [assigned, setAssigned] = useState(false);

  const handleAssign = () => {
    if (!selectedAmbulance) {
      toast({
        title: "Error",
        description: "Please select an ambulance first",
        variant: "destructive",
      });
      return;
    }

    setAssigned(true);
    toast({
      title: "Ambulance Assigned",
      description: `Ambulance ${selectedAmbulance} has been dispatched`,
    });
    
    if (onAssignAmbulance) {
      onAssignAmbulance();
    }
  };

  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg">Ambulance Management</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Available Ambulances</h3>
          <div className="space-y-2">
            {ambulances.map((ambulance) => (
              <div
                key={ambulance.id}
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  selectedAmbulance === ambulance.id
                    ? "border-bhc-500 bg-bhc-50"
                    : "hover:bg-gray-50"
                } ${assigned && selectedAmbulance === ambulance.id ? "opacity-50" : ""}`}
                onClick={() => !assigned && setSelectedAmbulance(ambulance.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Ambulance className="h-5 w-5 text-bhc-500 mr-2" />
                    <div>
                      <p className="font-medium">{ambulance.id}</p>
                      <p className="text-sm text-gray-500">Driver: {ambulance.driver}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={ambulance.status === "Available" ? "text-green-600 border-green-200 bg-green-50" : "text-amber-600 border-amber-200 bg-amber-50"}
                  >
                    {ambulance.status}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {ambulance.location}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="map-container mt-4 bg-gray-100">
          {assigned && selectedAmbulance ? (
            <div className="h-full w-full relative flex items-center justify-center bg-gray-200">
              <div className="text-lg font-medium text-gray-500">Ambulance Tracking</div>
              <div className="absolute top-1/2 left-0 ambulance-marker"></div>
              <div className="absolute top-1/2 right-0">
                <MapPin className="h-6 w-6 text-bhc-500" />
                <div className="text-xs font-medium">Hospital</div>
              </div>
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>Select an ambulance to view on map</p>
              </div>
            </div>
          )}
        </div>

        <Button
          onClick={handleAssign}
          className="w-full mt-4 bg-bhc-500 hover:bg-bhc-600"
          disabled={!selectedAmbulance || assigned}
        >
          {assigned ? "Ambulance Dispatched" : "Dispatch Ambulance"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AmbulanceTracker;
