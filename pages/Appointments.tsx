import React, { useState, useMemo } from 'react';
import type { Appointment, Doctor, Patient } from '../types';
import { mockAppointments } from '../data/mockData';

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

  const appointmentList = useMemo(() => {
    if (doctor) return mockAppointments.filter(a => a.doctorId === doctor.id);
    if (patient) return mockAppointments.filter(a => a.patientId === patient.id);
    return mockAppointments;
  }, [doctor, patient]);

  const filteredAppointments = useMemo(() => {
    if (filter === 'All') {
      return appointmentList;
    }
    return appointmentList.filter(a => a.status === filter);
  }, [filter, appointmentList]);

  const getTitle = () => {
    if (doctor) return 'My Appointments';
    if (patient) return 'My Appointments';
    return 'All Appointments';
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{getTitle()}</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
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
              {filteredAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50">
                   <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-semibold">{patient ? appt.doctorName : appt.patientName}</td>
                  {!doctor && !patient && <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.doctorName}</td>}
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.date} - {appt.time}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{appt.reason}</td>
                  <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                    <span className={`px-2 py-1 font-semibold leading-tight rounded-full text-xs ${getStatusClass(appt.status)}`}>
                      {appt.status}
                    </span>
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

export default Appointments;
