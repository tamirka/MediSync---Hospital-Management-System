import React, { useState, useEffect, useCallback } from 'react';
import type { Appointment, Doctor, Patient } from '../types';
import { supabase } from '../lib/supabaseClient';
import AppointmentModal from '../components/AppointmentModal';

const getStatusClass = (status: Appointment['status']) => {
  switch (status) {
    case 'Scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface AppointmentsProps {
  doctor?: Doctor;
  patient?: Patient;
}

const Appointments: React.FC<AppointmentsProps> = ({ doctor, patient }) => {
  const [filter, setFilter] = useState('All');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('appointments').select('*');

    if (doctor) {
      query = query.eq('doctor_id', doctor.id);
    }
    if (patient) {
      query = query.eq('patient_id', patient.id);
    }
    if (filter !== 'All') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query.order('date', { ascending: false });

    if (error) {
      console.error("Error fetching appointments:", error);
    } else {
      setAppointments(data as Appointment[]);
    }
    setLoading(false);
  }, [doctor, patient, filter]);
  
  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleAppointmentScheduled = () => {
    fetchAppointments();
    setIsModalOpen(false);
  };

  const getTitle = () => {
    if (doctor) return 'My Appointments';
    if (patient) return 'My Appointments';
    return 'All Appointments';
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{getTitle()}</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
          Schedule New Appointment
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        {['All', 'Scheduled', 'Completed', 'Cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50">
                {patient ? 
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  : <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                }
                {!doctor && !patient && <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>}
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4">Loading appointments...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4">No appointments found.</td></tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50">
                     <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-semibold">{patient ? appt.doctor_name : appt.patient_name}</td>
                    {!doctor && !patient && <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.doctor_name}</td>}
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.date} - {appt.time}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.reason}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                      <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusClass(appt.status)}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
       <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAppointmentScheduled={handleAppointmentScheduled}
      />
    </div>
  );
};

export default Appointments;
