import React, { useState, useEffect, useCallback } from 'react';
import type { Doctor } from '../types';
import { supabase } from '../lib/supabaseClient';
import DoctorModal from '../components/DoctorModal';

const getStatusClass = (status: Doctor['status']) => {
  switch (status) {
    case 'Available':
      return 'bg-green-100 text-green-800';
    case 'On-call':
      return 'bg-yellow-100 text-yellow-800';
    case 'Away':
      return 'bg-gray-200 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-1">
    <img
      src={doctor.image_url}
      alt={doctor.name}
      className="w-24 h-24 rounded-full mb-4 border-4 border-teal-200"
    />
    <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
    <p className="text-primary font-medium">{doctor.specialty}</p>
    <span className={`mt-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(doctor.status)}`}>
      {doctor.status}
    </span>
  </div>
);

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('doctors').select('*').order('name');
    if (error) {
      console.error('Error fetching doctors:', error);
    } else {
      setDoctors(data as Doctor[]);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDoctorAdded = () => {
    fetchDoctors();
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Our Doctors</h2>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
          Add New Doctor
        </button>
      </div>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {doctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
      <DoctorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDoctorAdded={handleDoctorAdded}
      />
    </div>
  );
};

export default Doctors;
