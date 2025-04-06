
import React, { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AmbulanceTracker from "@/components/Emergency/AmbulanceTracker";
import ResourceStatus from "@/components/Hospital/ResourceStatus";
import { defaultUsers, hospitals, ambulances } from "@/utils/mockData";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardAdmin: React.FC = () => {
  const [ambulanceAssigned, setAmbulanceAssigned] = useState(false);
  const [hospitalReserved, setHospitalReserved] = useState("");
  
  const handleAmbulanceAssigned = () => {
    setAmbulanceAssigned(true);
    toast({
      title: "Emergency Response Initiated",
      description: "Ambulance has been dispatched.",
    });
  };
  
  const handleHospitalReserved = (hospital: string) => {
    setHospitalReserved(hospital);
    toast({
      title: "Bed Reserved",
      description: `A bed has been reserved at ${hospital}`,
    });
  };

  const totalBeds = hospitals.reduce((acc, hospital) => acc + hospital.totalBeds, 0);
  const availableBeds = hospitals.reduce((acc, hospital) => acc + hospital.availableBeds, 0);
  const availableAmbulances = ambulances.filter(amb => amb.status === "Available").length;

  return (
    <DashboardLayout userType="admin" userName={defaultUsers.admin.name}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Emergency & Resource Management</h1>
        <p className="text-gray-500">
          Monitor and manage healthcare resources across the network
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Beds</p>
              <p className="text-2xl font-bold">{totalBeds}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-bhc-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Beds</p>
              <p className="text-2xl font-bold">{availableBeds}</p>
              <p className="text-xs text-gray-500">{Math.round((availableBeds / totalBeds) * 100)}% availability</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Ambulances</p>
              <p className="text-2xl font-bold">{availableAmbulances}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AmbulanceTracker onAssignAmbulance={handleAmbulanceAssigned} />
        <ResourceStatus onReserve={handleHospitalReserved} />
      </div>

      {(ambulanceAssigned || hospitalReserved) && (
        <Card className="mt-6">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-lg">Emergency Response Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={ambulanceAssigned ? "bg-success" : "bg-gray-200"}>Step 1</Badge>
                <span className={ambulanceAssigned ? "font-medium" : "text-gray-500"}>
                  Ambulance Dispatched
                </span>
                {ambulanceAssigned && <CheckCircle size={16} className="text-success ml-auto" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={hospitalReserved ? "bg-success" : "bg-gray-200"}>Step 2</Badge>
                <span className={hospitalReserved ? "font-medium" : "text-gray-500"}>
                  Hospital Bed Reserved {hospitalReserved && `at ${hospitalReserved}`}
                </span>
                {hospitalReserved && <CheckCircle size={16} className="text-success ml-auto" />}
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-200">Step 3</Badge>
                <span className="text-gray-500">
                  Patient Pickup and Transport
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className="bg-gray-200">Step 4</Badge>
                <span className="text-gray-500">
                  Hospital Admission
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default DashboardAdmin;
