import React from 'react';
import { mockPatients, mockDoctors, mockAppointments } from '../data/mockData';
import { PatientsIcon, DoctorsIcon, AppointmentsIcon, ArrowLeftIcon } from '../components/Icons'; // Using ArrowLeft as a placeholder for a trend icon

type Page = 'Dashboard' | 'Patients' | 'Doctors' | 'Appointments' | 'Billing' | 'Pharmacy' | 'Reports' | 'PatientProfile';

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, change: string, changeType: 'increase' | 'decrease' }> = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <div className="flex items-center mt-1 text-xs">
        <ArrowLeftIcon className={`w-4 h-4 ${changeType === 'increase' ? 'text-green-500 rotate-45' : 'text-red-500 -rotate-45'}`} />
        <span className={`ml-1 font-semibold ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
        <span className="ml-1 text-gray-400">vs last month</span>
      </div>
    </div>
    <div className="bg-teal-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const upcomingAppointments = mockAppointments
    .filter(a => a.status === 'Scheduled')
    .slice(0, 5);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <StatCard icon={PatientsIcon} title="Total Patients" value={mockPatients.length} change="+5%" changeType="increase" />
        <StatCard icon={DoctorsIcon} title="Available Doctors" value={mockDoctors.filter(d => d.status === 'Available').length} change="-2" changeType="decrease" />
        <StatCard icon={AppointmentsIcon} title="Today's Appointments" value={mockAppointments.filter(a => a.date === '2023-10-25').length} change="+12%" changeType="increase" />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
            <button onClick={() => setActivePage('Appointments')} className="text-primary hover:underline text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 font-medium">Patient</th>
                <th className="py-2 font-medium">Doctor</th>
                <th className="py-2 font-medium">Time</th>
                <th className="py-2 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map(appt => (
                <tr key={appt.id} className="border-t border-gray-200">
                  <td className="py-3 font-semibold">{appt.patientName}</td>
                  <td className="py-3">{appt.doctorName}</td>
                  <td className="py-3">{appt.time}</td>
                  <td className="py-3 text-gray-600">{appt.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
