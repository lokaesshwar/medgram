import React from "react";
import { User, Mail, Phone, Home, BookOpen, HeartPulse } from "lucide-react";

const AccountCenter = () => {
  const studentInfo = {
    name: "Alex Johnson",
    studentEmail: "alex.j@student.edu",
    collegeEmail: "alex.johnson@college.edu",
    registrationNumber: "S123456",
    enrolledCourse: "Computer Science",
    fatherPhone: "+1 (555) 123-4567",
    fatherEmail: "johnson.dad@email.com",
    motherPhone: "+1 (555) 765-4321",
    motherEmail: "johnson.mom@email.com",
    emergencyContact: "+1 (555) 999-8888",
    permanentAddress: "123 College Ave, Academic City, ST 12345",
    medicalHistory: "No major illnesses. Allergic to peanuts." // Added Medical History
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Account Center</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {studentInfo.name}
              </h2>
              <p className="text-gray-600">{studentInfo.registrationNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Student Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Student Email</p>
                    <p className="text-gray-900">{studentInfo.studentEmail}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">College Email</p>
                    <p className="text-gray-900">{studentInfo.collegeEmail}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Enrolled Course</p>
                    <p className="text-gray-900">{studentInfo.enrolledCourse}</p>
                  </div>
                </div>

                {/* Medical History Section */}
                <div className="flex items-center space-x-3">
                  <HeartPulse className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Medical History</p>
                    <p className="text-gray-900">{studentInfo.medicalHistory}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Parent Information
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Father's Phone</p>
                    <p className="text-gray-900">{studentInfo.fatherPhone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Father's Email</p>
                    <p className="text-gray-900">{studentInfo.fatherEmail}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Mother's Phone</p>
                    <p className="text-gray-900">{studentInfo.motherPhone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Mother's Email</p>
                    <p className="text-gray-900">{studentInfo.motherEmail}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Emergency Contact & Address
            </h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="text-gray-900">{studentInfo.emergencyContact}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Permanent Address</p>
                  <p className="text-gray-900">{studentInfo.permanentAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCenter;
