
import React, { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { defaultUsers, patients } from "@/utils/mockData";
import { CalendarDays, Clock, Download, FileText, Phone, Pill } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardPatient: React.FC = () => {
  const patient = patients[0]; // Using first patient as example
  const [healthId, setHealthId] = useState(patient.id);

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Medical report has been downloaded to your device.",
    });
  };

  return (
    <DashboardLayout userType="patient" userName={patient.name}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">My Health Records</CardTitle>
                <Badge className="bg-bhc-500 hover:bg-bhc-600">{patient.bloodGroup}</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <Label htmlFor="healthId">Health Card ID</Label>
                <Input 
                  id="healthId" 
                  value={healthId} 
                  onChange={(e) => setHealthId(e.target.value)}
                  className="mt-1"
                  readOnly
                />
              </div>

              <Tabs defaultValue="records">
                <TabsList className="mb-4">
                  <TabsTrigger value="records">Medical Records</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="records" className="space-y-4">
                  {patient.history.map((record, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{record.diagnosis}</h3>
                            <p className="text-sm text-gray-500">{record.doctor}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Clock size={14} className="mr-1" />
                              {record.date}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={handleDownload}>
                            <Download size={16} className="mr-1" />
                            Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="prescriptions" className="space-y-4">
                  {patient.history.map((record, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <Pill size={16} className="mr-2 text-bhc-500" />
                              <h3 className="font-medium">{record.diagnosis} Medication</h3>
                            </div>
                            <p className="text-sm mt-1">{record.prescription}</p>
                            <p className="text-sm text-gray-500 mt-2">
                              Prescribed by {record.doctor} on {record.date}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={handleDownload}>
                            <FileText size={16} className="mr-1" />
                            PDF
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="appointments" className="space-y-4">
                  {patient.history.map((record, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <CalendarDays size={16} className="mr-2 text-bhc-500" />
                              <h3 className="font-medium">Follow-up Visit</h3>
                            </div>
                            <p className="text-sm mt-1">
                              For: {record.diagnosis}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              With: {record.doctor}
                            </p>
                            <Badge className="mt-2 bg-amber-500 hover:bg-amber-600">
                              {record.followUp}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Phone size={16} className="mr-1" />
                            Remind
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Age / Gender</p>
                  <p>{patient.age} / {patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{patient.village}, {patient.district}, {patient.state}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact Number</p>
                  <p>{patient.phone}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.allergies.length > 0 ? (
                      patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="text-red-600 border-red-200 bg-red-50">
                          {allergy}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">None reported</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Chronic Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    {patient.chronicConditions.length > 0 ? (
                      patient.chronicConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                          {condition}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">None reported</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPatient;
