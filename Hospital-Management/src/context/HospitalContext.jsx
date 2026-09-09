import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_DOCTORS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_BEDS,
  INITIAL_MEDICINES,
  INITIAL_INVOICES,
  INITIAL_LAB_ORDERS,
  INITIAL_FEED_ACTIVITIES
} from '../data/mockData';
import { generateId } from '../utils/formatters';

const HospitalContext = createContext();

const LOCAL_STORAGE_KEY = 'pulsecare_hms_state_v1';

export const HospitalProvider = ({ children }) => {
  // Navigation & Portal View State
  const [activePortal, setActivePortal] = useState('website'); // 'website' | 'app'
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [role, setRole] = useState('admin'); // 'admin' | 'doctor' | 'receptionist' | 'pharmacist' | 'lab_tech'
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // { type, payload }

  // Hospital Domain Data State with LocalStorage Initialization
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_doctors`);
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_patients`);
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_appointments`);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });
  const [beds, setBeds] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_beds`);
    return saved ? JSON.parse(saved) : INITIAL_BEDS;
  });
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_medicines`);
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_invoices`);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });
  const [labOrders, setLabOrders] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_labOrders`);
    return saved ? JSON.parse(saved) : INITIAL_LAB_ORDERS;
  });
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activities`);
    return saved ? JSON.parse(saved) : INITIAL_FEED_ACTIVITIES;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_doctors`, JSON.stringify(doctors));
  }, [doctors]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_patients`, JSON.stringify(patients));
  }, [patients]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_appointments`, JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_beds`, JSON.stringify(beds));
  }, [beds]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_medicines`, JSON.stringify(medicines));
  }, [medicines]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_invoices`, JSON.stringify(invoices));
  }, [invoices]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_labOrders`, JSON.stringify(labOrders));
  }, [labOrders]);
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_activities`, JSON.stringify(activities));
  }, [activities]);

  // Toast Notification System
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity Logger Helper
  const logActivity = (type, title, description, icon = 'Activity', color = '#0284c7') => {
    const newAct = {
      id: 'act-' + Date.now(),
      type,
      title,
      description,
      time: 'Just now',
      icon,
      color
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // Patient Actions
  const addPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      id: generateId('PAT-2026'),
      admissionStatus: patientData.admissionStatus || 'Outpatient',
      vitals: patientData.vitals || {
        bp: '120/80 mmHg',
        heartRate: '75 bpm',
        spo2: '98%',
        temp: '98.6 °F',
        glucose: '100 mg/dL',
        recordedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      allergies: Array.isArray(patientData.allergies) ? patientData.allergies : (patientData.allergies ? [patientData.allergies] : ['None recorded']),
      chronicConditions: Array.isArray(patientData.chronicConditions) ? patientData.chronicConditions : (patientData.chronicConditions ? [patientData.chronicConditions] : ['None'])
    };

    setPatients((prev) => [newPatient, ...prev]);
    logActivity('patient', 'Patient Registered', `${newPatient.name} added to hospital records`, 'UserPlus', '#0284c7');
    showToast(`Patient ${newPatient.name} registered successfully!`, 'success');
    return newPatient;
  };

  const updatePatient = (id, updatedFields) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Patient details updated successfully', 'success');
  };

  const admitPatient = (patientId, bedNumber, department, doctorName) => {
    const targetPatient = patients.find((p) => p.id === patientId);
    if (!targetPatient) return;

    // Update patient status & bed
    updatePatient(patientId, {
      admissionStatus: 'Admitted',
      assignedBed: bedNumber,
      department: department || targetPatient.department,
      attendingDoctor: doctorName || targetPatient.attendingDoctor,
      admissionDate: new Date().toISOString().split('T')[0]
    });

    // Update bed status
    setBeds((prev) =>
      prev.map((b) =>
        b.bedNumber === bedNumber
          ? { ...b, status: 'Occupied', assignedPatientId: patientId, assignedPatientName: targetPatient.name }
          : b
      )
    );

    logActivity('admission', 'Patient Admitted to Bed', `${targetPatient.name} assigned to Bed ${bedNumber}`, 'CheckCircle', '#0284c7');
    showToast(`${targetPatient.name} admitted to ${bedNumber}!`, 'success');
  };

  const dischargePatient = (patientId) => {
    const targetPatient = patients.find((p) => p.id === patientId);
    if (!targetPatient) return;

    const oldBed = targetPatient.assignedBed;

    // Free bed
    if (oldBed) {
      setBeds((prev) =>
        prev.map((b) =>
          b.bedNumber === oldBed
            ? { ...b, status: 'Cleaning', assignedPatientId: null, assignedPatientName: null }
            : b
        )
      );
    }

    // Update patient
    updatePatient(patientId, {
      admissionStatus: 'Discharged',
      assignedBed: null,
      dischargeDate: new Date().toISOString().split('T')[0]
    });

    logActivity('discharge', 'Patient Discharged', `${targetPatient.name} discharged. Bed ${oldBed || 'N/A'} scheduled for cleaning.`, 'LogOut', '#10b981');
    showToast(`${targetPatient.name} has been discharged.`, 'info');
  };

  // Doctor Actions
  const addDoctor = (doctorData) => {
    const newDoctor = {
      ...doctorData,
      id: generateId('DOC'),
      rating: 5.0,
      reviewsCount: 1,
      status: doctorData.status || 'Available',
      avatarBg: doctorData.avatarBg || '#0284c7'
    };
    setDoctors((prev) => [newDoctor, ...prev]);
    logActivity('doctor', 'New Specialist Added', `${newDoctor.name} (${newDoctor.specialization})`, 'UserCheck', '#7c3aed');
    showToast(`Dr. ${newDoctor.name} added to staff directory`, 'success');
    return newDoctor;
  };

  const updateDoctor = (id, updatedFields) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    );
    showToast('Doctor profile updated', 'success');
  };

  const toggleDoctorStatus = (id) => {
    setDoctors((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const next = d.status === 'Available' ? 'In Surgery' : d.status === 'In Surgery' ? 'On Leave' : 'Available';
          showToast(`${d.name} status changed to ${next}`, 'info');
          return { ...d, status: next };
        }
        return d;
      })
    );
  };

  // Appointment Actions
  const bookAppointment = (appointmentData) => {
    const tokenIndex = appointments.filter((a) => a.date === appointmentData.date).length + 1;
    const tokenStr = `T-${tokenIndex < 10 ? '0' + tokenIndex : tokenIndex}`;

    const newAppt = {
      ...appointmentData,
      id: generateId('APT'),
      status: 'Scheduled',
      token: tokenStr
    };

    setAppointments((prev) => [newAppt, ...prev]);
    logActivity('appointment', 'Appointment Booked', `${newAppt.patientName} with ${newAppt.doctorName} at ${newAppt.time}`, 'Calendar', '#0d9488');
    showToast(`Appointment booked! Token #${tokenStr}`, 'success');
    return newAppt;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    showToast(`Appointment status updated to ${newStatus}`, 'info');
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
    showToast('Appointment cancelled', 'warning');
  };

  // Bed Management Actions
  const updateBedStatus = (id, status) => {
    setBeds((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, ...(status === 'Available' ? { assignedPatientId: null, assignedPatientName: null } : {}) } : b))
    );
    showToast(`Bed status changed to ${status}`, 'info');
  };

  // Pharmacy / Medicine Actions
  const addMedicine = (medicineData) => {
    const newMed = {
      ...medicineData,
      id: generateId('MED'),
      stock: Number(medicineData.stock) || 0,
      minThreshold: Number(medicineData.minThreshold) || 10,
      price: Number(medicineData.price) || 1.0
    };
    setMedicines((prev) => [newMed, ...prev]);
    logActivity('inventory', 'Pharmacy Stock Added', `${newMed.name} (${newMed.strength}) added to inventory`, 'Package', '#0284c7');
    showToast(`Medicine ${newMed.name} added to catalog`, 'success');
    return newMed;
  };

  const updateMedicineStock = (id, quantityChange) => {
    setMedicines((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newQty = Math.max(0, m.stock + quantityChange);
          return { ...m, stock: newQty };
        }
        return m;
      })
    );
    showToast('Inventory stock updated', 'success');
  };

  // Invoicing & Billing Actions
  const createInvoice = (invoiceData) => {
    const items = invoiceData.items || [];
    const subtotal = items.reduce((sum, item) => sum + (Number(item.total) || (Number(item.quantity) * Number(item.unitPrice))), 0);
    const tax = Number(invoiceData.tax) || 0;
    const discount = Number(invoiceData.discount) || 0;
    const insuranceCovered = Number(invoiceData.insuranceCovered) || 0;
    const total = Math.max(0, subtotal + tax - discount - insuranceCovered);
    const paidAmount = invoiceData.status === 'Paid' ? total : (Number(invoiceData.paidAmount) || 0);

    const newInv = {
      ...invoiceData,
      id: generateId('INV-2026'),
      date: invoiceData.date || new Date().toISOString().split('T')[0],
      dueDate: invoiceData.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      items,
      subtotal,
      tax,
      discount,
      insuranceCovered,
      total,
      paidAmount,
      balance: Math.max(0, total - paidAmount),
      status: paidAmount >= total ? 'Paid' : (paidAmount > 0 ? 'Partial' : (invoiceData.status || 'Pending'))
    };

    setInvoices((prev) => [newInv, ...prev]);
    logActivity('billing', 'New Invoice Generated', `${newInv.id} for ${newInv.patientName} (${newInv.total > 0 ? '$' + newInv.total : 'Fully Covered'})`, 'Receipt', '#10b981');
    showToast(`Invoice ${newInv.id} generated successfully!`, 'success');
    return newInv;
  };

  const payInvoice = (invoiceId, paymentMethod = 'Credit Card') => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          return {
            ...inv,
            status: 'Paid',
            paidAmount: inv.total,
            balance: 0,
            paymentMethod
          };
        }
        return inv;
      })
    );
    logActivity('payment', 'Payment Settled', `Invoice ${invoiceId} marked as Paid`, 'CheckCircle', '#10b981');
    showToast(`Invoice ${invoiceId} marked as Paid!`, 'success');
  };

  // Lab Actions
  const createLabOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: generateId('LAB-2026'),
      orderDate: new Date().toISOString().split('T')[0],
      completionDate: null,
      status: 'Ordered',
      results: orderData.results || []
    };
    setLabOrders((prev) => [newOrder, ...prev]);
    logActivity('lab', 'Lab Diagnostic Ordered', `${newOrder.testName} for ${newOrder.patientName}`, 'FilePlus', '#7c3aed');
    showToast(`Lab order ${newOrder.id} created!`, 'success');
    return newOrder;
  };

  const updateLabResults = (id, results, notes) => {
    setLabOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: 'Completed',
            completionDate: new Date().toISOString().split('T')[0],
            results,
            notes: notes || order.notes
          };
        }
        return order;
      })
    );
    logActivity('lab', 'Lab Diagnostic Ready', `Report completed for Order #${id}`, 'FileCheck', '#059669');
    showToast(`Lab results for #${id} finalized and published`, 'success');
  };

  // Reset to default dataset
  const resetToMockData = () => {
    setDoctors(INITIAL_DOCTORS);
    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setBeds(INITIAL_BEDS);
    setMedicines(INITIAL_MEDICINES);
    setInvoices(INITIAL_INVOICES);
    setLabOrders(INITIAL_LAB_ORDERS);
    setActivities(INITIAL_FEED_ACTIVITIES);
    localStorage.clear();
    showToast('Hospital database reset to initial demonstration state', 'info');
  };

  return (
    <HospitalContext.Provider
      value={{
        activePortal,
        setActivePortal,
        currentTab,
        setCurrentTab,
        role,
        setRole,
        theme,
        setTheme,
        toasts,
        showToast,
        removeToast,
        activeModal,
        setActiveModal,
        departments,
        doctors,
        addDoctor,
        updateDoctor,
        toggleDoctorStatus,
        patients,
        addPatient,
        updatePatient,
        admitPatient,
        dischargePatient,
        appointments,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        beds,
        updateBedStatus,
        medicines,
        addMedicine,
        updateMedicineStock,
        invoices,
        createInvoice,
        payInvoice,
        labOrders,
        createLabOrder,
        updateLabResults,
        activities,
        resetToMockData
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
