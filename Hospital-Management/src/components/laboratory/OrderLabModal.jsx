import React, { useState } from 'react';
import { FlaskConical, User, Stethoscope } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const OrderLabModal = ({ onClose }) => {
  const { patients, doctors, createLabOrder } = useHospital();

  const [patientId, setPatientId] = useState(patients[0]?.id || '');
  const [doctorName, setDoctorName] = useState(doctors[0]?.name || 'Dr. Sarah Mitchell');
  const [testName, setTestName] = useState('Complete Blood Count (CBC) & Metabolic Profile');
  const [category, setCategory] = useState('Hematology');
  const [sampleType, setSampleType] = useState('Whole Blood (EDTA)');

  const selectedPatientObj = patients.find((p) => p.id === patientId) || patients[0];

  const handleSubmit = (e) => {
    e.preventDefault();

    createLabOrder({
      patientId: selectedPatientObj.id,
      patientName: selectedPatientObj.name,
      doctorName,
      testName,
      category,
      sampleType,
      results: [
        { parameter: 'Hemoglobin (Hb)', value: '14.0', unit: 'g/dL', refRange: '13.5 - 17.5', status: 'Normal' },
        { parameter: 'WBC Count', value: '7.5', unit: '10^3/µL', refRange: '4.5 - 11.0', status: 'Normal' },
        { parameter: 'Platelets', value: '250', unit: '10^3/µL', refRange: '150 - 450', status: 'Normal' }
      ]
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
          Select Patient *
        </label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.id}) — {p.department}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
          Ordering Physician *
        </label>
        <select
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {doctors.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name} ({d.department})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
          Diagnostic Test / Investigation Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Lipid Profile, Chest X-Ray, Brain MRI"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Hematology">Hematology</option>
            <option value="Clinical Biochemistry">Clinical Biochemistry</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Radiology & Imaging">Radiology & Imaging</option>
            <option value="Cardiology Diagnostics (ECG/Echo)">Cardiology Diagnostics (ECG/Echo)</option>
            <option value="Histopathology">Histopathology</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Specimen / Sample Type
          </label>
          <input
            type="text"
            placeholder="e.g. Whole Blood, Serum, Urine, Imaging Scan"
            value={sampleType}
            onChange={(e) => setSampleType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
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
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          Submit Lab Order
        </button>
      </div>
    </form>
  );
};
