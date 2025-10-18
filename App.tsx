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
import { mockDoctors, mockPatients } from './data/mockData';
import { User, Patient } from './types';

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

  const handleLogin = (role: 'Admin' | 'Doctor' | 'Patient', id?: string) => {
    if (role === 'Admin') {
      setCurrentUser({ role: 'Admin', name: 'Dr. Evelyn Reed', imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg' });
    } else if (role === 'Doctor' && id) {
      const doctor = mockDoctors.find(d => d.id === id);
      if (doctor) {
        setCurrentUser({ role: 'Doctor', ...doctor });
      }
    } else if (role === 'Patient' && id) {
        const patient = mockPatients.find(p => p.id === id);
        if (patient) {
            setCurrentUser({ role: 'Patient', ...patient });
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
