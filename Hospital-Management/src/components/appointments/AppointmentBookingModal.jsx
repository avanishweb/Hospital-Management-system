import React, { useState } from 'react';
import { Calendar, User, Clock, Stethoscope, FileText } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

const DEFAULT_TIMES = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

export const AppointmentBookingModal = ({ onClose }) => {
  const { patients, doctors, departments, bookAppointment, addPatient } = useHospital();

  const [patientMode, setPatientMode] = useState('existing'); // 'existing' | 'new'
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');

  const [department, setDepartment] = useState('Cardiology');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('10:00 AM');
  const [type, setType] = useState('In-Person');
  const [reason, setReason] = useState('');

  const availableDoctors = doctors.filter((d) => d.department === department);
  const selectedDoctorObj = doctors.find((d) => d.id === doctorId) || doctors[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    let pId = selectedPatientId;
    let pName = patients.find((p) => p.id === selectedPatientId)?.name || 'Patient';

    if (patientMode === 'new') {
      if (!newPatientName || !newPatientPhone) {
        alert('Please enter new patient name and phone number.');
        return;
      }
      const newP = addPatient({
        name: newPatientName,
        phone: newPatientPhone,
        department,
        admissionStatus: 'Outpatient'
      });
      pId = newP.id;
      pName = newP.name;
    }

    bookAppointment({
      patientId: pId,
      patientName: pName,
      doctorId: selectedDoctorObj.id,
      doctorName: selectedDoctorObj.name,
      department,
      date,
      time,
      type,
      reason: reason || 'Clinical Consultation'
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* Existing vs New Patient Toggle */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => setPatientMode('existing')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition ${
            patientMode === 'existing'
              ? 'bg-white text-sky-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Select Existing Patient
        </button>
        <button
          type="button"
          onClick={() => setPatientMode('new')}
          className={`flex-1 py-1.5 rounded-lg font-bold transition ${
            patientMode === 'new'
              ? 'bg-white text-sky-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          + Quick Register New Patient
        </button>
      </div>

      {patientMode === 'existing' ? (
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Registered Patient *
          </label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.id}) — {p.phone}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Patient Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. David Miller"
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contact Phone *
            </label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={newPatientPhone}
              onChange={(e) => setNewPatientPhone(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Specialty & Doctor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              const matched = doctors.find((d) => d.department === e.target.value);
              if (matched) setDoctorId(matched.id);
            }}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Specialist Doctor
          </label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {availableDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} — {doc.specialization}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date, Time & Consultation Type */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            min="2026-09-05"
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Time Slot
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            {DEFAULT_TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Mode
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="In-Person">In-Person (OPD)</option>
            <option value="Telehealth">Telehealth / Video</option>
            <option value="Follow-up">Post-op Follow-up</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
          Chief Complaint / Reason
        </label>
        <input
          type="text"
          placeholder="e.g. Chest discomfort, post-op suture check..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-sky-500 focus:outline-none"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          Book & Assign Token
        </button>
      </div>
    </form>
  );
};
