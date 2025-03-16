import React, { useState } from 'react';
import { Calendar, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-03-20',
      time: '10:00 AM',
      doctorName: 'Dr. Emily Wilson',
      status: 'confirmed',
      type: 'General Checkup',
    },
    {
      id: 2,
      date: '2025-03-25',
      time: '2:30 PM',
      doctorName: 'Dr. James Martinez',
      status: 'pending',
      type: 'Follow-up',
    },
  ]);
  const [showPopup, setShowPopup] = useState(false); // State for popup

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Physician' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dentist' },
    { id: 3, name: 'Dr. Emily Wilson', specialty: 'Psychologist' },
    { id: 4, name: 'Dr. James Martinez', specialty: 'Dermatologist' },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedDoctor || !reason) {
      alert('Please fill in all fields.');
      return;
    }

    const doctor = doctors.find((doc) => doc.id === Number(selectedDoctor));
    if (!doctor) return;

    const newAppointment = {
      id: appointments.length + 1,
      date: selectedDate,
      time: selectedTime,
      doctorName: doctor.name,
      status: 'pending',
      type: reason,
    };

    setAppointments([...appointments, newAppointment]);
    setShowPopup(true); // Show confirmation popup

    // Reset the form fields
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </button>
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Appointments</h2>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center
                        ${appointment.status === 'confirmed' ? 'bg-green-100' : 'bg-yellow-100'}`}
                      >
                        <Calendar className={`h-6 w-6 
                          ${appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(appointment.date), 'MMM dd, yyyy')} at {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full
                        ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <button className="text-gray-400 hover:text-gray-500">
                        <FileText className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Book an Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Doctor</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <p>Appointment booked successfully!</p>
            <button onClick={() => setShowPopup(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}