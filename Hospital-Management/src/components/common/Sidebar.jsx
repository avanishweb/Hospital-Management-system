import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  BedDouble,
  Pill,
  Receipt,
  FlaskConical,
  Settings,
  Activity,
  HeartPulse,
  LogOut,
  ShieldCheck,
  PlusCircle,
  RotateCcw
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const Sidebar = () => {
  const {
    currentTab,
    setCurrentTab,
    role,
    patients,
    appointments,
    beds,
    medicines,
    invoices,
    labOrders,
    setActiveModal,
    resetToMockData
  } = useHospital();

  const admittedCount = patients.filter((p) => p.admissionStatus === 'Admitted').length;
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied').length;
  const totalBeds = beds.length;
  const bedPercent = Math.round((occupiedBeds / totalBeds) * 100);
  const lowStockMedicines = medicines.filter((m) => m.stock <= m.minThreshold).length;
  const pendingInvoices = invoices.filter((inv) => inv.status === 'Pending' || inv.status === 'Partial').length;
  const processingLabOrders = labOrders.filter((l) => l.status === 'Processing' || l.status === 'Ordered').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Overview & Analytics',
      icon: LayoutDashboard,
      badge: null,
      color: 'text-sky-600'
    },
    {
      id: 'patients',
      label: 'Patient Management',
      icon: Users,
      badge: `${admittedCount} Admitted`,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'doctors',
      label: 'Doctors & Staff',
      icon: UserCheck,
      badge: null
    },
    {
      id: 'appointments',
      label: 'Appointments & Queue',
      icon: Calendar,
      badge: appointments.length.toString(),
      badgeColor: 'bg-sky-100 text-sky-800'
    },
    {
      id: 'beds',
      label: 'Beds & Ward Monitor',
      icon: BedDouble,
      badge: `${bedPercent}% Full`,
      badgeColor: bedPercent > 80 ? 'bg-rose-100 text-rose-800' : 'bg-teal-100 text-teal-800'
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy & Stock',
      icon: Pill,
      badge: lowStockMedicines > 0 ? `${lowStockMedicines} Low` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'billing',
      label: 'Billing & Invoices',
      icon: Receipt,
      badge: pendingInvoices > 0 ? `${pendingInvoices} Pending` : null,
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      id: 'lab',
      label: 'Lab & Diagnostics',
      icon: FlaskConical,
      badge: processingLabOrders > 0 ? `${processingLabOrders} Active` : null,
      badgeColor: 'bg-violet-100 text-violet-800'
    },
    {
      id: 'settings',
      label: 'Settings & Data Reset',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between min-h-[calc(100vh-4rem)] p-4 shadow-sm select-none">
      {/* Quick Action Trigger Buttons */}
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-100 p-3 rounded-xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider">
              Quick Actions
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setActiveModal({ type: 'add_patient' })}
              className="flex items-center gap-1.5 justify-center py-1.5 px-2 bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-semibold rounded-lg shadow-sm transition"
            >
              <PlusCircle size={12} />
              <span>+ Patient</span>
            </button>
            <button
              onClick={() => setActiveModal({ type: 'book_appointment' })}
              className="flex items-center gap-1.5 justify-center py-1.5 px-2 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold rounded-lg shadow-sm transition"
            >
              <Calendar size={12} />
              <span>+ Slot</span>
            </button>
          </div>
        </div>

        {/* Navigation Item List */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Clinical Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 font-bold border border-sky-200 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    className={isActive ? 'text-sky-600' : 'text-slate-400'}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        {/* Bed occupancy summary bar */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
          <div className="flex justify-between text-[11px] font-medium text-slate-600 mb-1">
            <span>Hospital Bed Load</span>
            <span className="font-bold text-slate-900">{occupiedBeds} / {totalBeds}</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                bedPercent > 80 ? 'bg-rose-500' : 'bg-teal-500'
              }`}
              style={{ width: `${bedPercent}%` }}
            ></div>
          </div>
        </div>

        {/* User Info / Role Indicator */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs border border-sky-200">
              {role.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 capitalize leading-tight">
                {role === 'lab_tech' ? 'Lab Technician' : role}
              </p>
              <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
          </div>
          <button
            title="Reset to Demo Data"
            onClick={resetToMockData}
            className="text-slate-400 hover:text-sky-600 p-1 rounded-lg hover:bg-sky-50 transition"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
