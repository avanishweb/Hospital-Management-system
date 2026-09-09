import React, { useState } from 'react';
import {
  Heart,
  HeartPulse,
  Activity,
  BedDouble,
  Shield,
  Phone,
  Calendar,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Receipt,
  FlaskConical,
  Stethoscope,
  LogOut
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';

export const PatientDetailModal = ({ patient, onClose }) => {
  const { updatePatient, dischargePatient, setActiveModal, labOrders, invoices } = useHospital();

  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [bp, setBp] = useState(patient.vitals?.bp || '120/80 mmHg');
  const [heartRate, setHeartRate] = useState(patient.vitals?.heartRate || '75 bpm');
  const [spo2, setSpo2] = useState(patient.vitals?.spo2 || '98%');
  const [temp, setTemp] = useState(patient.vitals?.temp || '98.6 °F');
  const [glucose, setGlucose] = useState(patient.vitals?.glucose || '100 mg/dL');

  const [clinicalNote, setClinicalNote] = useState(patient.notes || '');

  const handleSaveVitals = (e) => {
    e.preventDefault();
    updatePatient(patient.id, {
      vitals: {
        bp,
        heartRate,
        spo2,
        temp,
        glucose,
        recordedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    });
    setIsEditingVitals(false);
  };

  const handleSaveNotes = () => {
    updatePatient(patient.id, { notes: clinicalNote });
  };

  const patientLabOrders = labOrders.filter((l) => l.patientId === patient.id || l.patientName === patient.name);
  const patientInvoices = invoices.filter((inv) => inv.patientId === patient.id || inv.patientName === patient.name);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-2xl bg-sky-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            {patient.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">{patient.name}</h3>
              <Badge status={patient.admissionStatus} size="sm" />
            </div>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              MRN: {patient.id} • {patient.age} yrs • {patient.gender} • Blood Group: <strong className="text-rose-400">{patient.bloodGroup}</strong>
            </p>
          </div>
        </div>

        {patient.assignedBed && (
          <div className="bg-sky-800/80 px-4 py-2 rounded-xl border border-sky-700 text-right">
            <span className="text-[10px] text-sky-300 block font-bold uppercase tracking-wider">
              Assigned Bed
            </span>
            <span className="text-base font-extrabold text-white font-mono flex items-center gap-1.5 justify-end">
              <BedDouble size={16} /> {patient.assignedBed}
            </span>
          </div>
        )}
      </div>

      {/* Grid: Demographics & Allergies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Contact & Address */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            Contact & Location
          </h4>
          <p className="text-slate-600">
            <strong className="text-slate-700">Phone:</strong> {patient.phone}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Email:</strong> {patient.email}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Address:</strong> {patient.address}
          </p>
          <p className="text-slate-600 pt-1 border-t border-slate-200">
            <strong className="text-slate-700">Emergency:</strong> {patient.emergencyContact}
          </p>
        </div>

        {/* Clinical Care Team */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
            Clinical Assignment
          </h4>
          <p className="text-slate-600">
            <strong className="text-slate-700">Department:</strong> {patient.department}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Attending:</strong> {patient.attendingDoctor}
          </p>
          <p className="text-slate-600">
            <strong className="text-slate-700">Admitted:</strong> {patient.admissionDate || 'Outpatient / N/A'}
          </p>
          <p className="text-slate-600 pt-1 border-t border-slate-200">
            <strong className="text-slate-700">Insurance:</strong> {patient.insuranceProvider || 'Self-Pay'}
          </p>
        </div>

        {/* Allergies & Chronic Conditions */}
        <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-200 space-y-2">
          <h4 className="font-bold text-rose-900 uppercase tracking-wider text-[11px] flex items-center gap-1">
            <AlertTriangle size={13} className="text-rose-600" />
            Allergies & Alerts
          </h4>
          <div className="flex flex-wrap gap-1">
            {(patient.allergies || []).map((alg, i) => (
              <span key={i} className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded border border-rose-300">
                {alg}
              </span>
            ))}
          </div>
          <div className="pt-2 border-t border-rose-200/60">
            <span className="font-bold text-slate-700 text-[10px] block uppercase">
              Chronic Conditions:
            </span>
            <p className="text-slate-800 font-medium">
              {(patient.chronicConditions || []).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Vitals Telemetry Box */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <HeartPulse size={16} className="text-sky-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recorded Vitals Telemetry
            </h4>
          </div>
          <button
            onClick={() => setIsEditingVitals(!isEditingVitals)}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
          >
            {isEditingVitals ? 'Cancel' : 'Update Vitals'}
          </button>
        </div>

        {isEditingVitals ? (
          <form onSubmit={handleSaveVitals} className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Blood Pressure</label>
              <input
                type="text"
                value={bp}
                onChange={(e) => setBp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Heart Rate</label>
              <input
                type="text"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Oxygen (SpO2)</label>
              <input
                type="text"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Temperature</label>
              <input
                type="text"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Blood Sugar</label>
              <input
                type="text"
                value={glucose}
                onChange={(e) => setGlucose(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 font-bold text-slate-800"
              />
            </div>
            <div className="col-span-2 sm:col-span-5 flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-1.5 bg-sky-600 text-white font-bold rounded-lg text-xs hover:bg-sky-700"
              >
                Save Recorded Vitals
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Blood Pressure</span>
              <span className="text-sm font-extrabold text-slate-900 font-mono">{patient.vitals?.bp || '—'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Heart Rate</span>
              <span className="text-sm font-extrabold text-rose-600 font-mono">{patient.vitals?.heartRate || '—'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">SpO2 Oxygen</span>
              <span className="text-sm font-extrabold text-sky-600 font-mono">{patient.vitals?.spo2 || '—'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Temperature</span>
              <span className="text-sm font-extrabold text-amber-600 font-mono">{patient.vitals?.temp || '—'}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Blood Glucose</span>
              <span className="text-sm font-extrabold text-teal-600 font-mono">{patient.vitals?.glucose || '—'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Clinical Notes & History */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} className="text-sky-600" />
            Attending Physician Clinical Notes
          </h4>
          <button
            onClick={handleSaveNotes}
            className="text-[11px] font-bold text-sky-600 hover:text-sky-800"
          >
            Save Note
          </button>
        </div>
        <textarea
          rows={3}
          value={clinicalNote}
          onChange={(e) => setClinicalNote(e.target.value)}
          className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        ></textarea>
      </div>

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          {patient.admissionStatus === 'Admitted' ? (
            <button
              onClick={() => {
                dischargePatient(patient.id);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 rounded-xl font-bold text-xs transition"
            >
              <LogOut size={14} />
              <span>Discharge Patient</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                setActiveModal({ type: 'admit_patient', payload: patient });
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl font-bold text-xs shadow-sm transition"
            >
              <BedDouble size={14} />
              <span>Admit to Hospital Bed</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              setActiveModal({ type: 'create_invoice', payload: { patientId: patient.id, patientName: patient.name } });
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-xl font-bold text-xs shadow-sm transition"
          >
            <Receipt size={14} />
            <span>Generate Invoice</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="px-5 py-2 bg-slate-200 text-slate-800 hover:bg-slate-300 rounded-xl font-bold text-xs transition"
        >
          Close EMR
        </button>
      </div>
    </div>
  );
};
