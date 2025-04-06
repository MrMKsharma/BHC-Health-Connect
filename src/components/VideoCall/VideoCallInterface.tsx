
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Monitor, Phone, Video, VideoOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface VideoCallInterfaceProps {
  patientName: string;
  doctorName: string;
  onEndCall: () => void;
}

const VideoCallInterface: React.FC<VideoCallInterfaceProps> = ({
  patientName,
  doctorName,
  onEndCall,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Handle camera access and stream setup
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setIsConnected(true);
        toast({
          title: "Call Connected",
          description: `You are now connected with Dr. ${doctorName}`,
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: "Camera Access Error",
          description: "Unable to access camera. Please check permissions.",
          variant: "destructive",
        });
      }
    };

    if (isVideoOn) {
      setupCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [doctorName, isVideoOn]);

  // Simulate call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    toast({
      title: "Call Ended",
      description: `Call duration: ${formatTime(callDuration)}`,
    });
    onEndCall();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader className="bg-gray-50 border-b pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                {isConnected ? "Connected" : "Connecting..."} 
                {isConnected && <span className="ml-2 text-sm font-normal text-gray-500">{formatTime(callDuration)}</span>}
              </CardTitle>
              <div className="text-sm text-gray-500">{doctorName}</div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center p-0 bg-gray-900 relative overflow-hidden">
            {/* Main video (doctor) - This would be a real video stream in a production app */}
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              {!isConnected ? (
                <div className="text-white text-center">
                  <div className="animate-pulse mb-2">
                    <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-bhc-500 animate-spin mx-auto"></div>
                  </div>
                  <p>Establishing secure connection...</p>
                </div>
              ) : !isVideoOn ? (
                <div className="text-white text-center">
                  <VideoOff size={48} className="mx-auto mb-2 text-gray-400" />
                  <p>Video is turned off</p>
                </div>
              ) : (
                // Simulated doctor video
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-bhc-600 flex items-center justify-center text-white text-4xl">
                    {doctorName.charAt(0)}
                  </div>
                </div>
              )}
            </div>
            
            {/* Self view (patient) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 rounded-lg bg-gray-700 border border-gray-600 flex items-center justify-center text-white">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <VideoOff size={24} className="text-gray-400" />
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-center space-x-2 border-t p-3">
            <Button
              variant="outline"
              size="icon"
              className={isAudioOn ? "" : "bg-gray-100"}
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic /> : <MicOff />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={isVideoOn ? "" : "bg-gray-100"}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video /> : <VideoOff />}
            </Button>
            <Button variant="outline" size="icon">
              <Monitor />
            </Button>
            <Button 
              variant="destructive" 
              size="icon"
              onClick={handleEndCall}
            >
              <Phone className="rotate-135" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card className="h-full flex flex-col">
          <CardHeader className="bg-gray-50 border-b pb-3">
            <CardTitle className="text-lg">Medical Notes</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-grow overflow-y-auto">
            <div className="space-y-4">
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Textarea
                  id="diagnosis"
                  placeholder="Enter diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="h-24"
                  disabled={!isConnected}
                />
              </div>
              <div>
                <Label htmlFor="prescription">Prescription</Label>
                <Textarea
                  id="prescription"
                  placeholder="Enter prescription"
                  value={prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                  className="h-32"
                  disabled={!isConnected}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t p-3">
            <Button 
              className="w-full bg-bhc-500 hover:bg-bhc-600"
              disabled={!isConnected || !diagnosis || !prescription}
            >
              Save Medical Record
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VideoCallInterface;
