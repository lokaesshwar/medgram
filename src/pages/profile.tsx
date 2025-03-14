import React from "react";
import { User, Phone, FileText } from "lucide-react";

const Profile: React.FC = () => {
  // Sample data (Replace with API data if needed)
  const studentProfile = {
    name: "John David",
    studentID: "S123456",
    parentPhone: "+91 9876543210",
    medicalHistory: "No major illnesses. Allergic to peanuts.",
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
        <User className="h-8 w-8 text-blue-500" />
        Student Profile
      </h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-600" />
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {studentProfile.name}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-gray-600" />
          <p className="text-lg text-gray-700">
            <strong>Student ID:</strong> {studentProfile.studentID}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-600" />
          <p className="text-lg text-gray-700">
            <strong>Parent's Phone:</strong> {studentProfile.parentPhone}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-lg text-gray-700">
            <strong>Medical History:</strong> {studentProfile.medicalHistory}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
