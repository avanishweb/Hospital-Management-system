import React, { useState } from 'react';
import {
  Settings,
  Database,
  RotateCcw,
  Download,
  Upload,
  ShieldCheck,
  Building,
  Lock,
  Moon,
  Sun,
  Server,
  Sparkles
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const SettingsView = () => {
  const {
    role,
    setRole,
    resetToMockData,
    showToast,
    doctors,
    patients,
    appointments,
    beds,
    medicines,
    invoices,
    labOrders
  } = useHospital();

  const handleExportData = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      hospitalName: 'PulseCare Medical Center & Hospital',
      doctors,
      patients,
      appointments,
      beds,
      medicines,
      invoices,
      labOrders
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pulsecare_hms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    showToast('Hospital database backup exported successfully as JSON file!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Hospital System Settings & Data Administration
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Staff role management, database backup/restore, audit logs, and hospital profile parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role & Access Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="h-10 w-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">User Role & Permissions</h3>
              <p className="text-xs text-slate-500">Simulate role-based UI access & actions</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Current Session Role
            </label>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                showToast(`Switched active staff role to ${e.target.value.toUpperCase()}`, 'info');
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="admin">Chief Medical Administrator (Full Access)</option>
              <option value="doctor">Attending Physician / Surgeon (EMR & Orders)</option>
              <option value="receptionist">Front Desk Receptionist (OPD & Admissions)</option>
              <option value="pharmacist">Chief Pharmacist (Dispensing & Stock)</option>
              <option value="lab_tech">Lab Diagnostics Technician (Pathology & Imaging)</option>
            </select>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">Role Capabilities:</p>
            <p>• <strong>Administrator:</strong> Unrestricted access across all financial, clinical, and staff rosters.</p>
            <p>• <strong>Physician:</strong> Clinical EMR notes, inpatient rounds, and diagnostic order entry.</p>
            <p>• <strong>Receptionist:</strong> OPD token caller, bed assignments, and appointment scheduling.</p>
          </div>
        </div>

        {/* Database & Reset Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="h-10 w-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Database & Data Persistence</h3>
              <p className="text-xs text-slate-500">LocalStorage synchronization & full JSON backup</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleExportData}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs border border-sky-200 shadow-2xs transition"
              >
                <Download size={15} />
                <span>Export JSON Database</span>
              </button>

              <button
                onClick={resetToMockData}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 shadow-2xs transition"
              >
                <RotateCcw size={15} />
                <span>Reset Demo Records</span>
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Registered Patients:</span>
                <strong className="text-slate-900">{patients.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Specialist Physicians:</span>
                <strong className="text-slate-900">{doctors.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Hospital Beds:</span>
                <strong className="text-slate-900">{beds.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Pharmacy SKUs:</span>
                <strong className="text-slate-900">{medicines.length}</strong>
              </div>
              <div className="flex justify-between">
                <span>Billed Invoices:</span>
                <strong className="text-slate-900">{invoices.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Hospital Facility Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Hospital Center Profile</h3>
              <p className="text-xs text-slate-500">General hospital facility information & accreditation headers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Hospital Facility Name</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">PulseCare Medical Center & Hospital</p>
            </div>
            <div>
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Trauma Level</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">Level-1 24/7 Trauma & Resuscitation</p>
            </div>
            <div>
              <span className="font-bold text-slate-500 block uppercase text-[10px]">Accreditations</span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">JCI (Joint Commission Int.), NABH, ISO 9001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
