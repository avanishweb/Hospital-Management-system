export const INITIAL_DEPARTMENTS = [
  {
    id: 'dept-cardio',
    name: 'Cardiology',
    icon: 'HeartPulse',
    description: 'Comprehensive heart care, cardiac surgery, interventional cardiology, and cardiovascular rehab.',
    headDoctor: 'Dr. Sarah Mitchell, MD, FACC',
    bedsTotal: 30,
    activeStaff: 18,
    color: '#0284c7'
  },
  {
    id: 'dept-neuro',
    name: 'Neurology & Neurosurgery',
    icon: 'Brain',
    description: 'Advanced stroke management, neurocritical care, spine surgery, and epilepsy diagnostics.',
    headDoctor: 'Dr. Alexander Hayes, MD, PhD',
    bedsTotal: 25,
    activeStaff: 14,
    color: '#7c3aed'
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics & Joint Care',
    icon: 'Bone',
    description: 'Robotic joint replacement, sports injury trauma center, and spinal reconstruction.',
    headDoctor: 'Dr. Marcus Vance, MS (Ortho)',
    bedsTotal: 35,
    activeStaff: 16,
    color: '#0d9488'
  },
  {
    id: 'dept-peds',
    name: 'Pediatrics & Neonatology',
    icon: 'Baby',
    description: 'Level-3 NICU/PICU, pediatric cardiology, child immunology, and adolescent medicine.',
    headDoctor: 'Dr. Elena Rostova, MD',
    bedsTotal: 40,
    activeStaff: 22,
    color: '#f59e0b'
  },
  {
    id: 'dept-onco',
    name: 'Oncology & Cancer Center',
    icon: 'Activity',
    description: 'Precision chemotherapy, immunotherapy, linear accelerator radiation, and surgical oncology.',
    headDoctor: 'Dr. David Sterling, MD',
    bedsTotal: 28,
    activeStaff: 20,
    color: '#e11d48'
  },
  {
    id: 'dept-gen',
    name: 'General Medicine & ER',
    icon: 'Stethoscope',
    description: '24/7 Level-1 Trauma Center, emergency resuscitation, infectious disease, and acute medicine.',
    headDoctor: 'Dr. Priya Sharma, MD',
    bedsTotal: 50,
    activeStaff: 30,
    color: '#10b981'
  }
];

export const INITIAL_DOCTORS = [
  {
    id: 'DOC-101',
    name: 'Dr. Sarah Mitchell',
    specialization: 'Senior Cardiologist & Interventionalist',
    department: 'Cardiology',
    qualifications: 'MD, FACC, FSCAI (Harvard Med)',
    experience: '16 Years',
    rating: 4.9,
    reviewsCount: 312,
    consultationFee: 150,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timing: '09:00 AM - 02:00 PM',
    email: 's.mitchell@pulsecare.org',
    phone: '+1 (555) 234-5671',
    status: 'Available',
    avatarBg: '#0284c7'
  },
  {
    id: 'DOC-102',
    name: 'Dr. Alexander Hayes',
    specialization: 'Chief Neurosurgeon',
    department: 'Neurology & Neurosurgery',
    qualifications: 'MD, PhD, FACS (Johns Hopkins)',
    experience: '19 Years',
    rating: 4.95,
    reviewsCount: 284,
    consultationFee: 200,
    availableDays: ['Mon', 'Wed', 'Fri'],
    timing: '10:00 AM - 04:00 PM',
    email: 'a.hayes@pulsecare.org',
    phone: '+1 (555) 345-6782',
    status: 'In Surgery',
    avatarBg: '#7c3aed'
  },
  {
    id: 'DOC-103',
    name: 'Dr. Marcus Vance',
    specialization: 'Orthopedic & Robotic Joint Surgeon',
    department: 'Orthopedics & Joint Care',
    qualifications: 'MS (Ortho), FAAOS (Stanford)',
    experience: '14 Years',
    rating: 4.85,
    reviewsCount: 198,
    consultationFee: 140,
    availableDays: ['Tue', 'Thu', 'Sat'],
    timing: '08:30 AM - 01:30 PM',
    email: 'm.vance@pulsecare.org',
    phone: '+1 (555) 456-7893',
    status: 'Available',
    avatarBg: '#0d9488'
  },
  {
    id: 'DOC-104',
    name: 'Dr. Elena Rostova',
    specialization: 'Pediatric Specialist & Neonatologist',
    department: 'Pediatrics & Neonatology',
    qualifications: 'MD (Pediatrics), FAAP',
    experience: '12 Years',
    rating: 4.9,
    reviewsCount: 420,
    consultationFee: 120,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '09:00 AM - 03:00 PM',
    email: 'e.rostova@pulsecare.org',
    phone: '+1 (555) 567-8904',
    status: 'Available',
    avatarBg: '#f59e0b'
  },
  {
    id: 'DOC-105',
    name: 'Dr. David Sterling',
    specialization: 'Medical Oncologist & Immunotherapist',
    department: 'Oncology & Cancer Center',
    qualifications: 'MD, DM (Oncology), ASCO Fellow',
    experience: '18 Years',
    rating: 4.92,
    reviewsCount: 175,
    consultationFee: 180,
    availableDays: ['Mon', 'Wed', 'Thu'],
    timing: '11:00 AM - 05:00 PM',
    email: 'd.sterling@pulsecare.org',
    phone: '+1 (555) 678-9015',
    status: 'On Leave',
    avatarBg: '#e11d48'
  },
  {
    id: 'DOC-106',
    name: 'Dr. Priya Sharma',
    specialization: 'Emergency Medicine & Critical Care Physician',
    department: 'General Medicine & ER',
    qualifications: 'MD, FACEP (Columbia Univ)',
    experience: '11 Years',
    rating: 4.88,
    reviewsCount: 350,
    consultationFee: 110,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timing: '24/7 Rotational Shift',
    email: 'p.sharma@pulsecare.org',
    phone: '+1 (555) 789-0126',
    status: 'Available',
    avatarBg: '#10b981'
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'PAT-2026-101',
    name: 'Eleanor Vance',
    age: 58,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+1 (555) 987-1234',
    email: 'eleanor.vance@example.com',
    address: '742 Evergreen Terr, Springfield',
    emergencyContact: 'Robert Vance (Spouse) - +1 (555) 987-1235',
    admissionStatus: 'Admitted',
    assignedBed: 'ICU-02',
    department: 'Cardiology',
    attendingDoctor: 'Dr. Sarah Mitchell',
    admissionDate: '2026-09-02',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    insuranceProvider: 'BlueCross Shield (Policy #BCS-9921)',
    vitals: {
      bp: '138/88 mmHg',
      heartRate: '78 bpm',
      spo2: '97%',
      temp: '98.6 °F',
      glucose: '132 mg/dL',
      recordedAt: '2026-09-05 07:30 AM'
    },
    notes: 'Post-angioplasty recovery day 3. Patient ambulating well. Vital signs stable. Daily troponin monitoring indicated.'
  },
  {
    id: 'PAT-2026-102',
    name: 'Lucas Tremblay',
    age: 34,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+1 (555) 876-2345',
    email: 'lucas.t@example.com',
    address: '108 Metro Blvd, Suite 4B',
    emergencyContact: 'Chloe Tremblay (Sister) - +1 (555) 876-2346',
    admissionStatus: 'Admitted',
    assignedBed: 'GW-104',
    department: 'Orthopedics & Joint Care',
    attendingDoctor: 'Dr. Marcus Vance',
    admissionDate: '2026-09-04',
    allergies: ['None known'],
    chronicConditions: ['None'],
    insuranceProvider: 'United Healthcare (Policy #UHC-4402)',
    vitals: {
      bp: '120/78 mmHg',
      heartRate: '72 bpm',
      spo2: '99%',
      temp: '98.4 °F',
      glucose: '95 mg/dL',
      recordedAt: '2026-09-05 06:45 AM'
    },
    notes: 'Arthroscopic ACL reconstruction completed successfully. Commenced CPM physiotherapy. Pain managed with oral analgesics.'
  },
  {
    id: 'PAT-2026-103',
    name: 'Sophia Chen',
    age: 9,
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+1 (555) 765-3456',
    email: 'chen.family@example.com',
    address: '45 Willow Creek Dr',
    emergencyContact: 'Wei Chen (Father) - +1 (555) 765-3457',
    admissionStatus: 'Outpatient',
    assignedBed: null,
    department: 'Pediatrics & Neonatology',
    attendingDoctor: 'Dr. Elena Rostova',
    admissionDate: null,
    allergies: ['Peanuts'],
    chronicConditions: ['Mild Asthma'],
    insuranceProvider: 'Aetna Health (Policy #AET-7890)',
    vitals: {
      bp: '102/65 mmHg',
      heartRate: '88 bpm',
      spo2: '98%',
      temp: '99.1 °F',
      glucose: '90 mg/dL',
      recordedAt: '2026-09-04 03:15 PM'
    },
    notes: 'Routine seasonal asthma review. Inhaler dosage adjusted. Next follow-up in 3 months.'
  },
  {
    id: 'PAT-2026-104',
    name: 'Arthur Pendelton',
    age: 72,
    gender: 'Male',
    bloodGroup: 'AB-',
    phone: '+1 (555) 654-4567',
    email: 'a.pendelton@example.com',
    address: '12 Beacon Hill Way',
    emergencyContact: 'Mary Pendelton (Daughter) - +1 (555) 654-4568',
    admissionStatus: 'Admitted',
    assignedBed: 'DLX-301',
    department: 'Neurology & Neurosurgery',
    attendingDoctor: 'Dr. Alexander Hayes',
    admissionDate: '2026-09-01',
    allergies: ['Aspirin', 'Iodine Contrast'],
    chronicConditions: ['Cerebrovascular Disease', 'Atrial Fibrillation'],
    insuranceProvider: 'Medicare Advantage (Policy #MED-1109)',
    vitals: {
      bp: '142/90 mmHg',
      heartRate: '68 bpm',
      spo2: '96%',
      temp: '98.7 °F',
      glucose: '115 mg/dL',
      recordedAt: '2026-09-05 07:00 AM'
    },
    notes: 'Transient ischemic evaluation. MRI Brain shows no acute infarct. Initiated anticoagulant therapy. Neurological checks Q4H.'
  },
  {
    id: 'PAT-2026-105',
    name: 'Maya Lin',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '+1 (555) 543-5678',
    email: 'maya.lin@example.com',
    address: '500 Oakwood Lane, Apt 12',
    emergencyContact: 'Kenji Lin (Brother) - +1 (555) 543-5679',
    admissionStatus: 'Discharged',
    assignedBed: null,
    department: 'General Medicine & ER',
    attendingDoctor: 'Dr. Priya Sharma',
    admissionDate: '2026-08-28',
    dischargeDate: '2026-09-03',
    allergies: ['None'],
    chronicConditions: ['None'],
    insuranceProvider: 'Cigna Global (Policy #CG-6672)',
    vitals: {
      bp: '116/74 mmHg',
      heartRate: '70 bpm',
      spo2: '99%',
      temp: '98.2 °F',
      glucose: '88 mg/dL',
      recordedAt: '2026-09-03 11:00 AM'
    },
    notes: 'Acute gastroenteritis resolved. Discharged home on oral rehydration and probiotics.'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'APT-901',
    patientId: 'PAT-2026-103',
    patientName: 'Sophia Chen',
    doctorId: 'DOC-104',
    doctorName: 'Dr. Elena Rostova',
    department: 'Pediatrics & Neonatology',
    date: '2026-09-05',
    time: '09:30 AM',
    reason: 'Asthma Follow-up & Allergy Plan',
    type: 'In-Person',
    status: 'In-Consultation',
    token: 'T-01'
  },
  {
    id: 'APT-902',
    patientId: 'PAT-2026-101',
    patientName: 'Eleanor Vance',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Sarah Mitchell',
    department: 'Cardiology',
    date: '2026-09-05',
    time: '10:15 AM',
    reason: 'Post-Angioplasty Ward Rounds',
    type: 'In-Person',
    status: 'Scheduled',
    token: 'T-02'
  },
  {
    id: 'APT-903',
    patientId: 'PAT-2026-102',
    patientName: 'Lucas Tremblay',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Marcus Vance',
    department: 'Orthopedics & Joint Care',
    date: '2026-09-05',
    time: '11:00 AM',
    reason: 'Knee Dressing & Rehab Review',
    type: 'In-Person',
    status: 'Scheduled',
    token: 'T-03'
  },
  {
    id: 'APT-904',
    patientId: 'PAT-2026-104',
    patientName: 'Arthur Pendelton',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Alexander Hayes',
    department: 'Neurology & Neurosurgery',
    date: '2026-09-05',
    time: '02:30 PM',
    reason: 'MRI Review & Neuro Assessment',
    type: 'In-Person',
    status: 'Scheduled',
    token: 'T-04'
  },
  {
    id: 'APT-905',
    patientId: 'PAT-2026-105',
    patientName: 'Maya Lin',
    doctorId: 'DOC-106',
    doctorName: 'Dr. Priya Sharma',
    department: 'General Medicine & ER',
    date: '2026-09-05',
    time: '04:00 PM',
    reason: 'Post-discharge wellness check',
    type: 'Telehealth',
    status: 'Scheduled',
    token: 'T-05'
  }
];

export const INITIAL_BEDS = [
  { id: 'bed-1', bedNumber: 'ICU-01', ward: 'Intensive Care Unit (ICU)', floor: '2nd Floor', type: 'ICU Ventilator Bed', status: 'Available', dailyRate: 750, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-2', bedNumber: 'ICU-02', ward: 'Intensive Care Unit (ICU)', floor: '2nd Floor', type: 'ICU Cardiac Monitor', status: 'Occupied', dailyRate: 750, assignedPatientId: 'PAT-2026-101', assignedPatientName: 'Eleanor Vance' },
  { id: 'bed-3', bedNumber: 'ICU-03', ward: 'Intensive Care Unit (ICU)', floor: '2nd Floor', type: 'ICU Isolation', status: 'Cleaning', dailyRate: 800, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-4', bedNumber: 'GW-101', ward: 'General Medical Ward', floor: '1st Floor', type: 'Standard Electric Bed', status: 'Available', dailyRate: 200, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-5', bedNumber: 'GW-102', ward: 'General Medical Ward', floor: '1st Floor', type: 'Standard Electric Bed', status: 'Available', dailyRate: 200, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-6', bedNumber: 'GW-103', ward: 'General Medical Ward', floor: '1st Floor', type: 'Standard Electric Bed', status: 'Maintenance', dailyRate: 200, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-7', bedNumber: 'GW-104', ward: 'General Medical Ward', floor: '1st Floor', type: 'Standard Electric Bed', status: 'Occupied', dailyRate: 200, assignedPatientId: 'PAT-2026-102', assignedPatientName: 'Lucas Tremblay' },
  { id: 'bed-8', bedNumber: 'DLX-301', ward: 'Private VIP Suites', floor: '3rd Floor', type: 'Deluxe Suite with Lounge', status: 'Occupied', dailyRate: 500, assignedPatientId: 'PAT-2026-104', assignedPatientName: 'Arthur Pendelton' },
  { id: 'bed-9', bedNumber: 'DLX-302', ward: 'Private VIP Suites', floor: '3rd Floor', type: 'Deluxe Suite with Lounge', status: 'Available', dailyRate: 500, assignedPatientId: null, assignedPatientName: null },
  { id: 'bed-10', bedNumber: 'EM-01', ward: 'Emergency Triage', floor: 'Ground Floor', type: 'Trauma Bay Bed', status: 'Available', dailyRate: 350, assignedPatientId: null, assignedPatientName: null }
];

export const INITIAL_MEDICINES = [
  { id: 'MED-501', name: 'Atorvastatin', genericName: 'Atorvastatin Calcium', category: 'Cardiovascular', form: 'Tablet', strength: '20mg', batch: 'ATV-2026-09', expiry: '2027-11-30', stock: 350, minThreshold: 50, price: 1.25, manufacturer: 'Pfizer Health' },
  { id: 'MED-502', name: 'Amoxicillin & Clavulanate', genericName: 'Augmentin', category: 'Antibiotic', form: 'Tablet', strength: '625mg', batch: 'AMX-2026-04', expiry: '2027-08-15', stock: 18, minThreshold: 30, price: 2.80, manufacturer: 'GSK Pharma' },
  { id: 'MED-503', name: 'Metformin HCl', genericName: 'Glucophage', category: 'Antidiabetic', form: 'Tablet', strength: '500mg', batch: 'MTF-2025-11', expiry: '2027-05-20', stock: 520, minThreshold: 100, price: 0.65, manufacturer: 'Merck Healthcare' },
  { id: 'MED-504', name: 'Salbutamol Inhaler', genericName: 'Albuterol Sulfate', category: 'Respiratory', form: 'Inhaler', strength: '100mcg (200 doses)', batch: 'SLB-2026-01', expiry: '2027-12-10', stock: 45, minThreshold: 20, price: 18.50, manufacturer: 'Cipla Global' },
  { id: 'MED-505', name: 'Enoxaparin Sodium', genericName: 'Clexane', category: 'Anticoagulant', form: 'Pre-filled Syringe', strength: '40mg/0.4mL', batch: 'ENX-2026-07', expiry: '2027-03-31', stock: 85, minThreshold: 25, price: 14.00, manufacturer: 'Sanofi Aventis' },
  { id: 'MED-506', name: 'Paracetamol IV Infusion', genericName: 'Acetaminophen', category: 'Analgesic / Antipyretic', form: 'IV Infusion Bottle', strength: '1000mg/100mL', batch: 'PCM-2026-08', expiry: '2028-01-15', stock: 140, minThreshold: 40, price: 6.20, manufacturer: 'Fresenius Kabi' },
  { id: 'MED-507', name: 'Ondansetron Injection', genericName: 'Zofran', category: 'Antiemetic', form: 'Ampoule', strength: '4mg/2mL', batch: 'OND-2026-03', expiry: '2026-10-01', stock: 12, minThreshold: 25, price: 3.50, manufacturer: 'Novartis' }
];

export const INITIAL_INVOICES = [
  {
    id: 'INV-2026-801',
    patientId: 'PAT-2026-101',
    patientName: 'Eleanor Vance',
    date: '2026-09-04',
    dueDate: '2026-09-11',
    department: 'Cardiology',
    status: 'Paid',
    paymentMethod: 'Insurance TPA (BlueCross)',
    items: [
      { id: 'item-1', description: 'Emergency Cardiology Consultation', category: 'Consultation', quantity: 1, unitPrice: 150, total: 150 },
      { id: 'item-2', description: 'Coronary Angiogram & Stenting Procedure', category: 'Surgery / Procedure', quantity: 1, unitPrice: 3200, total: 3200 },
      { id: 'item-3', description: 'ICU Cardiac Bed Charge (3 Days)', category: 'Room & Board', quantity: 3, unitPrice: 750, total: 2250 },
      { id: 'item-4', description: 'Cardiac Troponin I & Comprehensive Panel', category: 'Laboratory', quantity: 2, unitPrice: 120, total: 240 },
      { id: 'item-5', description: 'Enoxaparin & Atorvastatin Medication', category: 'Pharmacy', quantity: 1, unitPrice: 85, total: 85 }
    ],
    subtotal: 5925,
    tax: 0,
    insuranceCovered: 5200,
    discount: 0,
    total: 725,
    paidAmount: 725,
    balance: 0
  },
  {
    id: 'INV-2026-802',
    patientId: 'PAT-2026-102',
    patientName: 'Lucas Tremblay',
    date: '2026-09-04',
    dueDate: '2026-09-18',
    department: 'Orthopedics & Joint Care',
    status: 'Pending',
    paymentMethod: 'Pending Insurance Claim (UHC)',
    items: [
      { id: 'item-1', description: 'Orthopedic Consultation & Pre-op Exam', category: 'Consultation', quantity: 1, unitPrice: 140, total: 140 },
      { id: 'item-2', description: 'Arthroscopic ACL Reconstruction Surgery', category: 'Surgery / Procedure', quantity: 1, unitPrice: 2800, total: 2800 },
      { id: 'item-3', description: 'General Medical Ward Bed (2 Days)', category: 'Room & Board', quantity: 2, unitPrice: 200, total: 400 },
      { id: 'item-4', description: 'Digital Knee MRI & Pre-op Blood Tests', category: 'Diagnostics', quantity: 1, unitPrice: 450, total: 450 },
      { id: 'item-5', description: 'Post-op Analgesics & Knee Immobilizer', category: 'Pharmacy', quantity: 1, unitPrice: 160, total: 160 }
    ],
    subtotal: 3950,
    tax: 0,
    insuranceCovered: 3200,
    discount: 50,
    total: 700,
    paidAmount: 0,
    balance: 700
  },
  {
    id: 'INV-2026-803',
    patientId: 'PAT-2026-105',
    patientName: 'Maya Lin',
    date: '2026-09-03',
    dueDate: '2026-09-03',
    department: 'General Medicine & ER',
    status: 'Paid',
    paymentMethod: 'Credit Card (Visa **** 4092)',
    items: [
      { id: 'item-1', description: 'Emergency Room Triage & Physician Evaluation', category: 'ER Services', quantity: 1, unitPrice: 220, total: 220 },
      { id: 'item-2', description: 'IV Fluid Hydration & Antiemetics Administration', category: 'Nursing Care', quantity: 1, unitPrice: 110, total: 110 },
      { id: 'item-3', description: 'Electrolytes & Stool Diagnostic Panel', category: 'Laboratory', quantity: 1, unitPrice: 95, total: 95 },
      { id: 'item-4', description: 'Oral Rehydration & Probiotics Dispensed', category: 'Pharmacy', quantity: 1, unitPrice: 35, total: 35 }
    ],
    subtotal: 460,
    tax: 0,
    insuranceCovered: 350,
    discount: 0,
    total: 110,
    paidAmount: 110,
    balance: 0
  }
];

export const INITIAL_LAB_ORDERS = [
  {
    id: 'LAB-2026-301',
    patientId: 'PAT-2026-101',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Sarah Mitchell',
    testName: 'Cardiac Troponin I & Lipid Profile',
    category: 'Clinical Biochemistry',
    sampleType: 'Serum Blood',
    orderDate: '2026-09-04',
    completionDate: '2026-09-05',
    status: 'Completed',
    results: [
      { parameter: 'Troponin I (hs-cTnI)', value: '0.028', unit: 'ng/mL', refRange: '0.000 - 0.034', status: 'Normal' },
      { parameter: 'Total Cholesterol', value: '185', unit: 'mg/dL', refRange: '125 - 200', status: 'Normal' },
      { parameter: 'LDL Cholesterol', value: '112', unit: 'mg/dL', refRange: '< 100', status: 'High' },
      { parameter: 'HDL Cholesterol', value: '48', unit: 'mg/dL', refRange: '> 40', status: 'Normal' },
      { parameter: 'Triglycerides', value: '145', unit: 'mg/dL', refRange: '< 150', status: 'Normal' }
    ],
    notes: 'Cardiac enzymes normalized following coronary intervention. LDL slightly elevated, continue Atorvastatin.'
  },
  {
    id: 'LAB-2026-302',
    patientId: 'PAT-2026-104',
    patientName: 'Arthur Pendelton',
    doctorName: 'Dr. Alexander Hayes',
    testName: 'High-Resolution Brain MRI & MR Angiography',
    category: 'Radiology & Imaging',
    sampleType: 'Imaging Scan',
    orderDate: '2026-09-03',
    completionDate: '2026-09-04',
    status: 'Completed',
    results: [
      { parameter: 'Diffusion Weighted Imaging (DWI)', value: 'No acute restricted diffusion', unit: 'Scan', refRange: 'Negative', status: 'Normal' },
      { parameter: 'T2/FLAIR White Matter', value: 'Mild age-related chronic microvascular changes', unit: 'Grading', refRange: 'Grade 0-1', status: 'Normal' },
      { parameter: 'Intracranial Vessel Patency (MRA)', value: 'Mild stenosis in right MCA branch (~25%)', unit: '% Stenosis', refRange: '< 30%', status: 'Normal' }
    ],
    notes: 'No signs of acute ischemic stroke or hemorrhage. Consistent with TIA.'
  },
  {
    id: 'LAB-2026-303',
    patientId: 'PAT-2026-102',
    patientName: 'Lucas Tremblay',
    doctorName: 'Dr. Marcus Vance',
    testName: 'Complete Blood Count (CBC) & Coagulation Profile',
    category: 'Hematology',
    sampleType: 'Whole Blood (EDTA)',
    orderDate: '2026-09-05',
    completionDate: null,
    status: 'Processing',
    results: [
      { parameter: 'Hemoglobin (Hb)', value: '14.8', unit: 'g/dL', refRange: '13.5 - 17.5', status: 'Normal' },
      { parameter: 'White Blood Cells (WBC)', value: '8.4', unit: '10^3/µL', refRange: '4.5 - 11.0', status: 'Normal' },
      { parameter: 'Platelets Count', value: '265', unit: '10^3/µL', refRange: '150 - 450', status: 'Normal' },
      { parameter: 'INR (Prothrombin Time)', value: '1.02', unit: 'Ratio', refRange: '0.9 - 1.15', status: 'Normal' }
    ],
    notes: 'Pre-discharge routine check in progress.'
  }
];

export const INITIAL_FEED_ACTIVITIES = [
  { id: 'act-1', type: 'admission', title: 'New Patient Admitted', description: 'Eleanor Vance admitted to ICU-02 (Cardiology)', time: '10 mins ago', icon: 'UserPlus', color: '#0284c7' },
  { id: 'act-2', type: 'surgery', title: 'Surgery Completed', description: 'Dr. Marcus Vance completed ACL reconstruction for Lucas Tremblay', time: '45 mins ago', icon: 'Activity', color: '#0d9488' },
  { id: 'act-3', type: 'payment', title: 'Payment Received', description: 'Invoice INV-2026-801 settled via Insurance TPA ($725.00)', time: '2 hours ago', icon: 'CheckCircle', color: '#10b981' },
  { id: 'act-4', type: 'lab', title: 'Lab Results Published', description: 'MRI Brain & MRA report generated for Arthur Pendelton', time: '3 hours ago', icon: 'FileText', color: '#7c3aed' },
  { id: 'act-5', type: 'inventory', title: 'Low Stock Warning', description: 'Amoxicillin & Clavulanate (625mg) stock is below threshold (18 left)', time: '5 hours ago', icon: 'AlertTriangle', color: '#f59e0b' }
];

export const HOSPITAL_TESTIMONIALS = [
  {
    id: 't-1',
    quote: 'The cardiac team and Dr. Sarah Mitchell saved my life. The digital coordination, fast emergency response, and post-surgery care in the ICU was world-class.',
    patientName: 'Eleanor V., 58',
    treatment: 'Cardiology & Angioplasty',
    rating: 5
  },
  {
    id: 't-2',
    quote: 'Seamless booking and zero wait times. Dr. Rostova took such gentle care of my daughter’s asthma. The patient portal makes tracking prescriptions so easy.',
    patientName: 'Wei C., Parent',
    treatment: 'Pediatrics Department',
    rating: 5
  },
  {
    id: 't-3',
    quote: 'From robotic surgery to physical therapy, the orthopedics department at PulseCare is simply the finest in the state. I was back walking within 48 hours.',
    patientName: 'Lucas T., 34',
    treatment: 'Orthopedics & Joint Care',
    rating: 5
  }
];
