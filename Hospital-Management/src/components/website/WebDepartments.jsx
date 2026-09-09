import React, { useState } from 'react';
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Activity,
  Stethoscope,
  ArrowRight,
  BedDouble,
  UserCheck
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

const iconMap = {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Activity,
  Stethoscope
};

export const WebDepartments = () => {
  const { departments, doctors, setActiveModal } = useHospital();
  const [selectedDept, setSelectedDept] = useState(null);

  return (
    <section className="py-16 bg-white border-y border-slate-200" id="departments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Centres of Clinical Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Specialized Departments & Intensive Care Units
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Equipped with cutting-edge medical technologies, dedicated sub-specialty teams, and customized recovery protocols.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Activity;
            const deptDoctors = doctors.filter((d) => d.department === dept.name);

            return (
              <div
                key={dept.id}
                className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: dept.color }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
                      {dept.bedsTotal} Beds Available
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {dept.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {dept.description}
                  </p>

                  <div className="text-xs text-slate-500 font-medium space-y-1.5 pt-2 border-t border-slate-200/80">
                    <div className="flex items-center gap-1.5">
                      <UserCheck size={13} className="text-slate-400" />
                      <span>Head: <strong className="text-slate-800">{dept.headDoctor}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble size={13} className="text-slate-400" />
                      <span>Active Clinical Team: <strong className="text-slate-800">{dept.activeStaff} Specialists & Nurses</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    {deptDoctors.length} Doctors on roster
                  </span>

                  <button
                    onClick={() => {
                      const bookingEl = document.getElementById('booking-section');
                      if (bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Book Specialist</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
