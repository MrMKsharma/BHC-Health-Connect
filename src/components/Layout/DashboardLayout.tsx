
import React from "react";
import { Bell, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: string;
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userType,
  userName
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    navigate("/");
  };

  let navLinks = [];
  let roleTitle = "";

  switch (userType) {
    case "gp":
      roleTitle = "General Physician";
      navLinks = [
        { name: "Dashboard", href: "/dashboard/gp" },
        { name: "Patient Search", href: "/dashboard/gp" },
        { name: "Consultations", href: "/dashboard/gp" },
        { name: "Referrals", href: "/dashboard/gp" },
      ];
      break;
    case "specialist":
      roleTitle = "Specialist Doctor";
      navLinks = [
        { name: "Dashboard", href: "/dashboard/specialist" },
        { name: "Pending Consults", href: "/dashboard/specialist" },
        { name: "Patient Records", href: "/dashboard/specialist" },
        { name: "Schedule", href: "/dashboard/specialist" },
      ];
      break;
    case "patient":
      roleTitle = "Patient Portal";
      navLinks = [
        { name: "My Health", href: "/dashboard/patient" },
        { name: "Appointments", href: "/dashboard/patient" },
        { name: "Medical Records", href: "/dashboard/patient" },
        { name: "Messages", href: "/dashboard/patient" },
      ];
      break;
    case "admin":
      roleTitle = "Admin Portal";
      navLinks = [
        { name: "Dashboard", href: "/dashboard/admin" },
        { name: "Emergency Mgmt", href: "/dashboard/admin" },
        { name: "Hospital Resources", href: "/dashboard/admin" },
        { name: "User Management", href: "/dashboard/admin" },
      ];
      break;
    default:
      navLinks = [];
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`bg-bhc-500 text-white w-64 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed h-full z-10 md:relative md:translate-x-0`}
      >
        <div className="p-5 border-b border-bhc-600">
          <div className="flex items-center">
            <span className="font-bold text-2xl">BHC</span>
            <span className="ml-2 text-sm font-medium">Health Connect</span>
          </div>
          <div className="text-sm mt-1 text-blue-100">{roleTitle}</div>
        </div>
        <nav className="py-4 flex-grow">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="block py-2.5 px-5 hover:bg-bhc-600 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-5 border-t border-bhc-600">
          <div className="text-sm">
            {userName}
          </div>
          <button
            onClick={handleLogout}
            className="mt-2 flex items-center text-sm text-blue-100 hover:text-white"
          >
            <LogOut size={16} className="mr-2" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-x-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-4 py-3">
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800 hidden md:block">
              Bharat Health Connect
            </h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell size={20} />
              </Button>
              <div className="h-8 w-8 rounded-full bg-bhc-500 text-white flex items-center justify-center">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
