
import React, { useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PatientSearch from "@/components/PatientCard/PatientSearch";
import PatientInfo from "@/components/PatientCard/PatientInfo";
import SymptomsForm from "@/components/Consultation/SymptomsForm";
import AISuggestion from "@/components/Consultation/AISuggestion";
import VideoCallInterface from "@/components/VideoCall/VideoCallInterface";
import { defaultUsers } from "@/utils/mockData";

const DashboardGP: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [inCall, setInCall] = useState(false);

  const handleSymptomSubmit = (newSymptoms: string[], newNotes: string) => {
    setSymptoms(newSymptoms);
    setNotes(newNotes);
    setShowAISuggestion(true);
  };

  const handleInitiateCall = () => {
    setInCall(true);
  };

  const handleEndCall = () => {
    setInCall(false);
  };

  return (
    <DashboardLayout userType="gp" userName={defaultUsers.gp.name}>
      {inCall ? (
        <VideoCallInterface 
          patientName={selectedPatient?.name || "Patient"}
          doctorName={defaultUsers.specialist.name}
          onEndCall={handleEndCall}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <PatientSearch onPatientSelect={setSelectedPatient} />
            {selectedPatient && (
              <div className="mt-6">
                <SymptomsForm onSymptomSubmit={handleSymptomSubmit} />
              </div>
            )}
          </div>
          <div>
            <PatientInfo patient={selectedPatient} />
            {showAISuggestion && selectedPatient && (
              <div className="mt-6">
                <AISuggestion symptoms={symptoms} onInitiateCall={handleInitiateCall} />
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default DashboardGP;
