import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  FileText,
  Stethoscope,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { formatCurrency } from '../../utils/formatters';

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:15 AM', '11:45 AM', '02:00 PM', '02:30 PM',
  '03:15 PM', '04:00 PM', '04:30 PM'
];

export const WebBookingWizard = () => {
  const { doctors, departments, bookAppointment, addPatient, patients } = useHospital();

  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState('Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [appointmentDate, setAppointmentDate] = useState('2026-09-06');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [consultationType, setConsultationType] = useState('In-Person');

  // Patient Info Form
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Female');
  const [reason, setReason] = useState('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const availableDoctors = doctors.filter((d) => !selectedDept || d.department === selectedDept);
  const currentDoctor = doctors.find((d) => d.id === selectedDoctorId) || availableDoctors[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please provide patient name and contact phone number.');
      return;
    }

    // Check if patient exists or register new
    let existingPatient = patients.find(p => p.phone === patientPhone || p.email === patientEmail);
    let patientId = existingPatient ? existingPatient.id : null;

    if (!existingPatient) {
      const created = addPatient({
        name: patientName,
        phone: patientPhone,
        email: patientEmail || 'patient@pulsecare.org',
        age: Number(patientAge) || 30,
        gender: patientGender,
        address: 'Registered via Public Portal',
        admissionStatus: 'Outpatient',
        department: selectedDept,
        attendingDoctor: currentDoctor ? currentDoctor.name : 'General Physician'
      });
      patientId = created.id;
    }

    const booking = bookAppointment({
      patientId,
      patientName,
      doctorId: currentDoctor ? currentDoctor.id : 'DOC-101',
      doctorName: currentDoctor ? currentDoctor.name : 'Dr. Sarah Mitchell',
      department: selectedDept,
      date: appointmentDate,
      time: selectedSlot,
      reason: reason || 'General Consultation',
      type: consultationType
    });

    setConfirmedBooking(booking);
    setStep(3); // Confirmation step
  };

  const handleReset = () => {
    setStep(1);
    setConfirmedBooking(null);
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setReason('');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-sky-50/50" id="booking-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Instant Online Appointments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Schedule Your Doctor Visit
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-1">
            Zero waiting lines. Choose your specialist, pick an open slot, and get your digital token instantly.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Wizard Steps Header */}
          <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-sky-500 flex items-center justify-center font-bold text-sm shadow-md">
                {step === 3 ? '✓' : step}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {step === 1 && 'Step 1: Choose Department & Specialist'}
                  {step === 2 && 'Step 2: Patient Details & Reason'}
                  {step === 3 && 'Step 3: Appointment Confirmed!'}
                </h3>
                <p className="text-xs text-slate-400">
                  {step === 1 && 'Select doctor, date, and preferred consultation timing'}
                  {step === 2 && 'Enter contact information for SMS reminder & digital token'}
                  {step === 3 && 'Save or print your hospital OPD entry token'}
                </p>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="hidden sm:flex items-center gap-2">
              <span className={`h-2.5 w-8 rounded-full ${step >= 1 ? 'bg-sky-400' : 'bg-slate-700'}`}></span>
              <span className={`h-2.5 w-8 rounded-full ${step >= 2 ? 'bg-sky-400' : 'bg-slate-700'}`}></span>
              <span className={`h-2.5 w-8 rounded-full ${step >= 3 ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
            </div>
          </div>

          {/* Wizard Body */}
          <div className="p-6 sm:p-8">
            {/* STEP 1: Department, Doctor & Timing */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Department Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Medical Specialty / Department
                    </label>
                    <select
                      value={selectedDept}
                      onChange={(e) => {
                        setSelectedDept(e.target.value);
                        const matched = doctors.find(d => d.department === e.target.value);
                        if (matched) setSelectedDoctorId(matched.id);
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Doctor Select */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Specialist Doctor
                    </label>
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    >
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} — {doc.specialization} ({formatCurrency(doc.consultationFee)})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Highlight Card */}
                {currentDoctor && (
                  <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
                        style={{ backgroundColor: currentDoctor.avatarBg }}
                      >
                        {currentDoctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{currentDoctor.name}</h4>
                        <p className="text-xs text-sky-700 font-medium">{currentDoctor.specialization}</p>
                        <p className="text-[11px] text-slate-500">{currentDoctor.qualifications} • {currentDoctor.experience}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">Consultation Fee</span>
                      <span className="text-base font-extrabold text-slate-900">{formatCurrency(currentDoctor.consultationFee)}</span>
                    </div>
                  </div>
                )}

                {/* Consultation Date & Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={appointmentDate}
                      min="2026-09-05"
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Consultation Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConsultationType('In-Person')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                          consultationType === 'In-Person'
                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Hospital Visit (OPD)
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsultationType('Telehealth')}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                          consultationType === 'Telehealth'
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Telehealth / Video
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slot Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Available Time Slots for {appointmentDate}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                          selectedSlot === slot
                            ? 'bg-sky-600 text-white border-sky-600 shadow-md scale-105'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
                  >
                    <span>Proceed to Patient Details</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Patient Info */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-500">Booking Summary:</span>
                    <strong className="text-slate-900 ml-1">
                      {currentDoctor?.name} ({selectedDept}) on {appointmentDate} at {selectedSlot}
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sky-600 font-bold hover:underline"
                  >
                    Change Slot
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Patient Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number (for SMS token) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="rachel@example.com"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Age
                      </label>
                      <input
                        type="number"
                        placeholder="35"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Gender
                      </label>
                      <select
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Chief Complaint / Reason for Visit
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your symptoms or medical concern..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-normal text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition"
                  >
                    <CheckCircle size={16} />
                    <span>Confirm & Generate Token</span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Booking Confirmation & Digital Token */}
            {step === 3 && confirmedBooking && (
              <div className="text-center space-y-6 animate-fade-in">
                <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle size={36} />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Booking Confirmed
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                    Appointment Successfully Scheduled!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    An SMS confirmation and digital pass have been dispatched to {confirmedBooking.patientName}.
                  </p>
                </div>

                {/* Printable Digital Token Card */}
                <div className="max-w-md mx-auto bg-slate-50 border-2 border-dashed border-sky-300 rounded-2xl p-6 text-left space-y-4 shadow-sm relative">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        OPD Queue Token
                      </p>
                      <p className="text-3xl font-black text-sky-600 font-mono">
                        {confirmedBooking.token}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Appointment ID
                      </p>
                      <p className="text-xs font-mono font-bold text-slate-800">
                        {confirmedBooking.id}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient:</span>
                      <strong className="text-slate-900">{confirmedBooking.patientName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Doctor:</span>
                      <strong className="text-slate-900">{confirmedBooking.doctorName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department:</span>
                      <strong className="text-slate-900">{confirmedBooking.department}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled Time:</span>
                      <strong className="text-slate-900">{confirmedBooking.date} at {confirmedBooking.time}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mode:</span>
                      <span className="font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded text-[11px]">{confirmedBooking.type}</span>
                    </div>
                  </div>

                  <div className="bg-sky-100/60 p-2.5 rounded-xl text-[11px] text-sky-900 font-medium">
                    📍 <strong>Hospital Location:</strong> OPD Tower B, 2nd Floor, Room #204. Please arrive 10 minutes before your slot.
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                  >
                    <Printer size={14} />
                    <span>Print Token Pass</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
