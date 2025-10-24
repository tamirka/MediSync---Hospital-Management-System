import React, { useState, useEffect } from 'react';
import type { Patient, Prescription } from '../types';
import { supabase } from '../lib/supabaseClient';
import { PharmacyIcon } from '../components/Icons';

interface PharmacyProps {
  patient?: Patient;
}

const Pharmacy: React.FC<PharmacyProps> = ({ patient }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patient) {
      const fetchPrescriptions = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('prescriptions')
          .select('*')
          .eq('patient_id', patient.id)
          .order('start_date', { ascending: false });
        
        if (error) {
          console.error("Error fetching prescriptions:", error);
        } else {
          setPrescriptions(data as Prescription[]);
        }
        setLoading(false);
      };
      fetchPrescriptions();
    }
  }, [patient]);

  if (!patient) {
    // Admin view placeholder
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <PharmacyIcon className="w-24 h-24 text-gray-300 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Pharmacy Inventory</h2>
            <p className="text-lg text-gray-500">
                This feature is currently under development. You will soon be able to manage medication stock and supplies here.
            </p>
        </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Prescriptions</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary-focus transition-colors">
          Request a Refill
        </button>
      </div>
       <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Medication</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dosage</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Frequency</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4">Loading prescriptions...</td></tr>
              ) : prescriptions.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4">No prescriptions found.</td></tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm font-semibold">{prescription.medication}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{prescription.dosage}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{prescription.frequency}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{prescription.start_date}</td>
                    <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">{prescription.end_date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;