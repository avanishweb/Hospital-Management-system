import React from 'react';
import {
  ShieldCheck,
  Zap,
  Pill,
  Radio,
  FileCheck2,
  Video,
  Star,
  Quote,
  CheckCircle
} from 'lucide-react';
import { HOSPITAL_TESTIMONIALS } from '../../data/mockData';

const SERVICES = [
  {
    icon: Zap,
    title: 'Robotic & Minimally Invasive Surgery',
    description: 'Next-gen da Vinci robotic surgical systems enabling micro-incision procedures, zero blood loss, and rapid 48-hour recovery.',
    badge: 'State-of-the-Art'
  },
  {
    icon: Radio,
    title: 'Advanced 3T MRI & 512-Slice CT Scan',
    description: 'Sub-millimeter imaging resolution for neurological, cardiovascular, and oncological early tumor detections.',
    badge: '24/7 Diagnostics'
  },
  {
    icon: Pill,
    title: '24/7 In-House Automated Pharmacy',
    description: 'Fully stocked hospital dispensary with direct bedside delivery, temperature-controlled biological storage, and digital verification.',
    badge: 'Always Open'
  },
  {
    icon: Video,
    title: 'Telemedicine & Remote Consultation',
    description: 'Encrypted HD video consultations with top senior specialists, digital e-prescriptions, and remote vital monitoring.',
    badge: 'Global Care'
  },
  {
    icon: ShieldCheck,
    title: 'Level-1 Emergency & Trauma Unit',
    description: 'Dedicated air and ground ICU ambulances with onboard resuscitation, rapid triage, and instant cath-lab activation.',
    badge: 'Critical Care'
  },
  {
    icon: FileCheck2,
    title: 'Executive Health Screening Packages',
    description: 'Comprehensive preventive health checkups with same-day digital reports and personalized lifestyle counseling.',
    badge: 'Preventive Health'
  }
];

export const WebServices = () => {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Advanced Medical Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Comprehensive Hospital Facilities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Engineered to deliver exceptional clinical outcomes and seamless healthcare journeys for patients and families.
          </p>
        </div>

        {/* Services 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200">
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {srv.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Patient Testimonials Carousel / Grid */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest bg-sky-900/60 px-3 py-1 rounded-full border border-sky-700">
              Verified Patient Stories
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Trusted by Over 120,000+ Patients
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOSPITAL_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed mb-4">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <h4 className="font-bold text-white text-xs">{t.patientName}</h4>
                  <p className="text-[11px] text-sky-300">{t.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
