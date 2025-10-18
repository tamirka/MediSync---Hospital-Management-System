import React, { useState, useMemo } from 'react';
import { mockPatients, mockPrescriptions } from '../data/mockData';
import { Patient, Prescription, LabResult, MedicalHistoryEvent } from '../types';
import { ArrowLeftIcon, ClipboardListIcon, BeakerIcon, PillIcon, UserCircleIcon } from '../components/Icons';

interface PatientProfileProps {
  patientId: string;
  onBack: () => void;
  isSelfView?: boolean;
}

const TabButton: React.FC<{
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        <Icon className="w-5 h-5 mr-2" />
        {label}
    </button>
);


const PatientProfile: React.FC<PatientProfileProps> = ({ patientId, onBack, isSelfView = false }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const patient = useMemo(() => mockPatients.find(p => p.id === patientId), [patientId]);
  const prescriptions = useMemo(() => mockPrescriptions.filter(p => p.patientId === patientId), [patientId]);

  if (!patient) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold">Patient not found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Back to previous page
        </button>
      </div>
    );
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
        case 'history':
            return <MedicalHistoryTab history={patient.medicalHistory} />;
        case 'labs':
            return <LabResultsTab results={patient.labResults} />;
        case 'prescriptions':
            return <PrescriptionsTab prescriptions={prescriptions} />;
        case 'overview':
        default:
            return <OverviewTab patient={patient} />;
    }
  }

  return (
    <div>
        {!isSelfView && (
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-primary">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Patients List
                </button>
            </div>
        )}
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center">
        <img src={patient.imageUrl} alt={patient.name} className="w-24 h-24 rounded-full border-4 border-teal-200 mr-6"/>
        <div>
            <h2 className="text-3xl font-bold text-gray-800">{isSelfView ? 'My Medical Records' : patient.name}</h2>
            <p className="text-gray-500">Patient ID: {patient.id}</p>
        </div>
        {!isSelfView && (
            <div className="ml-auto flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium">Edit Profile</button>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus transition-colors text-sm font-medium">Schedule Appointment</button>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex flex-col space-y-6">
            <InfoCard title="Personal Information" icon={UserCircleIcon}>
                <InfoItem label="Gender" value={patient.gender} />
                <InfoItem label="Age" value={patient.age.toString()} />
                <InfoItem label="Blood Type" value={patient.bloodType} />
                <InfoItem label="Phone" value={patient.phone} />
                <InfoItem label="Email" value={patient.email} />
                <InfoItem label="Address" value={patient.address} />
            </InfoCard>
            <InfoCard title="Emergency Contact" icon={UserCircleIcon}>
                 <InfoItem label="Name" value={patient.emergencyContact.name} />
                 <InfoItem label="Relationship" value={patient.emergencyContact.relationship} />
                 <InfoItem label="Phone" value={patient.emergencyContact.phone} />
            </InfoCard>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex space-x-2 border-b border-gray-200 mb-4 pb-2">
              <TabButton label="Overview" icon={ClipboardListIcon} isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <TabButton label="Medical History" icon={ClipboardListIcon} isActive={activeTab === 'history'} onClick={() => setActiveTab('history')} />
              <TabButton label="Lab Results" icon={BeakerIcon} isActive={activeTab === 'labs'} onClick={() => setActiveTab('labs')} />
              <TabButton label="Prescriptions" icon={PillIcon} isActive={activeTab === 'prescriptions'} onClick={() => setActiveTab('prescriptions')} />
            </div>
            <div className="p-2">
                {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard: React.FC<{title: string, icon: React.ElementType, children: React.ReactNode}> = ({title, icon: Icon, children}) => (
    <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
            <Icon className="w-6 h-6 text-primary mr-3" />
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <div className="space-y-3">{children}</div>
    </div>
);

const InfoItem: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm text-gray-800">{value}</p>
    </div>
);

const OverviewTab: React.FC<{patient: Patient}> = ({patient}) => (
    <div className="space-y-6">
        <div>
            <h4 className="font-semibold text-gray-700 mb-2">Allergies</h4>
            {patient.allergies.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                    {patient.allergies.map(allergy => <span key={allergy} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">{allergy}</span>)}
                 </div>
            ) : <p className="text-sm text-gray-500">No known allergies.</p>}
        </div>
        <div>
            <h4 className="font-semibold text-gray-700 mb-2">Chronic Conditions</h4>
            {patient.chronicConditions.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                    {patient.chronicConditions.map(condition => <span key={condition} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">{condition}</span>)}
                 </div>
            ) : <p className="text-sm text-gray-500">No chronic conditions listed.</p>}
        </div>
         <div>
            <h4 className="font-semibold text-gray-700 mb-2">Current Medications</h4>
            {patient.currentMedications.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {patient.currentMedications.map(med => <li key={med.name}>{med.name} ({med.dosage})</li>)}
                </ul>
            ) : <p className="text-sm text-gray-500">No current medications.</p>}
        </div>
    </div>
);

const MedicalHistoryTab: React.FC<{history: MedicalHistoryEvent[]}> = ({history}) => (
    <div className="space-y-4">
        {history.length > 0 ? history.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">{item.event}</p>
                <p className="text-sm text-gray-600">{item.details}</p>
                <p className="text-xs text-gray-400 mt-2">{item.date} - with {item.doctor}</p>
            </div>
        )) : <p className="text-sm text-gray-500">No medical history available.</p>}
    </div>
);

const LabResultsTab: React.FC<{results: LabResult[]}> = ({results}) => (
    <div className="overflow-x-auto">
        {results.length > 0 ? (
        <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Test Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Result</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                </tr>
            </thead>
            <tbody>
                {results.map(res => (
                    <tr key={res.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-2">{res.date}</td>
                        <td className="px-4 py-2 font-medium">{res.testName}</td>
                        <td className="px-4 py-2">{res.result} <span className="text-gray-400 text-xs">({res.referenceRange})</span></td>
                        <td className="px-4 py-2">
                           <span className={`px-2 py-1 text-xs rounded-full ${res.status === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{res.status}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : <p className="text-sm text-gray-500">No lab results available.</p>}
    </div>
);

const PrescriptionsTab: React.FC<{prescriptions: Prescription[]}> = ({prescriptions}) => (
     <div className="overflow-x-auto">
        {prescriptions.length > 0 ? (
        <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Medication</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Dosage</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Frequency</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Duration</th>
                </tr>
            </thead>
            <tbody>
                {prescriptions.map(p => (
                    <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{p.medication}</td>
                        <td className="px-4 py-3">{p.dosage}</td>
                        <td className="px-4 py-3">{p.frequency}</td>
                        <td className="px-4 py-3">{p.startDate} to {p.endDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : <p className="text-sm text-gray-500">No prescriptions on record.</p>}
    </div>
);


export default PatientProfile;
