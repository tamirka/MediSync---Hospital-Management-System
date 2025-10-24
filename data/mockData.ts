import type { Patient, Doctor, Prescription, Appointment, LabResult, MedicalHistoryEvent, BillingInvoice } from '../types';

const mockMedicalHistory: MedicalHistoryEvent[] = [
  // FIX: Added missing id and patient_id properties.
  { id: 'MH001', patient_id: 'P001', date: '2023-01-15', event: 'Annual Check-up', details: 'Routine physical examination, all vitals normal.', doctor: 'Dr. Evelyn Reed' },
  // FIX: Added missing id and patient_id properties.
  { id: 'MH002', patient_id: 'P001', date: '2022-05-20', event: 'Flu Shot', details: 'Administered seasonal influenza vaccine.', doctor: 'Dr. Ben Carter' },
  // FIX: Added missing id and patient_id properties.
  { id: 'MH003', patient_id: 'P001', date: '2021-11-02', event: 'Broken Arm', details: 'Cast applied for a fractured left ulna.', doctor: 'Dr. Olivia Chen' },
];

const mockLabResults: LabResult[] = [
  // FIX: Renamed patientId to patient_id.
  { id: 'LR001', patient_id: 'P001', date: '2023-08-10', test_name: 'Complete Blood Count (CBC)', result: 'Within normal limits', reference_range: 'N/A', status: 'Normal' },
  // FIX: Renamed patientId to patient_id.
  { id: 'LR002', patient_id: 'P001', date: '2023-08-10', test_name: 'Cholesterol Panel', result: 'LDL 110 mg/dL', reference_range: '<100 mg/dL', status: 'Abnormal' },
  // FIX: Renamed patientId to patient_id.
  { id: 'LR003', patient_id: 'P002', date: '2023-07-22', test_name: 'Thyroid Stimulating Hormone (TSH)', result: '2.5 mIU/L', reference_range: '0.4-4.0 mIU/L', status: 'Normal' },
];

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    // FIX: Renamed camelCase properties to snake_case to match Patient type.
    blood_type: 'O+',
    last_visit: '2023-08-10',
    status: 'Stable',
    image_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    emergency_contact: { name: 'Jane Doe', relationship: 'Wife', phone: '555-987-6543' },
    allergies: ['Peanuts', 'Penicillin'],
    chronic_conditions: ['Hypertension'],
    current_medications: [{ name: 'Lisinopril', dosage: '10mg' }],
    medical_history: mockMedicalHistory,
    // FIX: Renamed patientId to patient_id in filter.
    lab_results: mockLabResults.filter(lr => lr.patient_id === 'P001'),
    primary_doctor_id: 'D001',
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    // FIX: Renamed camelCase properties to snake_case to match Patient type.
    blood_type: 'A-',
    last_visit: '2023-07-22',
    status: 'Recovering',
    image_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    phone: '555-234-5678',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Anytown, USA',
    emergency_contact: { name: 'Robert Smith', relationship: 'Husband', phone: '555-876-5432' },
    allergies: [],
    chronic_conditions: [],
    current_medications: [{ name: 'Ibuprofen', dosage: 'as needed' }],
    medical_history: mockMedicalHistory.slice(0, 2),
    // FIX: Renamed patientId to patient_id in filter.
    lab_results: mockLabResults.filter(lr => lr.patient_id === 'P002'),
    primary_doctor_id: 'D002',
  },
  {
    id: 'P003',
    name: 'Michael Johnson',
    age: 68,
    gender: 'Male',
    // FIX: Renamed camelCase properties to snake_case to match Patient type.
    blood_type: 'B+',
    last_visit: '2023-09-01',
    status: 'Critical',
    image_url: 'https://randomuser.me/api/portraits/men/45.jpg',
    phone: '555-345-6789',
    email: 'michael.j@example.com',
    address: '789 Pine Ln, Anytown, USA',
    emergency_contact: { name: 'Sarah Johnson', relationship: 'Daughter', phone: '555-765-4321' },
    allergies: ['Aspirin'],
    chronic_conditions: ['Diabetes Type 2', 'Coronary Artery Disease'],
    current_medications: [{ name: 'Metformin', dosage: '500mg' }, { name: 'Atorvastatin', dosage: '20mg' }],
    medical_history: mockMedicalHistory,
    lab_results: [],
    primary_doctor_id: 'D001',
  },
  // Add more patients...
];

export const mockDoctors: Doctor[] = [
  // FIX: Renamed imageUrl to image_url.
  { id: 'D001', name: 'Dr. Evelyn Reed', specialty: 'Cardiology', status: 'Available', image_url: 'https://randomuser.me/api/portraits/women/68.jpg' },
  // FIX: Renamed imageUrl to image_url.
  { id: 'D002', name: 'Dr. Ben Carter', specialty: 'Pediatrics', status: 'On-call', image_url: 'https://randomuser.me/api/portraits/men/67.jpg' },
  // FIX: Renamed imageUrl to image_url.
  { id: 'D003', name: 'Dr. Olivia Chen', specialty: 'Orthopedics', status: 'Away', image_url: 'https://randomuser.me/api/portraits/women/62.jpg' },
  // FIX: Renamed imageUrl to image_url.
  { id: 'D004', name: 'Dr. Marcus Green', specialty: 'Neurology', status: 'Available', image_url: 'https://randomuser.me/api/portraits/men/52.jpg' },
];

export const mockPrescriptions: Prescription[] = [
  // FIX: Renamed patientId to patient_id.
  { id: 'PR001', patient_id: 'P001', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', start_date: '2022-01-01', end_date: '2023-12-31' },
  // FIX: Renamed patientId to patient_id.
  { id: 'PR002', patient_id: 'P003', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', start_date: '2021-06-15', end_date: '2024-06-15' },
  // FIX: Renamed patientId to patient_id.
  { id: 'PR003', patient_id: 'P002', medication: 'Amoxicillin', dosage: '250mg', frequency: 'Thrice daily', start_date: '2023-07-22', end_date: '2023-07-29' },
  // FIX: Renamed patientId to patient_id.
  { id: 'PR004', patient_id: 'P001', medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', start_date: '2023-08-10', end_date: '2024-08-10' },
];

export const mockAppointments: Appointment[] = [
  // FIX: Renamed camelCase properties to snake_case.
  { id: 'A001', patient_id: 'P001', patient_name: 'John Doe', doctor_id: 'D001', doctor_name: 'Dr. Evelyn Reed', date: '2023-10-25', time: '10:00 AM', reason: 'Follow-up Consultation', status: 'Scheduled' },
  // FIX: Renamed camelCase properties to snake_case.
  { id: 'A002', patient_id: 'P002', patient_name: 'Jane Smith', doctor_id: 'D002', doctor_name: 'Dr. Ben Carter', date: '2023-10-25', time: '11:30 AM', reason: 'Annual Check-up', status: 'Scheduled' },
  // FIX: Renamed camelCase properties to snake_case.
  { id: 'A003', patient_id: 'P003', patient_name: 'Michael Johnson', doctor_id: 'D001', doctor_name: 'Dr. Evelyn Reed', date: '2023-09-01', time: '09:00 AM', reason: 'Emergency Visit', status: 'Completed' },
  // FIX: Renamed camelCase properties to snake_case.
  { id: 'A004', patient_id: 'P001', patient_name: 'John Doe', doctor_id: 'D001', doctor_name: 'Dr. Evelyn Reed', date: '2023-11-15', time: '10:00 AM', reason: 'Lab Results Review', status: 'Scheduled' },
];

export const mockInvoices: BillingInvoice[] = [
    // FIX: Renamed patientId to patient_id.
    { id: 'B001', patient_id: 'P001', date: '2023-08-10', service: 'Cardiology Consultation', amount: 250.00, status: 'Paid' },
    // FIX: Renamed patientId to patient_id.
    { id: 'B002', patient_id: 'P001', date: '2023-08-10', service: 'Cholesterol Panel', amount: 75.50, status: 'Due' },
    // FIX: Renamed patientId to patient_id.
    { id: 'B003', patient_id: 'P002', date: '2023-07-22', service: 'Pediatric Check-up', amount: 150.00, status: 'Paid' },
    // FIX: Renamed patientId to patient_id.
    { id: 'B004', patient_id: 'P003', date: '2023-09-01', service: 'Emergency Room Visit', amount: 850.00, status: 'Overdue' },
    // FIX: Renamed patientId to patient_id.
    { id: 'B005', patient_id: 'P003', date: '2023-09-01', service: 'X-Ray Imaging', amount: 300.00, status: 'Due' },
];