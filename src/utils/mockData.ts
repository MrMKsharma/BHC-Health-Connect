
// Mock data for the BHC prototype

// Mock patient data
export const patients = [
  {
    id: "BHC0001",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    village: "Gandhigram",
    district: "Jaipur",
    state: "Rajasthan",
    phone: "9876543210",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Dust"],
    chronicConditions: ["Diabetes", "Hypertension"],
    history: [
      {
        date: "2023-10-15",
        doctor: "Dr. Patel",
        diagnosis: "Viral Fever",
        prescription: "Paracetamol 500mg, Cetirizine 10mg",
        followUp: "2023-10-22"
      },
      {
        date: "2023-08-02",
        doctor: "Dr. Sharma",
        diagnosis: "Gastroenteritis",
        prescription: "ORS, Probiotics, Omeprazole 20mg",
        followUp: "2023-08-09"
      }
    ]
  },
  {
    id: "BHC0002",
    name: "Priya Singh",
    age: 32,
    gender: "Female",
    village: "Sundarpur",
    district: "Lucknow",
    state: "Uttar Pradesh",
    phone: "8765432109",
    bloodGroup: "B+",
    allergies: ["Sulfa drugs"],
    chronicConditions: [],
    history: [
      {
        date: "2023-11-05",
        doctor: "Dr. Verma",
        diagnosis: "Acute Bronchitis",
        prescription: "Azithromycin 500mg, Salbutamol inhaler",
        followUp: "2023-11-12"
      }
    ]
  },
  {
    id: "BHC0003",
    name: "Arjun Reddy",
    age: 28,
    gender: "Male",
    village: "Krishnapuram",
    district: "Hyderabad",
    state: "Telangana",
    phone: "7654321098",
    bloodGroup: "A-",
    allergies: [],
    chronicConditions: ["Asthma"],
    history: [
      {
        date: "2023-09-20",
        doctor: "Dr. Rao",
        diagnosis: "Asthma exacerbation",
        prescription: "Prednisolone 40mg, Montelukast 10mg",
        followUp: "2023-09-27"
      }
    ]
  }
];

// Mock hospital data
export const hospitals = [
  {
    id: 1,
    name: "District Hospital Jaipur",
    location: "Jaipur, Rajasthan",
    totalBeds: 100,
    availableBeds: 15,
    oxygenLevel: "Adequate",
    icuAvailable: 5,
    contact: "0141-2222222"
  },
  {
    id: 2,
    name: "Community Health Center Gandhigram",
    location: "Gandhigram, Rajasthan",
    totalBeds: 30,
    availableBeds: 8,
    oxygenLevel: "Low",
    icuAvailable: 1,
    contact: "0141-3333333"
  },
  {
    id: 3,
    name: "Rural Primary Health Center",
    location: "Sundarpur, Uttar Pradesh",
    totalBeds: 20,
    availableBeds: 12,
    oxygenLevel: "Adequate",
    icuAvailable: 0,
    contact: "0522-4444444"
  }
];

// Mock ambulances
export const ambulances = [
  {
    id: "AMB001",
    driver: "Ramesh",
    phone: "9988776655",
    status: "Available",
    location: "Jaipur Central"
  },
  {
    id: "AMB002",
    driver: "Suresh",
    phone: "8877665544",
    status: "In Transit",
    location: "En route to Gandhigram"
  },
  {
    id: "AMB003",
    driver: "Mahesh",
    phone: "7766554433",
    status: "Available",
    location: "Lucknow East"
  },
];

// Mock specialists data
export const specialists = [
  {
    id: "SPEC001",
    name: "Dr. Vikram Patel",
    specialization: "Cardiologist",
    hospital: "District Hospital Jaipur",
    phone: "9765432109",
    available: true,
    pendingConsultations: [
      {
        id: "CONS001",
        patientId: "BHC0001",
        patientName: "Rajesh Kumar",
        requestedBy: "Dr. Anjali Sharma",
        priority: "High",
        symptoms: ["Chest pain", "Shortness of breath"],
        requestTime: "2023-12-10T09:30:00",
        status: "Pending"
      },
      {
        id: "CONS002",
        patientId: "BHC0003",
        patientName: "Arjun Reddy",
        requestedBy: "Dr. Sanjay Verma",
        priority: "Medium",
        symptoms: ["Irregular heartbeat", "Fatigue"],
        requestTime: "2023-12-10T10:15:00",
        status: "Pending"
      }
    ],
    schedule: [
      {
        time: "09:00 AM",
        patientName: "Priya Singh",
        type: "Follow-up",
        status: "Scheduled"
      },
      {
        time: "10:30 AM",
        patientName: "Rajesh Kumar",
        type: "Emergency Consultation",
        status: "Pending"
      },
      {
        time: "02:00 PM",
        patientName: "Arjun Reddy",
        type: "New Consultation",
        status: "Scheduled"
      },
      {
        time: "04:00 PM",
        type: "Telemedicine Session",
        status: "Scheduled"
      }
    ]
  }
];

// Mock doctors
export const doctors = [
  {
    id: "DOC001",
    name: "Dr. Anjali Sharma",
    specialization: "General Physician",
    hospital: "District Hospital Jaipur",
    phone: "9876543210",
    available: true
  },
  {
    id: "DOC002",
    name: "Dr. Vikram Patel",
    specialization: "Cardiologist",
    hospital: "District Hospital Jaipur",
    phone: "9765432109",
    available: true
  },
  {
    id: "DOC003",
    name: "Dr. Sanjay Verma",
    specialization: "Neurologist",
    hospital: "District Hospital Jaipur",
    phone: "9654321098",
    available: false
  },
  {
    id: "DOC004",
    name: "Dr. Meena Reddy",
    specialization: "Pediatrician",
    hospital: "Community Health Center Gandhigram",
    phone: "9543210987",
    available: true
  }
];

// Mock AI diagnosis suggestions based on symptoms
export const aiSuggestions = {
  "fever,cough,fatigue": {
    possibleDiagnoses: ["Common Cold", "Influenza", "COVID-19", "Bronchitis"],
    riskLevel: "Medium",
    recommendedTests: ["COVID-19 Test", "Complete Blood Count", "Chest X-ray"],
    recommendedSpecialist: "Pulmonologist"
  },
  "headache,nausea,sensitivity to light": {
    possibleDiagnoses: ["Migraine", "Tension Headache", "Sinusitis"],
    riskLevel: "Low",
    recommendedTests: ["Physical Examination", "Neurological Assessment"],
    recommendedSpecialist: "Neurologist"
  },
  "chest pain,shortness of breath,dizziness": {
    possibleDiagnoses: ["Angina", "Myocardial Infarction", "Pulmonary Embolism"],
    riskLevel: "High",
    recommendedTests: ["ECG", "Cardiac Enzymes", "Chest X-ray"],
    recommendedSpecialist: "Cardiologist"
  },
  "abdominal pain,vomiting,diarrhea": {
    possibleDiagnoses: ["Gastroenteritis", "Food Poisoning", "Appendicitis"],
    riskLevel: "Medium",
    recommendedTests: ["Stool Analysis", "Abdominal Ultrasound", "Complete Blood Count"],
    recommendedSpecialist: "Gastroenterologist"
  },
  "rash,itching,swelling": {
    possibleDiagnoses: ["Allergic Reaction", "Contact Dermatitis", "Urticaria"],
    riskLevel: "Low to Medium",
    recommendedTests: ["Allergy Tests", "Physical Examination"],
    recommendedSpecialist: "Dermatologist"
  }
};

// Common symptoms for the dropdown
export const commonSymptoms = [
  "Fever", "Cough", "Headache", "Fatigue", "Shortness of breath",
  "Chest pain", "Abdominal pain", "Nausea", "Vomiting", "Diarrhea",
  "Rash", "Itching", "Swelling", "Dizziness", "Joint pain",
  "Muscle pain", "Sore throat", "Runny nose", "Loss of taste", "Loss of smell",
  "Back pain", "Neck pain", "Eye pain", "Ear pain", "Sensitivity to light"
];

export const userTypes = [
  { id: "gp", name: "General Physician" },
  { id: "specialist", name: "Specialist Doctor" },
  { id: "patient", name: "Patient" },
  { id: "admin", name: "Admin" }
];

// Default login credentials for demo
export const defaultUsers = {
  gp: { username: "doctor", password: "password", name: "Dr. Anjali Sharma" },
  specialist: { username: "specialist", password: "password", name: "Dr. Vikram Patel" },
  patient: { username: "patient", password: "password", name: "Rajesh Kumar" },
  admin: { username: "admin", password: "password", name: "Admin User" }
};
