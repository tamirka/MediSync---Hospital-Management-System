import type { Patient, Doctor, Prescription, Appointment, LabResult, MedicalHistoryEvent, BillingInvoice } from '../types';

const mockMedicalHistory: MedicalHistoryEvent[] = [
  { date: '2023-01-15', event: 'Annual Check-up', details: 'Routine physical examination, all vitals normal.', doctor: 'Dr. Evelyn Reed' },
  { date: '2022-05-20', event: 'Flu Shot', details: 'Administered seasonal influenza vaccine.', doctor: 'Dr. Ben Carter' },
  { date: '2021-11-02', event: 'Broken Arm', details: 'Cast applied for a fractured left ulna.', doctor: 'Dr. Olivia Chen' },
];

const mockLabResults: LabResult[] = [
  { id: 'LR001', patientId: 'P001', date: '2023-08-10', testName: 'Complete Blood Count (CBC)', result: 'Within normal limits', referenceRange: 'N/A', status: 'Normal' },
  { id: 'LR002', patientId: 'P001', date: '2023-08-10', testName: 'Cholesterol Panel', result: 'LDL 110 mg/dL', referenceRange: '<100 mg/dL', status: 'Abnormal' },
  { id: 'LR003', patientId: 'P002', date: '2023-07-22', testName: 'Thyroid Stimulating Hormone (TSH)', result: '2.5 mIU/L', referenceRange: '0.4-4.0 mIU/L', status: 'Normal' },
];

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    bloodType: 'O+',
    lastVisit: '2023-08-10',
    status: 'Stable',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
    address: '123 Main St, Anytown, USA',
    emergencyContact: { name: 'Jane Doe', relationship: 'Wife', phone: '555-987-6543' },
    allergies: ['Peanuts', 'Penicillin'],
    chronicConditions: ['Hypertension'],
    currentMedications: [{ name: 'Lisinopril', dosage: '10mg' }],
    medicalHistory: mockMedicalHistory,
    labResults: mockLabResults.filter(lr => lr.patientId === 'P001'),
    primaryDoctorId: 'D001',
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    bloodType: 'A-',
    lastVisit: '2023-07-22',
    status: 'Recovering',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    phone: '555-234-5678',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave, Anytown, USA',
    emergencyContact: { name: 'Robert Smith', relationship: 'Husband', phone: '555-876-5432' },
    allergies: [],
    chronicConditions: [],
    currentMedications: [{ name: 'Ibuprofen', dosage: 'as needed' }],
    medicalHistory: mockMedicalHistory.slice(0, 2),
    labResults: mockLabResults.filter(lr => lr.patientId === 'P002'),
    primaryDoctorId: 'D002',
  },
  {
    id: 'P003',
    name: 'Michael Johnson',
    age: 68,
    gender: 'Male',
    bloodType: 'B+',
    lastVisit: '2023-09-01',
    status: 'Critical',
    imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    phone: '555-345-6789',
    email: 'michael.j@example.com',
    address: '789 Pine Ln, Anytown, USA',
    emergencyContact: { name: 'Sarah Johnson', relationship: 'Daughter', phone: '555-765-4321' },
    allergies: ['Aspirin'],
    chronicConditions: ['Diabetes Type 2', 'Coronary Artery Disease'],
    currentMedications: [{ name: 'Metformin', dosage: '500mg' }, { name: 'Atorvastatin', dosage: '20mg' }],
    medicalHistory: mockMedicalHistory,
    labResults: [],
    primaryDoctorId: 'D001',
  },
  // Add more patients...
];

export const mockDoctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Evelyn Reed', specialty: 'Cardiology', status: 'Available', imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: 'D002', name: 'Dr. Ben Carter', specialty: 'Pediatrics', status: 'On-call', imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg' },
  { id: 'D003', name: 'Dr. Olivia Chen', specialty: 'Orthopedics', status: 'Away', imageUrl: 'https://randomuser.me/api/portraits/women/62.jpg' },
  { id: 'D004', name: 'Dr. Marcus Green', specialty: 'Neurology', status: 'Available', imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg' },
];

export const mockPrescriptions: Prescription[] = [
  { id: 'PR001', patientId: 'P001', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2022-01-01', endDate: '2023-12-31' },
  { id: 'PR002', patientId: 'P003', medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2021-06-15', endDate: '2024-06-15' },
  { id: 'PR003', patientId: 'P002', medication: 'Amoxicillin', dosage: '250mg', frequency: 'Thrice daily', startDate: '2023-07-22', endDate: '2023-07-29' },
  { id: 'PR004', patientId: 'P001', medication: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', startDate: '2023-08-10', endDate: '2024-08-10' },
];

export const mockAppointments: Appointment[] = [
  { id: 'A001', patientId: 'P001', patientName: 'John Doe', doctorId: 'D001', doctorName: 'Dr. Evelyn Reed', date: '2023-10-25', time: '10:00 AM', reason: 'Follow-up Consultation', status: 'Scheduled' },
  { id: 'A002', patientId: 'P002', patientName: 'Jane Smith', doctorId: 'D002', doctorName: 'Dr. Ben Carter', date: '2023-10-25', time: '11:30 AM', reason: 'Annual Check-up', status: 'Scheduled' },
  { id: 'A003', patientId: 'P003', patientName: 'Michael Johnson', doctorId: 'D001', doctorName: 'Dr. Evelyn Reed', date: '2023-09-01', time: '09:00 AM', reason: 'Emergency Visit', status: 'Completed' },
  { id: 'A004', patientId: 'P001', patientName: 'John Doe', doctorId: 'D001', doctorName: 'Dr. Evelyn Reed', date: '2023-11-15', time: '10:00 AM', reason: 'Lab Results Review', status: 'Scheduled' },
];

export const mockInvoices: BillingInvoice[] = [
    { id: 'B001', patientId: 'P001', date: '2023-08-10', service: 'Cardiology Consultation', amount: 250.00, status: 'Paid' },
    { id: 'B002', patientId: 'P001', date: '2023-08-10', service: 'Cholesterol Panel', amount: 75.50, status: 'Due' },
    { id: 'B003', patientId: 'P002', date: '2023-07-22', service: 'Pediatric Check-up', amount: 150.00, status: 'Paid' },
    { id: 'B004', patientId: 'P003', date: '2023-09-01', service: 'Emergency Room Visit', amount: 850.00, status: 'Overdue' },
    { id: 'B005', patientId: 'P003', date: '2023-09-01', service: 'X-Ray Imaging', amount: 300.00, status: 'Due' },
];
