import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Stethoscope,
  LayoutDashboard,
  Calendar,
  FileText,
  Files,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function DashboardLayout() {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    { name: "Medical Records", href: "/records", icon: FileText },
    { name: "Documents", href: "/documents", icon: Files },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Family-Center", href: "/FamilyCenter", icon: User },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="p-5 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Stethoscope className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">MedGram</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center p-3 rounded-md mx-4 text-sm font-medium ${
                location.pathname === item.href
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navigation Bar */}
        <header className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Right-Aligned Profile/Login Button */}
          <div className="ml-auto relative">
            <button
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
            >
              <User className="h-5 w-5" />
              <span>{user?.email || "Login"}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area with Proper Spacing */}
        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
