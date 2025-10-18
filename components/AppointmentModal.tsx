import React from 'react';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">New Appointment</h2>
        {/* Form fields go here */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Patient</label>
            <input type="text" className="w-full p-2 mt-1 border border-gray-300 rounded-lg" placeholder="Search patient..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Doctor</label>
            <select className="w-full p-2 mt-1 border border-gray-300 rounded-lg">
              <option>Select a doctor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Date & Time</label>
            <input type="datetime-local" className="w-full p-2 mt-1 border border-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Cancel</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus">Save Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
