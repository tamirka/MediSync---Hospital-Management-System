import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDoctorAdded: () => void;
}

const DoctorModal: React.FC<DoctorModalProps> = ({ isOpen, onClose, onDoctorAdded }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [status, setStatus] = useState<'Available' | 'On-call' | 'Away'>('Available');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = () => {
    setName('');
    setSpecialty('');
    setStatus('Available');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const newDoctor = {
      name,
      specialty,
      status,
      image_url: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    };

    const { error } = await supabase.from('doctors').insert([newDoctor]);

    setIsSaving(false);
    if (error) {
      alert('Error adding doctor: ' + error.message);
    } else {
      resetForm();
      onDoctorAdded();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-gray-800">Add New Doctor</h3>
          <button onClick={onClose} aria-label="Close modal" className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="doc-name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input id="doc-name" type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="doc-specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
              <input id="doc-specialty" type="text" value={specialty} onChange={e => setSpecialty(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary" />
            </div>
            <div>
              <label htmlFor="doc-status" className="block text-sm font-medium text-gray-700">Status</label>
              <select id="doc-status" value={status} onChange={e => setStatus(e.target.value as any)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary focus:border-primary">
                <option>Available</option>
                <option>On-call</option>
                <option>Away</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end p-4 border-t bg-gray-50 rounded-b-lg">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 mr-2 transition-colors">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus disabled:opacity-50 transition-colors">{isSaving ? 'Saving...' : 'Save Doctor'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;
