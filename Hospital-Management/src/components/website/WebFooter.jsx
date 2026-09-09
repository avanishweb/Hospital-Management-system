import React from 'react';
import {
  Heart,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  ArrowUp
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const WebFooter = () => {
  const { setActivePortal, setCurrentTab } = useHospital();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Accreditations */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Heart className="h-5 w-5 fill-white/20" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Pulse<span className="text-sky-400">Care</span> Hospital & Medical Center
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An internationally accredited multi-super specialty hospital committed to clinical excellence, patient safety, compassionate care, and digital healthcare innovation.
            </p>

            {/* Accreditation Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-sky-400 font-bold text-[10px] rounded-lg">
                🏆 JCI Gold Seal Certified
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-[10px] rounded-lg">
                ✓ NABH Accredited
              </span>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-amber-400 font-bold text-[10px] rounded-lg">
                ★ ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hospital Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActivePortal('app');
                    setCurrentTab('dashboard');
                  }}
                  className="hover:text-sky-400 transition"
                >
                  Executive HMS Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePortal('app');
                    setCurrentTab('patients');
                  }}
                  className="hover:text-sky-400 transition"
                >
                  Patient EMR Records
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePortal('app');
                    setCurrentTab('beds');
                  }}
                  className="hover:text-sky-400 transition"
                >
                  Bed & Ward Occupancy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePortal('app');
                    setCurrentTab('pharmacy');
                  }}
                  className="hover:text-sky-400 transition"
                >
                  Pharmacy & Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePortal('app');
                    setCurrentTab('billing');
                  }}
                  className="hover:text-sky-400 transition"
                >
                  Invoicing & Payments
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Centers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Centers of Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Cardiology & CathLab</li>
              <li>Neurology & Stroke Center</li>
              <li>Robotic Orthopedic Surgery</li>
              <li>Pediatrics & Level-3 NICU</li>
              <li>Cancer Care & Oncology</li>
              <li>24/7 Level-1 Trauma Bay</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Emergency
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-rose-400 shrink-0 mt-0.5" />
                <span>1000 Healthway Ave, Medical District, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span>Emergency: +1 (800) 999-CARE</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-sky-400 shrink-0" />
                <span>helpdesk@pulsecare.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-400 shrink-0" />
                <span>24 Hours / 7 Days Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PulseCare Medical Center. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={scrollToTop} className="flex items-center gap-1 hover:text-white transition">
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
