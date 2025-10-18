export interface MedicalHistoryEvent {
  date: string;
  event: string;
  details: string;
  doctor: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  date: string;
  testName: string;
  result: string;
  referenceRange: string;
  status: 'Normal' | 'Abnormal';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  lastVisit: string;
  status: 'Stable' | 'Recovering' | 'Critical';
  imageUrl: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  currentMedications: {
    name: string;
    dosage: string;
  }[];
  medicalHistory: MedicalHistoryEvent[];
  labResults: LabResult[];
  primaryDoctorId: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Available' | 'On-call' | 'Away';
  imageUrl: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface BillingInvoice {
    id: string;
    patientId: string;
    date: string;
    service: string;
    amount: number;
    status: 'Paid' | 'Due' | 'Overdue';
}

// Define a unified User type for authentication purposes
export type User = 
  | (Doctor & { role: 'Doctor' })
  | (Patient & { role: 'Patient' })
  | { role: 'Admin'; name: string; imageUrl: string };
