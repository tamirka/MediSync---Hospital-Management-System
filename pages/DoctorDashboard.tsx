import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Doctor } from '../types';
import { PatientsIcon, AppointmentsIcon } from '../components/Icons';

type Page = 'Dashboard' | 'Patients' | 'Doctors' | 'Appointments' | 'Billing' | 'Pharmacy' | 'Reports' | 'PatientProfile';

interface DoctorDashboardProps {
  doctor: Doctor;
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

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctor, setActivePage }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientCount, setPatientCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      const { data: appointmentsData, error: appointmentsError } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_id', doctor.id)
        .eq('status', 'Scheduled')
        .order('date')
        .order('time');
      
      const { count } = await supabase
        .from('patients')
        .select('id', { count: 'exact', head: true })
        .eq('primary_doctor_id', doctor.id);

      if (appointmentsError) console.error(appointmentsError);
      
      setAppointments(appointmentsData || []);
      setPatientCount(count || 0);
      setLoading(false);
    };
    fetchDashboardData();
  }, [doctor]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {doctor.name}</h2>
      <p className="text-gray-500 mb-6">Here is your overview for today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatCard icon={AppointmentsIcon} title="Upcoming Appointments" value={loading ? '...' : appointments.length} description="All scheduled appointments" />
        <StatCard icon={PatientsIcon} title="My Patients" value={loading ? '...' : patientCount} description="Patients under your care" />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Your Upcoming Appointments</h3>
            <button onClick={() => setActivePage('Appointments')} className="text-primary hover:underline text-sm font-medium">View All</button>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-4">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 font-medium">Patient</th>
                  <th className="py-2 font-medium">Date & Time</th>
                  <th className="py-2 font-medium">Reason</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 5).map(appt => (
                  <tr key={appt.id} className="border-t border-gray-200">
                    <td className="py-3 font-semibold">{appt.patient_name}</td>
                    <td className="py-3">{appt.date} - {appt.time}</td>
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
    </div>
  );
};

export default DoctorDashboard;