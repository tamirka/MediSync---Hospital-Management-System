import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import Pharmacy from './pages/Pharmacy';
import Reports from './pages/Reports';
import PatientProfile from './pages/PatientProfile';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import { User, Patient } from './types';
import { supabase } from './lib/supabaseClient';

type Page = 'Dashboard' | 'Patients' | 'Doctors' | 'Appointments' | 'Billing' | 'Pharmacy' | 'Reports' | 'PatientProfile';

const App: React.FC = () => {
  const [isAppLaunched, setIsAppLaunched] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActivePage('PatientProfile');
  };

  const handleBackToPatients = () => {
    setSelectedPatientId(null);
    setActivePage('Patients');
  };

  const handleLogin = async (role: 'Admin' | 'Doctor' | 'Patient', id?: string) => {
    if (role === 'Admin') {
      setCurrentUser({ role: 'Admin', name: 'Dr. Evelyn Reed', image_url: 'https://randomuser.me/api/portraits/women/68.jpg' });
    } else if (role === 'Doctor' && id) {
      const { data: doctor, error } = await supabase.from('doctors').select('*').eq('id', id).single();
      if (doctor) {
        setCurrentUser({ role: 'Doctor', ...doctor });
      } else {
        console.error('Doctor not found:', error);
      }
    } else if (role === 'Patient' && id) {
        const { data: patient, error } = await supabase.from('patients').select('*').eq('id', id).single();
        if (patient) {
            // Fetch related data for a full profile
            const { data: medical_history } = await supabase.from('medical_history').select('*').eq('patient_id', id);
            const { data: lab_results } = await supabase.from('lab_results').select('*').eq('patient_id', id);
            const { data: prescriptions } = await supabase.from('prescriptions').select('*').eq('patient_id', id);
            
            const fullPatientProfile: Patient = {
                ...patient,
                medical_history: medical_history || [],
                lab_results: lab_results || [],
                // This is a simplification. Logic for "current" medications might be more complex.
                current_medications: prescriptions?.map(p => ({name: p.medication, dosage: p.dosage})) || []
            }
            setCurrentUser({ role: 'Patient', ...fullPatientProfile });
        } else {
            console.error('Patient not found:', error);
        }
    }
    setActivePage('Dashboard');
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('Dashboard');
  };

  if (!isAppLaunched) {
    return <LandingPage onLaunch={() => setIsAppLaunched(true)} />;
  }
  
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }
  
  const renderContent = () => {
    // Patient View
    if (currentUser.role === 'Patient') {
        const patientUser = currentUser as Patient;
        switch (activePage) {
            case 'Dashboard':
                return <PatientDashboard patient={patientUser} setActivePage={setActivePage} />;
            case 'Appointments':
                return <Appointments patient={patientUser} />;
            case 'PatientProfile':
                return <PatientProfile patientId={patientUser.id} onBack={() => setActivePage('Dashboard')} isSelfView={true} />;
            case 'Pharmacy':
                return <Pharmacy patient={patientUser} />;
            case 'Billing':
                return <Billing patient={patientUser} />;
            default:
                setActivePage('Dashboard');
                return <PatientDashboard patient={patientUser} setActivePage={setActivePage} />;
        }
    }

    // Doctor View
    if (currentUser.role === 'Doctor') {
        switch (activePage) {
            case 'Dashboard':
                return <DoctorDashboard doctor={currentUser} setActivePage={setActivePage} />;
            case 'Patients':
                return <Patients onViewPatient={handleViewPatient} doctor={currentUser} />;
            case 'PatientProfile':
                 if (selectedPatientId) {
                    return <PatientProfile patientId={selectedPatientId} onBack={handleBackToPatients} />;
                }
                setActivePage('Patients');
                return <Patients onViewPatient={handleViewPatient} doctor={currentUser} />;
            case 'Appointments':
                return <Appointments doctor={currentUser} />;
            default:
                setActivePage('Dashboard');
                return <DoctorDashboard doctor={currentUser} setActivePage={setActivePage} />;
        }
    }

    // Admin View
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard setActivePage={setActivePage} />;
      case 'Patients':
        return <Patients onViewPatient={handleViewPatient} />;
      case 'PatientProfile':
        if (selectedPatientId) {
          return <PatientProfile patientId={selectedPatientId} onBack={handleBackToPatients} />;
        }
        setActivePage('Patients'); 
        return <Patients onViewPatient={handleViewPatient} />;
      case 'Doctors':
        return <Doctors />;
      case 'Appointments':
        return <Appointments />;
      case 'Billing':
        return <Billing />;
      case 'Pharmacy':
        return <Pharmacy />;
      case 'Reports':
        return <Reports />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} userRole={currentUser.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activePage={activePage} user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
