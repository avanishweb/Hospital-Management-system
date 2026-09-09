import React from 'react';
import {
  Activity,
  Heart,
  Calendar,
  Users,
  Shield,
  PhoneCall,
  LayoutDashboard,
  ExternalLink,
  Search,
  UserCheck,
  Stethoscope,
  Clock,
  Sparkles
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const Navbar = () => {
  const { activePortal, setActivePortal, setCurrentTab, role, setRole, appointments, medicines } = useHospital();

  const lowStockCount = medicines.filter(m => m.stock <= m.minThreshold).length;
  const todayApptsCount = appointments.filter(a => a.date === '2026-09-05').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-teal-950 text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sky-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            24/7 Level-1 Trauma & Emergency Center Open
          </span>
          <span className="hidden md:inline-flex text-slate-400">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
            <PhoneCall size={12} className="text-rose-400" />
            Ambulance Hotline: <strong className="text-white">+1 (800) 999-CARE</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300 text-xs">
          <span className="hidden lg:inline-flex items-center gap-1">
            <Clock size={12} className="text-teal-400" />
            Hospital Time: <span className="font-mono text-white">08:15 AM (EST)</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Staff Role:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-800 text-teal-300 border border-slate-700 text-xs rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-teal-400 font-medium cursor-pointer"
            >
              <option value="admin">Chief Administrator</option>
              <option value="doctor">Attending Physician</option>
              <option value="receptionist">Front Desk Reception</option>
              <option value="pharmacist">Chief Pharmacist</option>
              <option value="lab_tech">Lab Diagnostics Tech</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => {
            setActivePortal('website');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <Heart className="h-5 w-5 fill-white/20 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Pulse<span className="text-sky-600">Care</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                Medical Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Advanced Clinical & Hospital Management
            </p>
          </div>
        </div>

        {/* Portal Switcher & Action Tabs */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 shadow-inner">
            <button
              onClick={() => setActivePortal('website')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activePortal === 'website'
                  ? 'bg-white text-sky-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles size={14} className={activePortal === 'website' ? 'text-sky-600' : 'text-slate-400'} />
              <span>Public Website</span>
            </button>

            <button
              onClick={() => {
                setActivePortal('app');
                setCurrentTab('dashboard');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activePortal === 'app'
                  ? 'bg-sky-600 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard size={14} className={activePortal === 'app' ? 'text-white' : 'text-slate-400'} />
              <span>HMS Staff Portal</span>
              {todayApptsCount > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  activePortal === 'app' ? 'bg-sky-700 text-white' : 'bg-sky-200 text-sky-800'
                }`}>
                  {todayApptsCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Book Appointment button when on public website */}
          {activePortal === 'website' ? (
            <button
              onClick={() => {
                const bookingEl = document.getElementById('booking-section');
                if (bookingEl) {
                  bookingEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActivePortal('app');
                  setCurrentTab('appointments');
                }
              }}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 hover:shadow-lg transition-all"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </button>
          ) : (
            <button
              onClick={() => setActivePortal('website')}
              className="hidden sm:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1.5 rounded-lg hover:bg-slate-100 transition"
            >
              <ExternalLink size={13} />
              <span>View Public Portal</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
