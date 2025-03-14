import React, { useState } from 'react';
import { Send, Clock, CheckCircle, XCircle } from 'lucide-react';

const FamilyCenter = () => {
  const [messages] = useState([
    { 
      id: 1, 
      content: "Request for parent-teacher meeting next week",
      status: "pending",
      date: "2024-03-15"
    },
    { 
      id: 2, 
      content: "Health update regarding recent vaccination",
      status: "approved",
      date: "2024-03-10"
    },
    { 
      id: 3, 
      content: "Discussion about upcoming medical examination",
      status: "rejected",
      date: "2024-03-05"
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Family Center</h1>
        <button className="btn btn-primary flex items-center space-x-2">
          <Send className="w-4 h-4" />
          <span>Draft Message</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Communication History</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900">{message.content}</p>
                  {message.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                  {message.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {message.status === 'rejected' && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{message.date}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    message.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    message.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Draft New Message</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter message subject"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Type your message here..."
              />
            </div>
            <button className="btn btn-primary w-full">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyCenter;