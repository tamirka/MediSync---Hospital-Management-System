import React, { useState, useMemo } from 'react';
import type { Patient, Doctor } from '../types';
import { mockPatients } from '../data/mockData';
import useDebounce from '../hooks/useDebounce';

const getStatusClass = (status: Patient['status']) => {
  switch (status) {
    case 'Stable':
      return 'bg-green-100 text-green-800';
    case 'Recovering':
      return 'bg-blue-100 text-blue-800';
    case 'Critical':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface PatientsProps {
  onViewPatient: (patientId: string) => void;
  doctor?: Doctor;
}

const Patients: React.FC<PatientsProps> = ({ onViewPatient, doctor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const patientList = useMemo(() => {
    return doctor ? mockPatients.filter(p => p.primaryDoctorId === doctor.id) : mockPatients;
  }, [doctor]);

  const filteredPatients = useMemo(() => {
    return patientList.filter(patient =>
      patient.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [debouncedSearchTerm, patientList]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{doctor ? 'My Patients' : 'All Patients'}</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
          Add New Patient
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Blood Type</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Visit</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{patient.id}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-semibold">{patient.name}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{patient.age}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{patient.gender}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{patient.bloodType}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{patient.lastVisit}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusClass(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <button onClick={() => onViewPatient(patient.id)} className="text-primary hover:text-primary-focus font-medium">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;