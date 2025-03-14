import React, { useState } from 'react';
import { FileText, Download, Calendar, Search } from 'lucide-react';

export default function Documents() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [reason, setReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const documents = [
    {
      id: 1,
      type: 'Medical Certificate',
      date: '2025-03-14',
      status: 'ready',
      description: 'Sick leave certificate',
      fileUrl: 'https://example.com/medical-certificate.pdf' // Example URL for download
    },
    {
      id: 2,
      type: 'Health Record',
      date: '2025-03-10',
      status: 'processing',
      description: 'Complete health record for university admission'
    },
    {
      id: 3,
      type: 'Prescription',
      date: '2025-02-28',
      status: 'ready',
      description: 'Medication prescription copy',
      fileUrl: 'https://example.com/prescription.pdf' // Example URL for download
    }
  ];

  const documentTypes = [
    'Medical Certificate',
    'Health Record',
    'Prescription Copy',
    'Lab Results',
    'Vaccination Record'
  ];

  // Handle document request form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document Request Submitted:', { startDate, endDate, documentType, reason });
    alert('Your document request has been submitted successfully!');
    // Reset form fields
    setStartDate('');
    setEndDate('');
    setDocumentType('');
    setReason('');
  };

  // Handle downloading a document
  const handleDownload = (fileUrl) => {
    if (fileUrl) {
      window.open(fileUrl, '_blank'); // Open the file URL in a new tab
    } else {
      alert('File URL is not available.');
    }
  };

  // Filter documents based on search term, date range, and type
  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = document.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = (!startDate || new Date(document.date) >= new Date(startDate)) &&
                            (!endDate || new Date(document.date) <= new Date(endDate));
    return matchesSearch && matchesDateRange;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Documents</h2>
              <div className="space-y-4">
                {filteredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{document.type}</p>
                        <p className="text-sm text-gray-500">{document.description}</p>
                        <p className="text-xs text-gray-400">{document.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`
                        px-2 py-1 text-xs font-medium rounded-full
                        ${document.status === 'ready'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                        }
                      `}>
                        {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                      </span>
                      {document.status === 'ready' && (
                        <button
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                          onClick={() => handleDownload(document.fileUrl)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Request Document</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Document Type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Select type</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date Range</label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Reason for Request</label>
                <div className="mt-1">
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Please describe why you need this document"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Request Document
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}