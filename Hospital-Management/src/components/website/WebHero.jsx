import React from 'react';
import {
  Calendar,
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Stethoscope,
  Activity,
  Sparkles,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const WebHero = () => {
  const { doctors, setActivePortal, setCurrentTab, setActiveModal } = useHospital();

  const activeDoctorsCount = doctors.filter(d => d.status === 'Available').length;

  return (
    <section
      className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-cover bg-center"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}images/hospital-hero.png)`,
      }}
    >
      {/* Dark overlay keeps the hero copy readable on every screen size. */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-sky-950/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-sky-950/15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sky-50 text-xs font-bold shadow-xs">
              <Sparkles size={14} className="text-cyan-300 animate-spin" />
              <span>JCI & NABH Accredited Multi-Super Specialty Hospital</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-lg">
              World-Class Healthcare, <br />
              <span className="text-cyan-300">Intelligently Connected.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed max-w-2xl font-normal drop-shadow-md">
              PulseCare combines top medical specialists, state-of-the-art diagnostic labs, robotic surgical suites, and 24/7 trauma care with seamless digital records and zero-wait appointments.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('booking-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-sky-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm"
              >
                <Calendar size={18} />
                <span>Book Instant Consultation</span>
              </button>

              <button
                onClick={() => {
                  setActivePortal('app');
                  setCurrentTab('dashboard');
                }}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold px-5 py-3.5 rounded-xl border border-slate-300 shadow-sm hover:border-slate-400 transition-all text-sm"
              >
                <span>HMS Staff Portal</span>
                <ArrowRight size={16} className="text-sky-600" />
              </button>
            </div>

            {/* Value Props Strip */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/25">
              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <span>99.4%</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Patient Satisfaction</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-xl">
                  <span className="text-emerald-600">{activeDoctorsCount}+</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Specialists On Duty</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-extrabold text-xl">
                  <span>&lt; 15 min</span>
                </div>
                <p className="text-xs text-slate-200 font-medium">Avg. ER Response</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 shadow-xl space-y-5">
              {/* Emergency Banner Card */}
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <PhoneCall className="animate-bounce" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Emergency Dispatch</h4>
                    <p className="text-xs text-rose-100">ICU Ambulance & Trauma Unit</p>
                  </div>
                </div>
                <a
                  href="tel:18009992273"
                  className="px-3 py-1.5 bg-white text-rose-700 font-bold text-xs rounded-lg shadow-sm hover:bg-rose-50 transition"
                >
                  Call Now
                </a>
              </div>

              {/* Fast Lookup Doctor / Department Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Featured Specialized Centers
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 hover:border-sky-300 transition cursor-pointer">
                    <div className="h-8 w-8 rounded-lg bg-sky-600 text-white flex items-center justify-center mb-2 shadow-xs">
                      <Activity size={16} />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Cardiology & CathLab</p>
                    <p className="text-[11px] text-sky-700 font-medium">24/7 Angioplasty</p>
                  </div>

                  <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 hover:border-teal-300 transition cursor-pointer">
                    <div className="h-8 w-8 rounded-lg bg-teal-600 text-white flex items-center justify-center mb-2 shadow-xs">
                      <Stethoscope size={16} />
                    </div>
                    <p className="text-xs font-bold text-slate-800">Robotic Joint Ortho</p>
                    <p className="text-[11px] text-teal-700 font-medium">Rapid Recovery</p>
                  </div>
                </div>
              </div>

              {/* Real-time Hospital Status Strip */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Live OPD Queue Status
                  </span>
                  <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">
                    Running On Schedule
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Estimated wait time for general consultations is under 12 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
