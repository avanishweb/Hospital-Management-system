import React, { useState } from 'react';
import {
  BedDouble,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Users,
  Filter,
  CheckCircle,
  PlusCircle
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { Badge } from '../common/Badge';
import { formatCurrency } from '../../utils/formatters';

export const BedStatusGrid = () => {
  const { beds, updateBedStatus, setActiveModal } = useHospital();
  const [wardFilter, setWardFilter] = useState('All');

  const wards = ['All', ...new Set(beds.map((b) => b.ward))];

  const filteredBeds = wardFilter === 'All'
    ? beds
    : beds.filter((b) => b.ward === wardFilter);

  const totalBeds = beds.length;
  const occupiedCount = beds.filter((b) => b.status === 'Occupied').length;
  const availableCount = beds.filter((b) => b.status === 'Available').length;
  const cleaningCount = beds.filter((b) => b.status === 'Cleaning').length;
  const maintenanceCount = beds.filter((b) => b.status === 'Maintenance').length;

  return (
    <div className="space-y-6">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bed & Ward Occupancy Monitor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time visual floor map, bed sanitization cycle, and patient ward assignments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-2xs">
            {occupiedCount} / {totalBeds} Beds Occupied ({Math.round((occupiedCount / totalBeds) * 100)}%)
          </span>
        </div>
      </div>

      {/* Ward Status Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            Ready & Available
          </span>
          <span className="text-2xl font-extrabold text-emerald-900">{availableCount}</span>
          <p className="text-[10px] text-emerald-600 mt-0.5">Sanitized & Prepped</p>
        </div>

        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl">
          <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
            Occupied
          </span>
          <span className="text-2xl font-extrabold text-rose-900">{occupiedCount}</span>
          <p className="text-[10px] text-rose-600 mt-0.5">Active In-Patients</p>
        </div>

        <div className="bg-violet-50 border border-violet-200 p-3.5 rounded-2xl">
          <span className="text-[10px] font-bold text-violet-700 uppercase tracking-wider block">
            Cleaning / Sanitization
          </span>
          <span className="text-2xl font-extrabold text-violet-900">{cleaningCount}</span>
          <p className="text-[10px] text-violet-600 mt-0.5">UV Sterilization</p>
        </div>

        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-2xl">
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">
            Maintenance
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{maintenanceCount}</span>
          <p className="text-[10px] text-slate-600 mt-0.5">Service / Calibration</p>
        </div>
      </div>

      {/* Ward Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {wards.map((w) => (
          <button
            key={w}
            onClick={() => setWardFilter(w)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              wardFilter === w
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Bed Cards Visual Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => (
          <div
            key={bed.id}
            className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
              bed.status === 'Occupied'
                ? 'border-rose-200 bg-rose-50/20'
                : bed.status === 'Available'
                ? 'border-emerald-200 bg-emerald-50/20'
                : 'border-slate-200'
            }`}
          >
            <div>
              {/* Bed Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center font-black text-xs shadow-2xs ${
                      bed.status === 'Occupied'
                        ? 'bg-rose-500 text-white'
                        : bed.status === 'Available'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-violet-500 text-white'
                    }`}
                  >
                    <BedDouble size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 font-mono text-sm leading-tight">
                      {bed.bedNumber}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">{bed.floor}</p>
                  </div>
                </div>

                <Badge status={bed.status} size="sm" />
              </div>

              {/* Bed Details */}
              <div className="space-y-1 text-xs mb-3">
                <p className="text-slate-800 font-semibold">{bed.ward}</p>
                <p className="text-[11px] text-slate-500">{bed.type}</p>
                <p className="text-[11px] text-slate-600">
                  Daily Charge: <strong className="text-slate-900">{formatCurrency(bed.dailyRate)}</strong>
                </p>
              </div>

              {/* Assigned Patient if Occupied */}
              {bed.status === 'Occupied' && (
                <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-xs text-rose-900 space-y-0.5 mb-3">
                  <span className="text-[10px] uppercase font-bold text-rose-700 block">Admitted Patient</span>
                  <p className="font-extrabold">{bed.assignedPatientName}</p>
                  <p className="text-[10px] font-mono text-rose-700">{bed.assignedPatientId}</p>
                </div>
              )}
            </div>

            {/* Change Bed Status Controls */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 text-[11px]">
              <span className="text-slate-400 font-medium">Set:</span>
              <div className="flex items-center gap-1">
                {bed.status !== 'Available' && (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'Available')}
                    className="px-2 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold transition"
                  >
                    Available
                  </button>
                )}
                {bed.status !== 'Cleaning' && (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'Cleaning')}
                    className="px-2 py-1 rounded-lg bg-violet-100 hover:bg-violet-200 text-violet-800 font-bold transition"
                  >
                    Clean
                  </button>
                )}
                {bed.status !== 'Maintenance' && (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'Maintenance')}
                    className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition"
                  >
                    Service
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
