
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PatientInfoProps {
  patient: any;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  if (!patient) {
    return <Card className="p-6">
      <p className="text-gray-500 text-center">No patient selected</p>
    </Card>;
  }

  return (
    <Card>
      <CardHeader className="bg-gray-50 border-b pb-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Health Card ID</p>
            <CardTitle className="text-xl">{patient.id}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-bhc-500 hover:bg-bhc-600">{patient.bloodGroup}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Name</p>
            <p>{patient.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Age / Gender</p>
            <p>{patient.age} / {patient.gender}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Village</p>
            <p>{patient.village}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">District</p>
            <p>{patient.district}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">State</p>
            <p>{patient.state}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Contact</p>
            <p>{patient.phone}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Allergies</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {patient.allergies.length > 0 ? (
              patient.allergies.map((allergy: string, index: number) => (
                <Badge key={index} variant="outline" className="text-red-600 border-red-200 bg-red-50">
                  {allergy}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">None reported</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Chronic Conditions</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {patient.chronicConditions.length > 0 ? (
              patient.chronicConditions.map((condition: string, index: number) => (
                <Badge key={index} variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                  {condition}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">None reported</span>
            )}
          </div>
        </div>

        <Tabs defaultValue="history" className="mt-6">
          <TabsList>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="pt-4">
            {patient.history.length > 0 ? (
              <div className="space-y-4">
                {patient.history.map((record: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{record.diagnosis}</p>
                        <Badge variant="outline">{record.date}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Doctor: {record.doctor}</p>
                      <p className="text-sm mb-2">
                        <span className="text-gray-500">Prescription: </span>
                        {record.prescription}
                      </p>
                      <p className="text-sm">
                        <span className="text-gray-500">Follow-up: </span>
                        {record.followUp}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No medical history available</p>
            )}
          </TabsContent>
          <TabsContent value="reports" className="pt-4">
            <p className="text-gray-500">No medical reports available</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientInfo;
