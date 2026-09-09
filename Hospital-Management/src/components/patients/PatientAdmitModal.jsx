import React, { useState } from 'react';
import { BedDouble, CheckCircle, UserCheck } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { formatCurrency } from '../../utils/formatters';

export const PatientAdmitModal = ({ patient, onClose }) => {
  const { beds, admitPatient, doctors, departments } = useHospital();

  const availableBeds = beds.filter((b) => b.status === 'Available');

  const [selectedBedNumber, setSelectedBedNumber] = useState(availableBeds[0]?.bedNumber || '');
  const [selectedDepartment, setSelectedDepartment] = useState(patient?.department || 'Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState(patient?.attendingDoctor || doctors[0]?.name);

  const selectedBedObj = beds.find((b) => b.bedNumber === selectedBedNumber);

  const handleAdmit = (e) => {
    e.preventDefault();
    if (!selectedBedNumber) {
      alert('Please select an available bed.');
      return;
    }

    admitPatient(patient.id, selectedBedNumber, selectedDepartment, selectedDoctor);
    onClose();
  };

  return (
    <form onSubmit={handleAdmit} className="space-y-5 text-xs">
      <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-sky-700 font-bold uppercase">Admitting Patient</span>
          <h4 className="text-base font-bold text-slate-900">{patient?.name}</h4>
          <p className="text-slate-500 font-mono text-[11px]">{patient?.id} • {patient?.bloodGroup} • {patient?.age} yrs</p>
        </div>
      </div>

      <div>
        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Available Bed / Ward *
        </label>
        {availableBeds.length === 0 ? (
          <p className="text-rose-600 font-bold py-2">
            No beds currently available. Please discharge a patient or complete room sanitization.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
            {availableBeds.map((bed) => (
              <div
                key={bed.id}
                onClick={() => setSelectedBedNumber(bed.bedNumber)}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  selectedBedNumber === bed.bedNumber
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>{bed.bedNumber}</span>
                  <span className="text-[11px]">{formatCurrency(bed.dailyRate)}/day</span>
                </div>
                <p className={`text-[11px] mt-0.5 ${selectedBedNumber === bed.bedNumber ? 'text-sky-100' : 'text-slate-500'}`}>
                  {bed.ward} ({bed.floor})
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
            Care Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
            Attending Specialist
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {doctors.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} ({d.department})
              </option>
            ))}
          </select>
        </div>
      </div>

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
          disabled={availableBeds.length === 0}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          Confirm Bed Admission
        </button>
      </div>
    </form>
  );
};
