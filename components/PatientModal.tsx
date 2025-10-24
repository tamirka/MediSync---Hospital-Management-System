import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Doctor } from '../types';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: () => void;
}

const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose, onPatientAdded }) => {
  const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: 'Male' as 'Male' | 'Female' | 'Other',
      blood_type: '',
      phone: '',
      email: '',
      address: '',
      primary_doctor_id: '',
  });
  const [doctors, setDoctors] = useState<Pick<Doctor, 'id'|'name'|'specialty'>[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchDoctors = async () => {
        const { data } = await supabase.from('doctors').select('id, name, specialty').order('name');
        setDoctors(data || []);
        if (data && data.length > 0) {
          setFormData(prev => ({...prev, primary_doctor_id: data[0].id}));
        }
      };
      fetchDoctors();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const resetForm = () => {
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        blood_type: '',
        phone: '',
        email: '',
        address: '',
        primary_doctor_id: doctors.length > 0 ? doctors[0].id : '',
      });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const newPatient = {
      ...formData,
      age: parseInt(formData.age, 10),
      // Default values for non-form fields
      image_url: `https://randomuser.me/api/portraits/${formData.gender === 'Female' ? 'women' : 'men'}/${Math.floor(Math.random() * 100)}.jpg`,
      last_visit: new Date().toISOString().split('T')[0],
      status: 'Stable' as const,
      emergency_contact: { name: '', relationship: '', phone: '' }, // These should be in the form ideally, but setting default for now.
      allergies: [],
      chronic_conditions: [],
      current_medications: [],
      medical_history: [],
      lab_results: [],
    };

    const { error } = await supabase.from('patients').insert([newPatient]);
    
    setIsSaving(false);
    if (error) {
      alert('Error adding patient: ' + error.message);
    } else {
      resetForm();
      onPatientAdded();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl my-8">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10 rounded-t-lg">
          <h3 className="text-xl font-bold text-gray-800">Add New Patient</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="blood_type" className="block text-sm font-medium text-gray-700">Blood Type</label>
                    <input type="text" name="blood_type" id="blood_type" value={formData.blood_type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary"></textarea>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="primary_doctor_id" className="block text-sm font-medium text-gray-700">Primary Doctor</label>
                    <select name="primary_doctor_id" id="primary_doctor_id" value={formData.primary_doctor_id} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                        {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>)}
                    </select>
                </div>
            </div>
          </div>
          <div className="flex justify-end p-4 border-t bg-gray-50 sticky bottom-0 z-10 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2 transition-colors">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save Patient'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PatientModal;
