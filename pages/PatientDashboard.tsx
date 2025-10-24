import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Patient } from '../types';
import { AppointmentsIcon, PillIcon } from '../components/Icons';

type Page = 'Dashboard' | 'Patients' | 'Doctors' | 'Appointments' | 'Billing' | 'Pharmacy' | 'Reports' | 'PatientProfile';

interface PatientDashboardProps {
  patient: Patient;
  setActivePage: (page: Page) => void;
}

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, description: string }> = ({ icon: Icon, title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
    <div className="bg-teal-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-primary" />
    </div>
  </div>
);

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, setActivePage }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('patient_id', patient.id)
        .eq('status', 'Scheduled')
        .order('date')
        .order('time');

      if (error) console.error("Error fetching appointments:", error);
      else setUpcomingAppointments(data || []);
      setLoading(false);
    };
    fetchAppointments();
  }, [patient.id]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {patient.name.split(' ')[0]}!</h2>
      <p className="text-gray-500 mb-6">Here's your personal health dashboard.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard icon={AppointmentsIcon} title="Upcoming Appointments" value={loading ? '...' : upcomingAppointments.length} description="View your scheduled visits" />
        <StatCard icon={PillIcon} title="Current Medications" value={patient.current_medications.length} description="View your prescription list" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Your Upcoming Appointments</h3>
                <button onClick={() => setActivePage('Appointments')} className="text-primary hover:underline text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
            {loading ? (
                <p className="text-center text-gray-500 py-4">Loading appointments...</p>
            ) : upcomingAppointments.length > 0 ? (
                <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500">
                    <th className="py-2 font-medium">Date & Time</th>
                    <th className="py-2 font-medium">Doctor</th>
                    <th className="py-2 font-medium">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {upcomingAppointments.slice(0, 5).map(appt => (
                    <tr key={appt.id} className="border-t border-gray-200">
                        <td className="py-3 font-semibold">{appt.date}, {appt.time}</td>
                        <td className="py-3">{appt.doctor_name}</td>
                        <td className="py-3 text-gray-600">{appt.reason}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500 py-4">You have no upcoming appointments.</p>
            )}
            </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Current Medications</h3>
                <button onClick={() => setActivePage('Pharmacy')} className="text-primary hover:underline text-sm font-medium">View All</button>
            </div>
            {patient.current_medications.length > 0 ? (
                <ul className="space-y-3">
                    {patient.current_medications.map(med => (
                        <li key={med.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <span className="font-semibold text-gray-700">{med.name}</span>
                            <span className="text-sm text-gray-500">{med.dosage}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                 <p className="text-center text-gray-500 py-4">You have no current medications on record.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;