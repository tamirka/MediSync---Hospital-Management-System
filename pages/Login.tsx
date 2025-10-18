import React, { useState } from 'react';
import { mockDoctors, mockPatients } from '../data/mockData';
import { UserCircleIcon, DoctorsIcon, PatientsIcon } from '../components/Icons';

interface LoginPageProps {
  onLogin: (role: 'Admin' | 'Doctor' | 'Patient', id?: string) => void;
}

const Login: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0].id);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-wider text-primary">MediSync</h1>
            <p className="text-gray-500">Select a role to continue</p>
        </div>
        
        <div className="space-y-4">
            <button
                onClick={() => onLogin('Admin')}
                className="w-full flex items-center p-4 bg-teal-50 text-teal-800 rounded-lg shadow-sm hover:bg-teal-100 hover:shadow-md transition-all duration-300"
            >
                <UserCircleIcon className="w-8 h-8 mr-4"/>
                <div>
                    <h2 className="text-lg font-bold text-left">Login as Administrator</h2>
                    <p className="text-sm text-left text-gray-600">Full access to all hospital management features.</p>
                </div>
            </button>
            <button
                onClick={() => onLogin('Doctor', mockDoctors[0].id)} // Logging in as Dr. Evelyn Reed
                className="w-full flex items-center p-4 bg-slate-50 text-slate-800 rounded-lg shadow-sm hover:bg-slate-100 hover:shadow-md transition-all duration-300"
            >
                <DoctorsIcon className="w-8 h-8 mr-4"/>
                <div>
                    <h2 className="text-lg font-bold text-left">Login as Doctor ({mockDoctors[0].name})</h2>
                    <p className="text-sm text-left text-gray-600">Access your personalized dashboard and patient list.</p>
                </div>
            </button>

            {/* Patient Login */}
            <div className="p-4 bg-pink-50 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                    <PatientsIcon className="w-8 h-8 mr-4 text-pink-800"/>
                    <div>
                        <h2 className="text-lg font-bold text-left text-pink-800">Login as Patient</h2>
                        <p className="text-sm text-left text-gray-600">View your appointments, records, and bills.</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {mockPatients.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => onLogin('Patient', selectedPatient)}
                        className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
