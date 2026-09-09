import React, { useState } from 'react';
import {
  Star,
  Clock,
  Calendar,
  Phone,
  Mail,
  Award,
  Filter,
  CheckCircle,
  Stethoscope
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { formatCurrency } from '../../utils/formatters';

export const WebDoctors = () => {
  const { doctors, setActiveModal } = useHospital();
  const [selectedDept, setSelectedDept] = useState('All');

  const departments = ['All', ...new Set(doctors.map((d) => d.department))];

  const filteredDoctors = selectedDept === 'All'
    ? doctors
    : doctors.filter((d) => d.department === selectedDept);

  return (
    <section className="py-16 bg-slate-50" id="doctors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              Expert Clinical Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Meet Our Board-Certified Specialists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Experienced consultants delivering patient-centric evidence-based medicine.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="h-14 w-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md"
                      style={{ backgroundColor: doc.avatarBg || '#0284c7' }}
                    >
                      {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-tight">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-sky-600 mt-0.5">
                        {doc.specialization}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {doc.department}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      doc.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : doc.status === 'In Surgery'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>

                {/* Qualifications & Experience */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Qualifications:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">{doc.qualifications}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Experience:</span>
                    <span className="font-semibold text-slate-900">{doc.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-slate-400">Consultation:</span>
                    <span className="font-extrabold text-emerald-700">{formatCurrency(doc.consultationFee)}</span>
                  </div>
                </div>

                {/* Rating & Availability */}
                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star size={14} className="text-amber-500 fill-amber-400" />
                    <span className="font-bold text-slate-800">{doc.rating}</span>
                    <span className="text-slate-400">({doc.reviewsCount} patient reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={13} className="text-slate-400" />
                    <span>{doc.timing} ({doc.availableDays.join(', ')})</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  const bookingEl = document.getElementById('booking-section');
                  if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-bold text-xs border border-sky-200 hover:border-sky-600 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={14} />
                <span>Book Slot with {doc.name.split(' ')[1]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
