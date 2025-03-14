import { useAuth } from "../contexts/AuthContext";
import { Calendar, FileText, Bell, Clock, Search, Download } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  // Example user details (replace with actual data from your backend or context)
  const userDetails = {
    StudentName: "John David",
    StudentId: "S123456", // Added missing key
    ParentPhone: "+91 9876543210",
    MedicalHistorySummary: "No major illnesses. Allergic to peanuts.",
  };

  const stats = [
    { name: "Upcoming Appointments", value: "2", icon: <Calendar />, color: "bg-blue-500", link: "/appointments" },
    { name: "Medical Records", value: "15", icon: <FileText />, color: "bg-green-500", link: "/records" },
    { name: "Pending Documents", value: "3", icon: <Clock />, color: "bg-yellow-500", link: "/documents" },
    { name: "Notifications", value: "4", icon: <Bell />, color: "bg-purple-500", link: "#" },
  ];

  const recentRecords = [
    { id: 1, date: "2025-03-14", doctorName: "Dr. Sarah Johnson", diagnosis: "Regular Checkup", fileUrl: "https://example.com/medical-record-1.pdf" },
    { id: 2, date: "2025-03-10", doctorName: "Dr. Michael Chen", diagnosis: "Flu Symptoms", fileUrl: "https://example.com/medical-record-2.pdf" },
  ];

  const upcomingAppointments = [
    { id: 1, date: "2025-03-20", time: "10:00 AM", doctorName: "Dr. Emily Wilson", type: "General Checkup" },
    { id: 2, date: "2025-03-25", time: "2:30 PM", doctorName: "Dr. James Martinez", type: "Follow-up" },
  ];

  // Handle downloading a medical record
  const handleDownload = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  // Handle rescheduling an appointment
  const handleReschedule = (appointmentId: number) => {
    alert(`Rescheduling appointment with ID: ${appointmentId}`);
  };

  // Handle notifications button click
  const handleNotifications = () => {
    alert("You have 4 new notifications.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back{user?.full_name ? `, ${user.full_name}` : ""}!
        </h1>
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" onClick={handleNotifications}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </button>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* User Details Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(userDetails).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm font-medium text-gray-500">{key.replace(/([A-Z])/g, " $1")}</p>
              <p className="text-sm text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.link} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
            <div className="p-5 flex items-center">
              <div className={`${stat.color} rounded-md p-3 text-white`}>{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
                </dl>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Records & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Medical Records</h2>
              <Link to="/records" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.doctorName}</p>
                    <p className="text-sm text-gray-500">{record.diagnosis}</p>
                    <p className="text-xs text-gray-400">{record.date}</p>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200" onClick={() => handleDownload(record.fileUrl)}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Appointments</h2>
              <Link to="/appointments" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Book New
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.doctorName}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                    <p className="text-xs text-gray-400">{appointment.date} at {appointment.time}</p>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50" onClick={() => handleReschedule(appointment.id)}>
                    Reschedule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
