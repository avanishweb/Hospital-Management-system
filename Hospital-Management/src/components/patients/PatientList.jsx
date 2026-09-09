import React, { useState } from 'react';
import {
  Users,
  Search,
  PlusCircle,
  Eye,
  FileText,
  UserPlus,
  BedDouble,
  LogOut,
  HeartPulse,
  Filter,
  Shield,
  Phone
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';

export const PatientList = () => {
  const { patients, setActiveModal, dischargePatient } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bloodFilter, setBloodFilter] = useState('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.phone && p.phone.includes(searchTerm)) ||
      (p.department && p.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' || p.admissionStatus === statusFilter;

    const matchesBlood =
      bloodFilter === 'All' || p.bloodGroup === bloodFilter;

    return matchesSearch && matchesStatus && matchesBlood;
  });

  return (
    <div className="space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Management & EMR Registry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Electronic Medical Records, in-patient admissions, vital trends, and discharge summaries.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'add_patient' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search patient name, ID, phone, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filters */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['All', 'Admitted', 'Outpatient', 'Discharged'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  statusFilter === st
                    ? 'bg-white text-sky-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Blood Group Select */}
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
          >
            <option value="All">All Blood Groups</option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O-">O-</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Patient Info</th>
                <th className="py-3.5 px-4">Age / Gender / Blood</th>
                <th className="py-3.5 px-4">Department & Doctor</th>
                <th className="py-3.5 px-4">Admission & Bed</th>
                <th className="py-3.5 px-4">Latest Vitals</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No matching patient records found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Patient Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          {patient.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-sky-600 transition">
                            {patient.name}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400">
                            {patient.id} • {patient.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Age / Gender / Blood */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">
                        {patient.age} yrs • {patient.gender}
                      </p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 bg-rose-50 text-rose-700 font-bold text-[10px] rounded border border-rose-200">
                        {patient.bloodGroup}
                      </span>
                    </td>

                    {/* Department & Doctor */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{patient.department}</p>
                      <p className="text-[11px] text-slate-500">{patient.attendingDoctor}</p>
                    </td>

                    {/* Admission & Bed */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        <Badge status={patient.admissionStatus} size="sm" />
                        {patient.assignedBed && (
                          <p className="text-[11px] font-bold text-sky-700 flex items-center gap-1 font-mono">
                            <BedDouble size={12} /> {patient.assignedBed}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Latest Vitals */}
                    <td className="py-3.5 px-4">
                      {patient.vitals ? (
                        <div className="space-y-0.5 text-[11px]">
                          <p className="text-slate-700">
                            BP: <strong className="text-slate-900">{patient.vitals.bp}</strong>
                          </p>
                          <p className="text-slate-500">
                            HR: {patient.vitals.heartRate} | SpO2: {patient.vitals.spo2}
                          </p>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No vitals logged</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="View Electronic Medical Record"
                          onClick={() => setActiveModal({ type: 'view_patient', payload: patient })}
                          className="p-1.5 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition"
                        >
                          <Eye size={15} />
                        </button>

                        {patient.admissionStatus === 'Admitted' ? (
                          <button
                            title="Discharge Patient"
                            onClick={() => dischargePatient(patient.id)}
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition"
                          >
                            <LogOut size={15} />
                          </button>
                        ) : (
                          <button
                            title="Admit to Bed"
                            onClick={() => setActiveModal({ type: 'admit_patient', payload: patient })}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition"
                          >
                            <BedDouble size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
