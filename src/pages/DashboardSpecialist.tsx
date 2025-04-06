
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoCallInterface from "@/components/VideoCall/VideoCallInterface";
import { defaultUsers, patients, specialists } from "@/utils/mockData";
import { Clock, Video } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DashboardSpecialist: React.FC = () => {
  const [inCall, setInCall] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  // Simulate incoming call after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingCall(true);
      setSelectedPatient(patients[0]);
      toast({
        title: "Incoming Consultation Request",
        description: `Dr. ${defaultUsers.gp.name} is requesting a consultation for ${patients[0].name}`,
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCall = () => {
    setInCall(true);
    setIncomingCall(false);
    toast({
      title: "Call Accepted",
      description: "Connecting to the video call...",
    });
  };

  const handleDeclineCall = () => {
    setIncomingCall(false);
    toast({
      title: "Call Declined",
      description: "The consultation request has been declined",
    });
  };

  const handleEndCall = () => {
    setInCall(false);
    toast({
      title: "Call Ended",
      description: "The consultation has ended",
    });
  };

  return (
    <DashboardLayout userType="specialist" userName={defaultUsers.specialist.name}>
      {inCall ? (
        <VideoCallInterface 
          patientName={selectedPatient?.name || "Patient"}
          doctorName={defaultUsers.gp.name}
          onEndCall={handleEndCall}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg">Pending Consultations</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {incomingCall ? (
                  <div className="border rounded-lg p-4 bg-bhc-50 border-bhc-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Incoming Consultation Request</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          From: Dr. {defaultUsers.gp.name}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Patient:</span> {selectedPatient.name}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="font-medium">Health ID:</span> {selectedPatient.id}
                        </p>
                        <div className="mt-2 flex items-center">
                          <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 mr-2">
                            High Priority
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            Just now
                          </Badge>
                        </div>
                      </div>
                      <div className="bhc-pulse">
                        <Video className="h-10 w-10 text-success p-2 bg-white rounded-full shadow-md" />
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <Button 
                        className="bg-bhc-500 hover:bg-bhc-600"
                        onClick={handleAcceptCall}
                      >
                        Accept Consultation
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleDeclineCall}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {specialists[0].pendingConsultations.map((consultation, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{consultation.patientName}</h3>
                            <p className="text-sm text-gray-500">Requested by: {consultation.requestedBy}</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">Symptoms:</span>{" "}
                                {consultation.symptoms.join(", ")}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Patient ID:</span>{" "}
                                {consultation.patientId}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={`${consultation.priority === "High" ? "text-red-600 border-red-200 bg-red-50" : "text-amber-600 border-amber-200 bg-amber-50"}`}
                              >
                                {consultation.priority} Priority
                              </Badge>
                              <Badge variant="outline" className="flex items-center">
                                <Clock size={12} className="mr-1" />
                                {new Date(consultation.requestTime).toLocaleTimeString()}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            className="ml-4"
                            onClick={() => {
                              setSelectedPatient(patients.find(p => p.id === consultation.patientId));
                              setIncomingCall(true);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg">Patient Records</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {patients.map((patient, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            {patient.age} years, {patient.gender}
                          </p>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Health ID:</span> {patient.id}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Blood Group:</span> {patient.bloodGroup}
                            </p>
                            {patient.chronicConditions.length > 0 && (
                              <p className="text-sm">
                                <span className="font-medium">Chronic Conditions:</span>{" "}
                                {patient.chronicConditions.join(", ")}
                              </p>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {patient.allergies.map((allergy, i) => (
                              <Badge key={i} variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                {allergy}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="ml-4"
                          onClick={() => {
                            setSelectedPatient(patient);
                            setIncomingCall(true);
                          }}
                        >
                          Consult
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {specialists[0].schedule.map((appointment, i) => (
                    <div key={i} className="flex justify-between border-b pb-2 last:border-0">
                      <div>
                        <span className="font-medium">{appointment.time}</span>
                        <p className="text-sm text-gray-600">{appointment.patientName || appointment.type}</p>
                      </div>
                      <Badge
                        variant={appointment.status === "Pending" ? "outline" : "secondary"}
                        className={appointment.status === "Pending" ? "text-amber-600" : ""}
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardSpecialist;
