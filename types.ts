export interface MedicalHistoryEvent {
  id: string;
  patient_id: string;
  date: string;
  event: string;
  details: string;
  doctor: string;
}

export interface LabResult {
  id: string;
  patient_id: string;
  date: string;
  test_name: string;
  result: string;
  reference_range: string;
  status: 'Normal' | 'Abnormal';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  blood_type: string;
  last_visit: string;
  status: 'Stable' | 'Recovering' | 'Critical';
  image_url: string;
  phone: string;
  email: string;
  address: string;
  emergency_contact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronic_conditions: string[];
  current_medications: {
    name: string;
    dosage: string;
  }[];
  medical_history: MedicalHistoryEvent[];
  lab_results: LabResult[];
  primary_doctor_id: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  status: 'Available' | 'On-call' | 'Away';
  image_url: string;
}

export interface Prescription {
  id: string;
  patient_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  patient_name: string;
  doctor_id: string;
  doctor_name: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface BillingInvoice {
    id: string;
    patient_id: string;
    date: string;
    service: string;
    amount: number;
    status: 'Paid' | 'Due' | 'Overdue';
}

// Define a unified User type for authentication purposes
export type User = 
  | (Doctor & { role: 'Doctor' })
  | (Patient & { role: 'Patient' })
  | { role: 'Admin'; name: string; image_url: string };