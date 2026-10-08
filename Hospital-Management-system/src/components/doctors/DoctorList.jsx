import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  PlusCircle,
  Star,
  Clock,
  Phone,
  Mail,
  Filter,
  CheckCircle,
  Activity,
  Edit2
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const DoctorList = () => {
  const { doctors, toggleDoctorStatus, setActiveModal } = useHospital();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const departments = ['All', ...new Set(doctors.map((d) => d.department))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'All' || doc.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Doctors & Clinical Staff Directory
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Specialist roster, surgical schedules, duty shift status, and consultation fee settings.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'add_doctor' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Add Specialist Doctor</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search doctors, specialties, departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Department:</span>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 w-full sm:w-auto cursor-pointer"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Doctor Card Top */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-sm"
                    style={{ backgroundColor: doc.avatarBg || '#0284c7' }}
                  >
                    {doc.name.replace('Dr. ', '').split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{doc.name}</h3>
                    <p className="text-xs font-semibold text-sky-600 mt-0.5">{doc.specialization}</p>
                    <p className="text-[10px] text-slate-400">{doc.department}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleDoctorStatus(doc.id)}
                  title="Click to toggle status (Available / In Surgery / On Leave)"
                  className="cursor-pointer hover:opacity-80 transition"
                >
                  <Badge status={doc.status} size="sm" />
                </button>
              </div>

              {/* Qualifications & Fees */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Qualifications:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[160px]">{doc.qualifications}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Experience:</span>
                  <span className="font-bold text-slate-900">{doc.experience}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <span className="font-extrabold text-emerald-700">{formatCurrency(doc.consultationFee)}</span>
                </div>
              </div>

              {/* Timings & Contact */}
              <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock size={13} className="text-slate-400 shrink-0" />
                  <span>{doc.timing}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Phone size={13} className="text-slate-400 shrink-0" />
                  <span>{doc.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 truncate">
                  <Mail size={13} className="text-slate-400 shrink-0" />
                  <span>{doc.email}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => toggleDoctorStatus(doc.id)}
                className="w-full py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 font-bold text-xs border border-slate-200 transition"
              >
                Change Shift Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
