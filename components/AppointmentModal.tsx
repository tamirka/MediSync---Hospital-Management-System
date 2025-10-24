import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Doctor, Patient } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAppointmentScheduled: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onAppointmentScheduled }) => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  
  const [patients, setPatients] = useState<Pick<Patient, 'id' | 'name'>[]>([]);
  const [doctors, setDoctors] = useState<Pick<Doctor, 'id' | 'name'>[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        const { data: patientsData } = await supabase.from('patients').select('id, name').order('name');
        const { data: doctorsData } = await supabase.from('doctors').select('id, name').order('name');
        setPatients(patientsData || []);
        setDoctors(doctorsData || []);
        if (patientsData && patientsData.length > 0) setPatientId(patientsData[0].id);
        if (doctorsData && doctorsData.length > 0) setDoctorId(doctorsData[0].id);
      };
      fetchData();
      setDate(new Date().toISOString().split('T')[0]); // Default to today
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !doctorId || !date || !time || !reason) {
      alert("Please fill out all fields.");
      return;
    }
    setIsSaving(true);
    
    const selectedPatient = patients.find(p => p.id === patientId);
    const selectedDoctor = doctors.find(d => d.id === doctorId);

    if (!selectedPatient || !selectedDoctor) {
      alert("Please select a valid patient and doctor.");
      setIsSaving(false);
      return;
    }

    const newAppointment = {
      patient_id: patientId,
      patient_name: selectedPatient.name,
      doctor_id: doctorId,
      doctor_name: selectedDoctor.name,
      date,
      time,
      reason,
      status: 'Scheduled' as const,
    };

    const { error } = await supabase.from('appointments').insert([newAppointment]);
    
    setIsSaving(false);
    if (error) {
      alert('Error scheduling appointment: ' + error.message);
    } else {
      onAppointmentScheduled();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">Schedule New Appointment</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="patient" className="block text-sm font-medium text-gray-700">Patient</label>
              <select id="patient" value={patientId} onChange={e => setPatientId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
             <div>
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
              <select id="doctor" value={doctorId} onChange={e => setDoctorId(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                  <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
                </div>
                 <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                  <input id="time" type="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"/>
                </div>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
              <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"></textarea>
            </div>
          </div>
          <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2 transition-colors">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus disabled:opacity-50 transition-colors">{isSaving ? 'Scheduling...' : 'Schedule Appointment'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
