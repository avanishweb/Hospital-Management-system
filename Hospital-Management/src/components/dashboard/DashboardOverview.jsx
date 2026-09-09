import React from 'react';
import {
  Users,
  UserCheck,
  Calendar,
  BedDouble,
  DollarSign,
  AlertTriangle,
  Activity,
  PlusCircle,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  PhoneCall,
  Pill,
  Receipt,
  FlaskConical,
  Stethoscope
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const DashboardOverview = () => {
  const {
    patients,
    doctors,
    appointments,
    beds,
    medicines,
    invoices,
    labOrders,
    activities,
    setCurrentTab,
    setActiveModal
  } = useHospital();

  const totalPatients = patients.length;
  const admittedPatients = patients.filter((p) => p.admissionStatus === 'Admitted').length;
  const outpatientCount = patients.filter((p) => p.admissionStatus === 'Outpatient').length;

  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === 'Occupied').length;
  const bedPercent = Math.round((occupiedBeds / totalBeds) * 100);

  const todayAppts = appointments.filter((a) => a.date === '2026-09-05');
  const inConsultationAppts = appointments.filter((a) => a.status === 'In-Consultation');

  const availableDoctors = doctors.filter((d) => d.status === 'Available').length;
  const lowStockMeds = medicines.filter((m) => m.stock <= m.minThreshold).length;

  // Calculate today's revenue and total revenue
  const totalRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.paidAmount) || 0), 0);
  const pendingRevenue = invoices.reduce((sum, inv) => sum + (Number(inv.balance) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-teal-950 text-white p-6 rounded-3xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Real-Time Clinical Operations Center
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            PulseCare Hospital Overview
          </h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Live telemetry of admissions, bed utilization, active consultations, diagnostic workflows, and hospital finances.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveModal({ type: 'add_patient' })}
            className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition"
          >
            <PlusCircle size={14} />
            <span>Admit Patient</span>
          </button>
          <button
            onClick={() => setActiveModal({ type: 'book_appointment' })}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition"
          >
            <Calendar size={14} />
            <span>New Appointment</span>
          </button>
          <button
            onClick={() => setActiveModal({ type: 'create_invoice' })}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition"
          >
            <Receipt size={14} />
            <span>Create Bill</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Appointments"
          value={todayAppts.length}
          subtitle={`${inConsultationAppts.length} In-Consultation now`}
          icon={Calendar}
          trend="+12% vs yesterday"
          trendPositive={true}
          colorScheme="sky"
          onClick={() => setCurrentTab('appointments')}
        />

        <StatCard
          title="In-Patients (IPD)"
          value={`${admittedPatients} Patients`}
          subtitle={`${outpatientCount} active Outpatients (OPD)`}
          icon={Users}
          trend={`${totalPatients} Total Registered`}
          trendPositive={true}
          colorScheme="teal"
          onClick={() => setCurrentTab('patients')}
        />

        <StatCard
          title="Bed Occupancy"
          value={`${bedPercent}%`}
          subtitle={`${occupiedBeds} occupied / ${totalBeds} total`}
          icon={BedDouble}
          trend={bedPercent > 80 ? 'Near Capacity' : 'Optimal Capacity'}
          trendPositive={bedPercent <= 80}
          colorScheme={bedPercent > 80 ? 'rose' : 'emerald'}
          onClick={() => setCurrentTab('beds')}
        />

        <StatCard
          title="Settled Revenue"
          value={formatCurrency(totalRevenue)}
          subtitle={`${formatCurrency(pendingRevenue)} pending claims`}
          icon={DollarSign}
          trend="94.2% collection"
          trendPositive={true}
          colorScheme="violet"
          onClick={() => setCurrentTab('billing')}
        />
      </div>

      {/* Secondary Dashboard Row: Active Beds + Live Queue + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Live Bed Map Preview & Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bed Quick Monitor */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <BedDouble size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Live Bed & Ward Occupancy Map
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Instant triage status across ICU, General Wards, and VIP Suites
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab('beds')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
              >
                View All Beds →
              </button>
            </div>

            {/* Bed Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
              {beds.slice(0, 10).map((b) => (
                <div
                  key={b.id}
                  onClick={() => setCurrentTab('beds')}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all hover:scale-105 ${
                    b.status === 'Occupied'
                      ? 'bg-rose-50/70 border-rose-200 text-rose-900'
                      : b.status === 'Available'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-violet-50/70 border-violet-200 text-violet-900'
                  }`}
                >
                  <p className="text-xs font-black font-mono">{b.bedNumber}</p>
                  <p className="text-[10px] font-bold truncate mt-0.5">{b.status}</p>
                  <p className="text-[9px] text-slate-500 truncate">{b.ward.split(' ')[0]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Active Appointment Queue */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Today's OPD Queue & Patient Flow
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Live schedule for Sept 5, 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentTab('appointments')}
                className="text-xs font-bold text-sky-600 hover:text-sky-700 hover:underline"
              >
                Manage Queue →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.slice(0, 4).map((apt) => (
                <div key={apt.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-extrabold px-2 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      {apt.token}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{apt.patientName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {apt.doctorName} • <span className="text-sky-700 font-medium">{apt.department}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium text-slate-600">{apt.time}</span>
                    <Badge status={apt.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Hospital Activity Feed & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Staff Roster Status */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Specialists on Duty
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {availableDoctors} Active Now
              </span>
            </div>

            <div className="space-y-2">
              {doctors.slice(0, 4).map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                      style={{ backgroundColor: doc.avatarBg }}
                    >
                      {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{doc.name}</p>
                      <p className="text-[10px] text-slate-500">{doc.department}</p>
                    </div>
                  </div>
                  <Badge status={doc.status} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Live Activity Log */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Activity size={16} className="text-sky-600" />
                Hospital Feed & Audit Log
              </h3>
              <span className="text-[10px] font-bold text-slate-400">Live</span>
            </div>

            <div className="space-y-3">
              {activities.slice(0, 5).map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <div
                    className="h-7 w-7 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs"
                    style={{ backgroundColor: act.color || '#0284c7' }}
                  >
                    <CheckCircle2 size={13} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-tight mt-0.5">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
