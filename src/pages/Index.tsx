
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/Auth/LoginForm";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-bhc-500">BHC</span>
            <div className="h-8 border-r border-gray-300 mx-4"></div>
            <span className="text-2xl font-medium">Bharat Health Connect</span>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bridging healthcare gaps through telemedicine, connecting rural patients with urban specialists
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Empowering Rural Healthcare with Technology
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Bharat Health Connect enables remote medical consultations, emergency response coordination, 
              and electronic health records management, bringing quality healthcare to underserved communities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Card className="bg-white shadow-md border-none">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-bhc-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 16.16C16.41 17.28 14.3 17.91 12 17.91C9.7 17.91 7.59 17.28 6 16.16"></path>
                      <path d="M12 20v-2.09"></path>
                      <path d="M12 13.01V12"></path>
                      <path d="M12 8v-2"></path>
                      <path d="M8 16l-4 4"></path>
                      <path d="M16 16l4 4"></path>
                      <rect x="4" y="4" width="16" height="12" rx="2"></rect>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Telemedicine</h3>
                  <p className="text-gray-600 text-sm">
                    Connect rural patients with specialists through high-quality video consultations
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-none">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-bhc-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Health Records</h3>
                  <p className="text-gray-600 text-sm">
                    Unified patient health cards with complete medical history and records
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-none">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-bhc-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Diagnostics</h3>
                  <p className="text-gray-600 text-sm">
                    AI-powered symptom analysis for preliminary diagnosis assistance
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-md border-none">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-full bg-blue-50 text-bhc-500 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                      <line x1="6" y1="1" x2="6" y2="4"></line>
                      <line x1="10" y1="1" x2="10" y2="4"></line>
                      <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Emergency Response</h3>
                  <p className="text-gray-600 text-sm">
                    Coordinated ambulance service and hospital resource management
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
