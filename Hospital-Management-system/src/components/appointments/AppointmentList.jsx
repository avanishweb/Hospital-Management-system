import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Search,
  PlusCircle,
  Filter,
  CheckCircle2,
  XCircle,
  PlayCircle,
  UserCheck,
  Megaphone,
  Printer
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';

export const AppointmentList = () => {
  const {
    appointments,
    updateAppointmentStatus,
    cancelAppointment,
    setActiveModal,
    showToast
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [callingToken, setCallingToken] = useState(null);

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.token.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCallToken = (apt) => {
    setCallingToken(apt.token);
    updateAppointmentStatus(apt.id, 'In-Consultation');
    showToast(`📢 Token #${apt.token} (${apt.patientName}) called into consultation room with ${apt.doctorName}!`, 'info');
    setTimeout(() => setCallingToken(null), 6000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Appointment Scheduling & Waiting Room Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time OPD patient tokens, consultation queue calling, slot rescheduling, and attendance tracking.
          </p>
        </div>

        <button
          onClick={() => setActiveModal({ type: 'book_appointment' })}
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Calling Token Announcement Banner (if active) */}
      {callingToken && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl shadow-lg border border-emerald-500 flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Megaphone size={24} className="animate-spin" />
            <div>
              <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest">
                Now Calling to Doctor Room
              </p>
              <h4 className="text-xl font-black tracking-tight">
                TOKEN #{callingToken} — Please Proceed to Consultation Bay
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg">
            Active Call
          </span>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, doctor, token number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto overflow-x-auto">
          {['All', 'Scheduled', 'In-Consultation', 'Completed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-white text-sky-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointment Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Token & Patient</th>
                <th className="py-3.5 px-4">Specialist & Department</th>
                <th className="py-3.5 px-4">Date & Time</th>
                <th className="py-3.5 px-4">Visit Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Queue Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No matching appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Token & Patient */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-black px-2.5 py-1 rounded-xl bg-sky-100 text-sky-900 border border-sky-200 shadow-2xs">
                          {apt.token}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900">{apt.patientName}</p>
                          <p className="text-[10px] font-mono text-slate-400">{apt.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Specialist & Department */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{apt.doctorName}</p>
                      <p className="text-[11px] text-sky-700 font-medium">{apt.department}</p>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{apt.date}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{apt.time} ({apt.type})</p>
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                      {apt.reason}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge status={apt.status} size="sm" />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'Scheduled' && (
                          <button
                            title="Call Patient Into Room"
                            onClick={() => handleCallToken(apt)}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] shadow-2xs transition"
                          >
                            <PlayCircle size={13} />
                            <span>Call In</span>
                          </button>
                        )}

                        {apt.status === 'In-Consultation' && (
                          <button
                            title="Complete Consultation"
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-bold text-[11px] shadow-2xs transition"
                          >
                            <CheckCircle2 size={13} />
                            <span>Complete</span>
                          </button>
                        )}

                        {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                          <button
                            title="Cancel Appointment"
                            onClick={() => cancelAppointment(apt.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
                          >
                            <XCircle size={16} />
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
